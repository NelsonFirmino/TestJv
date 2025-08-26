import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { postDispatchV2 } from "../../../../../../../../../api/services/dispatch/dispatchModal/dispatch";
import { BaseModal } from "../../../../../../../../../components/BaseModal";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { useTypeOfDispatch } from "../../../../../../../../../hooks/useTypeOfDispatch";
import { SubmitDespachoEmLote } from "./despacho-em-lote.interface";
import * as S from "./styled";

export const DespachoEmLote = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [showSelectedProcess, setShowSelectedProcess] = useState(false);
  const {
    user,
    selectedUser,
    selectedProcessoInActionDataTable,
    setSelectedProcessoInActionDataTable,
    setSelectedRowHashes,
  } = SharedState();
  const { dispatchList, loadingTypeOfDispatchList } = useTypeOfDispatch();
  let countDispS = 0;
  let countDispF = 0;
  const queryClient = useQueryClient();
  const {
    reset,
    control,
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<SubmitDespachoEmLote>({
    mode: "onChange",
  });

  const { mutate: mutatePostDispatch, isLoading: isLoadingPostDispatch } =
    useMutation(postDispatchV2, {
      onSuccess: () => {
        countDispS++;
      },
      onError: () => {
        countDispF++;
      },
      onSettled: (res) => {
        if (
          countDispS + countDispF ===
          selectedProcessoInActionDataTable.length
        ) {
          toast(
            `Total selecionado: ${selectedProcessoInActionDataTable.length}
                    Pedidos com sucesso: ${countDispS}
                    Falha no Pedido: ${countDispF}
                `,
            {
              style: {
                borderRadius: "10px",
                background: "#c2b32d",
                color: "#fff",
                fontSize: "30px",
              },
            }
          );
          queryClient.invalidateQueries(`act-dispatch-${res.data.idAto}`);
          queryClient.invalidateQueries(
            `distributions-attorney-${
              selectedUser?.id || +user["Jvris.User.Id"]
            }`
          );
          queryClient.invalidateQueries(
            `inactions-attorney-${selectedUser?.id || +user["Jvris.User.Id"]}`
          );
          reset({ idTipoDespacho: null, txObservacao: "" });
          setSelectedProcessoInActionDataTable([]);
          setSelectedRowHashes([]);
          countDispS = 0;
          countDispF = 0;
          setOpenModal(false);
        }
      },
    });

  const onSubmit: SubmitHandler<SubmitDespachoEmLote> = async (params) => {
    selectedProcessoInActionDataTable.forEach((p) => {
      mutatePostDispatch({
        idAto: p.id,
        idProcurador: +user["Jvris.User.Id"],
        idTipoDespacho: params.idTipoDespacho.value,
        txObservacao: params.txObservacao,
        idUsuarioCadastro: user["Jvris.User.Id"],
      });
    });
  };

  return (
    <>
      <BaseModal
        title="Despacho"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Section>
            <S.SectionTitle>
              Número dos processos ({selectedProcessoInActionDataTable.length})
              <S.ContainerShowProcessNumber
                onClick={() => setShowSelectedProcess(!showSelectedProcess)}
              >
                {showSelectedProcess ? (
                  <Eye size={20} />
                ) : (
                  <EyeSlash size={20} />
                )}
              </S.ContainerShowProcessNumber>
            </S.SectionTitle>

            <S.SelectedProcessNumberContainer isOpen={showSelectedProcess}>
              {selectedProcessoInActionDataTable.map((p) => (
                <S.SelectedProcessNumber>{p.txNumero}</S.SelectedProcessNumber>
              ))}
            </S.SelectedProcessNumberContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Tipo de despacho</S.SectionTitle>
            <Controller
              name="idTipoDespacho"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <S.CustomSelect
                  placeholder="Selecione o tipo de despacho"
                  isLoading={loadingTypeOfDispatchList}
                  options={dispatchList}
                  {...field}
                />
              )}
            />
          </S.Section>

          <S.Section>
            <S.SectionTitle>Despacho</S.SectionTitle>

            <S.TextArea
              {...register("txObservacao", {
                required: true,
              })}
              placeholder="Escreva aqui..."
            />
          </S.Section>

          <S.ButtonContainer>
            <S.ConfirmButton
              type="submit"
              disabled={isLoadingPostDispatch || !isValid}
            >
              Salvar
            </S.ConfirmButton>

            {isLoadingPostDispatch && <S.LoadingSpinner />}
          </S.ButtonContainer>
        </S.Form>
      </BaseModal>
      <S.Button onClick={() => setOpenModal(true)}>Despacho</S.Button>
    </>
  );
};

import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { postRedistribution } from "../../../../../../../../../api/services/distributions/distributions";
import { BaseModal } from "../../../../../../../../../components/BaseModal";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { useAttorneyBySpecialId } from "../../../../../../../../../hooks/useAttorneyBySpecialId";
import { useRedistributionsReasons } from "../../../../../../../../../hooks/useRedistributionsReasons";
import { useSpecials } from "../../../../../../../../../hooks/useSpecials";
import { SubmitRedistribuicaoEmLote } from "./redistribuicao-em-lote.interface";
import * as S from "./styled";

export const RedistribuicaoEmLote = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedSpecial, setSelectedSpecial] = useState<any>();
  const [showSelectedProcess, setShowSelectedProcess] = useState(false);
  const {
    user,
    selectedUser,
    selectedProcessoInActionDataTable,
    setSelectedProcessoInActionDataTable,
    setSelectedRowHashes,
  } = SharedState();
  const { redistributionsReasons, isLoadingRedistributionsReasons } =
    useRedistributionsReasons();
  const { specialsList, loadingSpecialsList } = useSpecials();
  const { attorneysBySpecial, isLoadingAttorneysBySpecial } =
    useAttorneyBySpecialId(selectedSpecial?.value);
  let contRedistS = 0;
  let contRedistF = 0;
  const queryClient = useQueryClient();
  const {
    reset,
    control,
    handleSubmit,
    register,
    setValue,
    formState: { isValid },
  } = useForm<SubmitRedistribuicaoEmLote>({
    mode: "onChange",
  });

  const { mutate: mutateRedistribution, isLoading: isLoadingRedistribution } =
    useMutation(postRedistribution, {
      onSuccess: () => {
        contRedistS++;
      },
      onError: () => {
        contRedistF++;
      },
      onSettled: () => {
        if (
          contRedistS + contRedistF ===
          selectedProcessoInActionDataTable.length
        ) {
          toast(
            `Total selecionado: ${selectedProcessoInActionDataTable.length}
                    Pedidos com sucesso: ${contRedistS}
                    Falha no Pedido: ${contRedistF}
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
          queryClient.invalidateQueries(
            `distributions-attorney-${
              selectedUser?.id || +user["Jvris.User.Id"]
            }`
          );
          queryClient.invalidateQueries(
            `redistributions-attorney-${
              selectedUser?.id || +user["Jvris.User.Id"]
            }`
          );
          reset({
            idEspecializada: null,
            idMotivo: null,
            idProcurador: null,
            txObservacao: "",
          });
          setSelectedProcessoInActionDataTable([]);
          setSelectedRowHashes([]);
          contRedistS = 0;
          contRedistF = 0;
          setOpenModal(false);
        }
      },
    });

  const onSubmit: SubmitHandler<SubmitRedistribuicaoEmLote> = async (
    params
  ) => {
    selectedProcessoInActionDataTable.forEach((p) => {
      mutateRedistribution({
        idEspecializada: params.idEspecializada.value,
        idMotivo: params.idMotivo.value,
        idProcurador: params?.idProcurador?.value,
        idUsuarioCadastro: +user["Jvris.User.Id"],
        txObservacao: params.txObservacao,
        idDistribuicaoAntiga: p.idTriagem,
      });
    });
  };

  return (
    <>
      <BaseModal
        title="Pedido de redistribuição"
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
            <S.SectionTitle>Motivo redistribuição *</S.SectionTitle>
            <Controller
              name="idMotivo"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <S.CustomSelect
                  placeholder="Selecione o motivo da redistribuição"
                  isLoading={isLoadingRedistributionsReasons}
                  options={redistributionsReasons}
                  {...field}
                />
              )}
            />
          </S.Section>

          <S.Section>
            <S.SectionTitle>Especializada *</S.SectionTitle>
            <Controller
              name="idEspecializada"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { name, ref, value, onBlur } }) => (
                <S.CustomSelect
                  placeholder="Selecione uma especializada"
                  isLoading={loadingSpecialsList}
                  options={specialsList}
                  name={name}
                  ref={ref}
                  value={value}
                  onBlur={onBlur}
                  onChange={(data) => {
                    setValue("idProcurador", null);
                    setSelectedSpecial(data);
                    setValue("idEspecializada", data as any);
                  }}
                />
              )}
            />
          </S.Section>

          <S.Section>
            <S.SectionTitle>Procurador</S.SectionTitle>
            <Controller
              name="idProcurador"
              control={control}
              rules={{
                required: false,
              }}
              render={({ field }) => (
                <S.CustomSelect
                  placeholder="Selecione o procurador"
                  isLoading={isLoadingAttorneysBySpecial}
                  options={attorneysBySpecial}
                  {...field}
                  isDisabled={!Boolean(attorneysBySpecial?.length)}
                  onChange={(data) => {
                    setValue("idProcurador", data as any);
                  }}
                />
              )}
            />
          </S.Section>

          <S.Section>
            <S.SectionTitle>Motivação *</S.SectionTitle>

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
              disabled={isLoadingRedistribution || !isValid}
            >
              Enviar pedido
            </S.ConfirmButton>

            {isLoadingRedistribution && <S.LoadingSpinner />}
          </S.ButtonContainer>
        </S.Form>
      </BaseModal>
      <S.Button onClick={() => setOpenModal(true)}>
        Pedido de redistribuição
      </S.Button>
    </>
  );
};

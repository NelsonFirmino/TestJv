import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import {
  deleteDispatch,
  postDispatch,
} from "../../../../../../../../../api/services/dispatch/dispatchModal/dispatch";
import { BaseModalV2 } from "../../../../../../../../../components/BaseModalV2";
import { CustomTable } from "../../../../../../../../../components/CustomTable";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { useActDispatch } from "../../../../../../../../../hooks/useActDispatch";
import { useTypeOfDispatch } from "../../../../../../../../../hooks/useTypeOfDispatch";
import { DespachoProps, SubmitDespacho } from "./despacho.interface";
import * as S from "./styled";

export const Despacho = ({
  idAto,
  txNumeroProcesso,
  keyStateOpenModal,
  setKeyStateOpenModal,
  keyString,
}: DespachoProps) => {
  const queryClient = useQueryClient();
  const { user, selectedUser } = SharedState();
  const { actDispatch, isLoadingActDispatch } = useActDispatch(idAto);
  const { dispatchList, loadingTypeOfDispatchList } = useTypeOfDispatch();
  const [tipoDespacho, setTipoDespacho] = useState({ value: "", label: "" });
  const [observacao, setObservacao] = useState("");

  const handleTipoDespacho = (value: any) => {
    setTipoDespacho(value);
  };

  const handleObservacao = (e: any) => {
    setObservacao(e);
  };

  const { mutate: mutatePostDispatch, isLoading: isLoadingPostDispatch } =
    useMutation(postDispatch, {
      onSuccess: (res) => {
        toast(res.message, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        queryClient.invalidateQueries(`act-dispatch-${idAto}`);
        queryClient.invalidateQueries(
          `distributions-attorney-${selectedUser?.id || +user["Jvris.User.Id"]}`
        );
      },
      onError: (res: Error) => {
        toast.error(res.message, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      },
    });

  const { mutate: mutateDeleteDispatch, isLoading: isLoadingDeleteDispatch } =
    useMutation(deleteDispatch, {
      onSuccess: (res) => {
        toast(res.message, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        queryClient.invalidateQueries(`act-dispatch-${idAto}`);
        queryClient.invalidateQueries(
          `distributions-attorney-${selectedUser?.id || +user["Jvris.User.Id"]}`
        );
        setKeyStateOpenModal(false);
      },
      onError: (error: Error) => {
        toast.error(error.message, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      },
    });

  const {
    control,
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<SubmitDespacho>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitDespacho> = async (params) => {
    console.log(selectedUser?.id);

    mutatePostDispatch({
      idAto,
      idProcurador: selectedUser?.id || +user["Jvris.User.Id"],
      idTipoDespacho: params.idTipoDespacho.value,
      txObservacao: params.txObservacao,
      idUsuarioCadastro: user["Jvris.User.Id"],
    });
  };

  return (
    <BaseModalV2
      title="Despacho"
      keyStateOpenModal={keyStateOpenModal}
      setKeyStateOpenModal={setKeyStateOpenModal}
      keyString={keyString}
    >
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Número do Processo</S.SectionTitle>
          <S.Text>{txNumeroProcesso}</S.Text>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Tipo de despacho</S.SectionTitle>
          <Controller
            name="idTipoDespacho"
            control={control}
            rules={{
              required: true,
            }}
            defaultValue={dispatchList?.find(
              (d) => d.value === actDispatch?.data?.idTipoDespacho
            )}
            render={({ field }) => (
              <S.CustomSelect
                placeholder="Selecione o tipo de despacho"
                {...field}
                isLoading={loadingTypeOfDispatchList || isLoadingActDispatch}
                options={dispatchList}
                value={tipoDespacho}
                onChange={(data) => {
                  handleTipoDespacho(data);
                }}
                isDisabled={Boolean(actDispatch?.data)}
              />
            )}
          />
        </S.Section>

        {!Boolean(actDispatch?.data) && (
          <S.Section>
            <S.SectionTitle>Despacho</S.SectionTitle>

            <S.TextArea
              {...register("txObservacao", {
                required: true,
              })}
              disabled={Boolean(actDispatch?.data)}
              placeholder="Escreva aqui..."
              value={observacao}
              onChange={(e) => handleObservacao(e.target.value)}
            />
          </S.Section>
        )}

        <CustomTable
          data={actDispatch?.data ? [actDispatch.data] : []}
          isLoading={isLoadingActDispatch}
          showPagination={false}
          showSearchField={false}
          showSelectNumberOfRows={false}
          columns={[
            {
              name: "Data",
              keyData: "dtCadastro",
              isSortable: false,
              formatToDate: true,
            },
            {
              name: "Hora",
              keyData: "hrCadastro",
              isSortable: false,
            },
            {
              name: "Observação",
              keyData: "txObservacao",
              isSortable: false,
            },
          ]}
        />

        <S.ButtonContainer>
          {actDispatch?.status === "NotFound" ? (
            <S.ConfirmButton
              type="submit"
              // disabled={isLoadingPostDispatch || !isValid}
              onClick={() =>
                mutatePostDispatch({
                  idAto,
                  idProcurador: selectedUser?.id || +user["Jvris.User.Id"],
                  idTipoDespacho: +tipoDespacho.value,
                  txObservacao: observacao,
                  idUsuarioCadastro: user["Jvris.User.Id"],
                })
              }
            >
              Salvar
            </S.ConfirmButton>
          ) : (
            <S.CancelButton
              onClick={() => mutateDeleteDispatch(actDispatch?.data?.id)}
            >
              Excluir
            </S.CancelButton>
          )}

          {isLoadingPostDispatch ||
            (isLoadingDeleteDispatch && <S.LoadingSpinner />)}
        </S.ButtonContainer>
      </S.Form>
    </BaseModalV2>
  );
};

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { postRedistribution } from "../../../../../../../../../api/services/distributions/distributions";
import { BaseModalV2 } from "../../../../../../../../../components/BaseModalV2";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { useAct } from "../../../../../../../../../hooks/useAct";
import { useAttorneyBySpecialId } from "../../../../../../../../../hooks/useAttorneyBySpecialId";
import { useRedistributionsReasons } from "../../../../../../../../../hooks/useRedistributionsReasons";
import { useSpecials } from "../../../../../../../../../hooks/useSpecials";
import {
  RedistribuicaoProps,
  SubmitRedistribuicao,
} from "./redistribuicao.interface";
import * as S from "./styled";

export const Redistribuicao = ({
  idAto,
  txNumeroProcesso,
  keyStateOpenModal,
  setKeyStateOpenModal,
  keyString,
}: RedistribuicaoProps) => {
  const { act } = useAct(idAto.toString());
  const [selectedSpecial, setSelectedSpecial] = useState<any>();
  const queryClient = useQueryClient();
  const { user, selectedUser } = SharedState();
  const { redistributionsReasons, isLoadingRedistributionsReasons } =
    useRedistributionsReasons();
  const { specialsList, loadingSpecialsList } = useSpecials();
  const { attorneysBySpecial, isLoadingAttorneysBySpecial } =
    useAttorneyBySpecialId(selectedSpecial?.value);

  const { mutate: mutateRedistribution, isLoading: isLoadingRedistribution } =
    useMutation(postRedistribution, {
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
        queryClient.invalidateQueries(
          `distributions-attorney-${selectedUser?.id || +user["Jvris.User.Id"]}`
        );
        queryClient.invalidateQueries(
          `redistributions-attorney-${
            selectedUser?.id || +user["Jvris.User.Id"]
          }`
        );
        setKeyStateOpenModal(false);
      },
      onError: (error: Error) => {
        toast.error(error?.message, {
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
    setValue,
  } = useForm<SubmitRedistribuicao>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitRedistribuicao> = async (params) => {
    mutateRedistribution({
      idEspecializada: params.idEspecializada.value,
      idMotivo: params.idMotivo.value,
      idProcurador: params?.idProcurador?.value,
      idUsuarioCadastro: +user["Jvris.User.Id"],
      txObservacao: params.txObservacao,
      idDistribuicaoAntiga: act?.data?.idTriagem,
    });
  };

  return (
    <BaseModalV2
      title="Pedido de redistribuição"
      keyStateOpenModal={keyStateOpenModal}
      setKeyStateOpenModal={setKeyStateOpenModal}
      keyString={keyString}
      isSelect={true}
    >
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Número do Processo</S.SectionTitle>
          <S.Text>{txNumeroProcesso}</S.Text>
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
                placeholder="Selecione uma especializada"
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
    </BaseModalV2>
  );
};

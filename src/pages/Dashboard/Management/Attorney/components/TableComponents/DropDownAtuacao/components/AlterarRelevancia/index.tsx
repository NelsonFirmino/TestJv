import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { PutActRelevance } from "../../../../../../../../../api/services/acts/acts";
import { PutProcessRelevance } from "../../../../../../../../../api/services/process/process";
import { BaseModalV2 } from "../../../../../../../../../components/BaseModalV2";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { useProcessRelevance } from "../../../../../../../../../hooks/useProcessRelevance";
import {
  AlterarRelevanciaProps,
  SubmitAlterarRelevancia,
} from "./alterar-relevancia.interface";
import * as S from "./styled";

export const AlterarRelevancia = ({
  idAto,
  idProcesso,
  txRelevancia,
  txNumeroProcesso,
  keyStateOpenModal,
  setKeyStateOpenModal,
  keyString,
}: AlterarRelevanciaProps) => {
  const [isProcess, setIsProcess] = useState(false);
  const [isAto, setIsAto] = useState(false);
  const [isUrgente, setIsUrgente] = useState(false);
  const { processRelevanceList, loadingProcessRelevanceResponseList } =
    useProcessRelevance();
  const queryClient = useQueryClient();
  const { user, selectedUser } = SharedState();

  const {
    mutate: mutateProcessRelevance,
    isLoading: isLoadingProcessRelevance,
  } = useMutation(PutProcessRelevance, {
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

  const { mutate: mutateActRelevance, isLoading: isLoadingActRelevance } =
    useMutation(PutActRelevance, {
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
  } = useForm<SubmitAlterarRelevancia>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitAlterarRelevancia> = async (params) => {
    if (params?.isProcess) {
      mutateProcessRelevance({
        idProcesso,
        txRelevancia: params.tipoRelevancia.value,
      });
    }

    if (params?.isAto) {
      mutateActRelevance({
        idAto,
        isUrgente: params.isUrgente,
      });
    }
  };

  return (
    <BaseModalV2
      title="Alterar relevância"
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
          <S.SectionTitle>Alterar relevância?</S.SectionTitle>
          <S.ContainerRadioButton>
            <S.ContentRadioButton>
              <S.RadioButtonLabel value={isProcess}>
                {isProcess ? "SIM" : "NÃO"}
              </S.RadioButtonLabel>

              <S.ToggleButton
                {...register("isProcess")}
                checked={isProcess}
                onChange={() => setIsProcess(!isProcess)}
              />
            </S.ContentRadioButton>
          </S.ContainerRadioButton>
        </S.Section>

        {isProcess && (
          <S.Section>
            <S.SectionTitle>Nova relevância do processo</S.SectionTitle>
            <Controller
              control={control}
              {...register("tipoRelevancia")}
              defaultValue={processRelevanceList?.find(
                (p) => p.label === txRelevancia
              )}
              render={({ field }) => (
                <S.CustomSelect
                  isClearable={false}
                  options={processRelevanceList}
                  isLoading={loadingProcessRelevanceResponseList}
                  {...field}
                />
              )}
            />
          </S.Section>
        )}

        <S.Section>
          <S.SectionTitle>Ato</S.SectionTitle>
          <S.ContainerRadioButton>
            <S.ContentRadioButton>
              <S.RadioButtonLabel value={isAto}>
                {isAto ? "SIM" : "NÃO"}
              </S.RadioButtonLabel>

              <S.ToggleButton
                {...register("isAto")}
                checked={isAto}
                onChange={() => setIsAto(!isAto)}
              />
            </S.ContentRadioButton>
          </S.ContainerRadioButton>
        </S.Section>

        {isAto && (
          <S.Section>
            <S.SectionTitle>Urgente</S.SectionTitle>
            <S.ContainerRadioButton>
              <S.ContentRadioButton>
                <S.RadioButtonLabel value={isUrgente}>
                  {isUrgente ? "SIM" : "NÃO"}
                </S.RadioButtonLabel>

                <S.ToggleButton
                  {...register("isUrgente")}
                  checked={isUrgente}
                  onChange={() => setIsUrgente(!isUrgente)}
                />
              </S.ContentRadioButton>
            </S.ContainerRadioButton>
          </S.Section>
        )}

        <S.ButtonContainer>
          <S.ConfirmButton
            type="submit"
            disabled={
              isLoadingProcessRelevance ||
              isLoadingActRelevance ||
              !isValid ||
              (!isProcess && !isAto)
            }
          >
            Salvar
          </S.ConfirmButton>

          {isLoadingProcessRelevance ||
            (isLoadingActRelevance && <S.LoadingSpinner />)}
        </S.ButtonContainer>
      </S.Form>
    </BaseModalV2>
  );
};

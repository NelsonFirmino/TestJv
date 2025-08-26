import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import {
  patchDistributionsAdvisorV2,
  postRedistribution,
} from "../../../../../../../../../api/services/distributions/distributions";
import { BaseModalV2 } from "../../../../../../../../../components/BaseModalV2";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { useAct } from "../../../../../../../../../hooks/useAct";

import { useAdvisorsByAttorney } from "../../../../../../../../../hooks/useAdvisorsByAttorney";
import {
  AtribuirAssessorProps,
  SubmitAtribuirAssessor,
} from "./atribuir-assessor.interface";
import * as S from "./styled";

export const AtribuirAssessor = ({
  idAto,
  txNumeroProcesso,
  keyStateOpenModal,
  idDistribuicao,
  setKeyStateOpenModal,
  keyString,
}: AtribuirAssessorProps) => {
  const { act } = useAct(idAto.toString());
  const [selectedSpecial, setSelectedSpecial] = useState<any>();
  const [advisorsOptions, setAdvisorsOptions] = useState([
    { label: "", value: null },
  ]);
  const queryClient = useQueryClient();
  const { user, selectedUser } = SharedState();

  const { advisorsByAttorney, isLoadingAdvisorsByAttorney } =
    useAdvisorsByAttorney(selectedUser?.id || +user["Jvris.User.Id"]);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isValid },
    setValue,
  } = useForm<SubmitAtribuirAssessor>({
    mode: "onChange",
  });

  useEffect(() => {
    if (advisorsByAttorney) {
      setAdvisorsOptions([
        { label: "Sem Assessor", value: 0 },
        ...advisorsByAttorney,
      ]);
    }
  }, [keyStateOpenModal]);

  useEffect(() => {
    if (keyStateOpenModal) {
      reset({ idAssessor: null });
    }
  }, [keyStateOpenModal]);

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
    mutate: mutateDistributionsAdvisorV2,
    isLoading: isLoadingDistributionsAdvisorV2,
  } = useMutation(patchDistributionsAdvisorV2, {
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

  const onSubmit: SubmitHandler<SubmitAtribuirAssessor> = async (params) => {
    console.log(params.idAssessor);

    mutateDistributionsAdvisorV2({
      idAssessor: params.idAssessor.value,
      idsDistribuicao: [idDistribuicao],
      idUsuarioCadastro: +user["Jvris.User.Id"],
    });
  };

  return (
    <BaseModalV2
      title="Atribuir para assessor"
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
          <S.SectionTitle>Assessores</S.SectionTitle>
          <Controller
            name="idAssessor"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <S.CustomSelect
                placeholder="Selecione o assessor"
                isLoading={isLoadingAdvisorsByAttorney}
                options={advisorsOptions}
                {...field}
              />
            )}
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

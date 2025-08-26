import { useMutation, useQueryClient } from "react-query";
import {
  ModalAddActObservationProps,
  SubmitProcessActObservation,
} from "./modal-add-act-observation.interface";
import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { postActObservation } from "../../../../../../api/services/actObservations/actObservations";
import { SharedState } from "../../../../../../context/SharedContext";
import { BaseModal } from "../../../../../../components/BaseModal";

export const ModalAddActObservation = ({
  showModalAddActObservation,
  setShowModalAddActObservation,
  txFormatedProcessNumber,
  actId,
  processIdKeyCacheRevalidate
}: ModalAddActObservationProps) => {
  const { user } = SharedState();
  const queryClient = useQueryClient();

  const postNewActObservation = useMutation(postActObservation, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(
        `actAndProcedure-${processIdKeyCacheRevalidate}`
      );
      setShowModalAddActObservation(false);
    },
    onError: (error) => {
      alert("Error ao cadastrar observação do processo...");
    },
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitProcessActObservation>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitProcessActObservation> = async (data) => {
    postNewActObservation.mutate({
      idUsuarioCadastro: user["Jvris.User.Id"],
      idAto: actId,
      txObservacao: data.txObservacao,
    });
  };

  return (
    <BaseModal title="Registo de observação do processo" isOpenModal={showModalAddActObservation} setOpenModal={setShowModalAddActObservation}>
    <S.ContainerForm>
          <S.ContainerProcessNumber>
            Processo selecionado:{" "}
            <S.ProcessNumber>{txFormatedProcessNumber}</S.ProcessNumber>
          </S.ContainerProcessNumber>

          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.ContainerField>
              <S.FieldTitle htmlFor="txObservacao">
                Nova observação
                <S.LettersCounter>
                  {(watch("txObservacao") || "").length} / 180
                </S.LettersCounter>
              </S.FieldTitle>

              <S.TextAreaInput
                required={true}
                minLength={3}
                id="txObservacao"
                maxLength={180}
                placeholder="Digite aqui uma observação de no mínimo 3 caracteres sobre o ato."
                {...register("txObservacao", {
                  maxLength: 180,
                  minLength: 3,
                  required: true,
                })}
              />
            </S.ContainerField>

            <S.ContainerSubmitButton>
              <S.SubmitButton disabled={!isValid}>
                Adicionar observação
              </S.SubmitButton>
              {postNewActObservation.isLoading && <S.LoadingSpinner />}
            </S.ContainerSubmitButton>
          </S.Form>
        </S.ContainerForm>
    </BaseModal>
  );
};

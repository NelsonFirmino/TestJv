import { useMutation, useQueryClient } from "react-query";
import {
  ModalAddObservationProps,
  SubmitProcessObservation,
} from "./modal-add-observation.interface";
import { postProcessObservations } from "../../../../../api/services/processObservations/processObservations";
import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { SharedState } from "../../../../../context/SharedContext";
import { BaseModal } from "../../../../../components/BaseModal";

export const ModalAddObservation = ({
  showModalAddObservation,
  setShowModalAddObservation,
  txFormatedProcessNumber,
  processId
}: ModalAddObservationProps) => {
  const { user } = SharedState();
  const queryClient = useQueryClient();
  const postProcessObservation = useMutation(postProcessObservations, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(
        `processObservations-${processId}`
      );
      setShowModalAddObservation(false);
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
  } = useForm<SubmitProcessObservation>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitProcessObservation> = async (data) => {
    postProcessObservation.mutate({
      idProcesso: +processId,
      txObservacao: data.txObservacao,
      idUsuarioCadastro: user["Jvris.User.Id"],
    });
  };

  return (
    <BaseModal title="Registo de observação do processo" isOpenModal={showModalAddObservation} setOpenModal={setShowModalAddObservation}>
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
                placeholder="Digite aqui uma observação de no mínimo 3 caracteres sobre o processo."
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
              {postProcessObservation.isLoading && <S.LoadingSpinner />}
            </S.ContainerSubmitButton>
          </S.Form>
        </S.ContainerForm>
    </BaseModal>
  );
};

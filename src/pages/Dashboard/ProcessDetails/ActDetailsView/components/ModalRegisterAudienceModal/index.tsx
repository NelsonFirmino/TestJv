import { useMutation, useQueryClient } from "react-query";
import {
  ModalRegisterAudienceProps,
  SubmitRegisterAudience,
} from "./modal-register-audience.interface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { postAudience } from "../../../../../../api/services/audiencies/audiences";
import { useAudiences } from "../../../../../../hooks/useAudiences";
import * as S from "./styled";
import { SharedState } from "../../../../../../context/SharedContext";

export const ModalRegisterAudience = ({
  showModalRegisterAudience,
  setShowModalRegisterAudience,
}: ModalRegisterAudienceProps) => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  const queryClient = useQueryClient();
  const { audiencesList, loadingAudiencesList } = useAudiences();

  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

  const postNewAudience = useMutation(postAudience, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        `actAudience-${showModalRegisterAudience.idAto}`
      );
      setShowModalRegisterAudience({
        idAto: "0",
        open: false,
      });
    },
    onError: (error) => {
      alert("Error ao cadastrar audiência...");
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { isValid, errors },
    setError,
  } = useForm<SubmitRegisterAudience>({
    mode: "onChange",
  });

  const watchCheckbox = watch("isVirtual", false);

  const onSubmit: SubmitHandler<SubmitRegisterAudience> = async (data) => {
    if (data.isVirtual && data.txlink.length === 0) {
      setError("txlink", {
        message: "Link da reunião é obrigatório.",
      });
      return;
    }

    postNewAudience.mutate({
      idAto: +showModalRegisterAudience.idAto,
      dtAudiencia: data.dtAudiencia,
      idTipoAudiencia: data.idTipoAudiencia.value,
      isVirtual: data.isVirtual,
      txlink: data.txlink,
      hrAudiencia: data.hrAudiencia,
      isPreposto: data.isPreposto,
      idUsuarioCadastro: +user["Jvris.User.Id"]
    });
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Registrar Audiência</S.TitleModal>
          <S.CloseModal
            onClick={() =>
              setShowModalRegisterAudience({
                open: false,
                idAto: "0",
              })
            }
          >
            Fechar
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.ContentSection>
              <S.ContainerField>
                <S.FieldTitle>Tipo de Audiência: *</S.FieldTitle>
                {!loadingAudiencesList ? (
                  <Controller
                    name="idTipoAudiencia"
                    control={control}
                    render={({ field }) => (
                      <S.CustomSelect
                        placeholder="Selecione um tipo de audiência"
                        {...field}
                        options={audiencesList}
                      />
                    )}
                  />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>
            </S.ContentSection>

            <S.FieldDateContainer>
              <S.DateContainer>
                <S.DateContent error={errors.dtAudiencia?.message}>
                  <S.DateDescription>Data da Audiência: *</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Início"
                    min={defaultDate}
                    {...register("dtAudiencia", {
                      required: "Data de audiência é obrigatória.",
                    })}
                  />
                </S.DateContent>

                <S.DateContent error={errors.hrAudiencia?.message}>
                  <S.DateDescription>Hora da Audiência: *</S.DateDescription>
                  <S.DateInput
                    type="time"
                    placeholder="Fim"
                    {...register("hrAudiencia", {
                      required: "Data de audiência é obrigatória.",
                    })}
                  />
                </S.DateContent>
              </S.DateContainer>
            </S.FieldDateContainer>
            <S.ErrorMessage>{errors.dtAudiencia?.message}</S.ErrorMessage>
            <S.ErrorMessage>{errors.hrAudiencia?.message}</S.ErrorMessage>

            <S.ContainerField style={{ marginTop: "1rem" }}>
              <S.FieldTitle>
                Virtual:
                <S.BooleanInput type="checkbox" {...register("isVirtual")} />
              </S.FieldTitle>
              {watchCheckbox && (
                <>
                  <S.TextInput
                    type="text"
                    placeholder="ex: https://meet.google.com/"
                    {...register("txlink")}
                  />
                  <S.ErrorMessage>{errors.txlink?.message}</S.ErrorMessage>
                </>
              )}
            </S.ContainerField>

            <S.ContainerSubmitButton>
              <S.SubmitButton disabled={!isValid}>Salvar</S.SubmitButton>
              {postNewAudience.isLoading && <S.LoadingSpinner />}
            </S.ContainerSubmitButton>
          </S.Form>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

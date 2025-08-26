import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { postAudience } from "../../../../../../../../../api/services/audiencies/audiences";
import { BaseModalV2 } from "../../../../../../../../../components/BaseModalV2";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { useAudiences } from "../../../../../../../../../hooks/useAudiences";
import {
  RegistrarAudienciaProps,
  SubmitRegistrarAudiencia,
} from "./registrar-audiencia.interface";
import * as S from "./styled";

export const RegistrarAudiencia = ({
  idAto,
  txNumeroProcesso,
  keyStateOpenModal,
  setKeyStateOpenModal,
  keyString,
}: RegistrarAudienciaProps) => {
  const queryClient = useQueryClient();
  const { user, selectedUser } = SharedState();
  const defaultDate = new Date().toISOString().substring(0, 10);
  const { audiencesList, loadingAudiencesList } = useAudiences();

  const { mutate: mutatePostAudience, isLoading: isLoadingPostAudience } =
    useMutation(postAudience, {
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
        // ainda não existe um chave para invalidar o cache das audiências da agenda semanal, avaliar isso
        setKeyStateOpenModal(false);
        //solucao provisoria para atualizar o numero de audiencias no card da agenda
        //mudar quando for colocar em prod
        window.location.href = `/dashboard/gerenciamento/procurador`;
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
    formState: { isValid, errors },
    setValue,
    setError,
    watch,
  } = useForm<SubmitRegistrarAudiencia>({
    mode: "onChange",
  });

  const watchCheckbox = watch("isVirtual", false);

  const onSubmit: SubmitHandler<SubmitRegistrarAudiencia> = async (params) => {
    if (params.isVirtual && params.txlink.length === 0) {
      setError("txlink", {
        message: "Link da reunião é obrigatório.",
      });
      return;
    }
    mutatePostAudience({
      idAto: idAto,
      dtAudiencia: params.dtAudiencia,
      idTipoAudiencia: params.idTipoAudiencia.value,
      isVirtual: params.isVirtual,
      txlink: params.txlink,
      hrAudiencia: params.hrAudiencia,
      isPreposto: params.isPreposto,
      idUsuarioCadastro: +user["Jvris.User.Id"],
    });
  };

  return (
    <BaseModalV2
      title="Registrar audiência"
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
          <S.SectionTitle>Tipo da audiência</S.SectionTitle>

          <Controller
            name="idTipoAudiencia"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <S.CustomSelect
                placeholder="Selecione um tipo de audiência"
                isLoading={loadingAudiencesList}
                options={audiencesList}
                {...field}
              />
            )}
          />
        </S.Section>

        <S.Section style={{ flexDirection: "row" }}>
          <S.DateContent error={errors.dtAudiencia?.message}>
            <S.SectionTitle>Data da audiência</S.SectionTitle>
            <S.DateInput
              type="date"
              placeholder="Início"
              min={defaultDate}
              defaultValue={defaultDate}
              {...register("dtAudiencia", {
                required: "Data da audiência é obrigatória.",
              })}
            />
          </S.DateContent>

          <S.DateContent error={errors.hrAudiencia?.message}>
            <S.SectionTitle>Hora da audiência</S.SectionTitle>
            <S.DateInput
              type="time"
              placeholder="Início"
              min={defaultDate}
              {...register("hrAudiencia", {
                required: "Hora da audiência é obrigatória.",
              })}
            />
          </S.DateContent>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            Virtual:{" "}
            <S.BooleanInput type="checkbox" {...register("isVirtual")} />
          </S.SectionTitle>

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
        </S.Section>

        <S.ButtonContainer>
          <S.ConfirmButton
            type="submit"
            disabled={isLoadingPostAudience || !isValid}
          >
            Salvar
          </S.ConfirmButton>

          {isLoadingPostAudience && <S.LoadingSpinner />}
        </S.ButtonContainer>
      </S.Form>
    </BaseModalV2>
  );
};

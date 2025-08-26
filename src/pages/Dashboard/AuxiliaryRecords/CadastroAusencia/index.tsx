import { ChangeEvent } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postAbsenceAdapt } from "../../../../api/services/absences/absences";
import { PageTitle } from "../../../../components/TitlePage";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useListTypesOfAbsences } from "../../../../hooks/useListTypesOfAbsences.interface";
import { getBase64 } from "../../../../utils/getBase64.util";
import { SubmitAbsence } from "./interfaces/submit-absence.interface";
import { toast } from "react-hot-toast";
import * as S from "./styled";
import { useNavigate } from "react-router-dom";
import { SharedState } from "../../../../context/SharedContext";

const CadastroAusencias = () => {
  const { user } = SharedState();
  const navigate = useNavigate();
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { typesOfAbsences, isLoadingTypesOfAbsences } =
    useListTypesOfAbsences();
  const defaultDate = new Date().toISOString().substring(0, 10);

  const postAbsenceAdaptMutation = useMutation(postAbsenceAdapt, {
    onSuccess: (data) => {
      toast("Ausência cadastrada!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
      navigate("/dashboard/cadastros-auxiliares/ausencias");
    },
    onError: (error) => {
      toast.error("Error ao cadastrar ausência!", {
        icon: "😥",
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
    register,
    formState: { isValid, errors },
    handleSubmit,
    watch,
    setValue,
    control,
  } = useForm<SubmitAbsence>({
    mode: "onChange",
  });

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (files: FileList) => void
  ) => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].size <= 15 * 1024 * 1024
    ) {
      onChange(e.target.files);
      setValue("anexo", e.target.files);
      return;
    } else if (e.target.files && e.target.files.length > 0) {
      alert(
        "O arquivo é muito grande! Por favor, selecione um arquivo de até 15MB."
      );
      e.target.value = "";
      setValue("anexo", null);
      return;
    } else {
      setValue("anexo", null);
      return;
    }
  };

  const onSubmit: SubmitHandler<SubmitAbsence> = async (data) => {
    let file_stream_attachment: any;
    let file_name: any;
    if (data.anexo) {
      for (let file of data.anexo) {
        file_stream_attachment = await getBase64(file);
        file_name = file.name;
      }
    }

    postAbsenceAdaptMutation.mutate({
      dtDefeso: data.dtDefeso,
      dtFim: data.dtFim,
      dtInicio: data.dtInicio,
      file_stream: file_stream_attachment,
      file_name,
      idProcurador: data.idProcurador.value,
      idTipoAusencia: data.idTipoAusencia.value,
      txObservacao: data.txObservacao,
      idUsuarioCadastro: user["Jvris.User.Id"],
    });
  };

  return (
    <>
      <PageTitle
        pageTitle="CADASTRO DE AUSÊNCIAS"
        pageIcon={<S.PageIcon />}
        button={
          <S.RedirectPage to="/dashboard/cadastros-auxiliares/ausencias">
            <S.RedirectPageIcon />
          </S.RedirectPage>
        }
      />
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Informações Cadastrais da Ausência</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Procurador</S.FieldTitle>
              <S.FieldContainer>
                <Controller
                  name="idProcurador"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      isLoading={loadingAttorneysList}
                      placeholder="Selecione o(a) procurador(a)"
                      {...field}
                      options={attorneysList}
                    />
                  )}
                />
              </S.FieldContainer>
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Tipo Ausência</S.FieldTitle>
              <S.FieldContainer>
                <Controller
                  name="idTipoAusencia"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      isLoading={isLoadingTypesOfAbsences}
                      placeholder="Selecione o tipo de ausência"
                      {...field}
                      options={typesOfAbsences}
                    />
                  )}
                />
              </S.FieldContainer>
            </S.ContainerField>
            <S.ContainerField></S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Data Defeso</S.FieldTitle>

              <S.DateContent error={errors.dtDefeso?.message}>
                <S.DateInput
                  type="date"
                  required={true}
                  defaultValue={defaultDate}
                  {...register("dtDefeso", {
                    required: "Data de defeso é obrigatória.",
                  })}
                />
              </S.DateContent>
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Data Início</S.FieldTitle>

              <S.DateContent error={errors.dtInicio?.message}>
                <S.DateInput
                  type="date"
                  required={true}
                  defaultValue={defaultDate}
                  {...register("dtInicio", {
                    required: "Data de início é obrigatória.",
                  })}
                />
              </S.DateContent>
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Data Fim</S.FieldTitle>

              <S.DateContent error={errors.dtFim?.message}>
                <S.DateInput
                  type="date"
                  required={true}
                  {...register("dtFim", {
                    required: "Data de fim é obrigatória.",
                  })}
                />
              </S.DateContent>
            </S.ContainerField>
          </S.ContentSection>
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Anexo da Ausência</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Anexar Arquivo</S.FieldTitle>
              <S.FieldContainer>
                <Controller
                  name="anexo"
                  control={control}
                  defaultValue={null}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, ...field } }) => (
                    <S.FileInput
                      required={true}
                      {...field}
                      type="file"
                      accept=".pdf, .xlsx, .xls"
                      onChange={(e) => handleFileChange(e, onChange)}
                    />
                  )}
                />
              </S.FieldContainer>
              <S.WarningFileSize>
                Escolha um arquivo de até 15MB
              </S.WarningFileSize>
            </S.ContainerField>
          </S.ContentSection>
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Obsevação da Ausência</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
            <S.ContainerFieldTextArea>
              <S.FieldTitle>
                Informações Complementares:
                <S.LettersCounter>
                  {(watch("txObservacao") || "").length} / 2000
                </S.LettersCounter>
              </S.FieldTitle>

              <S.TextAreaInput
                minLength={2}
                maxLength={2000}
                required={true}
                placeholder="Digite aqui uma observação de no máximo 2000 caracteres."
                {...register("txObservacao", {
                  maxLength: 2000,
                  minLength: 2,
                  required: true,
                })}
              />
            </S.ContainerFieldTextArea>
          </S.ContentSection>
        </S.Section>

        <S.SaveButtonContainer>
          <S.SaveButton disabled={!isValid} type="submit">
            Salvar
          </S.SaveButton>
          {postAbsenceAdaptMutation.isLoading && <S.LoadingSpinnerSave />}
        </S.SaveButtonContainer>
      </S.FormContainer>
    </>
  );
};

export default CadastroAusencias;

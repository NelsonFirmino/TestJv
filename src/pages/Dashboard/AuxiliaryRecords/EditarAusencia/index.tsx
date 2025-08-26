import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
  postAbsenceAttachment,
  postAbsenceObservation,
  putAbsence,
} from "../../../../api/services/absences/absences";
import { PageTitle } from "../../../../components/TitlePage";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useListTypesOfAbsences } from "../../../../hooks/useListTypesOfAbsences.interface";
import { getBase64 } from "../../../../utils/getBase64.util";
import {
  SubmitAbsence,
  SubmitAttachment,
  SubmitObservation,
} from "./interfaces/submit-absence.interface";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAbsense } from "../../../../hooks/useAbsence";
import { useAttachmentAbsense } from "../../../../hooks/useAttachmentAbsence";
import { useObservationsAbsense } from "../../../../hooks/useObservationsAbsence";
import { openOctetStreamInNewTab } from "../../../../utils/openOctetStreamInNewTab.util";
import { formatToBrazilianDate } from "../../../../utils/formatToBrazilianDate.util";
import * as S from "./styled";
import { ModalConfirmRemoveAttachment } from "./components/ModalRemoveAttachment";
import { SharedState } from "../../../../context/SharedContext";

const EditarAusencia = () => {
  const { user } = SharedState();
  const queryClient = useQueryClient();
  const { Id } = useParams();
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { absense, isLoadingAbsense } = useAbsense(Id);
  const { attachmentAbsence, isLoadingAttachmentAbsence } =
    useAttachmentAbsense(Id);
  const { absenseObservation, isLoadingAbsenseObservation } =
    useObservationsAbsense(Id);
  const { typesOfAbsences, isLoadingTypesOfAbsences } =
    useListTypesOfAbsences();
  const [
    showModalConfirmRemoveAttachment,
    setShowModalConfirmRemoveAttachment,
  ] = useState<{
    open?: boolean;
    absenseAttachmentId: number;
  }>({
    open: false,
    absenseAttachmentId: 0,
  });

  const postAbsenceAttachmentMutation = useMutation(postAbsenceAttachment, {
    onSuccess: (data) => {
      setValueAttachment("anexo", {});
      toast("Anexo cadastrado!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
      queryClient.invalidateQueries(`absenseAttachment-${Id}`);
    },
    onError: (error) => {
      toast.error("Error ao cadastrar anexo", {
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

  const putAbsenseMutation = useMutation(putAbsence, {
    onSuccess: (data) => {
      toast("Ausência atualizada!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
      queryClient.invalidateQueries(`absense-${Id}`);
    },
    onError: (error) => {
      toast.error("Error ao atualizar ausência!", {
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

  const postAbsenceObservationMutation = useMutation(postAbsenceObservation, {
    onSuccess: (data) => {
      setValueObservation("txObservacao", "");
      toast("Obsevação cadastrada!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
      queryClient.invalidateQueries(`absenseObservation-${Id}`);
    },
    onError: (error) => {
      toast.error("Error ao cadastrar observação", {
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
    formState: { isValid: isValidAttachment },
    handleSubmit: handleSubmitAttachment,
    setValue: setValueAttachment,
    control: controlAttachment,
  } = useForm<SubmitAttachment>({
    mode: "onChange",
  });

  const {
    register: registerObservation,
    formState: { isValid: isValidObservation },
    handleSubmit: handleSubmitObservation,
    watch,
    setValue: setValueObservation,
    control: controlObservation,
  } = useForm<SubmitObservation>({
    mode: "onChange",
  });

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    setValue,
    control,
  } = useForm<SubmitAbsence>({
    mode: "onChange",
  });

  useEffect(() => {
    if (
      !isLoadingAbsense &&
      absense &&
      absense.data &&
      !loadingAttorneysList &&
      !isLoadingTypesOfAbsences
    ) {
      const selectedAttorney = attorneysList.find(
        (item) => item.value === absense.data.idProcurador
      );
      const selectedTypeOfAbsence = typesOfAbsences.find(
        (item) => item.value === absense.data.idTipoAusencia
      );
      if (selectedAttorney) {
        setValue("idProcurador", {
          label: selectedAttorney.label,
          value: selectedAttorney.value.toString(),
        });
      }
      if (selectedTypeOfAbsence) {
        setValue("idTipoAusencia", {
          label: selectedTypeOfAbsence.label,
          value: selectedTypeOfAbsence.value.toString(),
        });
      }
      setValue("dtDefeso", absense.data.dtDefeso);
      setValue("dtInicio", absense.data.dtInicio);
      setValue("dtFim", absense.data.dtFim);
    }
  }, [isLoadingAbsense, isLoadingTypesOfAbsences, loadingAttorneysList]);

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
      setValueAttachment("anexo", e.target.files);
      return;
    } else if (e.target.files && e.target.files.length > 0) {
      alert(
        "O arquivo é muito grande! Por favor, selecione um arquivo de até 15MB."
      );
      e.target.value = "";
      setValueAttachment("anexo", null);
      return;
    } else {
      setValueAttachment("anexo", null);
      return;
    }
  };

  const onSubmit: SubmitHandler<SubmitAbsence> = async (data) => {
    putAbsenseMutation.mutate({
      id: Id,
      dtDefeso: data.dtDefeso,
      dtFim: data.dtFim,
      dtInicio: data.dtInicio,
      idProcurador: data.idProcurador.value,
      idTipoAusencia: data.idTipoAusencia.value,
      idUsuarioCadastro: user["Jvris.User.Id"],
    });
  };

  const onSubmitObservation: SubmitHandler<SubmitObservation> = async (
    data
  ) => {
    postAbsenceObservationMutation.mutate({
      idAusencia: +Id,
      txObservacao: data.txObservacao,
      idUsuarioCadastro: user["Jvris.User.Id"],
    });
  };

  const onSubmitAttachment: SubmitHandler<SubmitAttachment> = async (data) => {
    let file_stream_attachment: any;
    let file_name: any;
    if (data.anexo) {
      for (let file of data.anexo) {
        file_stream_attachment = await getBase64(file);
        file_name = file.name;
      }
    }

    postAbsenceAttachmentMutation.mutate({
      file_stream: file_stream_attachment,
      file_name,
      idAusencia: +Id,
      idUsuarioCadastro: user["Jvris.User.Id"],
    });
  };

  return (
    <>
      {showModalConfirmRemoveAttachment.open && (
        <ModalConfirmRemoveAttachment
          setShowModalConfirmRemoveAttachment={
            setShowModalConfirmRemoveAttachment
          }
          showModalConfirmRemoveAttachment={showModalConfirmRemoveAttachment}
          absenseId={+Id}
        />
      )}
      <PageTitle
        pageTitle="EDITAR AUSÊNCIA"
        pageIcon={<S.PageIcon />}
        button={
          <S.RedirectPage to="/dashboard/cadastros-auxiliares/ausencias">
            <S.RedirectPageIcon />
          </S.RedirectPage>
        }
      />
      <S.Section>
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
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
          <S.SaveButtonContainer>
            <S.SaveButton disabled={!isValid} type="submit">
              Editar ausência
            </S.SaveButton>
          </S.SaveButtonContainer>
        </S.FormContainer>
      </S.Section>

      <S.Section>
        <S.FormContainer onSubmit={handleSubmitAttachment(onSubmitAttachment)}>
          <S.TitleSectionContainer>
            <S.TitleSection>Adicionar novo anexo</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Anexar Arquivo</S.FieldTitle>
              <S.FieldContainer>
                <Controller
                  name="anexo"
                  control={controlAttachment}
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
          <S.SaveButtonContainer>
            <S.SaveButton disabled={!isValidAttachment} type="submit">
              Adicionar anexo
            </S.SaveButton>
          </S.SaveButtonContainer>
        </S.FormContainer>
      </S.Section>

      <S.Section>
        <S.FormContainer
          onSubmit={handleSubmitObservation(onSubmitObservation)}
        >
          <S.TitleSectionContainer>
            <S.TitleSection>Adicionar nova observação</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
            <S.ContainerFieldTextArea>
              <S.FieldTitle>
                Observação:
                <S.LettersCounter>
                  {(watch("txObservacao") || "").length} / 2000
                </S.LettersCounter>
              </S.FieldTitle>

              <S.TextAreaInput
                minLength={2}
                maxLength={2000}
                required={true}
                placeholder="Digite aqui uma observação de no máximo 2000 caracteres."
                {...registerObservation("txObservacao", {
                  maxLength: 2000,
                  minLength: 2,
                  required: true,
                })}
              />
            </S.ContainerFieldTextArea>
          </S.ContentSection>

          <S.SaveButtonContainer>
            <S.SaveButton disabled={!isValidObservation} type="submit">
              Adicionar observação
            </S.SaveButton>
          </S.SaveButtonContainer>
        </S.FormContainer>
      </S.Section>

      <S.Section>
        <S.TitleSectionContainer>
          <S.TitleSection>Anexos da Ausência</S.TitleSection>
        </S.TitleSectionContainer>

        {!isLoadingAttachmentAbsence ? (
          <S.ContainerTable>
            <S.Table>
              <S.Thead>
                <S.RowTable>
                  <S.Th>Descrição</S.Th>
                  <S.Th>Data</S.Th>
                  <S.ButtonTh>Visualizar / Remover</S.ButtonTh>
                </S.RowTable>
              </S.Thead>
              <S.TBody>
                {attachmentAbsence?.data?.length > 0 ? (
                  attachmentAbsence.data.map((aa) => (
                    <S.RowTableObservation key={aa.id}>
                      <td style={{ fontWeight: "bold" }}>{aa.txDescricao}</td>
                      <td>
                        {formatToBrazilianDate(aa.dtCadastro) +
                          " " +
                          aa.hrCadastro}
                      </td>

                      <S.ButtonTD>
                        <S.DownloadAttachmentButtonTable
                          onClick={() =>
                            openOctetStreamInNewTab(aa.file_stream, aa.name)
                          }
                        >
                          <S.DownloadAttachmentIcon />
                        </S.DownloadAttachmentButtonTable>
                        <S.RemoveButtonTable
                          onClick={() =>
                            setShowModalConfirmRemoveAttachment({
                              open: true,
                              absenseAttachmentId: aa.id,
                            })
                          }
                        >
                          <S.RemoveIcon alt="Remover anexo" />
                        </S.RemoveButtonTable>
                      </S.ButtonTD>
                    </S.RowTableObservation>
                  ))
                ) : (
                  <S.RowMessage colSpan={3}>
                    Nenhum arquivo anexado
                  </S.RowMessage>
                )}
              </S.TBody>
            </S.Table>
          </S.ContainerTable>
        ) : (
          <S.LoadingSpinner />
        )}
      </S.Section>

      <S.Section>
        <S.TitleSectionContainer>
          <S.TitleSection>Observações da Ausência</S.TitleSection>
        </S.TitleSectionContainer>

        {!isLoadingAbsenseObservation ? (
          <S.ContainerTable>
            <S.Table>
              <S.Thead>
                <S.RowTable>
                  <S.Th>Observação</S.Th>
                  <S.Th>Data</S.Th>
                  <S.ButtonTh>Hora</S.ButtonTh>
                </S.RowTable>
              </S.Thead>
              <S.TBody>
                {absenseObservation?.data?.length > 0 ? (
                  absenseObservation.data.map((oa) => (
                    <S.RowTableObservation key={oa.id}>
                      <td style={{ fontWeight: "bold" }}>{oa.txObservacao}</td>
                      <td>{formatToBrazilianDate(oa.dtCadastro)}</td>
                      <td>{oa.hrCadastro}</td>
                    </S.RowTableObservation>
                  ))
                ) : (
                  <S.RowMessage colSpan={3}>
                    Nenhum arquivo anexado
                  </S.RowMessage>
                )}
              </S.TBody>
            </S.Table>
          </S.ContainerTable>
        ) : (
          <S.LoadingSpinner />
        )}
      </S.Section>
    </>
  );
};

export default EditarAusencia;

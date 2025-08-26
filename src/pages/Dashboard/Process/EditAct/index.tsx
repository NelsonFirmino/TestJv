import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getOrgaosJulgadoresTribunalInstancia } from "../../../../api/services/OrgaosJulgadores/orgaojulgador";
import { putAct } from "../../../../api/services/acts/acts";
import { GetProcessByTxNumero } from "../../../../api/services/process/process";
import { BaseModal } from "../../../../components/BaseModal";
import {
  HotToastError,
  HotToastSucess,
} from "../../../../components/HotToastFuncs";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { useAct } from "../../../../hooks/useAct";
import { useActAttachments } from "../../../../hooks/useActAttachments";
import { useActAudience } from "../../../../hooks/useActAudience";
import { useActObservations } from "../../../../hooks/useActObservations";
import { useProcessClass } from "../../../../hooks/useProcessClass";
import { useProcessSecretaries } from "../../../../hooks/useProcessSecretaries";
import { useSecretaries } from "../../../../hooks/useSecretaries";
import { useTribunais } from "../../../../hooks/useTribunais";
import { formatToBrazilianDate } from "../../../../utils/formatToBrazilianDate.util";
import { openOctetStreamInNewTab } from "../../../../utils/openOctetStreamInNewTab.util";
import { ModalAddObservation } from "./components/ModalAddObservation";
import { ModalRegisterAudience } from "./components/ModalRegisterAudienceModal";
import { ModalConfirmRemoveAttachment } from "./components/ModalRemoveAttachment";
import { ModalRemoveAudience } from "./components/ModalRemoveAudience";
import { ModalConfirmRemoveObservation } from "./components/ModalRemoveObservation";
import { SubmitEditAct } from "./interfaces/submit-edit-act.interface";
import * as S from "./styled";

const EditAct = () => {
  const { user } = SharedState();
  const queryClient = useQueryClient();
  const { actId } = useParams();
  const { isLoadingAct, act } = useAct(actId);
  const { isLoadingProcessSecretaries, processSecretaries } =
    useProcessSecretaries();
  const { isLoadingProcessClass, processClass } = useProcessClass();
  const { tribunais, isLoadingTribunais } = useTribunais();
  const [isUrgente, setIsUrgente] = useState(false);
  const { secretariesList, loadingSecretariesist } = useSecretaries();
  const { actAttachments, isLoadingActAttachments } = useActAttachments(actId);
  const { actObservations, isLoadingActObservations } =
    useActObservations(actId);
  const { actAudience, isLoadingActAudience } = useActAudience(actId);
  const [existingProcess, setExistingProcess] = useState(true);
  const [showModalAddObservation, setShowModalAddObservation] = useState<{
    open: boolean;
    idAto: string;
  }>({
    open: false,
    idAto: "0",
  });
  const [showModalRegisterAudience, setShowModalRegisterAudience] = useState<{
    open: boolean;
    idAto: string;
  }>({
    open: false,
    idAto: "0",
  });
  const [showModalRemoveAudience, setShowModalRemoveAudience] = useState<{
    open: boolean;
    idAto: string;
    idAudiencia: number;
  }>({
    open: false,
    idAto: "0",
    idAudiencia: 0,
  });
  const [
    showModalConfirmRemoveAttachment,
    setShowModalConfirmRemoveAttachment,
  ] = useState<{
    open?: boolean;
    actAttachmentId: number;
  }>({
    open: false,
    actAttachmentId: 0,
  });
  const [
    showModalConfirmRemoveObservation,
    setShowModalConfirmRemoveObservation,
  ] = useState<{
    open?: boolean;
    actObservationId: number;
  }>({
    open: false,
    actObservationId: 0,
  });

  useEffect(() => {
    if (act?.data?.isUrgente) {
      setIsUrgente(act.data.isUrgente);
    }
  }, [act]);

  const putActMutation = useMutation(putAct, {
    onSuccess: (data) => {
      HotToastSucess("Ato atualizado!");

      queryClient.invalidateQueries(`act-${actId}`);
    },
    onError: (error) => {
      HotToastError(`Erro ao atualizar ato! - ${error}`);
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    watch,
    control,
  } = useForm<SubmitEditAct>({
    mode: "onChange",
  });

  const {
    data: orgaosJulgadoresTribunalInstancia,
    isLoading: isLoadingOrgaosJulgadoresTribunalInstancia,
  } = useQuery(
    [
      `orgaosJulgadoresTribunalInstancia-${actId}`,
      act?.data?.idTribunal,
      act?.data?.nuInstancia,
    ],
    () =>
      getOrgaosJulgadoresTribunalInstancia({
        idTribunal: act.data.idTribunal.toString(),
        nuInstancia: act.data.nuInstancia.toString(),
      }),
    {
      enabled: !!act?.data?.idTribunal && !!act?.data?.nuInstancia, // só executa a query se ambos estiverem definidos
    }
  );

  const getProcessByTxNumeroFormatado = async (txNumeroFormatado: string) => {
    const process = await GetProcessByTxNumero(txNumeroFormatado);
    if (process.status === "NotFound") {
      setExistingProcess(false);
    }
  };

  useEffect(() => {
    if (!isLoadingAct && act?.data !== undefined && act?.data !== null) {
      getProcessByTxNumeroFormatado(act.data.txNumeroFormatado);
    }
  }, [isLoadingAct, act]);

  const formattedOrgaosJulgadores =
    orgaosJulgadoresTribunalInstancia?.data?.map((orgao) => ({
      label: orgao.txOrgaoJulgador,
      value: orgao.id,
    })) || [];

  useEffect(() => {
    if (!loadingSecretariesist && !isLoadingAct) {
      const secretaria = secretariesList?.find(
        (s) => s.value === act?.data.idSecretaria
      );

      if (secretaria) {
        setValue("idSecretaria", {
          label: secretaria.label,
          value: secretaria.value.toString(),
        });
      }
    }
  }, [loadingSecretariesist, isLoadingAct]);

  useEffect(() => {
    if (!isLoadingProcessClass && !isLoadingAct) {
      const classe = processClass?.find((c) => c.value === act?.data.idClasse);

      if (classe) {
        setValue("idClasse", {
          label: classe.label,
          value: classe.value.toString(),
        });
      }
    }
  }, [isLoadingProcessClass, isLoadingAct]);

  useEffect(() => {
    if (!isLoadingOrgaosJulgadoresTribunalInstancia && !isLoadingAct) {
      const orgao = formattedOrgaosJulgadores?.find(
        (o) => o.value === act?.data.idOrgaoJulgador
      );

      if (orgao) {
        setValue("idOrgaoJulgador", {
          label: orgao.label,
          value: orgao.value.toString(),
        });
      }
    }
  }, [isLoadingOrgaosJulgadoresTribunalInstancia, isLoadingAct]);

  const onSubmit: SubmitHandler<SubmitEditAct> = async (data) => {
    putActMutation.mutate({
      dtCiencia: data.dtCiencia,
      dtPrazo: data.dtPrazo,
      id: act.data.id,
      idClasse: +data.idClasse.value,
      idOrgaoJulgador: +data.idOrgaoJulgador.value,
      idSecretaria: +data.idSecretaria.value,
      isUrgente: data.isUrgente,
      nuCodigoAviso: +data.nuCodigoAviso,
      dtCadastro: data.dtCadastro,
      idProcesso: act.data?.idProcesso?.toString(),
      idSistemaProcessual: act.data.idSistemaProcessual,
      idTribunal: act.data.idTribunal,
      nuInstancia: act.data.nuInstancia,
      txNumeroFormatado: act.data.txNumeroFormatado,
      idUsuarioCadastro: user["Jvris.User.Id"],
    });
  };

  return (
    <>
      <PageTitle
        pageTitle="EDIÇÃO DE CADASTRO DE ATO"
        pageIcon={<S.PageIcon />}
        button={
          <S.RedirectPage to="/dashboard/gerenciamento/operador">
            <S.RedirectPageIcon />
          </S.RedirectPage>
        }
      />

      {!isLoadingAct && act?.status === "NotFound" ? (
        <S.Section>
          <S.NotFound>Nenhum ato encontrado</S.NotFound>
        </S.Section>
      ) : (
        <>
          <BaseModal
            title={
              showModalConfirmRemoveAttachment.open
                ? "Remover Anexo"
                : showModalRegisterAudience.open
                ? "Registrar Audiência"
                : showModalAddObservation.open
                ? "Adicionar Observação"
                : showModalConfirmRemoveObservation.open
                ? "Remover Observação"
                : showModalRemoveAudience.open
                ? "Remover Audiência"
                : ""
            }
            setOpenModal={(isOpen) => {
              setShowModalConfirmRemoveAttachment((prev) => ({
                ...prev,
                open: isOpen,
              }));
              setShowModalRegisterAudience((prev) => ({
                ...prev,
                open: isOpen,
              }));
              setShowModalAddObservation((prev) => ({
                ...prev,
                open: isOpen,
              }));
              setShowModalConfirmRemoveObservation((prev) => ({
                ...prev,
                open: isOpen,
              }));
              setShowModalRemoveAudience((prev) => ({
                ...prev,
                open: isOpen,
              }));
            }}
            isOpenModal={
              showModalConfirmRemoveAttachment.open ||
              showModalRegisterAudience.open ||
              showModalAddObservation.open ||
              showModalConfirmRemoveObservation.open ||
              showModalRemoveAudience.open
            }
          >
            {showModalConfirmRemoveAttachment.open && (
              <ModalConfirmRemoveAttachment
                actId={+actId}
                setShowModalConfirmRemoveAttachment={
                  setShowModalConfirmRemoveAttachment
                }
                showModalConfirmRemoveAttachment={
                  showModalConfirmRemoveAttachment
                }
              />
            )}
            {showModalRegisterAudience.open && (
              <ModalRegisterAudience
                showModalRegisterAudience={showModalRegisterAudience}
                setShowModalRegisterAudience={setShowModalRegisterAudience}
              />
            )}

            {showModalAddObservation.open && (
              <ModalAddObservation
                showModalAddObservation={showModalAddObservation}
                setShowModalAddObservation={setShowModalAddObservation}
              />
            )}

            {showModalConfirmRemoveObservation.open && (
              <ModalConfirmRemoveObservation
                actId={+actId}
                setShowModalConfirmRemoveObservation={
                  setShowModalConfirmRemoveObservation
                }
                showModalConfirmRemoveObservation={
                  showModalConfirmRemoveObservation
                }
              />
            )}

            {showModalRemoveAudience.open && (
              <ModalRemoveAudience
                showModalRemoveAudience={showModalRemoveAudience}
                setShowModalRemoveAudience={setShowModalRemoveAudience}
              />
            )}
          </BaseModal>

          <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
            <S.Section>
              <S.TitleSectionContainer>
                <S.TitleSection>
                  Informações Cadastrais do Processo
                </S.TitleSection>
              </S.TitleSectionContainer>
              <S.ContentSection>
                <S.ContainerField>
                  <S.FieldTitle>Sistema Processual</S.FieldTitle>
                  {!isLoadingAct && !isLoadingProcessSecretaries ? (
                    <S.TextInput
                      type="text"
                      placeholder="Número do processo"
                      disabled={true}
                      defaultValue={
                        processSecretaries?.data.find(
                          (ps) =>
                            ps.id === act?.data.idSistemaProcessual &&
                            ps.txSistemaProcessual
                        )?.txSistemaProcessual
                      }
                    />
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>

                <S.ContainerField>
                  <S.FieldTitle>Número do Processo</S.FieldTitle>
                  {!isLoadingAct ? (
                    <S.TextInput
                      type="text"
                      placeholder="Número do processo"
                      disabled={true}
                      defaultValue={act.data.txNumeroFormatado}
                    />
                  ) : (
                    <S.LoadingSpinner />
                  )}
                  {!existingProcess && (
                    <S.RegisterProcessLink
                      to={`/dashboard/cadastro-processos/${act?.data?.id}`}
                    >
                      Cadastrar Processo
                    </S.RegisterProcessLink>
                  )}
                </S.ContainerField>

                <S.ContainerField>
                  <S.FieldTitle>Código de Aviso</S.FieldTitle>
                  {!isLoadingAct ? (
                    <S.TextInput
                      type="text"
                      placeholder="Número do processo"
                      defaultValue={act.data.nuCodigoAviso}
                      {...register("nuCodigoAviso")}
                    />
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>
              </S.ContentSection>

              <S.ContentSection>
                <S.ContainerField>
                  <S.FieldTitle>Classe Processual</S.FieldTitle>
                  {!isLoadingProcessClass ? (
                    <Controller
                      name="idClasse"
                      control={control}
                      render={({ field }) => (
                        <S.CustomSelect
                          placeholder="Selecione o sistema processual"
                          {...field}
                          options={processClass}
                        />
                      )}
                    />
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>

                <S.ContainerField>
                  <S.FieldTitle>Secretaria</S.FieldTitle>
                  {!loadingSecretariesist && !isLoadingAct ? (
                    <Controller
                      name="idSecretaria"
                      control={control}
                      render={({ field }) => (
                        <S.CustomSelect
                          placeholder="Selecione a secretaria"
                          {...field}
                          options={secretariesList}
                        />
                      )}
                    />
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>

                <S.ContainerField></S.ContainerField>
              </S.ContentSection>

              <S.ContentSection>
                <S.ContainerField>
                  <S.FieldTitle>Tribunal</S.FieldTitle>
                  {!isLoadingAct ? (
                    <S.TextInput
                      type="text"
                      disabled={true}
                      defaultValue={act?.data.txOrgaojulgador}
                    />
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>

                <S.ContainerField>
                  <S.FieldTitle>Instância</S.FieldTitle>
                  {!isLoadingAct ? (
                    <S.TextInput
                      type="text"
                      disabled={true}
                      defaultValue={act?.data.nuInstancia + "ª Instância"}
                    />
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>

                <S.ContainerField>
                  <S.FieldTitle>Órgão Julgador</S.FieldTitle>
                  {!isLoadingAct &&
                  !isLoadingTribunais &&
                  !isLoadingOrgaosJulgadoresTribunalInstancia ? (
                    <Controller
                      name="idOrgaoJulgador"
                      rules={{ required: true }}
                      control={control}
                      render={({ field }) => (
                        <S.CustomSelect
                          placeholder="Selecione o órgão julgador"
                          {...field}
                          options={formattedOrgaosJulgadores}
                          isLoading={isLoadingOrgaosJulgadoresTribunalInstancia}
                        />
                      )}
                    />
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>
              </S.ContentSection>

              <S.ContentSection>
                <S.ContainerField>
                  <S.FieldTitle>Data da Ciência</S.FieldTitle>
                  {!isLoadingAct ? (
                    <S.DateContent error={errors.dtCiencia?.message}>
                      <S.DateInput
                        type="date"
                        required={true}
                        defaultValue={act.data.dtCiencia}
                        {...register("dtCiencia", {
                          required: "Data de ciência é obrigatória.",
                        })}
                      />
                    </S.DateContent>
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>

                <S.ContainerField>
                  <S.FieldTitle>Data de Prazo</S.FieldTitle>
                  {!isLoadingAct ? (
                    <S.DateContent error={errors.dtPrazo?.message}>
                      <S.DateInput
                        type="date"
                        defaultValue={act.data.dtPrazo}
                        {...register("dtPrazo")}
                      />
                    </S.DateContent>
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>

                <S.ContainerField>
                  <S.FieldTitle>Urgente</S.FieldTitle>
                  {!isLoadingAct ? (
                    <S.ContentRadioButton>
                      <S.RadioButtonContainer>
                        <S.RadioButtonLabel value={isUrgente}>
                          {isUrgente ? "SIM" : "NÃO"}
                        </S.RadioButtonLabel>
                        <S.ToggleButton
                          {...register("isUrgente")}
                          checked={isUrgente}
                          onChange={() => {
                            const newValue = !isUrgente;
                            setIsUrgente(newValue);
                            setValue("isUrgente", newValue);
                          }}
                        />
                      </S.RadioButtonContainer>
                    </S.ContentRadioButton>
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>
              </S.ContentSection>

              <S.ButtonsContainer>
                <S.SaveButton disabled={!isValid} type="submit">
                  Salvar
                </S.SaveButton>
                <S.RegisterActButton to="/dashboard/processo/registro-ato">
                  Cadastrar Novo Ato
                </S.RegisterActButton>
              </S.ButtonsContainer>
            </S.Section>
          </S.FormContainer>

          <S.Section>
            <S.TitleSectionContainer>
              <S.TitleSection>Audiências registradas</S.TitleSection>

              {!isLoadingActAudience ? (
                !(actAudience?.status === "OK") ? (
                  <S.AddAudienceButton
                    onClick={() =>
                      setShowModalRegisterAudience({
                        open: true,
                        idAto: actId,
                      })
                    }
                  >
                    <S.IconAddAudience weight="bold" />
                  </S.AddAudienceButton>
                ) : (
                  ""
                )
              ) : (
                <S.LoadingSpinner />
              )}
            </S.TitleSectionContainer>

            {!isLoadingActAudience ? (
              actAudience.status === "OK" ? (
                <S.ContainerAudience>
                  <S.AudienceTitle>Audiência Marcada: </S.AudienceTitle>
                  Para o dia
                  <S.AudienceDate>
                    {actAudience.data.dtAudiencia} -{" "}
                    {actAudience.data.hrAudiencia}
                  </S.AudienceDate>
                  <S.ContainerRemoveAudience
                    onClick={() =>
                      setShowModalRemoveAudience({
                        open: true,
                        idAto: actId,
                        idAudiencia: actAudience.data.id,
                      })
                    }
                  >
                    <S.RemoveAudienceIcon />
                  </S.ContainerRemoveAudience>
                </S.ContainerAudience>
              ) : (
                ""
              )
            ) : (
              <S.LoadingSpinner />
            )}
          </S.Section>

          <S.Section>
            <S.TitleSectionContainer>
              <S.TitleSection>Anexos do ato</S.TitleSection>
            </S.TitleSectionContainer>

            {!isLoadingActAttachments ? (
              <S.ContainerTable>
                <S.Table>
                  <S.Thead>
                    <S.RowTable>
                      <S.Th>Descrição</S.Th>
                      <S.Th>Data</S.Th>
                      <S.ButtonTh>Visualizar</S.ButtonTh>
                    </S.RowTable>
                  </S.Thead>
                  <S.TBody>
                    {actAttachments?.data?.length > 0 ? (
                      actAttachments.data.map((aa) => (
                        <S.RowTableObservation key={aa.id}>
                          <td
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {aa.txDescricao}
                          </td>
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
                                  actAttachmentId: aa.id,
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
              <S.TitleSection>Observações do ato</S.TitleSection>
              {!isLoadingActAudience ? (
                !(actAudience?.status === "OK") ? (
                  <S.AddAudienceButton
                    onClick={() =>
                      setShowModalAddObservation({
                        open: true,
                        idAto: actId,
                      })
                    }
                  >
                    <S.IconAddAudience weight="bold" />
                  </S.AddAudienceButton>
                ) : (
                  ""
                )
              ) : (
                <S.LoadingSpinner />
              )}
            </S.TitleSectionContainer>

            {!isLoadingActObservations ? (
              <S.ContainerTable>
                <S.Table>
                  <S.Thead>
                    <S.RowTable>
                      <S.Th>Usuário</S.Th>
                      <S.Th>Data</S.Th>
                      <S.Th>Observação</S.Th>
                      <S.ButtonTh>Remover</S.ButtonTh>
                    </S.RowTable>
                  </S.Thead>
                  <S.TBody>
                    {actObservations?.data?.length > 0 ? (
                      actObservations.data.map((ao) => (
                        <S.RowTableObservation key={ao.id}>
                          <td
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {ao.txNomeUsuario}
                          </td>
                          <td>{ao.dtCadastro + " " + ao.hrCadastro}</td>
                          <td>{ao.txObservacao}</td>
                          <S.ButtonTD>
                            <S.RemoveButtonTable
                              onClick={() =>
                                setShowModalConfirmRemoveObservation({
                                  open: true,
                                  actObservationId: ao.id,
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
                        Nenhuma observação encontrada
                      </S.RowMessage>
                    )}
                  </S.TBody>
                </S.Table>
              </S.ContainerTable>
            ) : (
              <S.LoadingSpinner />
            )}
          </S.Section>

          {!isLoadingAct && !act?.data?.idTriagem && act?.data?.idProcesso && (
            <S.Section>
              <S.ButtonTriagem>Triar / Distribuir</S.ButtonTriagem>
            </S.Section>
          )}
        </>
      )}
    </>
  );
};

export default EditAct;

import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { postActAdapt } from "../../../../api/services/acts/acts";
import { getOrgaosJulgadoresTribunalInstancia } from "../../../../api/services/OrgaosJulgadores/orgaojulgador";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { useProcessClass } from "../../../../hooks/useProcessClass";
import { useProcessSecretariesSelect } from "../../../../hooks/useProcessSecretaries";
import { useSecretaries } from "../../../../hooks/useSecretaries";
import { useTribunais } from "../../../../hooks/useTribunais";
import { getBase64 } from "../../../../utils/getBase64.util";
import { SubmitAct } from "./interfaces/submit-act.interface";
import * as S from "./styled";

const RegisterAct = () => {
  const { user } = SharedState();
  const navigate = useNavigate();
  const defaultDate = new Date().toISOString().substring(0, 10);
  const [isUrgente, setIsUrgente] = useState(false);
  const { secretariesList, loadingSecretariesist } = useSecretaries();
  const { isLoadingProcessSecretariesList, processSecretariesList } =
    useProcessSecretariesSelect();
  const { isLoadingProcessClass, processClass } = useProcessClass();
  const { tribunais, isLoadingTribunais } = useTribunais();

  const postActAdaptMutation = useMutation(postActAdapt, {
    onSuccess: ({ data }) => {
      toast("Ato cadastrado!", {
        icon: "✔",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
      navigate(`/dashboard/processo/registro-ato/${data.id}`);
    },
    onError: (error) => {
      toast.error("Erro ao cadastrar ato!", {
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
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    watch,
    control,
  } = useForm<SubmitAct>({
    mode: "onChange",
  });

  const selectedSystem = watch("idSistemaProcessual");
  const selectedTribunal = watch("idTribunal");
  const selectedInstancia = watch("nuInstancia");
  const SISTEMA_PROCESSUAL_PROTOCOLO_NET_ID = 13;
  const SISTEMA_PROCESSUAL_SEI_ID = 7;

  let classeProcessualProcessoADM = {
    label: "Processo Administrativo",
    value: "1298",
  };

  if (
    selectedSystem != null &&
    (+selectedSystem?.value === SISTEMA_PROCESSUAL_PROTOCOLO_NET_ID ||
      +selectedSystem?.value === SISTEMA_PROCESSUAL_SEI_ID)
  ) {
    setValue("idClasse", classeProcessualProcessoADM);
  }

  const {
    data: orgaosJulgadoresTribunalInstancia,
    isLoading: isLoadingOrgaosJulgadoresTribunalInstancia,
  } = useQuery(
    ["orgaosJulgadoresTribunalInstancia", selectedTribunal, selectedInstancia],
    () =>
      getOrgaosJulgadoresTribunalInstancia({
        idTribunal: selectedTribunal.value,
        nuInstancia: selectedInstancia.value,
      }),
    {
      enabled: !!selectedTribunal && !!selectedInstancia, // só executa a query se ambos estiverem definidos
    }
  );

  const formattedOrgaosJulgadores =
    orgaosJulgadoresTribunalInstancia?.data?.map((orgao) => ({
      label: orgao.txOrgaoJulgador,
      value: orgao.id,
    })) || [];

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

  const onSubmit: SubmitHandler<SubmitAct> = async (data) => {
    let file_stream_attachment: any;
    let file_name: any;
    if (data.anexo) {
      for (let file of data.anexo) {
        file_stream_attachment = await getBase64(file);
        file_name = file.name;
      }
    }

    postActAdaptMutation.mutate({
      dtCiencia: data.dtCiencia,
      dtPrazo: data.dtPrazo,
      idClasse: +data.idClasse?.value,
      idOrgaoJulgador: +data?.idOrgaoJulgador?.value,
      idSecretaria: +data.idSecretaria?.value,
      idSistemaProcessual: +data.idSistemaProcessual?.value,
      idTribunal: +data?.idTribunal?.value,
      isUrgente: data.isUrgente,
      nuInstancia: +data?.nuInstancia?.value,
      txNumeroFormatado: data.txNumeroFormatado,
      file_stream: file_stream_attachment,
      file_name,
      txObservacao: data.txObservacao,
      idUsuarioCadastro: user["Jvris.User.Id"],
    });
  };
  const sistemaSelecionado = watch("idSistemaProcessual");

  const handleNumeroProcessoChange = (valorDigitado: string) => {
    if (!sistemaSelecionado) return;

    const idSistema = +sistemaSelecionado?.value;
    const isPje = idSistema === 1;
    const isSei = idSistema === 7;

    if (isPje) {
      let limpo = valorDigitado.replace(/[^\d.-]/g, "");
      const regexCNJ = /^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/;

      if (regexCNJ.test(limpo)) {
        setValue("txNumeroFormatado", limpo);
      } else {
        const numeros = limpo.replace(/\D/g, "").slice(0, 20);
        let formatado = numeros;
        if (numeros.length >= 1) formatado = numeros.slice(0, 7);
        if (numeros.length >= 8) formatado += `-${numeros.slice(7, 9)}`;
        if (numeros.length >= 10) formatado += `.${numeros.slice(9, 13)}`;
        if (numeros.length >= 14) formatado += `.${numeros.slice(13, 14)}`;
        if (numeros.length >= 15) formatado += `.${numeros.slice(14, 16)}`;
        if (numeros.length >= 17) formatado += `.${numeros.slice(16, 20)}`;
        setValue("txNumeroFormatado", formatado);
      }
    } else if (isSei) {
      const numeros = valorDigitado.replace(/\D/g, "").slice(0, 20);
      let formatado = numeros;
      if (numeros.length >= 1) formatado = numeros.slice(0, 8);
      if (numeros.length >= 9) formatado += `.${numeros.slice(8, 14)}`;
      if (numeros.length >= 15) formatado += `/${numeros.slice(14, 18)}`;
      if (numeros.length >= 19) formatado += `-${numeros.slice(18, 20)}`;
      setValue("txNumeroFormatado", formatado);
    } else {
      // Genérico para sistemas com formatos desconhecidos
      const limpo = valorDigitado.replace(/[^\d./-]/g, "");
      setValue("txNumeroFormatado", limpo);
    }
  };

  useEffect(() => {
    setValue("txNumeroFormatado", "");
  }, [watch("idSistemaProcessual")]);

  useEffect(() => {
    setValue("idOrgaoJulgador", null);
  }, [watch("nuInstancia"), watch("idTribunal")]);

  useEffect(() => {
    setValue("nuInstancia", null);
  }, [watch("idTribunal")]);

  useEffect(() => {
    if (!loadingSecretariesist && secretariesList?.length > 0) {
      const secretaria = secretariesList[0];
      setValue("idSecretaria", {
        ...secretaria,
        value: String(secretaria.value),
      });
    }
  }, [loadingSecretariesist, secretariesList, setValue]);

  return (
    <>
      <PageTitle
        pageTitle="CADASTRO DE ATOS"
        pageIcon={<S.PageIcon />}
        button={
          <S.RedirectPage to="/dashboard/gerenciamento/operador">
            <S.RedirectPageIcon />
          </S.RedirectPage>
        }
      />
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Informações Cadastrais do Ato</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Sistema Processual (*)</S.FieldTitle>
              {!isLoadingProcessSecretariesList ? (
                <Controller
                  name="idSistemaProcessual"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Selecione o sistema processual"
                      {...field}
                      required
                      options={processSecretariesList}
                      isClearable={true}
                    />
                  )}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Número do Processo (*)</S.FieldTitle>
              <S.TextInput
                type="text"
                placeholder="Número do processo"
                maxLength={25}
                required
                value={watch("txNumeroFormatado") || ""}
                onChange={(e) => handleNumeroProcessoChange(e.target.value)}
                disabled={!watch("idSistemaProcessual")} // aqui está a mágica
              />
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Código Aviso</S.FieldTitle>
              <S.TextInput
                type="text"
                placeholder="Código aviso"
                maxLength={9}
                max={9}
                {...register("nuCodigoAviso")}
              />
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Classe Processual (*)</S.FieldTitle>
              {!isLoadingProcessClass ? (
                <Controller
                  name="idClasse"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Selecione o sistema processual"
                      {...field}
                      options={processClass}
                      isClearable={true}
                      required
                      isDisabled={
                        selectedSystem !== null &&
                        (+selectedSystem?.value ===
                          SISTEMA_PROCESSUAL_PROTOCOLO_NET_ID ||
                          +selectedSystem?.value === SISTEMA_PROCESSUAL_SEI_ID)
                      }
                    />
                  )}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Secretaria (*)</S.FieldTitle>
              {!loadingSecretariesist ? (
                <Controller
                  name="idSecretaria"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Selecione o sistema processual"
                      {...field}
                      options={secretariesList}
                      isClearable={true}
                    />
                  )}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField></S.ContainerField>
          </S.ContentSection>

          {!isLoadingProcessSecretariesList &&
            selectedSystem != null &&
            +selectedSystem.value !== SISTEMA_PROCESSUAL_PROTOCOLO_NET_ID &&
            +selectedSystem.value !== SISTEMA_PROCESSUAL_SEI_ID && (
              <S.ContentSection>
                <S.ContainerField>
                  <S.FieldTitle>Tribunal (*)</S.FieldTitle>
                  {!isLoadingTribunais ? (
                    <Controller
                      name="idTribunal"
                      rules={{ required: true }}
                      control={control}
                      render={({ field }) => (
                        <S.CustomSelect
                          placeholder="Selecione o tribunal"
                          {...field}
                          options={tribunais}
                          isClearable={true}
                        />
                      )}
                    />
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>

                <S.ContainerField>
                  <S.FieldTitle>Instância (*)</S.FieldTitle>
                  <Controller
                    name="nuInstancia"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <S.CustomSelect
                        placeholder="Selecione o tribunal"
                        {...field}
                        options={[
                          {
                            label: "1ª Instância",
                            value: 1,
                          },
                          {
                            label: "2ª Instância",
                            value: 2,
                          },
                          {
                            label: "Instância Superior",
                            value: 3,
                          },
                        ]}
                        /* onChange={() => {
                          setValue("idOrgaoJulgador", null);
                        }} */
                        isClearable={true}
                      />
                    )}
                  />
                </S.ContainerField>

                <S.ContainerField>
                  <S.FieldTitle>
                    Órgão Julgador (*)
                    <S.InfoContainerField>
                      <S.InfoIcon />
                      <S.InfoText>
                        Selecione tribunal e instância para poder selecionar um
                        órgão julgador.
                      </S.InfoText>
                    </S.InfoContainerField>
                  </S.FieldTitle>
                  {!isLoadingTribunais ? (
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
                          isDisabled={!selectedTribunal || !selectedInstancia}
                          isClearable={true}
                        />
                      )}
                    />
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.ContainerField>
              </S.ContentSection>
            )}

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Data da Ciência (*)</S.FieldTitle>
              <S.DateContent error={errors.dtCiencia?.message}>
                <S.DateInput
                  type="date"
                  required={true}
                  defaultValue={defaultDate}
                  {...register("dtCiencia", {
                    required: "Data de ciência é obrigatória.",
                  })}
                />
              </S.DateContent>
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Data de Prazo</S.FieldTitle>
              <S.DateContent error={errors.dtPrazo?.message}>
                <S.DateInput type="date" {...register("dtPrazo")} />
              </S.DateContent>
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Urgente:</S.FieldTitle>
              <S.ContentRadioButton>
                <S.RadioButtonContainer>
                  <S.RadioButtonLabel value={isUrgente}>
                    {isUrgente ? "SIM" : "NÃO"}
                  </S.RadioButtonLabel>
                  <S.ToggleButton
                    {...register("isUrgente")}
                    checked={isUrgente}
                    onChange={() => setIsUrgente(!isUrgente)}
                  />
                </S.RadioButtonContainer>
              </S.ContentRadioButton>
            </S.ContainerField>
          </S.ContentSection>
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Anexo do Ato</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Anexar Arquivo</S.FieldTitle>
              <S.FieldContainer>
                <Controller
                  name="anexo"
                  control={control}
                  defaultValue={null}
                  render={({ field: { onChange, value, ...field } }) => (
                    <S.FileInput
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
            <S.TitleSection>Obsevação do Ato</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
            <S.ContainerFieldTextArea>
              <S.FieldTitle>
                Informações Complementares:
                <S.LettersCounter>
                  {(watch("txObservacao") || "").length} / 1000
                </S.LettersCounter>
              </S.FieldTitle>

              <S.TextAreaInput
                minLength={2}
                maxLength={1000}
                placeholder="Digite aqui uma observação de no máximo 1000 caracteres."
                {...register("txObservacao", {
                  maxLength: 1000,
                  minLength: 2,
                })}
              />
            </S.ContainerFieldTextArea>
          </S.ContentSection>
        </S.Section>

        <S.SaveButtonContainer>
          <S.SaveButton disabled={!isValid} type="submit">
            Salvar
          </S.SaveButton>
          <S.ClearButton
            type="reset"
            onClick={() =>
              reset({
                anexo: null,
                idSistemaProcessual: null,
                idClasse: null,
                idSecretaria: null,
                idTribunal: null,
                nuInstancia: null,
                idOrgaoJulgador: null,
              })
            }
          >
            Limpar
          </S.ClearButton>
        </S.SaveButtonContainer>
      </S.FormContainer>
    </>
  );
};

export default RegisterAct;

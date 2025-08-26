import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { postErgonRubricas } from "../../../../../../api/services/ergonrubricas/ergonRubricas";
import { BaseModal } from "../../../../../../components/BaseModal";
import { SharedState } from "../../../../../../context/SharedContext";
import * as MockData from "../../mockData";
import { SubmitCadastroRubrica } from "./CadastroRubrica.interface";
import * as S from "./styled";

export const CadastroRubrica = ({ dataTable }: any) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    reset,
    control,
  } = useForm<SubmitCadastroRubrica>({
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const { user, selectedUser } = SharedState();
  const [isOpenModal, setOpenModal] = useState(false);
  const [tipoCalculoSelectedOption, setTipoCalculoSelectedOption] = useState({
    label: "",
    value: null,
  });
  const [tipoRubicaSelectedOption, setTipoRubricaSelectedOption] = useState({
    label: "",
    value: null,
  });

  const [isIrrfState, setIsIrrfState] = useState(false);
  const [isPrevidenciaState, setIsPrevidenciaState] = useState(false);

  const resetStates = () => {
    reset();
  };

  useEffect(() => {
    setTipoCalculoSelectedOption(null);
    setTipoRubricaSelectedOption(null);
    resetStates();
  }, [isOpenModal]);

  // Obter a data atual
  let dataAtual = new Date();

  // Extrair os componentes de data
  let ano = dataAtual.getFullYear();
  let mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
  let dia = String(dataAtual.getDate()).padStart(2, "0");

  // Extrair os componentes de hora
  let hora = String(dataAtual.getHours()).padStart(2, "0");
  let minuto = String(dataAtual.getMinutes()).padStart(2, "0");
  let segundo = String(dataAtual.getSeconds()).padStart(2, "0");

  // Formatar a data e hora
  let dtCadastro = `${ano}-${mes}-${dia}`;
  let hrCadastro = `${hora}:${minuto}:${segundo}`;

  const handleToast = (msg: string, error: boolean) => {
    !error
      ? toast(msg, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
  };

  const onSubmit: SubmitHandler<SubmitCadastroRubrica> = async (data) => {
    const params = {
      nuRubrica: data.nuRubrica,
      isIrrf: data.isIrrf,
      isPrevidencia: data.isPrevidencia,
      nuTipoCalculo: tipoCalculoSelectedOption.value,
      txRubrica: data.txRubrica,
      txAbreviatura: data.txAbreviatura,
      txTipoRubrica: tipoRubicaSelectedOption.label,
      dtCadastro: dtCadastro,
      hrCadastro: hrCadastro,
      idUsuarioCadastro: +user["Jvris.User.Id"],
    };
    postErgonRubricas(params)
      .then((response) => {
        if (response.status == "OK") {
          handleToast("Rubrica Cadastrada com Sucesso", false);
          queryClient.invalidateQueries(`ergonRubricas`);
        } else {
          handleToast("Erro ao Cadastrar Rubrica", true);
        }
      })
      .catch((err) => {
        handleToast("Erro ao Cadastrar Rubrica", false);
      });
    setOpenModal(false);
    resetStates();
  };
  return (
    <>
      <BaseModal
        title="Edição de Cadastro de Requisitórios"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Rubrica:</S.FieldTitle>
              <S.SectionDataContainer>
                <Controller
                  name="txRubrica"
                  control={control}
                  render={({ field }) => (
                    <S.TextInput
                      maxLength={56}
                      minLength={3}
                      required={true}
                      autoFocus
                      placeholder="Digite a rubrica"
                      {...register("txRubrica", {
                        maxLength: 56,
                        minLength: 3,
                        required: true,
                      })}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>Abreviatura:</S.FieldTitle>
              <S.SectionDataContainer>
                <Controller
                  name="txAbreviatura"
                  control={control}
                  render={({ field }) => (
                    <S.TextInput
                      maxLength={56}
                      minLength={3}
                      required={true}
                      autoFocus
                      placeholder="Digite a abreviatura"
                      {...register("txAbreviatura", {
                        maxLength: 56,
                        minLength: 3,
                        required: true,
                      })}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.ContainerField>
          </S.ContentSection>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Código:</S.FieldTitle>
              <S.SectionDataContainer>
                <Controller
                  name="nuRubrica"
                  control={control}
                  render={({ field }) => (
                    <S.TextInput
                      style={{ width: "3rem", marginRight: "2rem" }}
                      maxLength={8}
                      minLength={1}
                      required={true}
                      autoFocus
                      placeholder="Digite o código"
                      {...register("nuRubrica", {
                        maxLength: 8,
                        minLength: 1,
                        required: true,
                      })}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.ContainerField>
            <S.ContainerField style={{ marginLeft: "1rem" }}>
              <S.FieldTitle>IRRF:</S.FieldTitle>
              <S.RadioButtonContainer>
                <S.RadioButtonLabel value={isIrrfState}>
                  {isIrrfState ? "SIM" : "NÃO"}
                </S.RadioButtonLabel>
                <S.ToggleButton
                  {...register("isIrrf")}
                  checked={isIrrfState}
                  onChange={() => setIsIrrfState(!isIrrfState)}
                />
              </S.RadioButtonContainer>
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>Previdência:</S.FieldTitle>
              <S.RadioButtonContainer>
                <S.RadioButtonLabel value={isPrevidenciaState}>
                  {isPrevidenciaState ? "SIM" : "NÃO"}
                </S.RadioButtonLabel>
                <S.ToggleButton
                  {...register("isPrevidencia")}
                  checked={isPrevidenciaState}
                  onChange={() => setIsPrevidenciaState(!isPrevidenciaState)}
                />
              </S.RadioButtonContainer>
            </S.ContainerField>
          </S.ContentSection>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Tipo Rubrica:</S.FieldTitle>
              <S.SectionDataContainer>
                <Controller
                  name="txTipoRubrica"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      required={true}
                      isClearable={false}
                      options={MockData.tipoRubrica}
                      value={tipoRubicaSelectedOption}
                      placeholder="Selecione o tipo de rubrica"
                      onChange={(value: any) => {
                        setTipoRubricaSelectedOption(value);
                      }}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>Tipo Cálculo:</S.FieldTitle>
              <S.SectionDataContainer>
                <Controller
                  name="nuTipoCalculo"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      required={true}
                      isClearable={false}
                      options={MockData.tipoOptions}
                      value={tipoCalculoSelectedOption}
                      placeholder="Selecione o tipo de cálculo"
                      onChange={(value: any) => {
                        setTipoCalculoSelectedOption(value);
                      }}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.ContainerField>
          </S.ContentSection>

          <S.OptionsContainer>
            <S.OptionCancel onClick={() => setOpenModal(false)}>
              Cancelar
            </S.OptionCancel>
            <S.OptionSave disabled={!isValid} onClick={() => {}}>
              Salvar
            </S.OptionSave>
          </S.OptionsContainer>
        </S.FormContainer>
      </BaseModal>
      <S.Wrapper onClick={() => setOpenModal(true)}>Cadastrar</S.Wrapper>
    </>
  );
};

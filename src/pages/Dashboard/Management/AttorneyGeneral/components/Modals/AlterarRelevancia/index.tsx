import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAtosService from "../../../../../../../api/services/atos/atos";
import { putProcessRelevance } from "../../../../../../../api/services/processRelevance/processRelevance";
import {JvrisModal} from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import { SharedState } from "../../../../../../../context/SharedContext";
import { useProcessRelevance } from "../../../../../../../hooks/useProcessRelevance";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { useTablesContext } from "../../../context/TablesContext";
import { OptionsType } from "../../../interfaces";
import { SubmitAlterarRelevancia } from "./interfaces/alterarrelevancia.interface";

const AlterarRelevanciaModal = () => {
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal, currModal } = useModalsContext();
  const [process, setProcess] = useState(false);
  const [act, setAct] = useState(false);
  const [isUrgente, setIsUrgente] = useState(false);
  const { processRelevanceList, loadingProcessRelevanceResponseList } =
    useProcessRelevance();
  const [processRel, setProcessRel] = useState("");
  const [processosOptions, setProcessosOptions] = useState<OptionsType[]>([]);
  const [processosSelecionados, setProcessosSelecionados] = useState<
    OptionsType[]
  >([]);

  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

  const { alteraRelevancia } = useAtosService();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitAlterarRelevancia>({
    mode: "onChange",
  });

  function mapToOptionsType(
    data: any[],
    valueKey: string,
    labelKey: string
  ): OptionsType[] {
    return data.map((item: any) => {
      return {
        value: item[valueKey],
        label: item[labelKey],
        isFixed: true,
        isSelected: true,
      };
    });
  }

  useEffect(() => {
    if (managing.selectedData) {
      const mappedData = mapToOptionsType(
        managing.selectedData,
        "id",
        "txNumero"
      );
      setProcessosOptions(mappedData);
      setProcessosSelecionados(mappedData);
    }
  }, [managing.selectedData]);

  useEffect(() => {
    if (currModal == modalsID.alterarRelevancia)
      managing.singularSelectedData &&
        setProcessRel(managing.singularSelectedData!.txNumero);
  }, [managing.singularSelectedData]);

  const resetOnSubmit = () => {
    managing.resetSingularSelectedData();
    setProcessRel("");
    reset({
      tipoRelevancia: processRelevanceList![0],
    });
    setProcess(false);
    setAct(false);
    setIsUrgente(false);
    closeModal();
  };

  const handleToast = (response: boolean) => {
    response
      ? toast("Relevância Alterada com Sucesso", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error("Erro ao Alterar Relevância", {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
  };

  const onSubmit: SubmitHandler<SubmitAlterarRelevancia> = (params) => {
    if (params.isProcesso) {
      processRel
        ? putProcessRelevance({
            idProcesso:
              managing.selectedData && managing.selectedData.length
                ? Number(managing.selectedData![0].idProcesso)
                : Number(managing.singularSelectedData.idProcesso),
            txRelevancia: params.tipoRelevancia!.value,
          }).then((response) => {
            if (response.status == "OK") {
              handleToast(true);
            } else {
              handleToast(false);
            }
          })
        : managing.selectedData.map((item: any) => {
            putProcessRelevance({
              idProcesso: item.idProcesso,
              txRelevancia: params.tipoRelevancia!.value,
            }).then((response) => {
              if (response.status == "OK") {
                handleToast(true);
              } else {
                handleToast(false);
              }
            });
          });
    }

    if (params.isAto) {
      processRel
        ? alteraRelevancia({
            idAto:
              managing.selectedData && managing.selectedData.length
                ? Number(managing.selectedData![0].id)
                : Number(managing.singularSelectedData.id),
            novaRelevanciaAto: isUrgente,
            idUsuarioCadastro: +user["Jvris.User.Id"],
          }).then((response) => {
            if (response == "Ok") {
              handleToast(true);
            } else {
              handleToast(false);
            }
          })
        : managing.selectedData.map((item: any) => {
            alteraRelevancia({
              idAto: item.id,
              novaRelevanciaAto: isUrgente,
              idUsuarioCadastro: +user["Jvris.User.Id"],
            }).then((response) => {
              if (response == "Ok") {
                handleToast(true);
              } else {
                handleToast(false);
              }
            });
          });
    }

    resetOnSubmit();
  };

  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.alterarRelevancia)}
      closeModal={() => resetOnSubmit()}
    >
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel>Alterar Relevância(s)</SM.TitleLabel>
          <SM.TitleButtonWrapper>
            <SM.TitleButton onClick={() => resetOnSubmit()}>
              Fechar
            </SM.TitleButton>
          </SM.TitleButtonWrapper>
        </SM.TitleContainer>
        <SM.Form onSubmit={handleSubmit(onSubmit)}>
          <SM.ContentWrapper>
            {processRel == "" ? (
              <div>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                    PROCESSO(S) SELECIONADO(S)
                  </SM.ContentTitleLabel>
                </SM.ContentTitle>
                <SM.ProcessosSelect
                  isSearchable={false}
                  placeholder="Clique aqui para ver os processos"
                  value={processosSelecionados.filter(
                    (item) => item.isSelected || item.isFixed
                  )}
                  options={processosOptions}
                  isClearable={
                    !processosSelecionados.some((item) => item.isFixed)
                  }
                  isMulti
                  isDisabled
                />
              </div>
            ) : (
              <div>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                    PROCESSO SELECIONADO:
                  </SM.ContentTitleLabel>
                  <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                    {managing.singularSelectedData?.txNumero}
                  </SM.ContentTitleLabel>
                </SM.ContentTitle>
              </div>
            )}
            <SM.ContentSeparator />
            <SM.ContentTitle>
              <SM.ContentTitleLabel fontSize="13px">
                Alterar Relevâncias?
              </SM.ContentTitleLabel>
            </SM.ContentTitle>
            <SM.ContentRadioButton>
              <SM.RadioButtonTitle>Processo(s):</SM.RadioButtonTitle>
              <SM.RadioButtonContainer>
                <SM.RadioButtonLabel value={process}>
                  {process ? "SIM" : "NÃO"}
                </SM.RadioButtonLabel>
                <SM.ToggleButton
                  {...register("isProcesso")}
                  checked={process}
                  onChange={() => setProcess(!process)}
                />
              </SM.RadioButtonContainer>
              <SM.RadioButtonTitle>Ato(s):</SM.RadioButtonTitle>
              <SM.RadioButtonContainer>
                <SM.RadioButtonLabel value={act}>
                  {act ? "SIM" : "NÃO"}
                </SM.RadioButtonLabel>
                <SM.ToggleButton
                  {...register("isAto")}
                  checked={act}
                  onChange={() => setAct(!act)}
                />
              </SM.RadioButtonContainer>
            </SM.ContentRadioButton>
            {process && (
              <>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel fontSize="13px">
                    Nova Relevância do Processo
                  </SM.ContentTitleLabel>
                </SM.ContentTitle>
                <Controller
                  control={control}
                  {...register("tipoRelevancia")}
                  defaultValue={processRelevanceList![0]}
                  render={({ field }) => (
                    <SM.ContentSelect
                      isClearable={false}
                      options={processRelevanceList}
                      isLoading={loadingProcessRelevanceResponseList}
                      {...field}
                    />
                  )}
                />
              </>
            )}
            {act && (
              <>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel fontSize="13px">
                    Nova Relevância do Ato
                  </SM.ContentTitleLabel>
                </SM.ContentTitle>
                <SM.ContentRadioButton>
                  <SM.RadioButtonTitle>Urgente:</SM.RadioButtonTitle>
                  <SM.RadioButtonContainer>
                    <SM.RadioButtonLabel value={isUrgente}>
                      {isUrgente ? "SIM" : "NÃO"}
                    </SM.RadioButtonLabel>
                    <SM.ToggleButton
                      {...register("isUrgente")}
                      checked={isUrgente}
                      onChange={() => setIsUrgente(!isUrgente)}
                    />
                  </SM.RadioButtonContainer>
                </SM.ContentRadioButton>
              </>
            )}
            {(process || act) && (
              <SM.ContentButton>
                <SM.ContentButtonLabel disabled={!isValid} type="submit">
                  Salvar
                </SM.ContentButtonLabel>
              </SM.ContentButton>
            )}
          </SM.ContentWrapper>
        </SM.Form>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default AlterarRelevanciaModal;

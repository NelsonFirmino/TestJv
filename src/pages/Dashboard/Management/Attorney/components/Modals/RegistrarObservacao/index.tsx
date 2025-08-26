import { useEffect, useState } from "react";
import { JvrisModal } from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitRegistrarObservacao } from "./interfaces/registrarobservacao.interface";
import { Observation } from "../../../../../../../api/services/actObservations/act-observations.interface";
import toast from "react-hot-toast";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import {
  getActObservations,
  postActObservation,
} from "../../../../../../../api/services/actObservations/actObservations";
import { formatToBrazilianDate } from "../../../../../../../utils/formatToBrazilianDate.util";
import { OptionsType } from "../../../interfaces";
import { SharedState } from "../../../../../../../context/SharedContext";
import { HotToastError, HotToastSucess } from "../../../../../../../components/HotToastFuncs";
import { ProcessosView } from "../../../styled";

const RegistrarObservacaoModal = () => {
  const { user } = SharedState();
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal, currModal, setShouldReset } = useModalsContext();

  const [observationList, setObservationList] = useState<Observation[]>([]);
  const [process, setProcess] = useState("");
  const [processosOptions, setProcessosOptions] = useState<OptionsType[]>([]);
  const [processosSelecionados, setProcessosSelecionados] = useState<
    OptionsType[]
  >([]);

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
    if (currModal == modalsID.registrarObservacao)
      if (managing.singularSelectedData) {
        setProcess(managing.singularSelectedData!.txNumero);
        managing.singularSelectedData &&
          getObservations(managing.singularSelectedData!.id);
      }
  }, [managing.singularSelectedData]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitRegistrarObservacao>({
    mode: "onChange",
  });

  const resetOnSubmit = () => {
    managing.resetSingularSelectedData();
    setProcess("");
    reset();
    setObservationList([]);
    closeModal();
  };

  const getObservations = (idAto: string) => {
    getActObservations(idAto).then((result) => {
      setObservationList(result.data);
    });
  };

  const onSubmit: SubmitHandler<SubmitRegistrarObservacao> = (params) => {
    {
      process
        ? postActObservation({
          idUsuarioCadastro: user["Jvris.User.Id"],
          idAto: managing.singularSelectedData!.id as number,
          txObservacao: params.txObservacao,
        }).then((response) => {
          if (response.status == "Created") {
            HotToastSucess("Registro de Observação Realizado com Sucesso");
            setShouldReset(true);
          } else {
            HotToastError("Erro ao Registrar Observação");
          }
        })
        : managing.selectedData.map((item: any) => {
          postActObservation({
            idUsuarioCadastro: user["Jvris.User.Id"],
            idAto: item.id,
            txObservacao: params.txObservacao,
          }).then((response) => {
            if (response.status == "Created") {
              HotToastSucess("Registro de Observação Realizado com Sucesso");
              setShouldReset(true);
            } else {
              HotToastError("Erro ao Registrar Observação");
            }
          });
        });
      resetOnSubmit();
    }
  };

  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.registrarObservacao)}
      closeModal={() => resetOnSubmit()}
    >
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel>Registro de Observação do Ato</SM.TitleLabel>
          <SM.TitleButtonWrapper>
            <SM.TitleButton onClick={() => resetOnSubmit()}>
              Fechar
            </SM.TitleButton>
          </SM.TitleButtonWrapper>
        </SM.TitleContainer>
        <SM.Form onSubmit={handleSubmit(onSubmit)}>
          <SM.ContentWrapper>
            {process == "" ? (
              <div>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                    PROCESSO(S) SELECIONADO(S)
                  </SM.ContentTitleLabel>
                </SM.ContentTitle>
                <ProcessosView processosOptions={processosOptions} />
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
              <SM.ContentTitleLabel>Nova Observação</SM.ContentTitleLabel>
            </SM.ContentTitle>
            <SM.ContentTextArea
              {...register("txObservacao", {
                required: "O campo observação é obrigatório.",
              })}
            />

            {observationList && observationList.length > 0 && (
              <>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel>
                    Observações anteriores
                  </SM.ContentTitleLabel>
                </SM.ContentTitle>
                <div style={{
                  height: "220px",
                  overflow: "auto",
                }}>
                  {observationList.map((obj) => {
                    return (
                      <>
                        <SM.ContentTitle>
                          <SM.ContentTitleLabel fontSize="12px">
                            <b
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              Observação:
                            </b>{" "}
                            {obj.txObservacao}
                          </SM.ContentTitleLabel>
                        </SM.ContentTitle>
                        <SM.ContentSubTitleLabel fontSize="12px">
                          {obj.txNomeUsuario} -{" "}
                          {formatToBrazilianDate(obj.dtCadastro)}
                        </SM.ContentSubTitleLabel>
                        <SM.ContentSeparator />
                      </>
                    );
                  })}
                </div>
              </>
            )}



            <SM.ContentButton>
              <SM.ContentButtonLabel disabled={!isValid} type="submit">
                Salvar
              </SM.ContentButtonLabel>
            </SM.ContentButton>
          </SM.ContentWrapper>
        </SM.Form>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default RegistrarObservacaoModal;

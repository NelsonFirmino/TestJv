import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as SM from "../../../../../../components/JvrisModal/styled";
import { formatToBrazilianDate } from "../../../../../../utils/formatToBrazilianDate.util";
import { SubmitRegistrarObservacao } from "./interfaces/registrarObs.interface";
import {
  getActObservations,
  postActObservation,
} from "../../../../../../api/services/actObservations/actObservations";
import { Observation } from "../../../../../../api/services/actObservations/act-observations.interface";
import toast from "react-hot-toast";
import { SharedState } from "../../../../../../context/SharedContext";
import { JvrisModal } from "../../../../../../components/JvrisModal";
import { RPVProcess } from "../../../../../../api/services/dashboardRPV/dashboardRPV.interface";

interface RegistrarObsProps {
  registrarObs: RPVProcess;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}

const RegistrarObs = (props: RegistrarObsProps) => {
  const { user } = SharedState();
  const [observationList, setObservationList] = useState<Observation[]>([]);
  const { registrarObs, setModalOpen, modalOpen } = props;

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitRegistrarObservacao>({
    mode: "onChange",
  });

  const resetOnSubmit = () => {
    reset();
    setObservationList([]);
    setModalOpen(false);
  };

  const getObservations = (idAto: string) => {
    getActObservations(idAto).then((result) => {
      setObservationList(result.data);
    });
  };

  useEffect(() => {
    registrarObs ? getObservations(registrarObs.id) : "";
  }, []);

  const onSubmit: SubmitHandler<SubmitRegistrarObservacao> = (params) => {
    postActObservation({
      idUsuarioCadastro: user["Jvris.User.Id"],
      idAto: Number(registrarObs.id),
      txObservacao: params.txObservacao,
    }).then((response) => {
      if (response.status == "Created") {
        toast("Registro de Observação Realizado com Sucesso", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        resetOnSubmit();
      } else {
        toast.error("Erro ao Registrar Observação", {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      }
    });
  };

  return (

    <JvrisModal
      modalIsOpen={modalOpen}
      closeModal={() => {
        setModalOpen(false);
      }}
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
            <SM.ContentTitle>
              <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                PROCESSO SELECIONADO: {registrarObs?.txNumeroFormatado}
              </SM.ContentTitleLabel>
            </SM.ContentTitle>
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
                {observationList.map((obj) => {
                  return (
                    <>
                      <SM.ContentTitle>
                        <SM.ContentTitleLabel fontSize="12px">
                          <b
                            style={{
                              fontSize: "12px",
                              marginTop: "5px",
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

export default RegistrarObs;

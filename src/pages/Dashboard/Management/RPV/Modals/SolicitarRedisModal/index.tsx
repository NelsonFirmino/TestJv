import { SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RPVProcess } from "../../../../../../api/services/dashboardRPV/dashboardRPV.interface";
import { JvrisModal } from "../../../../../../components/JvrisModal";
import * as SM from "../../../../../../components/JvrisModal/styled";
import { SharedState } from "../../../../../../context/SharedContext";
import { Redistribuicao } from "../../../Attorney/components/TableComponents/DropDownAtuacao/components/Redistribuicao";

interface SolicitarRedisProps {
  rpvProcess: RPVProcess;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}

interface SolicitarRedisForm {
  idDistribuicaoAntiga: number;
  idEspecializada: number;
  txEspecializadaDestino: string;
  idProcurador: number;
  txProcuradorDestino: string;
  idTriagemNova: number;
  idMotivo: number;
  txMotivo: string;
  dtPrazo: string;
  txObservacao: string;
}

const SolicitarRedisModal = (props: SolicitarRedisProps) => {
  const { user } = SharedState();
  const { rpvProcess, setModalOpen, modalOpen } = props;
  const [keyString, setKeyString] = useState<any>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<SolicitarRedisForm>({
    mode: "onChange",
  });

  const resetOnSubmit = () => {
    reset();
    setModalOpen(false);
  };

  const onSubmit: SubmitHandler<SolicitarRedisForm> = (data) => {
    const payload = {
      id: 0,
      idDistribuicaoAntiga: data.idDistribuicaoAntiga,
      idEspecializada: data.idEspecializada,
      txEspecializadaDestino: data.txEspecializadaDestino,
      idProcurador: data.idProcurador,
      txProcuradorDestino: data.txProcuradorDestino,
      idTriagemNova: data.idTriagemNova,
      dtCadastro: new Date().toISOString(),
      hrCadastro: new Date().toLocaleTimeString(),
      idUsuarioCadastro: user["Jvris.User.Id"],
      txUsuarioSolicitante: user["Jvris.User.Name"],
      txEspecializadaSolicitante: "Especializada Atual", // Preencher conforme necessário
      idMotivo: data.idMotivo,
      txMotivo: data.txMotivo,
      idProcesso: rpvProcess?.id || 0,
      txNumeroFormatado: rpvProcess?.txNumeroFormatado || "",
      dtPrazo: data.dtPrazo,
      txObservacao: data.txObservacao,
      txStatusCadastroAto: "Pendente",
    };


    resetOnSubmit();
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
          <SM.TitleLabel>Solicitar Redistribuição</SM.TitleLabel>
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
                PROCESSO SELECIONADO: {rpvProcess?.txNumeroFormatado}
              </SM.ContentTitleLabel>
            </SM.ContentTitle>
            <SM.ContentSeparator />
            <Redistribuicao idAto={0} txNumeroProcesso={rpvProcess?.txNumeroFormatado} keyStateOpenModal={""} keyString={""} setKeyStateOpenModal={function (value: SetStateAction<string | false>): void {
              throw new Error("Function not implemented.");
            } } />
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

export default SolicitarRedisModal;

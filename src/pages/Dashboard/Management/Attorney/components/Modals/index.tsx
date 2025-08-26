import { useModalsContext } from "../../context/ModalsContext";
import { modalsID } from "../../context/ModalsContext/modalsID";
import AcatarPedidosModal from "./AcatarPedidos";
import AgendaModal from "./Agenda";
import AlterarNivelSigilo from "./AlterarNivelSigilo";
import AlterarPrazoModal from "./AlterarPrazo";
import AlterarRelevanciaModal from "./AlterarRelevancia";
import AnexosAtoModal from "./AnexosAto";
import AtribuirAssessorModal from "./AtribuirAssessor";
import AvalPedidoRestribuicaoModal from "./AvalPedidoRestribuicao";
import DespachoModal from "./Despacho";
import DespachoEmLoteModal from "./DespachoEmLote";
import PedidoRestribuicaoModal from "./PedidoRestribuicao";
import PermissaoSigilo from "./PermissaoSigilo";
import RegistrarAudienciaModal from "./RegistrarAudiencia";
import RegistrarObservacaoModal from "./RegistrarObservacao";
import SolicitacaoInformacaoModal from "./SolicitacaoInformacao";

const Modals = () => {
  const { isModalOpen } = useModalsContext();

  return (
    <>
      {isModalOpen(modalsID.agenda) ? < AgendaModal /> :
        isModalOpen(modalsID.despacho) ? <DespachoModal /> :
          isModalOpen(modalsID.despachoEmLote) ? <DespachoEmLoteModal /> :
            isModalOpen(modalsID.solicitacaoInformacao) ? <SolicitacaoInformacaoModal /> :
              isModalOpen(modalsID.alterarPrazo) ? <AlterarPrazoModal /> :
                isModalOpen(modalsID.registrarObservacao) ? <RegistrarObservacaoModal /> :
                  isModalOpen(modalsID.atribuirAssessor) ? <AtribuirAssessorModal /> :
                    isModalOpen(modalsID.alterarRelevancia) ? <AlterarRelevanciaModal /> :
                      isModalOpen(modalsID.registrarAudiencia) ? <RegistrarAudienciaModal /> :
                        isModalOpen(modalsID.avalPedidoRedistribuicao) ? <AvalPedidoRestribuicaoModal /> :
                          isModalOpen(modalsID.acatarPedidos) ? <AcatarPedidosModal /> :
                            isModalOpen(modalsID.anexosAto) ? <AnexosAtoModal /> :
                              isModalOpen(modalsID.alterarNivelSigilo) ? <AlterarNivelSigilo /> :
                                isModalOpen(modalsID.permissaoSigilo) ? <PermissaoSigilo /> :
                                  isModalOpen(modalsID.pedidoRedistribuicao) && <PedidoRestribuicaoModal />
      }
    </>
  );
};

export default Modals;

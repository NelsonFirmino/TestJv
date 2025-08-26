import AlterarNivelSigilo from "../../../Attorney/components/Modals/AlterarNivelSigilo";
import AcatarPedidosModal from "./AcatarPedidos";
import AgendaModal from "./Agenda";
import AlterarPrazoModal from "./AlterarPrazo";
import AlterarRelevanciaModal from "./AlterarRelevancia";
import AtribuirAssessorModal from "./AtribuirAssessor";
import AvalPedidoRestribuicaoModal from "./AvalPedidoRestribuicao";
import DespachoModal from "./Despacho";
import DespachoEmLoteModal from "./DespachoEmLote";
import PedidoRestribuicaoModal from "./PedidoRestribuicao";
import RegistrarAudienciaModal from "./RegistrarAudiencia";
import RegistrarObservacaoModal from "./RegistrarObservacao";
import SolicitacaoInformacaoModal from "./SolicitacaoInformacao";

const Modals = () => {
  return (
    <>
      <AgendaModal />
      <DespachoModal />
      <DespachoEmLoteModal />
      <SolicitacaoInformacaoModal />
      <AlterarPrazoModal />
      <RegistrarObservacaoModal />
      <AtribuirAssessorModal />
      <AlterarRelevanciaModal />
      <RegistrarAudienciaModal />
      <PedidoRestribuicaoModal />
      <AvalPedidoRestribuicaoModal />
      <AcatarPedidosModal />
      <AlterarNivelSigilo/>
    </>
  );
};

export default Modals;

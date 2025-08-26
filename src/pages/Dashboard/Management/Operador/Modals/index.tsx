import Distruibuir from "./Distruibuir";
import EditarProc from "./Editar";
import EditarTriagem from "./EditarTriagem";
import EditarTriagemEmLoteAguardTomCien from "./EditarTriagemEmLoteAguardTomCien";
import ExcluirAto from "./ExcluirAto";
import ExcluirAtoTriagem from "./ExcluirAtoTriagem";
import ExcluirDistHj from "./ExcluirDistHj";
import Observar from "./Observar";
import TomarCiencia from "./TomarCiencia";
import TriagemDistAtoManual from "./TriagemDistAtoManual";
import TriagemDistAtoManualEmLote from "./TriagemDistAtoManualEmLote";

const Modals = () => {
  return (
    <>
      <TriagemDistAtoManual />
      <ExcluirAto />
      {/* Aguardando Tomada Ciência */}
      <TomarCiencia />
      <EditarTriagem />
      <EditarTriagemEmLoteAguardTomCien />
      {/* ------- */}
      <TriagemDistAtoManualEmLote />
      <Distruibuir />
      <ExcluirDistHj />
      <Observar />
      <EditarProc />
      <ExcluirAtoTriagem />
    </>
  );
};

export default Modals;

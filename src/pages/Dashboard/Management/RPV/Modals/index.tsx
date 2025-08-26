import { RPVProcess } from "../../../../../api/services/dashboardRPV/dashboardRPV.interface";
import { Despacho } from "../../Attorney/components/TableComponents/DropDownAtuacao/components/Despacho";
import { Redistribuicao } from "../../Attorney/components/TableComponents/DropDownAtuacao/components/Redistribuicao";
import RegistrarObs from "./RegistrarObs";
import SolicitarRedisModal from "./SolicitarRedisModal";

interface ModalsProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSolicitarRedisModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  currentSelected: RPVProcess;
  solicitarRedisModal: boolean;
  setSolicitarDespachoModal: React.Dispatch<React.SetStateAction<boolean>>;
  solicitarDespachoModal: boolean;
}

const Modals = (props: ModalsProps) => {
  {
    const {
      setModalOpen,
      modalOpen,
      currentSelected,
      solicitarRedisModal,
      setSolicitarRedisModal,
      solicitarDespachoModal,
      setSolicitarDespachoModal,
    } = props;
    return (
      <>
        <RegistrarObs
          registrarObs={currentSelected}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />
        <Redistribuicao
          idAto={parseInt(currentSelected?.id)}
          keyStateOpenModal={solicitarRedisModal? 'REDISTRIBUICAO': ''}
          keyString={'REDISTRIBUICAO'}
          txNumeroProcesso={currentSelected?.txNumeroFormatado}
          setKeyStateOpenModal={() => setSolicitarRedisModal(false)}

        />
        <Despacho
          idAto={parseInt(currentSelected?.id)}
          keyStateOpenModal={solicitarDespachoModal? 'DESPACHO': ''}
          keyString={'DESPACHO'}
          txNumeroProcesso={currentSelected?.txNumeroFormatado}
          setKeyStateOpenModal={() => setSolicitarDespachoModal(false)}

        />
      </>
    );
  }
};

export default Modals;

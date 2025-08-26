import { usePatrimoniosContext } from "../context";
import { Anexos } from "./Anexos";
import AtivarDesativarModal from "./AtivarDesativar";
import VisuPatrimonios from "./Visualizar";

const PatrimoniosModals = () => {
    const {
        ativarDesativarModal,
        setAtivarDesativarModal,
        setVisualizarModal,
        visualizarModal,
        clikedData,
        anexosModal,
        setAnexosModal
    } = usePatrimoniosContext();
    return (
        <>
            <AtivarDesativarModal
                isOpenModal={ativarDesativarModal}
                setOpenModal={setAtivarDesativarModal}
                clikedData={clikedData}
            />
            <Anexos
                isOpenModal={anexosModal}
                setOpenModal={setAnexosModal}
                clikedData={clikedData}
            />
            <VisuPatrimonios
                isOpenModal={visualizarModal}
                setOpenModal={setVisualizarModal}
                clikedData={clikedData}
            />
        </>
    );
};

export default PatrimoniosModals;

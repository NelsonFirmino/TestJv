import { useNavigate } from "react-router-dom";
import { useOperadorContext } from "../../context";

const usePPC = () => {
    const {
        AtosAguardandoDistribuicao,
        setProcessoData,
        setOpenDistribuirModal,
        setOpenExcluirTriagemAtoModal,
        AtosAguardandoTriagem,
        secretaria,
        setTriagemData,
        setOpenTriagem
    } = useOperadorContext();

    const navigate = useNavigate();

    const distribuir = (data) => {
        setProcessoData(data);
        setOpenDistribuirModal(true);
    };

    const editarato = (id: string) => {
        navigate(`/dashboard/processo/registro-ato/${id}`);
    };

    const editartriagem = (id: string, idEspecializada: string, data) => {
        setOpenTriagem(true);
        setTriagemData({
            idAto: id,
            idEspecializada: idEspecializada,
            idSecretaria: secretaria
        } as any);
        setProcessoData(data);
    };

    const excluirtriagem = (data) => {
        setProcessoData(data);

        setOpenExcluirTriagemAtoModal(true);
    };

    return {
        distribuir,
        editarato,
        editartriagem,
        excluirtriagem
    };
};

export default usePPC;

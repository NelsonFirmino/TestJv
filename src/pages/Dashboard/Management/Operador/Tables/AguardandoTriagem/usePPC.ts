import { useNavigate } from "react-router-dom";
import { JvrisClicableButtonI } from "../../../../../../components/JvrisTable/components/ClicableButton/ClicableButton.interface";
import { useOperadorContext } from "../../context";
import { createSubOptions } from "../utils";

const usePPC = () => {
    const {
        AtosAguardandoTriagem,
        secretaria,
        setExcluirAtoData,
        setOpenExcluirAto,
        setOpenTriagem,
        setTriagemData,
        setProcessoData
    } = useOperadorContext();
    const navigate = useNavigate();
    const tableClicable: JvrisClicableButtonI = {
        text: "Triagem",
        onClick: (index) => {
            setOpenTriagem(true);
            setTriagemData({
                idAto: AtosAguardandoTriagem.rawData[index].id,
                idEspecializada:
                    AtosAguardandoTriagem.rawData[index].idEspecializada,
                idSecretaria: secretaria
            } as any);
            setProcessoData(AtosAguardandoTriagem.rawData[index]);
        },
        subOptions: createSubOptions([
            [
                {
                    onClick: (index) => {
                        navigate(
                            `/dashboard/processo/registro-ato/${AtosAguardandoTriagem.rawData[index].id}`
                        );
                    },
                    option: "Editar Ato"
                },
                {
                    onClick: (index) => {
                        setOpenExcluirAto(true);
                        setExcluirAtoData({
                            idAto: AtosAguardandoTriagem.rawData[index].id,
                            txNumeroFormatado:
                                AtosAguardandoTriagem.rawData[index]
                                    .txNumeroFormatado,
                            txSistemaProcessual:
                                AtosAguardandoTriagem.rawData[index]
                                    .txSistemaProcessual,
                            txSecretaria:
                                AtosAguardandoTriagem.rawData[index]
                                    .txSecretaria,
                            txClasse:
                                AtosAguardandoTriagem.rawData[index].txClasse,
                            dtCiencia:
                                AtosAguardandoTriagem.rawData[index].dtCiencia,
                            idEspecializada:
                                AtosAguardandoTriagem.rawData[index]
                                    .idEspecializada,
                            idSecretaria: secretaria
                        } as any);
                        setProcessoData(AtosAguardandoTriagem.rawData[index]);
                    },
                    option: "Excluir Ato"
                }
            ]
        ])
    };

    return {
        tableClicable
    };
};

export default usePPC;

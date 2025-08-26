import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAcessoresService from "../../../../../../../api/services/Procuradores/acessores/useAcessoresService";
import { JvrisTableColumnNDataI } from "../../../../../../../components/JvrisTable/JvrisTable.interface";
import {
    JvrisClicableButtonI,
    subOptionsI
} from "../../../../../../../components/JvrisTable/components/ClicableButton/ClicableButton.interface";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { useTablesContext } from "../../../context/TablesContext";
import { createSubOptI } from "./interfaces";
import { ParseToJvrisTableProcessosOperacao } from "./utils";

const usePOTable = () => {
    const { data, managing, userId } = useTablesContext();
    const { openModal } = useModalsContext();
    const navigate = useNavigate();
    const [tableData, setTableData] = useState<JvrisTableColumnNDataI[][]>([]);

    const tableClicable: JvrisClicableButtonI = {
        text: "Fazer Peça",
        onClick: (index) => {
            navigate(
                `/dashboard/procurador/cadastro-peca/${data.attorneyProcessesInOperationList[index].id}`
            );
        },

        subOptions: createProcessosEmOperacaoSubOptions([
            // [
            //   {
            //     changeTo: "fazerPeca",
            //     onClick: (index) => {
            //       navigate(
            //         `/dashboard/procurador/cadastro-peca/${data.attorneyProcessesInOperationList[index].id}`,
            //         {
            //           state: {
            //             processo: data.attorneyProcessesInOperationList[index],
            //             idProcesso: data.attorneyProcessesInOperationList[index].id,
            //           },
            //         }
            //       );
            //     },
            //     option: "Fazer Peça",
            //   },
            // ],
            [
                {
                    changeTo: modalsID.despacho,
                    option: "Despacho"
                }
            ],
            [
                {
                    changeTo: "Ficha DCJE",
                    onClick: (index) => {
                        navigate(
                            `/dashboard/dcje/ficha-processual/${data.attorneyProcessesInOperationList[index].id}`
                        );
                    },
                    option: "Ficha DCJE"
                },
                {
                    changeTo: modalsID.solicitacaoInformacao,
                    option: "Solicitação de Informação"
                },
                {
                    changeTo: modalsID.pedidoRedistribuicao,
                    option: "Pedido de Redistribuição"
                }
            ],
            [
                {
                    changeTo: modalsID.alterarPrazo,
                    option: "Alterar Prazo"
                },
                {
                    changeTo: modalsID.alterarRelevancia,
                    option: "Alterar Relevância"
                },
                {
                    changeTo: modalsID.registrarAudiencia,
                    option: "Registrar Audiência"
                },
                {
                    changeTo: modalsID.registrarObservacao,
                    option: "Registrar Observação"
                },
                {
                    changeTo: modalsID.atribuirAssessor,
                    option: "Atribuir Assessor"
                },
                {
                    changeTo: modalsID.anexosAto,
                    option: "Anexos Ato"
                }
            ],
            [
                {
                    changeTo: modalsID.alterarNivelSigilo,
                    option: "Alterar Nível de Sigilo"
                },
                {
                    changeTo: "Permissão de Sigilo",
                    onClick: (index) => {
                        navigate(
                            `/dashboard/processo/adicionar-usuario-ao-processo-sigiloso/${data.attorneyProcessesInOperationList[index].id}`
                        );
                    },
                    option: "Permissão de Sigilo"
                }
            ]
        ])
    };
    const { getAcessores } = useAcessoresService();

    useEffect(() => {
        if (
            data.loading.loadingStatus === "" ||
            data.loading.loadingStatus == "Recebendo dados base do servidor"
        ) {
            setTableData(
                ParseToJvrisTableProcessosOperacao(
                    data.attorneyProcessesInOperationList
                )
            );
            getAcessores({ idProcurador: userId.toString() });
        }
    }, [data.attorneyProcessesInOperationList]);

    function createProcessosEmOperacaoSubOptions(props: createSubOptI[][]) {
        const ProcessesInOperationSubOptions: subOptionsI[][] = [];
        props.forEach((subOpt) => {
            const subOptions: subOptionsI[] = [];
            subOpt.forEach((opt) => {
                subOptions.push({
                    text: opt.option,
                    onClick: (index) => {
                        if (index != undefined) {
                            if (opt.onClick) opt.onClick(index);
                            else {
                                openModal(opt.changeTo);
                                //managing.resetSelectedData();
                                managing.setSingularSelectedData(
                                    data.attorneyProcessesInOperationList[index]
                                ); //managing.select([index], prop.dataSelected);
                            }
                        }
                    }
                });
            });
            ProcessesInOperationSubOptions.push(subOptions);
        });

        return ProcessesInOperationSubOptions;
    }

    return { tableData, tableClicable, managing, openModal, data };
};

export default usePOTable;

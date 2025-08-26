import { useNavigate } from "react-router-dom";
import { GetDashboardRPVResponse } from "../../../../../../api/services/dashboardRPV/dashboardRPV.interface";
import { formatDataToTable } from "../../../../../../utils/formatDataToTable";
import { Columns, SubOptions } from "../../JvrisTableConfig";
import * as S from "../../styled";
import DefaultTable from "../default";

interface ReqsPendProps {
    setModalOpen: (value: boolean) => void;
    setCurrentSelected: (value: any) => void;
    setSolicitarRedisModal: (value: boolean) => void;
    isLoadingDashboardRPV: boolean;
    dashboardRPV: GetDashboardRPVResponse;
    solicitarDespachoModal: boolean;
    setSolicitarDespachoModal: (value: any) => void;
}

const ReqsPend = (props: ReqsPendProps) => {
    const navigate = useNavigate();
    const {
        setModalOpen,
        setCurrentSelected,
        isLoadingDashboardRPV,
        dashboardRPV,
        setSolicitarRedisModal,
        setSolicitarDespachoModal
    } = props;

    function solicitarDespachoModal(arg0: boolean) {
        throw new Error("Function not implemented.");
    }

    return (
        <S.PageWrapper>
            <DefaultTable
                loading={{
                    loadingData: isLoadingDashboardRPV,
                    loadingStatus: "Carregando Requisitórios Pendentes"
                }}
                columns={Columns}
                data={formatDataToTable(
                    dashboardRPV?.data ?? [],
                    [
                        "txNumeroFormatado",
                        "dtDistribuicao",
                        "txAssuntos",
                        "txRelevancia",
                        "vaProcesso"
                    ],
                    ["vaProcesso"],
                    ["dtDistribuicao"],
                    [
                        {
                            key: "txNumeroFormatado",
                            onClick: (lineData) => {
                                navigate(
                                    `/dashboard/detalhes-processo/espelho-processos/${lineData.idProcesso}`
                                );
                            }
                        }
                    ],
                    true,
                    "txRelevancia"
                )}
                ClicableButton={{
                    text: "Cadastrar Requisitório",
                    onClick: (index) => {
                        if (index != undefined) {
                            navigate(
                                `/dashboard/gerenciamento/requisitorios/${dashboardRPV?.data[index].id}`
                            );
                        }
                    },
                    subOptions: SubOptions({
                        EditarProcesso: (index) => {
                            navigate(
                                `/dashboard/processo/${dashboardRPV?.data[index].idProcesso}`
                            );
                        },
                        RegistrarObservacao: (index) => {
                            setModalOpen(true);
                            setCurrentSelected(dashboardRPV?.data[index]);
                        },
                        SolicitarRedis: (index) => {
                            setSolicitarRedisModal(true);
                            setCurrentSelected(dashboardRPV?.data[index]);
                        },
                        Despacho: (index) => {
                            setSolicitarDespachoModal(true);
                            setCurrentSelected(dashboardRPV?.data[index]);
                        }
                    })
                }}
            />
        </S.PageWrapper>
    );
};

export default ReqsPend;

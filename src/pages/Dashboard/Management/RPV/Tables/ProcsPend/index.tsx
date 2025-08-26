import { useNavigate } from "react-router-dom";
import { GetDashboardRPVPendenciasResponse } from "../../../../../../api/services/dashboardRPVPendencias/dashboardRPVPendencias.interface";
import { formatDataToTable } from "../../../../../../utils/formatDataToTable";
import { Columns } from "../../JvrisTableConfig";
import * as S from "../../styled";
import DefaultTable from "../default";

interface ProcsPendsProps {
    dashboardRPVPendencias: GetDashboardRPVPendenciasResponse;
    isLoadingDashboardRPVPendencias: boolean;
}
const ProcsPend = (props: ProcsPendsProps) => {
    const { dashboardRPVPendencias, isLoadingDashboardRPVPendencias } = props;
    const navigate = useNavigate();

    return (
        <S.PageWrapper>
            <DefaultTable
                loading={{
                    loadingData: isLoadingDashboardRPVPendencias,
                    loadingStatus: "Carregando Processos Pendentes",
                }}
                columns={Columns}
                data={formatDataToTable(
                    dashboardRPVPendencias?.data ?? [],
                    [
                        "txNumeroFormatado",
                        "dtDistribuicao",
                        "txAssuntos",
                        "txRelevancia",
                        "vaProcesso",
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
                            },
                        },
                    ],
                    true,
                    "txRelevancia"
                )}
                ClicableButton={{
                    text: "Editar Processo",
                    onClick: (index) => {
                        if (index != undefined) {
                            navigate(
                                `/dashboard/processo/${dashboardRPVPendencias?.data[index].idProcesso}`
                            );
                        }
                    },
                }}
            />
        </S.PageWrapper>
    )
}

export default ProcsPend
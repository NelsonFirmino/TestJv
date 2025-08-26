import { RPVProcess } from "../../../../../api/services/dashboardRPV/dashboardRPV.interface";
import ContentSwitcher from "../../../../../components/ContentsSwitcher";
import { useDashboardRPV } from "../../../../../hooks/useDashboardRPV";
import { useDashboardRPVPendencias } from "../../../../../hooks/useDashboardRPVPendencias";
import TablesInfo from "../components/TablesInfo";
import ProcsPend from "./ProcsPend";
import ReqsPend from "./ReqsPend";

interface RPVTablesProps {
    assunto: string;
    numeroFormatado: string;
    dtDistribuicao: string;
    setCurrentSelected: React.Dispatch<React.SetStateAction<RPVProcess>>;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setShowingTable: React.Dispatch<React.SetStateAction<number>>;
    showingTable: number;
    setSolicitarRedisModal: React.Dispatch<React.SetStateAction<boolean>>;
    solicitarDespachoModal: boolean;
    setSolicitarDespachoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RPVTables = (props: RPVTablesProps) => {
    const {
        assunto,
        numeroFormatado,
        dtDistribuicao,
        showingTable,
        setCurrentSelected,
        setModalOpen,
        setShowingTable,
        setSolicitarRedisModal,
        solicitarDespachoModal,
        setSolicitarDespachoModal
    } = props;

    const { dashboardRPV, isLoadingDashboardRPV } = useDashboardRPV({
        txAssunto: assunto,
        txNumeroFormatado: numeroFormatado,
        dtDistribuicao
    });

    const { dashboardRPVPendencias, isLoadingDashboardRPVPendencias } =
        useDashboardRPVPendencias();

    return (
        <>
            <ContentSwitcher
                currentSelected={showingTable}
                setCurrentSelected={setShowingTable}
                containerStyle={{
                    margin: "20px 0 30px 0"
                }}
                resetSelected={() => {}}
                switchers={[
                    {
                        amount: dashboardRPV?.data?.length,
                        name: "Requisitórios Pendentes de Cadastro"
                    },
                    {
                        amount: dashboardRPVPendencias?.data?.length,
                        name: "Processos Pendentes de Cadastro"
                    }
                ]}
            />
            <TablesInfo />
            {showingTable == 0 ? (
                <ReqsPend
                    dashboardRPV={dashboardRPV}
                    isLoadingDashboardRPV={isLoadingDashboardRPV}
                    setCurrentSelected={setCurrentSelected}
                    setSolicitarRedisModal={setSolicitarRedisModal}
                    setModalOpen={setModalOpen}
                    solicitarDespachoModal={solicitarDespachoModal}
                    setSolicitarDespachoModal={setSolicitarDespachoModal}

                />
            ) : (
                showingTable == 1 && (
                    <ProcsPend
                        dashboardRPVPendencias={dashboardRPVPendencias}
                        isLoadingDashboardRPVPendencias={
                            isLoadingDashboardRPVPendencias
                        }
                    />
                )
            )}
        </>
    );
};

export default RPVTables;

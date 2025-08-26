import { ModalsProvider } from "./ModalsContext";
import { PrazosProvider } from "./PrazosContext";
import { TablesProvider } from "./TablesContext";

const DashboardProcuradorContext = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (

        <TablesProvider>
            <ModalsProvider>
                <PrazosProvider>{children}</PrazosProvider>
            </ModalsProvider>
        </TablesProvider>

    );
};

export default DashboardProcuradorContext;

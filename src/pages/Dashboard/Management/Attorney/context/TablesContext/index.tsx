import { useState, createContext, useEffect, useContext } from "react";
import { useAttorneys } from "../../../../../../hooks/useAttorneys";
import { TablesContextI } from "./interface";
import { SharedState } from "../../../../../../context/SharedContext";
import { convertDateFormat, getToday, getTomorrow } from "../../../../../../utils/Date.utils";
import { getUtilWeek } from "../../../../../../utils/getUtilWeek.util";

const TablesContext = createContext<TablesContextI>({} as any);

export const TablesProvider = (props: any) => {
  const { user, selectedUser, setCountProcessDeadlineSchedule } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

  const {
    getProcessesInOperation,
    getRequestsForInaction,
    getRedistributionRequests,
    attorneyRequestsForInactionList,
    attorneyProcessesInOperationList,
    attorneyRedistributionRequestsList,
    loadingAttorneyInformationRequests,
    loadingAttorneyRedistributionRequests,
    loadingAttorneyRequestsForInaction,
    loadingattorneyProcessesInOperation,
  } = useAttorneys(user_id.toString()); //27 procurador normal, 957 procurador test jvris2 // use attorney

  const [showingTable, setShowingTable] = useState(0);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<any[]>();
  const [singularSelectedData, setSingularSelectedData] = useState<any>();
  const [loadingData, setLoadingData] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");

  useEffect(() => {
    if (loadingAttorneyInformationRequests || loadingAttorneyRedistributionRequests || loadingAttorneyRequestsForInaction || loadingattorneyProcessesInOperation) {
      setLoadingData(true);
      setLoadingStatus("Recebendo dados base do servidor");
    }
    else {
      setLoadingData(false);
      setLoadingStatus("");
    }

  }, [loadingAttorneyInformationRequests, loadingAttorneyRedistributionRequests, loadingAttorneyRequestsForInaction, loadingattorneyProcessesInOperation]);

  useEffect(() => {
    getProcessesInOperation();
    getRequestsForInaction();
    getRedistributionRequests();
  }, [user_id]);

  function select(index: number[], data: any) {
    index.map((i) => {
      setSelectedData((prev) => {
        if (prev) return [...prev, data[i]];
        else return [data[i]];
      });
    });
  }

  function resetSelectedData() {
    setSelectedData(undefined);
  }

  function resetSingularSelectedData() {
    setSingularSelectedData(undefined);
  }

  function reSeed() {
    setSelectedData(undefined);
    setSingularSelectedData(undefined);
    getProcessesInOperation();
    getRequestsForInaction();
    getRedistributionRequests();
  }


  return (
    <TablesContext.Provider
      value={{
        data: {
          attorneyRequestsForInactionList,
          attorneyProcessesInOperationList,
          attorneyRedistributionRequestsList,
          loading: {
            loadingData,
            loadingStatus,
          },
        },
        managing: {
          showingTable,
          selectedData,
          selectedRows,
          singularSelectedData,
          setShowingTable,
          setSelectedRows,
          select,
          resetSelectedData,
          setSingularSelectedData,
          resetSingularSelectedData,
          reSeed,
          setLoadingData,
          setLoadingStatus,
        },
        userId: +user_id,
      }}
    >
      {props.children}
    </TablesContext.Provider>
  );
};

export const useTablesContext = () => {
  const context = useContext(TablesContext);
  if (!context) {
    throw new Error("useTablesContext must be used within a Tables Provider");
  }
  return context;
};

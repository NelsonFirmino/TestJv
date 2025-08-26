import { useMutation, useQuery } from "react-query";
import { getAttorneys } from "../api/services/attorneys/attorneys";
import { GetAttorneysResponse } from "../api/services/attorneys/attorneys.interface";
import { getAttorneyProcessesInOperation } from "../api/services/attorneys/processesInOperation/attorneys.processesInOperation";
import { getAttorneyInformationRequests } from "../api/services/attorneys/informationRequests/attorneys.informationRequests";
import { getAttorneyRequestsForInaction } from "../api/services/attorneys/requestsForInaction/attorneys.requestsForInaction";
import { getAttorneyRedistributionRequests } from "../api/services/attorneys/redistributionRequests/attorneys.redistributionRequests";
import { SharedState } from "../context/SharedContext";

export const useGetAttorneys = () => {
  const { data, isLoading: loadingAttorneysList } =
    useQuery<GetAttorneysResponse>("attorneysList", getAttorneys, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  const attorneysList = data?.data?.map((ad) => ({
    label: ad.txProcurador,
    value: ad.id,
    id: ad.id,
  }));

  attorneysList?.sort((a, b) => a.label.trim().localeCompare(b.label.trim()));

  return { attorneysList, loadingAttorneysList };
};

export const useAttorneys = (att_id?: string, generalAttorney?: string) => {
  const { selectedAttorneyByGeneralAttorneyDashboard } = SharedState();
  const { data: attorneyData, isLoading: loadingAttorneysList } =
    useQuery<GetAttorneysResponse>("attorneysList", getAttorneys, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });
  const {
    mutate: mutateAttorneyProcessesInOperation,
    data: attorneyProcessesInOperation,
    isLoading: loadingattorneyProcessesInOperation,
  } = useMutation(getAttorneyProcessesInOperation, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
      }
    },
  });
  const {
    mutate: mutateAttorneyInformationRequests,
    data: attorneyInformationRequests,
    isLoading: loadingAttorneyInformationRequests,
  } = useMutation(getAttorneyInformationRequests, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
      }
    },
  });
  const {
    mutate: mutateAttorneyRequestsForInaction,
    data: attorneyRequestsForInaction,
    isLoading: loadingAttorneyRequestsForInaction,
  } = useMutation(getAttorneyRequestsForInaction, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
      }
    },
  });
  const {
    mutate: mutateAttorneyRedistributionRequests,
    data: attorneyRedistributionRequests,
    isLoading: loadingAttorneyRedistributionRequests,
  } = useMutation(getAttorneyRedistributionRequests, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
      }
    },
  });

  function getProcessesInOperation() {
    if (!att_id) throw new Error("att_id is required");
    mutateAttorneyProcessesInOperation(
      {
        id: selectedAttorneyByGeneralAttorneyDashboard?.value ||
          att_id ||
          generalAttorney
      }
    );
  }
  function getInformationRequests() {
    if (!att_id) throw new Error("att_id is required");
    mutateAttorneyInformationRequests(att_id);
  }
  function getRequestsForInaction() {
    if (!att_id) throw new Error("att_id is required");
    mutateAttorneyRequestsForInaction(generalAttorney || att_id);
  }
  function getRedistributionRequests() {
    if (!att_id) throw new Error("att_id is required");
    mutateAttorneyRedistributionRequests(generalAttorney || att_id);
  }
  const attorneyProcessesInOperationList = attorneyProcessesInOperation?.data;
  const attorneyInformationRequestsList = attorneyInformationRequests?.data;
  const attorneyRequestsForInactionList = attorneyRequestsForInaction?.data;
  const attorneyRedistributionRequestsList =
    attorneyRedistributionRequests?.data;

  const attorneysList = attorneyData?.data.map((at) => ({
    label: at.txProcurador,
    value: at.id,
    setores: at.setores,
  }));

  return {
    attorneysList,
    loadingAttorneysList,
    getProcessesInOperation,
    getInformationRequests,
    getRequestsForInaction,
    getRedistributionRequests,
    attorneyProcessesInOperationList: attorneyProcessesInOperationList ?? [],
    loadingattorneyProcessesInOperation,
    attorneyInformationRequestsList: attorneyInformationRequestsList ?? [],
    loadingAttorneyInformationRequests,
    attorneyRequestsForInactionList: attorneyRequestsForInactionList ?? [],
    loadingAttorneyRequestsForInaction,
    attorneyRedistributionRequestsList:
      attorneyRedistributionRequestsList ?? [],
    loadingAttorneyRedistributionRequests,
  };
};

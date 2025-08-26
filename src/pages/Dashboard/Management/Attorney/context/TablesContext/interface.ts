import { AttorneyProcessesInOperationDataI } from "../../../../../../api/services/attorneys/processesInOperation/attorneys.processesInOperation.interface";
import { AttorneyRedistributionRequestsDataI } from "../../../../../../api/services/attorneys/redistributionRequests/attorneys.redistributionRequests.interface";
import { AttorneyRequestsForInactionDataI } from "../../../../../../api/services/attorneys/requestsForInaction/attorneys.requestsForInaction.interface";

export interface DataI {
	attorneyRequestsForInactionList: AttorneyRequestsForInactionDataI[];
	attorneyProcessesInOperationList: AttorneyProcessesInOperationDataI[];
	attorneyRedistributionRequestsList: AttorneyRedistributionRequestsDataI[];
	loading:{
		loadingData: boolean;
		loadingStatus: string;
	}
}

export interface ManagingI {
	showingTable: number;
	selectedRows: string[];
	selectedData: any[] | undefined;
	singularSelectedData: any;
	setSelectedRows: React.Dispatch<React.SetStateAction<any[]>>;
	select: (index: number[], data: any) => void;
	setShowingTable: React.Dispatch<React.SetStateAction<number>>;
	resetSelectedData: () => void;
	setSingularSelectedData: React.Dispatch<any>;
	resetSingularSelectedData: () => void;
	reSeed: () => void;
	setLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
	setLoadingStatus: React.Dispatch<React.SetStateAction<string>>;
}

export interface TablesContextI {
	data: DataI;
	managing: ManagingI;
	userId: number;
}

import { AttorneyProcessesInOperationDataI } from "../../../../../api/services/attorneys/processesInOperation/attorneys.processesInOperation.interface";
import { AttorneyRedistributionRequestsDataI } from "../../../../../api/services/attorneys/redistributionRequests/attorneys.redistributionRequests.interface";
import { AttorneyRequestsForInactionDataI } from "../../../../../api/services/attorneys/requestsForInaction/attorneys.requestsForInaction.interface";

export interface AttorneyTablesInterface {
	attorneyProcessesInOperationList?: AttorneyProcessesInOperationDataI[];
	attorneyRequestsForInactionList?: AttorneyRequestsForInactionDataI[];
	attorneyRedistributionRequestsList?: AttorneyRedistributionRequestsDataI[];
	currentSelected: number;
}

import { SetStateAction } from "react";
import { UserProps } from "./user.interface";
import { GetProfileMenusResponse } from "../../api/services/profile/profile.interface";
import { PaginationProps } from "./pagination.interface";
import { SelectedUserProps } from "./selected-user.interface";
import { Inaction, ProcessoInAction, Redistribution } from "../../api/services/attorneys/attorneys.interface";

export interface SharedStateContextProps {
  user: UserProps | null;
  setUser: React.Dispatch<SetStateAction<UserProps | null>>;
  userPosition: string;
  setUserPosition: React.Dispatch<SetStateAction<string>>;
  selectedUser: SelectedUserProps | null;
  setSelectedUser: React.Dispatch<SetStateAction<SelectedUserProps | null>>;
  homeLink: string;
  setHomeLink: React.Dispatch<SetStateAction<string | null>>;
  menu: GetProfileMenusResponse;
  setMenu: React.Dispatch<SetStateAction<GetProfileMenusResponse>>;
  pagination: PaginationProps;
  setPagination: React.Dispatch<SetStateAction<PaginationProps>>;
  selectedDataTable: any[];
  setSelectedDataTable: React.Dispatch<SetStateAction<any[]>>;
  selectedProcessoInActionDataTable: ProcessoInAction[];
  setSelectedProcessoInActionDataTable: React.Dispatch<SetStateAction<ProcessoInAction[]>>;
  selectedInactionDataTable: Inaction[];
  setSelectedInactionDataTable: React.Dispatch<SetStateAction<Inaction[]>>;
  selectedRedistributionDataTable: Redistribution[];
  setSelectedRedistributionDataTable: React.Dispatch<SetStateAction<Redistribution[]>>;
  selectedRowHashes: number[];
  setSelectedRowHashes: React.Dispatch<SetStateAction<number[]>>;
  selectedAttorneyByGeneralAttorneyDashboard: { label: string; value: string };
  setSelectedAttorneyByGeneralAttorneyDashboard: React.Dispatch<
    SetStateAction<{ label: string; value: string }>
  >;
  countProcessDeadlineSchedule: { deadline_today: number; deadline_tomorrow: number; deadline_week: number };
  setCountProcessDeadlineSchedule: React.Dispatch<
    SetStateAction<{ deadline_today: number; deadline_tomorrow: number; deadline_week: number }
  >>
}

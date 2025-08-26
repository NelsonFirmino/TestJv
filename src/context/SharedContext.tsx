import React, { useState, createContext, useContext } from "react";
import { GetProfileMenusResponse } from "../api/services/profile/profile.interface";
import { PaginationProps } from "./interfaces/pagination.interface";
import jwtDecode from "jwt-decode";
import { UserProps } from "./interfaces/user.interface";
import { SharedStateContextProps } from "./interfaces/shared-state.interface";
import { SelectedUserProps } from "./interfaces/selected-user.interface";
import { decryptData } from "../utils/token.util";
import { Inaction, ProcessoInAction, Redistribution } from "../api/services/attorneys/attorneys.interface";

const MyContext = createContext<SharedStateContextProps>({
  user: null,
  setUser: () => { },
  userPosition: null,
  setUserPosition: () => { },
  selectedUser: null,
  setSelectedUser: () => { },
  homeLink: null,
  setHomeLink: () => { },
  menu: {} as GetProfileMenusResponse,
  setMenu: () => { },
  pagination: {} as PaginationProps,
  setPagination: () => { },
  selectedDataTable: [],
  setSelectedDataTable: () => { },
  selectedProcessoInActionDataTable: [],
  setSelectedProcessoInActionDataTable: () => { },
  selectedInactionDataTable: [],
  setSelectedInactionDataTable: () => { },
  selectedRedistributionDataTable: [],
  setSelectedRedistributionDataTable: () => { },
  selectedRowHashes: [],
  setSelectedRowHashes: () => { },
  selectedAttorneyByGeneralAttorneyDashboard: null,
  setSelectedAttorneyByGeneralAttorneyDashboard: () => { },
  countProcessDeadlineSchedule: {
    deadline_today: 0,
    deadline_tomorrow: 0,
    deadline_week: 0,
  },
  setCountProcessDeadlineSchedule: () => { }
});

export const UseSharedState = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage?.getItem("token");
  const defaultUser: UserProps | null = token ? jwtDecode(token) : null;
  const defaultSelectedUser = localStorage?.getItem("selectedUser");
  const defaultSelected = defaultSelectedUser
    ? decryptData(defaultSelectedUser)
    : null;
  const [user, setUser] = useState<UserProps | null>(defaultUser);
  const [userPosition, setUserPosition] = useState<string>(localStorage?.getItem("userPosition"));
  const [selectedUser, setSelectedUser] = useState<SelectedUserProps | null>(
    defaultSelected
  );
  const homePage = localStorage?.getItem("homePage");
  const [homeLink, setHomeLink] = useState<string | null>(homePage);

  const [menu, setMenu] = useState<GetProfileMenusResponse>(
    {} as GetProfileMenusResponse
  );

  const [pagination, setPagination] = useState<PaginationProps>(
    {} as PaginationProps
  );
  const [selectedRowHashes, setSelectedRowHashes] = useState<number[]>([]);
  const [selectedDataTable, setSelectedDataTable] = useState<any[]>([]);
  const [selectedProcessoInActionDataTable, setSelectedProcessoInActionDataTable] = useState<ProcessoInAction[]>([]);
  const [selectedInactionDataTable, setSelectedInactionDataTable] = useState<Inaction[]>([]);
  const [selectedRedistributionDataTable, setSelectedRedistributionDataTable] = useState<Redistribution[]>([]);
  const [
    selectedAttorneyByGeneralAttorneyDashboard,
    setSelectedAttorneyByGeneralAttorneyDashboard,
  ] = useState(null);
  const [
    countProcessDeadlineSchedule,
    setCountProcessDeadlineSchedule,
  ] = useState({
    deadline_today: 0,
    deadline_tomorrow: 0,
    deadline_week: 0,
  });

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        userPosition,
        setUserPosition,
        selectedUser,
        setSelectedUser,
        homeLink,
        setHomeLink,
        menu,
        setMenu,
        pagination,
        setPagination,
        selectedDataTable,
        setSelectedDataTable,
        selectedProcessoInActionDataTable,
        setSelectedProcessoInActionDataTable,
        selectedInactionDataTable,
        setSelectedInactionDataTable,
        selectedRedistributionDataTable,
        setSelectedRedistributionDataTable,
        selectedRowHashes,
        setSelectedRowHashes,
        selectedAttorneyByGeneralAttorneyDashboard,
        setSelectedAttorneyByGeneralAttorneyDashboard,
        countProcessDeadlineSchedule,
        setCountProcessDeadlineSchedule,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const SharedState = () => {
  const context = useContext(MyContext);
  if (!context) {
    console.error("Context is not defined");
  }
  const {
    user,
    setUser,
    userPosition,
    setUserPosition,
    selectedUser,
    setSelectedUser,
    homeLink,
    setHomeLink,
    menu,
    setMenu,
    pagination,
    setPagination,
    selectedDataTable,
    setSelectedDataTable,
    selectedProcessoInActionDataTable,
    setSelectedProcessoInActionDataTable,
    selectedInactionDataTable,
    setSelectedInactionDataTable,
    selectedRedistributionDataTable,
    setSelectedRedistributionDataTable,
    selectedRowHashes,
    setSelectedRowHashes,
    selectedAttorneyByGeneralAttorneyDashboard,
    setSelectedAttorneyByGeneralAttorneyDashboard,
    countProcessDeadlineSchedule,
    setCountProcessDeadlineSchedule
  } = context;
  return {
    user,
    setUser,
    userPosition,
    setUserPosition,
    selectedUser,
    setSelectedUser,
    homeLink,
    setHomeLink,
    menu,
    setMenu,
    pagination,
    setPagination,
    selectedDataTable,
    setSelectedDataTable,
    selectedProcessoInActionDataTable,
    setSelectedProcessoInActionDataTable,
    selectedInactionDataTable,
    setSelectedInactionDataTable,
    selectedRedistributionDataTable,
    setSelectedRedistributionDataTable,
    selectedRowHashes,
    setSelectedRowHashes,
    selectedAttorneyByGeneralAttorneyDashboard,
    setSelectedAttorneyByGeneralAttorneyDashboard,
    countProcessDeadlineSchedule,
    setCountProcessDeadlineSchedule
  };
};

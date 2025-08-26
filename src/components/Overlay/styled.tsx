import styled from "styled-components";
import { SideBarStyleProps } from "../SideBar/side-bar.interface";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.midnightBlue};
  display: flex;
  flex-direction: column;
`;

export const DashboardContainer = styled.div`
  display: flex;
  /* height: 100vh; */
  height: calc(100vh - 60px);
`;

export const DashboardContent = styled.main<SideBarStyleProps>`
  /* display: ${({ isSideBarOpen }) => (!isSideBarOpen ? "flex" : "none")}; */
  flex-grow: 1;
  max-height: 100vh;
  overflow-y: auto;

  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const ModalsWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  left: 10px;
  bottom: 10px;
  z-index: 99999;
`;

//max-height: calc(100vh - 90px);
//overflow-y: auto;

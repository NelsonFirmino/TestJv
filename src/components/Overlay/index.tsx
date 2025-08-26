import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { SideBar } from "../SideBar";
import * as S from "./styled";

const Overlay = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  return (
    <S.Container>
      <Header
        ToogleSideMenu={() => setShowSideMenu(!showSideMenu)}
        SideMenuIsOpen={showSideMenu}
      />
      <S.DashboardContainer>
        <SideBar
          isSideBarOpen={showSideMenu}
          setSideBarOpen={setShowSideMenu}
        />
        <S.DashboardContent isSideBarOpen={showSideMenu}>
          <Outlet />
        </S.DashboardContent>
        <S.ModalsWrapper>
          {/* <HelpModal />
          <EvaluateModal /> */}
        </S.ModalsWrapper>
      </S.DashboardContainer>
    </S.Container>
  );
};

export default Overlay;

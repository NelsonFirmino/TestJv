import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SharedState } from "../../context/SharedContext";
import { PROFILES } from "../../enums/PROFILES.enum";
import { useMenuProfile } from "../../hooks/useMenuProfile";
import EvaluateModal from "../EvaluateModal";
import HelpModal from "../HelpModal";
import { Logout } from "./Logout";
import { Option } from "./Option";
import { SideBarProps } from "./side-bar.interface";
import * as S from "./styled";

export const SideBar = ({ isSideBarOpen, setSideBarOpen }: SideBarProps) => {
  const location = useLocation();
  const { user, homeLink, userPosition } = SharedState();
  const { menuProfile } = useMenuProfile(+user["jvris.User.Perfil"]);
  const mProf = { ...menuProfile };

  const [selectedOption, setSelectOption] = useState<number>(
    +localStorage.getItem("selectedMenu")
  );

  const [isOpenModal, setOpenModal] = useState(false);

  const menu = mProf?.data?.find((m) =>
    m.listMenuFilhos.find((m) => m.txPagina === location.pathname)
  );

  if (menu) {
    localStorage.setItem("selectedMenu", menu.id.toString());
  }

  const handleSelectedOption = (id: number) => {
    if (id === selectedOption) {
      setSelectOption(null);
    } else {
      setSelectOption(id);
    }
  };

  const handleWrapperClick = () => {
    setSideBarOpen(false);
  };

  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <S.Wrapper isSideBarOpen={isSideBarOpen} onClick={handleWrapperClick}>
      <S.SideBarContainer onClick={handleContainerClick}>
        <S.SideBarContentContainer>
          <S.UserProfileContainer>
            <S.UserName isSideBarOpen={isSideBarOpen}>
              {user["Jvris.User.Name"]}
            </S.UserName>
            <S.UserPosition isSideBarOpen={isSideBarOpen}>
              {userPosition}
            </S.UserPosition>
            <S.SideBarTitle
              onClick={handleWrapperClick}
              isSideBarOpen={isSideBarOpen}
              to={homeLink}
            >
              <S.HomeIcon size={20} />
              <S.TextOptionSideBar isSideBarOpen={isSideBarOpen}>
                Inicial
              </S.TextOptionSideBar>
            </S.SideBarTitle>
            {+user["jvris.User.Perfil"] === PROFILES.PROCURADOR && (
              <>
                <S.AdvisorsButton
                  onClick={handleWrapperClick}
                  isSideBarOpen={isSideBarOpen}
                  to="/dashboard/gerenciamento/assessores"
                >
                  <S.AdvisorsIcon size={20} />
                  <S.TextOptionSideBar isSideBarOpen={isSideBarOpen}>
                    Assessores
                  </S.TextOptionSideBar>
                </S.AdvisorsButton>

                {/* <S.AdvisorsButton
                  isSideBarOpen={isSideBarOpen}
                  to="/dashboard/gerenciamento/credenciais"
                >
                  <S.TextOptionSideBar isSideBarOpen={isSideBarOpen}>
                    Credenciais
                  </S.TextOptionSideBar>
                </S.AdvisorsButton> */}
              </>
            )}
            {+user["jvris.User.Perfil"] === PROFILES.ASSESSOR_DE_PROCURADOR &&
              (user["Jvris.User.Id"] == "1218" ||
                user["Jvris.User.Id"] == "1213") && (
                <>
                  <S.AdvisorsButton
                    onClick={handleWrapperClick}
                    isSideBarOpen={isSideBarOpen}
                    to="/dashboard/gerenciamento/patrimonios"
                  >
                    <S.PatrimoniosIcon size={20} />
                    <S.TextOptionSideBar isSideBarOpen={isSideBarOpen}>
                      Patrimônios
                    </S.TextOptionSideBar>
                  </S.AdvisorsButton>
                </>
              )}
          </S.UserProfileContainer>

          <S.SideBarOptionsContainer>
            {mProf?.data?.map((d) => (
              <Option
                data={d}
                handleSelectedOption={handleSelectedOption}
                selectedOption={selectedOption}
                isSideBarOpen={isSideBarOpen}
                setSideBarOpen={setSideBarOpen}
                key={d.id}
              />
            ))}
          </S.SideBarOptionsContainer>
          <S.LogoutContainer>
            <Logout isSideBarOpen={isSideBarOpen} />
          </S.LogoutContainer>
          <S.GenericButtonContainer>
            <HelpModal />
            <EvaluateModal />
          </S.GenericButtonContainer>
        </S.SideBarContentContainer>
      </S.SideBarContainer>
    </S.Wrapper>
  );
};

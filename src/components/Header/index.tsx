import { List } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import jvrisLogo from "../../assets/jvris-logo.png";
import { SharedState } from "../../context/SharedContext";
import { PROFILES } from "../../enums/PROFILES.enum";
import theme from "../../globalStyle/theme";
import { Logout } from "../SideBar/Logout";
import { SelectUser } from "./components/SelectUser";
import { HeaderProps } from "./interface/header.interface";
import * as S from "./styles";

export const Header = ({ ToogleSideMenu }: HeaderProps) => {
  const { user, homeLink } = SharedState();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 450);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <S.HeaderContainer>
      {+user["jvris.User.Perfil"].includes(PROFILES.ANALISTA.toString()) ||
      +user["jvris.User.Perfil"].includes(
        PROFILES.ASSESSOR_PROCURADOR.toString()
      ) ||
      +user["jvris.User.Perfil"].includes(
        PROFILES.ASSESSOR_DE_PROCURADOR.toString()
      ) ? (
        <S.MainContainer>
          <S.ContainerLogo>
            <S.LogoContainer to={homeLink}>
              <S.Logo
                src={jvrisLogo}
                alt="Logotipo do sistema Jvris de um templo branco com três pilares."
              />
            </S.LogoContainer>

            <S.IconContainer
              onClick={() => {
                ToogleSideMenu();
              }}
            >
              <List size={16} color={theme.colors.lightGrey} weight="fill" />
            </S.IconContainer>
          </S.ContainerLogo>

          <S.ContainerSelect>
            <SelectUser />
            <Logout isSideBarOpen={true} />
          </S.ContainerSelect>
        </S.MainContainer>
      ) : (
        <S.MainContainer2>
          <S.ContainerLogo>
            <S.LogoContainer to={homeLink}>
              <S.Logo
                src={jvrisLogo}
                alt="Logotipo do sistema Jvris de um templo branco com três pilares."
              />
            </S.LogoContainer>

            <S.IconContainer
              onClick={() => {
                ToogleSideMenu();
              }}
            >
              <List size={16} color={theme.colors.lightGrey} weight="fill" />
            </S.IconContainer>
          </S.ContainerLogo>
          <Logout isSideBarOpen={true} />
        </S.MainContainer2>
      )}
    </S.HeaderContainer>
  );
};

import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.midnightBlue};
  min-height: 60px;
  width: 100vw;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
  padding: 0.5rem 2rem;
  flex-wrap: wrap;
  @media (max-width: 450px) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const LogoContainer = styled(Link)``;

export const Logo = styled.img`
  width: 22rem;
  user-select: none;
`;
export const IconContainer = styled.div`
  margin: 0px 12px;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkerGrey};
  }
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 450px) {
    flex-wrap: wrap;
  }
`;

export const MainContainer2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ContainerLogo = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 450px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const ContainerSelect = styled.div`
  display: flex;
  margin-left: auto;
  gap: 1rem;

  @media (max-width: 450px) {
    width: 100%;
    gap: 0rem;
    justify-content: space-between;
  }
`;
export const ContainerSelectRight = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
  /* gap: 1rem; */

  @media (max-width: 450px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const ContainerLogout = styled.div`
  margin-left: 1rem;
`;

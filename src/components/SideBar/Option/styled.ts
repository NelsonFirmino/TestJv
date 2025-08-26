import { CaretLeft, CaretRight } from "phosphor-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

type OpenProps = {
  open?: boolean;
  isSideBarOpen?: boolean;
};

export const SubBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors["gray/50"]};
  height: 100%;
  width: 80%;
  border-right: 1px solid ${({ theme }) => theme.colors["gray/300"]};
`;

export const ArrowRightIcon = styled(CaretRight)<OpenProps>`
  font-size: 1.5rem;
  margin-left: auto;
  color: ${({ theme, open }) =>
    open ? theme.colors.jvrisAqua : theme.colors["blue/500"]};
  transition: all 500ms;
  transform: ${({ open }) => (open ? "rotate(90deg)" : "rotate(360deg)")};
  opacity: ${({ isSideBarOpen }) => (isSideBarOpen ? "1" : "0")};
  display: ${({ isSideBarOpen }) => (isSideBarOpen ? "flex" : "none")};
`;

export const TextMenu = styled.span<OpenProps>`
  font-size: 1.2rem;
  margin-left: 0.5rem;
  display: inline-block;
  transition: all 200ms;
  opacity: ${({ isSideBarOpen }) => (isSideBarOpen ? "1" : "0")};
  display: ${({ isSideBarOpen }) => (isSideBarOpen ? "flex" : "none")};
`;

export const OptionSideBarSubBar = styled.div<OpenProps>`
  color: ${({ theme }) => theme.colors["blue/500"]};
  display: flex;
  align-items: center;
  justify-content: ${({ isSideBarOpen }) => (isSideBarOpen ? "end" : "center")};
  font-size: 1.2rem;
  padding: 1rem 0;
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors["gray/200"]};

  & > svg {
    transition: all 200ms;
    color: ${({ theme, open }) => (open ? theme.colors.jvrisAqua : "")};
  }
`;

export const DescriptionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubBarTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const SubBarTitle = styled.h3`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors["gray/700"]};
`;

export const SubBarOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ContainerBackSideBar = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  cursor: pointer;
`;

export const BackText = styled.span`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors["gray/700"]};
  font-weight: bold;
`;

export const BackIcon = styled(CaretLeft)`
  font-size: 1.5rem;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.colors["gray/700"]};
`;

export const SubOptionsContainer = styled.div<OpenProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 200ms;
  padding-right: 0.2rem;
  max-height: ${({ open }) => (open ? "25rem" : "0")};
  overflow-y: hidden;

  &:hover {
    overflow-y: auto;
  }

  @media (max-width: 450px) {
    overflow-y: auto;
  }
`;

export const OptionSubBarDirectLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors["blue/500"]};
  display: flex;
  font-size: 1.2rem;
  padding: 1rem;
  text-decoration: none;
  border-radius: 1rem;
  transition: background-color 200ms;
  margin-left: 1rem;
  margin-top: 0.5rem;

  &.active {
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
    color: ${({ theme }) => theme.colors.white};
  }
`;

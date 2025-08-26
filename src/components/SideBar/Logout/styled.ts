import { SignOut } from "phosphor-react";
import styled from "styled-components";

type OpenProps = {
  isSideBarOpen: boolean;
};

export const Wrapper = styled.div<OpenProps>`
  display: flex;
  align-items: center;
  transition: all 200ms;
  justify-content: ${({ isSideBarOpen }) =>
    isSideBarOpen ? "start" : "center"};
  padding: 1rem;
  border: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.darkRed};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkerRed};
  }
`;

export const ExitIcon = styled(SignOut)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.white};
  transition: color 0.5s;
  margin-right: 0.5rem;
`;

export const Text = styled.span<OpenProps>`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
  opacity: ${({ isSideBarOpen }) => (isSideBarOpen ? "1" : "0")};
  width: ${({ isSideBarOpen }) => (isSideBarOpen ? "auto" : "0")};
`;

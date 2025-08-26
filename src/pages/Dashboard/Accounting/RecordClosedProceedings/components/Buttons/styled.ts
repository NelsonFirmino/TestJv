import { ArrowCounterClockwise, Eye, FileText } from "phosphor-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

export const LinkPage = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.darkgrey_2};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.15rem;
  text-decoration: none;
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.darkgrey_2};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.15rem;
  text-decoration: none;
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const DocumentIcon = styled(FileText)`
  font-size: 1.4rem;
`;

export const EyeIcon = styled(Eye)`
  font-size: 1.4rem;
`;

export const ReturnIcon = styled(ArrowCounterClockwise)`
  font-size: 1.4rem;
`;

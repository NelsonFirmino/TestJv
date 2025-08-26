import { Chats, Download, Info, MagnifyingGlass, Trash } from "phosphor-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    margin-left: auto;
    width: fit-content;
` 

export const ActionButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.grey};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  transition: all 500ms;
  margin-left: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
  }
`  

export const SeeActDetails = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.grey};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
  }
`;

export const SeeActDetailsIcon = styled(MagnifyingGlass)`
  font-size: 1.4rem;
  color: white;
`;

export const DownloadIcon = styled(Download)`
  font-size: 1.4rem;
  color: white;
`;

export const InfoObservationIcon = styled(Trash)`
  font-size: 1.3rem;
  color: white;
`;
import { ArrowBendDownRight, Info } from "@phosphor-icons/react";
import styled from "styled-components";

type MoreInfoParams = {
  showInfo: boolean;
};

export const RowTablePreviousProcedure = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  transition: background-color 200ms;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #dedede;
  }
`;

export const MoreInfoIcon = styled(ArrowBendDownRight)`
  font-size: 3rem;
  margin-right: 1rem;
`;

export const MoreInfoText = styled.span`
  display: inline-block;
  font-size: 1.1rem;

  & b,
  span,
  p {
    font-size: 1rem;
  }
`;

export const MoreInfo = styled.td<MoreInfoParams>`
  transition: all 200ms;
  display: ${({ showInfo }) => (showInfo ? "0" : "none")};
  opacity: ${({ showInfo }) => (showInfo ? 1 : 0)};
  height: ${({ showInfo }) => (showInfo ? "auto" : 0)};
  vertical-align: middle;

  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #dedede;
  }

  width: 100%;
`;

export const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const MainTd = styled.td`
  font-weight: bold;
`;

export const Td = styled.td`
  max-width: 100px; /* Or whatever maximum width you want */
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 !important;
`;

export const ButtonTD = styled.td`
  display: flex;
`;

export const InfoButtonTable = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.grey};
  object-fit: cover;
  cursor: pointer;
  transition: background-color 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
  }
`;

export const InfoObservationIcon = styled(Info)`
  font-size: 1.2rem;
  color: white;
`;

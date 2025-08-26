import {
  Chats,
  Download,
  Info,
  MagnifyingGlass,
  Plus,
  Shuffle,
  Trash,
} from "phosphor-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);

  td {
    padding: 10px;
    text-align: left;
    font-size: 1.2rem;
  }
`;

export const Thead = styled.thead``;

export const RowTable = styled.tr`
  background-color: #f2f2f2;
`;

export const Th = styled.th`
  padding: 10px;
  text-align: left;
  font-size: 1.2rem;
`;

export const ButtonTh = styled.th`
  width: 5%;
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
`;

export const TBody = styled.tbody``;

export const RowTableObservation = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  transition: background-color 200ms;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #dedede;
  }
`;

export const RowMessage = styled.td`
  font-size: 1.4rem;
  padding: 2rem;

  &:hover {
    background-color: #dedede;
  }
`;

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

export const Td = styled.td`
  color: "black";
`;

export const LinkPart = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 1.2rem;
  color: blue;
  cursor: pointer;
`;

export const IconLink = styled(MagnifyingGlass)`
  margin-left: 0.5rem;
  font-size: 1.5rem;
  cursor: "pointer";
`;

export const AddObservationButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin-left: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.grey};
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
  }
`;

export const IconAddObservation = styled(Plus)`
  font-size: 1.5rem;
  cursor: "pointer";
  color: white;
`;

export const IconProcessLinksInvert = styled(Shuffle)`
  font-size: 1.5rem;
  cursor: "pointer";
  color: white;
  translate: rotate(-180deg);
`;

export const IconProcessLinks = styled(Shuffle)`
  font-size: 1.5rem;
  cursor: "pointer";
  color: white;
`;

export const ButtonTD = styled.td`
  display: flex;
`;

export const RemoveButtonTable = styled.div`
  text-align: right;
  display: flex;
  margin: auto;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.grey};
  object-fit: cover;
  cursor: pointer;
  transition: background-color 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.softRed};
  }
`;

export const DownloadAttachmentButtonTable = styled.div`
  text-align: right;
  display: flex;
  margin: auto;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.grey};
  object-fit: cover;
  cursor: pointer;
  transition: background-color 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.saveGreenButtonHover};
  }
`;

export const DownloadAttachmentIcon = styled(Download)`
  font-size: 1.3rem;
`;

export const RemoveObservationIcon = styled(Trash)`
  font-size: 1.2rem;
`;

export const SeeActDetails = styled(Link)`
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

export const SeeActButtonTable = styled.div`
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

export const SeeActObservationIcon = styled(MagnifyingGlass)`
  font-size: 1.2rem;
  color: white;
`;

export const AddObservationIcon = styled(Chats)`
  font-size: 1.2rem;
  color: white;
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

export const LoadingSpinner = styled.div`
  animation: is-rotating 1s infinite;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 2rem;
  width: 2rem;
  margin: auto;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;

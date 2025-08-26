import { Plus, Trash, XCircle } from "phosphor-react";
import styled from "styled-components";
import Select from "react-select";
import { MagnifyingGlass } from "phosphor-react";
import { CheckFat } from "@phosphor-icons/react";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
  width: 100%;
  transition: all 500ms;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background-color: white;
  min-width: 80rem;
  min-height: 40rem;
  max-height: 50rem;
  overflow: hidden;
  overflow-y: auto;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const TitleModal = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
`;

export const CloseModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseIcon = styled(XCircle)`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
  transition: all 500ms;

  &:hover {
    color: ${({ theme }) => theme.colors.softRed};
  }
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: 2rem;
`;

export const ContainerTable = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const Form = styled.form`
  width: 100%;
`;

export const ContentSection = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));

  &:not(last-child) {
    margin-bottom: 2rem;
  }
`;

export const ContainerField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-bottom: 0.5rem;
`;

export const CustomSelect = styled(Select)`
  width: 100%;
  min-width: 13rem;
  * {
    font-size: 1.3rem;
  }
`;

export const TextInput = styled.input`
  flex: auto;
  font-size: 1.3rem;
  height: 3.6rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  text-indent: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b7b9bb;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 500ms;
  margin-left: auto;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.lightGray};

  &:hover {
    background-color: #1ca59e;
  }

  &:active {
    background-color: #166c68;
  }
`;

export const SearchIcon = styled(MagnifyingGlass)`
  font-size: 2rem;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerObservationTable = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;
`;

export const Title = styled.h2`
  text-align: left;
  font-size: 1.4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  padding-bottom: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: left;
    font-size: 1.2rem;
  }
`;

export const ObservationContainer = styled.div`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: left;
    font-size: 1.2rem;
  }
`;

export const RowTable = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const RowTableObservation = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  &:nth-child(odd) {
    background-color: #f1f2f7;
  }
`;

export const MainTh = styled.th`
  width: 90%;
`;

export const MainTd = styled.td`
  width: 90%;
`;

export const SecundaryTh = styled.td`
  width: 10%;
`;

export const SecundaryTd = styled.td`
  vertical-align: middle;
`;

export const WarningNotFound = styled.p`
  margin: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.softOrange};
`;

export const AddPartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b7b9bb;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 500ms;
  margin-left: auto;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.lightGray};

  &:hover {
    background-color: #1ca59e;
  }

  &:active {
    background-color: #166c68;
  }
`;

export const MainPartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b7b9bb;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 500ms;

  &:not(last-child) {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.softGreen};
  }

  &:active {
    background-color: #3c7b3c;
  }
`;

export const CheckIcon = styled(CheckFat)`
  font-size: 1.2rem;
  color: white;
`;

export const AddIcon = styled(Plus)`
  font-size: 1.3rem;
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

export const FormObservation = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

export const ContainerSubmitObservation = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

export const SubmitObservationForm = styled.button`
  text-decoration: none;
  outline: none;
  background-color: ${({ disabled }) => (disabled ? "#b7b9bb" : " #1ca59e")};
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 500ms;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.lightGray};
  border: none;

  &:active {
    background-color: ${({ disabled }) => (disabled ? "#b7b9bb" : "#166c68")};
  }
`;

export const WarningMessage = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const LoadingSpinnerObservation = styled.div`
  animation: is-rotating 1s infinite;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 2rem;
  width: 2rem;
  margin-left: 1rem;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;

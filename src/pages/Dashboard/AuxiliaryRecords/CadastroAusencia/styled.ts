import { CurrencyDollar, Eye, Plus, X } from "@phosphor-icons/react";
import styled from "styled-components";
import Select from "react-select";
import { Download, Info, List, ListBullets, Trash } from "phosphor-react";
import { Link } from "react-router-dom";

type ErrorDate = {
  error: string | undefined;
};

type TextUrgencyProps = {
  isUrgent: boolean;
};

export const Wrapper = styled.div``;

export const InvalidParam = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 2rem;
`;

export const StateProcessMessage = styled.span`
  display: flex;
`;

export const PageIcon = styled(ListBullets)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const RedirectPage = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 50%;
  margin-left: auto;
  width: 4rem;
  height: 4rem;
  transition: all 500ms;
  background-color: ${({ theme }) => theme.colors.pageButton};

  &:hover {
    background-color: ${({ theme }) => theme.colors.pageButtonDark};
  }
`;

export const RedirectPageIcon = styled(List)`
  font-size: 2rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;

  &:not(last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.lighterGray};
  }
`;

export const TitleSectionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

export const TitleSection = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const ContentSection = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));

  &:not(last-child) {
    margin-bottom: 2rem;
  }
`;

export const NotFound = styled.div`
  display: flex;
  border-radius: 1rem;
  padding: 1rem;
  background-color: rgba(236, 218, 19, 0.348);
  font-size: 1rem;
`;

export const AddAudienceButton = styled.div`
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

export const IconAddAudience = styled(Plus)`
  font-size: 1.5rem;
  cursor: "pointer";
  color: white;
`;

export const ContainerField = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
`;

export const ContainerRemoveAudience = styled.div`
  display: flex;
  margin-left: auto;
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

export const RemoveAudienceIcon = styled(Trash)`
  font-size: 1.2rem;
`;

export const ContainerFieldTextArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldTitle = styled.h3`
  display: flex;
  position: relative;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-bottom: 0.5rem;
  align-items: center;
`;

export const FieldContainer = styled.div`
  display: flex;
`;

export const ContainerAudience = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
  background-color: rgba(236, 218, 19, 0.348);
  border-radius: 1rem;
  font-size: 1.2rem;
`;

export const AudienceTitle = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

export const AudienceDate = styled.span`
  font-size: 1.2rem;
  margin-left: 0.5rem;
  font-weight: bold;
`;

export const WarningTiteFileMessage = styled.span`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const WarningFileMessage = styled.span`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.darkRed};
`;

export const LinkOpenFile = styled.a`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const WarningFileSize = styled.span`
  display: inline-block;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.softRed};
`;

export const Text = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.softOrange};
  font-weight: bold;
`;

export const TextInput = styled.input`
  flex: auto;
  font-size: 1.3rem;
  height: 3.6rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  text-indent: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;

  background-color: ${({ disabled }) => (disabled ? "#f2f2f2" : "")};
  border-color: ${({ disabled }) => (disabled ? "#e6e6e6" : "")};
  color: ${({ disabled }) => (disabled ? "#999999" : "")};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const TextInputUrgency = styled.input<TextUrgencyProps>`
  flex: auto;
  font-size: 1.3rem;
  height: 3.6rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  text-indent: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;

  background-color: ${({ disabled }) => (disabled ? "#f2f2f2" : "")};
  border-color: ${({ disabled }) => (disabled ? "#e6e6e6" : "")};
  color: ${({ isUrgent }) => (isUrgent ? "#d01e1e" : "#2215dd")};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const TextAreaInput = styled.textarea`
  flex: auto;
  font-size: 1.3rem;
  min-height: 12rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  text-indent: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.5rem;
  padding: 1rem 0.2rem;
  width: 100%;
`;

export const DateContainer = styled.div`
  display: flex;
`;

export const DateContent = styled.div<ErrorDate>`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.lighterGrey};
  border: 1px solid
    ${({ theme, error }) => (error ? "#ca0000" : theme.colors.lighterGrey)};

  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.grey};
  }
`;

export const DateDescription = styled.span`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

export const DateInput = styled.input`
  font-size: 1.5rem;
  border: none;
  outline: none;
  background: none;
`;

export const CustomSelect = styled(Select)`
  width: 100%;
  * {
    font-size: 1.3rem;
  }
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

export const LoadingSpinnerSave = styled.div`
  animation: is-rotating 1s infinite;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 2rem;
  width: 2rem;
  margin: auto 0 auto 1rem;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const ContainerTable = styled.div`
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
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

  td {
    padding: 10px;
    text-align: left;
    font-size: 1.2rem;
  }
`;

export const ObservationContainer = styled.div`
  width: 100%;
  border-collapse: collapse;

  td {
    padding: 10px;
    text-align: left;
    font-size: 1.2rem;
  }
`;

export const RowTable = styled.tr`
  background-color: #f2f2f2;
`;

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

export const Th = styled.th`
  padding: 10px;
  text-align: left;
  font-size: 1.2rem;
`;

export const MainTd = styled.td`
  width: 90%;
`;

export const SecundaryTh = styled.td`
  width: 10%;
`;

export const ButtonTh = styled.th`
  padding: 10px;
  text-align: left;
  font-size: 1.2rem;
  width: 5%;
`;

export const WarningNotFound = styled.p`
  margin: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.softOrange};
`;

export const ButtonTD = styled.td`
  display: flex;
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

export const SeeButtonTable = styled.div`
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
    background-color: ${({ theme }) => theme.colors.saveGreenButtonHover};
  }

  &:not(last-child) {
    margin-right: 0.5rem;
  }
`;

export const RemoveButtonTable = styled.div`
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
    background-color: ${({ theme }) => theme.colors.softRed};
  }

  &:not(last-child) {
    margin-right: 0.5rem;
  }
`;

export const SeeIcon = styled(Eye)`
  font-size: 1.2rem;
`;

export const RemoveIcon = styled(X)`
  font-size: 1.2rem;
`;

export const FileInput = styled.input`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

export const SaveButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
`;

export const SaveButton = styled.button`
  border-radius: 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  outline: none;
  border: none;
  width: 15rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  font-size: 1.2rem;
  transition: all 500ms;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray : theme.colors.saveGreenButtonNormal};

  &:hover {
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors.gray : theme.colors.saveGreenButtonHover};
  }

  &:active {
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors.gray : theme.colors.saveGreenButtonActive};
  }
`;

export const LettersCounter = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.jvrisAquaDark};
  margin-left: auto;
`;

export const InfoText = styled.div`
  padding: 1rem;
  display: none;
  position: absolute;
  left: 0;
  bottom: 2.5rem;
  z-index: 1;
  width: fit-content;
  border-radius: 1rem;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.jvrisAquaDark};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
  height: fit-content;
  min-width: 20rem;
  max-width: fit-content;
`;

export const InfoContainerField = styled.div`
  position: relative;
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover ${InfoText} {
    display: flex;
  }
`;

export const InfoIcon = styled(Info)`
  font-size: 1.8rem;
`;

export const ContainerContentTable = styled.div`
  flex: 1;
  &:not(:last-child) {
    margin-right: 10rem;
  }
`;

export const TableTitle = styled.h3`
  display: flex;
  position: relative;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-bottom: 1rem;
`;

export const Thead = styled.thead``;

export const TBody = styled.tbody``;

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

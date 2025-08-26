import {
  Chats,
  Download,
  File,
  Folder,
  Info,
  MagnifyingGlass,
  Note,
  Paperclip,
  Plus,
  Shuffle,
  Trash,
  UsersThree,
} from "@phosphor-icons/react";
import { Monitor, Pencil } from "phosphor-react";
import { Link } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import styled from "styled-components";

export const CustomAutocomplete = styled(AsyncSelect)`
  width: 100%;
  min-width: 33rem;
  * {
    font-size: 1.3rem;
  }
`;

export const PageIcon = styled(Monitor)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const InvalidParam = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 2rem;
`;

export const TitlePage = styled.h2`
  color: ${({ theme }) => theme.colors.titlePage};
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RelevanceContainer = styled.div`
  position: relative;
  display: flex;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: rgba(217, 83, 79, 0.2);
  color: rgba(217, 83, 79, 1);
  font-size: 1.2rem;
  margin: 1rem;
`;

export const WarningRelevance = styled.span`
  font-weight: bold;
  color: rgba(217, 83, 79, 1);
  font-size: 1.2rem;
  margin-right: 1rem;
`;

export const Relevance = styled.span`
  color: rgba(217, 83, 79, 1);
  font-weight: bold;
  font-size: 1.2rem;
  margin-left: 0.1rem;
`;

export const RelevanceImg = styled.img`
  position: absolute;
  right: 5%;
  top: -70%;
  width: 10rem;
`;

export const SectionDataIcon = styled(Folder)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const SectionPartsIcon = styled(UsersThree)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const SectionObservationsIcon = styled(Note)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const SectionProcessLinksIcon = styled(Shuffle)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const SectionProcessLinksBeforeIcon = styled(Shuffle)`
  font-size: 2rem;
  margin-right: 1rem;
  transform: rotate(-180deg);
`;

export const SectionProcessActsIcon = styled(File)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const SectionProcessAttachmentsIcon = styled(Paperclip)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  padding-bottom: 2rem;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.lighterGray};
  }
`;

export const SectionResumeProcess = styled.section`
  display: flex;
  padding: 1rem;
  margin: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lighterGray};
`;

export const TitleSectionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const TitleSectionDataContainer = styled.div`
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

export const ContainerTagValue = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.darkerGrey};
  width: 10rem;
  height: 3rem;
`;

export const ProcessoCorrespondenteContainerField = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  padding: 1rem;
  margin-left: 2rem;
  max-width: 25rem;
  border-radius: 8px;
  color: white;
  :hover {
    cursor: pointer;
  }
`;

export const ContainerField = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
`;

export const FieldTitle = styled.h3`
  display: flex;
  position: relative;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors["gray/900"]};
`;

export const TableTitle = styled.h3`
  display: flex;
  position: relative;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-top: 2rem;
`;

type TextProps = {
  relevancia?: string;
};

export const NumProcessContainer = styled.div`
  display: flex;
`;

export const Text = styled.span<TextProps>`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors["gray/600"]};
  font-weight: bold;
`;

export const GrauProcess = styled.span`
  display: inline-block;
  align-items: center;
  margin-left: 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  background-color: #295d94;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

export const TextRelevancia = styled.span<TextProps>`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.gray};
  color: ${({ relevancia, theme }) => relevancia !== "Normal" && "#AC0D00"};
  font-weight: bold;
`;

export const ContainerTable = styled.div`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const ContainerContentTable = styled.div`
  flex: 1;
  &:not(:last-child) {
    margin-right: 10rem;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;
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

export const LinkProcess = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: blue;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray};
  transition: 500ms all;

  &:hover {
    background-color: ${({ theme }) => theme.colors.softYellow};
  }
`;

export const LinkRegisterAct = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: blue;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray};
  transition: 500ms all;

  &:hover {
    background-color: ${({ theme }) => theme.colors.softYellow};
  }
`;

export const IconLinkProcess = styled(Pencil)`
  font-size: 1.5rem;
  cursor: "pointer";
  color: white;
`;

export const IconLinkAct = styled(Plus)`
  font-size: 1.5rem;
  cursor: "pointer";
  color: white;
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

export const ButtonTable = styled.div`
  text-align: right;
  display: flex;
  margin: auto;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.grey};
  cursor: pointer;
  transition: background-color 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.saveGreenButtonHover};
  }
`;

export const DownloadAttachmentButtonTable = styled(ButtonTable)``;

export const RemoveAttachmentButtonTable = styled(ButtonTable)`
  width: fit-content;
  text-align: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkRed};
  }
`;

export const DownloadAttachmentIcon = styled(Download)`
  font-size: 1.3rem;
`;

export const RemoveObservationIcon = styled(Trash)`
  font-size: 1.3rem;
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

///////////////////////

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SectionTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionSearch = styled.div`
  display: flex;
  align-items: center;
`;

export const SectionSearchButton = styled.div`
  display: flex;
  align-items: center;
  transition: 300ms;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  color: white;
  outline: none;
  border: none;
  margin-left: 1rem;
  height: 3rem;

  :hover {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
  }
`;

export const FieldContainer = styled.div`
  display: flex;
`;

export const CustomSelect = styled(Select)`
  width: 30rem;
  * {
    font-size: 1.3rem;
  }
`;

export const SectionButtons = styled.div`
  margin-left: auto;
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 12rem;
`;

export const PrintButton = styled.div`
  display: flex;
  width: 11rem;
  align-items: center;
  justify-content: center;
  transition: 300ms;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.bgCleanButtonLight};
  text-align: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  color: white;
  outline: none;
  border: none;
  margin-right: 1rem;
  height: 3rem;

  :hover {
    background-color: ${({ theme }) => theme.colors.bgCleanButton};
  }
`;

export const GenericTopButton = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 500ms ease;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.grey};
  text-align: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  color: white;
  outline: none;
  border: none;
  margin-right: 1rem;
  height: 3rem;

  :hover {
    background-color: ${({ theme }) => theme.colors.darkgrey_2};
  }
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  height: 3rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const ObsAddButton = styled.button`
  font-size: 2rem;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.1rem 0.8rem;
  margin-left: 0.5rem;
  background-color: ${({ theme }) => theme.colors.darkgrey_2};

  :hover {
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    cursor: pointer;
    transition: 300ms;
  }
`;

export const SectionTitleName = styled.div`
  font-size: 1.5rem;
`;

export const SectionDataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 2rem 1rem 2rem;
  flex-wrap: wrap;
`;

export const SectionDataRowParties = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 2rem 1rem 2rem;
  flex-wrap: wrap;
`;

export const SectionDataCapsule = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 25rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const SectionDataPartiesCapsule = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const SectionDataTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

export const SectionData = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: 1rem;
  padding-right: 3rem;

  :hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;

export const SectionDataInfo = styled.div`
  font-size: 1.2rem;
  word-wrap: break-word;
`;

export const SectionValue = styled.div`
  display: flex;
  justify-content: end;
`;

export const SectionValueImg = styled.img`
  size: 20rem;
`;

export const SectionDataInfoParties = styled.div`
  font-size: 1.2rem;
  word-wrap: break-word;
  padding-right: 0.5rem;
`;

export const Active = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Passive = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionDataInfoExtractParties = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: blue;
  padding-right: 0.5rem;
  cursor: pointer;
`;

export const AttachmentsData = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
  margin-right: 5rem;
`;

export const AttachmentsTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 1.3rem;
  font-weight: bold;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const AttachmentsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

export const AttachmentsContentTitle = styled.div`
  font-size: 1.3rem;
  margin-right: 1rem;
  font-weight: bold;
`;

export const AttachmentsImport = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
`;

export const AttachmentsInput = styled.input`
  cursor: pointer;
  font-size: 1.3rem;
`;

export const ProcessDataTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 0.5rem;
`;

export const ProcessData = styled.div`
  font-size: 1.2rem;
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

export const LoadingSpinnerPost = styled.div`
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

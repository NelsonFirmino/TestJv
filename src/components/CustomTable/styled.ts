import { CheckFat } from "@phosphor-icons/react";
import { Info, X } from "phosphor-react";
import styled from "styled-components";

type TdProps = {
  isFirst: boolean;
  selectRows: boolean;
  showShadow?: boolean;
  breakTextOnFirstColumn?: boolean;
  tableFontSize?: string;
};

type CheckButtonProps = {
  checked: boolean;
};

export const ContainerTable = styled.div`
  @media (max-width: 1024px) {
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

export const Table = styled.table`
  margin-top: 1rem;
  border-collapse: collapse;
  position: relative;
  min-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
`;

export const Thead = styled.thead``;

export const Tr = styled.tr`
  border-bottom: 1px solid rgb(234, 234, 236);
  &:hover > td {
    background-color: #e2e2e2 !important;
  }

  & > td {
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:nth-child(odd) > td {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

export const ThSelectRows = styled.th`
  width: 3rem;
  padding: 0.6rem;
  border-bottom: 2px solid #1fb5ad;
  text-align: center;
  position: inherit;
  left: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const StyledCheckbox = styled.div<CheckButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: all 500ms;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  svg {
    transition: opacity 200ms;
    opacity: ${({ checked }) => (checked ? "1" : "0")};
    color: ${({ theme }) => theme.colors.blue};
  }
`;

export const CheckIcon = styled(CheckFat)`
  font-size: 1.4rem;
`;

export const CheckboxLabel = styled.label``;

export const Th = styled.th``;

export const Button = styled.button``;

export const TBody = styled.tbody``;

export const Td = styled.td<TdProps>`
  font-size: ${({ tableFontSize }) =>
    tableFontSize ? tableFontSize : "1.3rem"};
  padding: 0.6rem;
  white-space: ${({ isFirst, breakTextOnFirstColumn }) =>
    isFirst && !breakTextOnFirstColumn ? "nowrap" : "wrap"};
  font-weight: ${({ isFirst, breakTextOnFirstColumn }) =>
    isFirst && !breakTextOnFirstColumn ? "bold" : "normal"};
  position: ${({ isFirst }) => (isFirst ? "inherit" : "inherit")};
  left: ${({ selectRows }) => (selectRows ? "30px" : "0px")};
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 26rem;
  transform: all 500ms;

  &:before {
    display: ${({ showShadow }) => (showShadow ? "block" : "none")};
    box-shadow: inset 10px 0 8px -8px #00000026;
    position: absolute;
    top: 0;
    right: 0;
    bottom: -1px;
    width: 30px;
    transform: translate(100%);
    transition: box-shadow 0.3s;
    opacity: ${({ showShadow }) => (showShadow ? "1" : "0")};
    content: "";
  }
`;

type FilterContainerTableProps = {
  open: boolean;
};

export const FilterAndPaginationOptionsContainer = styled.div<FilterContainerTableProps>`
  display: ${({ open }) => (open ? "flex" : "none")};
  margin-top: 1rem;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const TextAndButtonsContainer = styled.div`
  display: flex;
  margin-right: auto;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

export const FilterInput = styled.input`
  padding: 0.8rem 0.5rem;
  width: 25rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  font-size: 1.3rem;
  outline: none;
`;

export const SelectorPageContainer = styled.div`
  display: inline-block;
  float: left;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.lighterGray};
  margin-right: 1rem;
`;

export const CustomSelect = styled.select`
  padding: 0.5rem 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1.2rem;
  appearance: none;
  background-color: #fff;
  cursor: pointer;
  outline: none;
  transition: border 0.3s ease;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 140 140" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M35 55l35 35 35-35z" fill="black"></path></svg>');
  background-repeat: no-repeat;
  background-position: 95% center;
  margin-right: 0.5rem;
  margin-left: 0.5rem;

  &:hover {
    border-color: #9e9e9e;
  }

  &:focus {
    border-color: #64b5f6;
  }
`;

export const CustomOption = styled.option`
  font-size: 1.2rem;
  padding: 10px;
  background-color: #f5f5f5;
`;

export const TextSelect = styled.span`
  font-size: 1.2rem;
`;

export const TdLoading = styled.td``;

export const LoadingSpinner = styled.div`
  animation: is-rotating 1s infinite;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 2rem;
  width: 2rem;
  margin: auto;
  margin-top: 2rem;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const InfoText = styled.div`
  padding: 1rem;
  display: none;
  position: absolute;
  right: 0;
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

export const TodayButtonWrapper = styled.div`
  display: flex;
`;

export const TodayButton = styled.div`
  cursor: pointer;
  display: flex;
  width: 4.5rem;
  height: 4.5rem;
  align-items: center;
  justify-content: center;
  /* padding: 1rem; */
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${({ theme }) => theme.colors.softYellow};
  /* background-color: #ff7900; */
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.softYellowDark};
    /* background-color: #ff4d00; */
  }
`;

export const TodayButtonName = styled.div`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const ClearButtonWrapper = styled.div`
  display: flex;
`;

export const ClearButton = styled.div`
  cursor: pointer;
  display: flex;
  width: 4.5rem;
  height: 4.5rem;
  align-items: center;
  justify-content: center;
  /* padding: 1rem; */
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${({ theme }) => theme.colors.grey};
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mediumGrey};
  }
`;

export const ClearButtonName = styled(X)`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const CountRows = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue};
`;

export const CountRowsText = styled.span`
  display: inline-block;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.2rem;
`;

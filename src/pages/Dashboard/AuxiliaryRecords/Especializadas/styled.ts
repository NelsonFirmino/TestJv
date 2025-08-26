import { Gear, ListBullets } from "phosphor-react";
import Select from "react-select";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 100%;
`;

export const FormContainer = styled.main`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

export const TitlePageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #f9fafb;
  background-color: ${({ theme }) => theme.colors.bgTitlePage};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const PageIcon = styled(Gear)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const TitlePage = styled.h2`
  color: ${({ theme }) => theme.colors.titlePage};
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-left: 2rem;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

export const Section = styled.section`
  display: flex;
  width: fit-content;
  flex-direction: row;
  align-items: center;
`;

export const SectionTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-right: 1rem;
  letter-spacing: 1px;
`;

export const FieldContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const LabelField = styled.label`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 1rem;
`;

export const TextInput = styled.input`
  flex: auto;
  font-size: 1.3rem;
  height: 3.6rem;
  width: 420px;
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

export const CustomSelect = styled(Select)`
  width: 100%;
  * {
    font-size: 1.3rem;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  padding-left: 2rem;
`;

export const Button = styled.button<{
  color?: string;
  colorHover?: string;
}>`
  background-color: ${({ theme, color }) =>
    color ? theme.colors.jvrisAqua : theme.colors.darkgrey_2};

  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.8rem 1.2rem;
  border-radius: 0.4rem;
  border: none;
  cursor: pointer;
  transition: 0.1s ease;
  &:hover {
    background-color: ${({ theme, colorHover }) => {
      if (colorHover) return colorHover;
      return theme.colors.jvrisAqua;
    }};
  }
`;

export const SubmitButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.softGreen};
  outline: none;
  border: none;
  text-align: center;
  width: 15rem;
  padding: 1rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.5rem;
`;

export const DataStatus = styled.div`
  display: flex;
  margin-top: 3rem;
  background-color: ${({ theme }) => theme.colors.lighterGrey};
  height: 3rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  align-items: center;
  padding-left: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.lighterGray};
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingSpinner = styled.div`
  animation: is-rotating 1s infinite;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 2rem;
  width: 2rem;
  margin: auto auto auto 1rem;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const StatusColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 1rem 3rem 0;
`;

export const StatusWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-bottom: 2rem;
  &:first-child {
    margin-bottom: 2rem;
  }
`;

export const StatusLabelTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-right: 2rem;
  color: ${({ theme }) => theme.colors.gray};
`;

export const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 6rem;
  margin-right: 2rem;
`;

export const StatusLabelBold = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.grey};
`;

export const StatusLabel = styled.div`
  font-size: 1.1rem;
  word-wrap: break-word;
  color: ${({ theme }) => theme.colors.grey};
`;

// BEGIN LISTBOX STYLES

export const ListRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

export const ListStatusWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 900px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-bottom: 2rem;
  &:first-child {
    margin-bottom: 2rem;
  }
`;

export const ListBoxRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;
`;

export const ListCol1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
`;

export const ListCol2 = styled.div`
  flex: 2;
`;

export const ListSelect = styled.select`
  width: 400px;
  height: 400px;
  border-color: ${({ theme }) => theme.colors.lightGrey};
  margin-top: 2rem;
  margin-bottom: 2rem;
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;

  option:checked,
  option:focus,
  option:active,
  option:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.lightGrey};
    box-shadow: inset 0 0 5px ${({ theme }) => theme.colors.mediumGrey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.jvrisAqua};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.jvrisAquaDark};
  }
`;

export const ListOption = styled.option<{ chefeBG?: boolean }>`
  color: ${({ chefeBG, theme }) =>
    chefeBG ? theme.colors.white : theme.colors.darkGrey};
  background-color: ${({ chefeBG, theme }) =>
    chefeBG ? theme.colors.jvrisAqua : ""};
  font-size: 1.4rem;
  padding: 0.6rem;
`;

export const ListLabelRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  background-color: #eec;
  padding: 1rem;
`;

export const ListLabel = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 0.6rem;
  color: ${({ theme }) => theme.colors.jvrisAquaDark};
`;

// END LISTBOX STYLES

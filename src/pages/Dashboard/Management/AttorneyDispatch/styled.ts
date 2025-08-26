import { CurrencyDollarSimple, House } from "phosphor-react";
import Select from "react-select";
import styled from "styled-components";
import media from "styled-media-query";

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

export const PageIcon = styled(House)`
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
  padding: 2rem;
  max-width: 60rem;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SectionTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGrey};
  letter-spacing: 1px;
  margin-bottom: 2rem;
`;

export const FieldContainer = styled.div`
  display: flex;
`;

export const LabelField = styled.label`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 1rem;
`;

export const TextInput = styled.textarea`
  flex: auto;
  font-size: 1.3rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const DisabledTextInput = styled.input`
  flex: auto;
  font-size: 1.3rem;
  height: 3.6rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  text-indent: 1rem;
  border-radius: 0.4rem;
  color: ${({ theme }) => theme.colors.gray};
`;

export const CustomSelect = styled(Select)`
  width: 100%;
  * {
    font-size: 1.3rem;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
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

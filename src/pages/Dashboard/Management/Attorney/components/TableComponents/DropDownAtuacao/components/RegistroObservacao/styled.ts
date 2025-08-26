import styled from "styled-components";
import Select from "react-select";

type ErrorDate = {
  error: string | undefined;
};

export const Form = styled.form``;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
    display: flex;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors["gray/600"]};
  align-items: center;
`;

export const CustomSelect = styled(Select)`
    z-index: 9990;
  * {
    font-size: 1.3rem;
  }
`;

export const Text = styled.span`
    font-size: 1.3rem;
    font-weight: bold;
    padding: 0;
`;

export const TextArea = styled.textarea`
  font-size: 1.2rem;
  outline: none;
  background: none;
  width: 100%;
  min-height: 12rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  resize: vertical;
`;

export const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const CancelButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme, disabled }) => disabled ? theme.colors["gray/300"] : theme.colors.softRed};
  opacity: ${({  disabled }) => disabled ? 0.6 : 1};
  outline: none;
  border: none;
  text-align: center;
  width: 10rem;
  padding: 1rem 2rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.1rem;

  &:hover {
    background-color: ${({ theme, disabled }) => disabled ? theme.colors["gray/300"] : theme.colors.darkRed};
  }
`;

export const ConfirmButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme, disabled }) => disabled ? theme.colors["gray/300"] : theme.colors.softGreen};
  opacity: ${({  disabled }) => disabled ? 0.6 : 1};
  outline: none;
  border: none;
  text-align: center;
  width: 13rem;
  padding: 1rem 2rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.1rem;

  &:hover {
    background-color: ${({ theme, disabled }) => disabled ? theme.colors["gray/300"] : theme.colors.softGreenDark};
  }
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

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const DateInput = styled.input`
  font-size: 1.5rem;
  border: none;
  outline: none;
  background: none;
`;

export const InputDate = styled.input.attrs({ type: "date" })`
  font-size: 15px;
  outline: none;
  background: none;
  text-align: start;
  width: 100%;
  max-height: 40px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
`;

export const InputTime = styled.input.attrs({ type: "time" })`
  font-size: 15px;
  outline: none;
  background: none;
  text-align: start;
  width: 100%;
  max-height: 40px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
`;

export const BooleanInput = styled.input`
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  text-indent: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  margin-left: 1rem;
`;

export const TextInput = styled.input`
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

export const ErrorMessage = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.softRed};
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
import styled from "styled-components";
import Select from "react-select";

type SelectedProcessNumberContainerProps = {
  isOpen: boolean;
}

export const Form = styled.form``;

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.colors["gray/700"]};
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.15rem;
  text-decoration: none;
  transition: all 500ms;
  margin-right: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.jvrisAqua};
  &:hover {
    background-color: ${({ theme }) => theme.colors["gray/900"]};
  };
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
  display: flex ;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors["gray/600"]};
`;

export const CustomSelect = styled(Select)`
  * {
    font-size: 1.3rem;
  }
`;

export const Text = styled.span`
    font-size: 1.3rem;
    font-weight: bold;
    padding: 0;
`;

export const SelectedProcessNumberContainer = styled.div<SelectedProcessNumberContainerProps>`
    display: flex;
    flex-wrap: wrap;
    height: ${({ isOpen }) => isOpen ? "auto" : "0"};
    width: ${({ isOpen }) => isOpen ? "auto" : "0"};
    opacity: ${({ isOpen }) => isOpen ? 1 : 0};
    overflow: ${({ isOpen }) => isOpen ? "visible" : "hidden"};

`;

export const SelectedProcessNumber = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    width: fit-content;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors["gray/800"]};
    color: ${({ theme }) => theme.colors["gray/200"]};
    margin-top: 0.5rem;

    &:not(last-child) {
        margin-right: 1rem;
    }
`;

export const TextAreaAcato = styled.textarea`
  font-size: 1.2rem;
  outline: none;
  background: none;
  width: 100%;
  min-height: 18rem;
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

export const ContainerShowProcessNumber = styled.div`
  display: flex;
  margin-left: 1rem;
  width: fit-content;
  cursor: pointer;
`;

export const InputDate = styled.input`
  font-size: 15px;
  outline: none;
  background: none;
  text-align: start;
  width: 100%;
  max-height: 40px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors["gray/400"]};
  border-radius: 5px;
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
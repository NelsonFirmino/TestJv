import { House } from "phosphor-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PageIcon = styled(House)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 100%;
`;

export const ProcessSection = styled.section`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-bottom: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  font-size: 1.4rem;
  padding: 0.5rem;
`;

export const Content = styled.div`
  display: flex;
`;

export const UsuariosDisponiveisContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 2rem;
`;

export const UsuariosComPermissaoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

export const SaveButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
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

import styled from "styled-components";

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
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors["gray/300"] : theme.colors.softRed};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
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
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors["gray/300"] : theme.colors.darkRed};
  }
`;

export const ConfirmButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors["gray/300"] : theme.colors.softGreen};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
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
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors["gray/300"] : theme.colors.softGreenDark};
  }
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

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.softRed};
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.15rem;
  text-decoration: none;
  transition: all 500ms;
  margin-right: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkRed};
  }
`;

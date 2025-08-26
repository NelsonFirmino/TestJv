import styled from "styled-components";

export const Wrapper = styled.div``;

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.softRed};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.15rem;
  text-decoration: none;
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkRed};
  }
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ContainerField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldTitle = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 0.5rem;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const ConfirmButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme }) => theme.colors.softGreen};
  outline: none;
  border: none;
  text-align: center;
  width: 10rem;
  padding: 1rem 2rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.1rem;
`;

export const CancelButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme }) => theme.colors.softRed};
  outline: none;
  border: none;
  text-align: center;
  width: 10rem;
  padding: 1rem 2rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.1rem;
`;

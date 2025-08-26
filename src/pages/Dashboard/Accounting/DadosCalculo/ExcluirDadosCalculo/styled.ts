import styled from "styled-components";

export const Wrapper = styled.div`
  transition: all 500ms ease;
  cursor: pointer;
  margin-top: 3rem;
  background-color: ${({ theme }) => theme.colors.softRed};
  outline: none;
  border: none;
  text-align: center;
  width: 15rem;
  padding: 1rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.5rem;

  :hover {
    background-color: ${({ theme }) => theme.colors.darkRed};
  }
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const WarningMessage = styled.div`
  display: flex;
  font-size: 1.5rem;
  width: 100%;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.darkBlue};
  margin-bottom: 2rem;
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

export const OptionCancel = styled.div`
  cursor: pointer;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const OptionRemove = styled.div`
  cursor: pointer;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.softRed};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.white};
`;

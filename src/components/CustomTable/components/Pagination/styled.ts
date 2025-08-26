import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 0.5rem;
    padding-bottom: 2rem;
  }
`;

export const PaginationContainer = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  width: fit-content;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.lighterGray};
  @media (max-width: 1024px) {
    margin: 0;
    margin-bottom: 1rem;
    align-items: center;
  }
`;

export const PaginationButton = styled.button<{ active?: boolean }>`
  cursor: pointer;
  margin: 0 5px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.jvrisAqua : "white"};
  border: 1px solid #ccc;
  color: ${(props) => (props.active ? "white" : "black")};
  font-size: 1rem;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: #ddd;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PaginationStatus = styled.span`
  display: block;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-right: 0.5rem;
`;

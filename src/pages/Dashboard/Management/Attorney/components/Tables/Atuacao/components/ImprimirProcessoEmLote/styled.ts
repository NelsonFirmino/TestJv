import styled from "styled-components";

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

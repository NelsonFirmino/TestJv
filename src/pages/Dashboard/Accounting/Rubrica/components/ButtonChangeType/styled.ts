import styled from "styled-components";

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.darkgrey_2};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.15rem;
  text-decoration: none;
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.softGreen};
  }
`;

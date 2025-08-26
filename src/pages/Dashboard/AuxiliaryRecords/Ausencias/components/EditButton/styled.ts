import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.15rem;
  text-decoration: none;
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDarker};
  }
`;

import { FilePdf } from "phosphor-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.15rem;
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${({ theme }) => theme.colors.softRed};
  transition: all 500ms;
  height: fit-content;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkRed};
  }
`;

export const Icon = styled(FilePdf)`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.white};
`;

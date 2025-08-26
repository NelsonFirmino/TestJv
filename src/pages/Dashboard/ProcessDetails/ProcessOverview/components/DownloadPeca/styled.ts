import { Download } from "phosphor-react";
import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    margin-left: auto;
    width: fit-content;
` 

export const ActionButton = styled.button`
  cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.grey};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  transition: all 500ms;
  margin-left: 0.5rem;
  outline: none;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
  }
`  

export const DownloadIcon = styled(Download)`
  font-size: 1.4rem;
  color: white;
`;
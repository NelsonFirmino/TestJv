import { List, Plus } from "phosphor-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// export const GavelIcon = styled(Gavel)`
//     width: 22px;
//     height: 22px;
//     margin: 0px 10px 0px 0px;
//     color: ${({ theme }) => theme.colors.gray};
    
// `

export const Wrapper = styled.div`
  display: flex;
  margin: 2rem;
`;

export const RedirectPage = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 50%;
  margin-left: auto;
  width: 4rem;
  height: 4rem;
  transition: all 500ms;
  background-color: ${({ theme }) => theme.colors.pageButton};

  &:hover {
    background-color: ${({ theme }) => theme.colors.pageButtonDark};
  }
`;

export const RedirectPageIcon = styled(Plus)`
  font-size: 2rem;
`;

export const PageIcon = styled(List)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const TitleText = styled.p`
  font-size: 1.2rem;
  cursor: pointer;

  transition: color 200ms;
  &:hover {
    color: ${({ theme }) => theme.colors.jvrisAqua};
  }
`
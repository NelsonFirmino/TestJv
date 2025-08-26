import { CurrencyDollarSimple } from "phosphor-react";
import styled from "styled-components";

export const TitlePageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #f9fafb;
  background-color: ${({ theme }) => theme.colors.bgTitlePage};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const PageIcon = styled(CurrencyDollarSimple)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const TitlePage = styled.h2`
  color: ${({ theme }) => theme.colors.titlePage};
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;

export const CadastrarWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin: 2rem;
`;

export const TableWrapper = styled.div`
  margin: 2rem;
`;

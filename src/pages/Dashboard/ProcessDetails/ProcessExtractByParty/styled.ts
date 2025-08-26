import { Monitor } from "phosphor-react";
import styled from "styled-components";

export const TitlePageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #f9fafb;
  background-color: ${({ theme }) => theme.colors.bgTitlePage};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const PageIcon = styled(Monitor)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const TitlePage = styled.h2`
  color: ${({ theme }) => theme.colors.titlePage};
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding-left: 5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lighterGray};
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const ProcessDataTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 0.5rem;
`;
export const ProcessData = styled.div`
  font-size: 1.2rem;
`;

import styled from "styled-components";

export const StatusColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StatusWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const StatusLabelTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray};
`;

export const StatusSection = styled.div`
  display: flex;
  /* padding-left: 1rem; */

  align-items: center;
`;

export const StatusLabel = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors["gray/700"]};
  margin-left: 0.2rem;
`;

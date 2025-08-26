import { House } from "phosphor-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PageIcon = styled(House)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Msg = styled.span`
  margin-top: 20rem;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors["gray/700"]};
`;

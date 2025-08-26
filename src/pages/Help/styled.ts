import { Download, FileText, Info } from "phosphor-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const PageIcon = styled(Info)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 1rem;
`;

export const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const IconDocument = styled(FileText)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const ContainerLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const IconDownload = styled(Download)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const ContainerCustomLink = styled.a`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
  width: fit-content;
`;

export const CustomLink = styled.span`
  font-size: 1rem;
`;

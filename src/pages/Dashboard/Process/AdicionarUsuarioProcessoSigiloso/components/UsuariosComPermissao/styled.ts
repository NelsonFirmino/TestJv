import { ArrowRight, X } from "phosphor-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.2rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

export const SubtitleNewUsers = styled.span`
  font-size: 1.4rem;
`;

export const SubtitleNewUsersCount = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.softGreen};
`;

export const ListUsersContainer = styled.div`
  display: flex;
  width: 40rem;
  flex-direction: column;
  max-height: 32rem;
  overflow-y: auto;
  padding-right: 1rem;
  padding-left: 0.2rem;
  padding-bottom: 0.5rem;
`;

export const UserContainerSelected = styled.div`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.saveGreenButtonNormal};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors["gray/100"]};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const AddedUsername = styled.span`
  font-size: 1.2rem;
  color: white;
`;

export const Username = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors["gray/800"]};
`;

export const RemoveButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  padding: 0.5rem 0.8rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.softRed};
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkRed};
  }
`;

export const XIcon = styled(X)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const ArrowIcon = styled(ArrowRight)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  transform: rotate(-180deg);
`;

export const LoadingSpinner = styled.div`
  animation: is-rotating 1s infinite;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 2rem;
  width: 2rem;
  margin: auto;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;

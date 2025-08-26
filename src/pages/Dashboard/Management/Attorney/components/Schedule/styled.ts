import { ArrowCircleLeft, ArrowCircleRight, UsersThree } from "phosphor-react";
import styled from "styled-components";

type SelectedButtonProps = {
  isSelected: boolean;
};

type SwitchDateButtonProps = {
  notAllowedToSwitch: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ScheduleOptionsContainer = styled.div`
  display: flex;
`;

export const TableScheduleContainer = styled.div``;

export const ScheduleOptionButton = styled.div<SelectedButtonProps>`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.jvrisAqua : theme.colors["gray/700"]};
  padding: 1rem;
  border-radius: 1rem;
  transition: all 200ms;
  text-decoration: none;
  object-fit: contain;
  cursor: pointer;
  margin-right: 0.5rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${({ theme }) => theme.colors["gray/800"]};
  }
`;
export const ScheduleOptionButtonText = styled.span`
  font-size: 1.3rem;
`;

export const AudienceIcon = styled(UsersThree)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.white};
  margin-right: 0.5rem;
`;

export const AudienceOptionButton = styled.div<SelectedButtonProps>`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.jvrisAqua : theme.colors["gray/700"]};
  padding: 1rem;
  border-radius: 1rem;
  transition: all 200ms;
  text-decoration: none;
  object-fit: contain;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${({ theme }) => theme.colors["gray/800"]};
  }
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
`;
export const SwitchDateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 1.3rem;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors["gray/900"]};
  border-radius: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

export const ButtonContainer = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  margin-top: 2px;
`;

export const CurrentWeekTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const CurrentWeek = styled.div`
  font-size: 1.3rem;
`;

export const SwitchPrevIcon = styled(ArrowCircleLeft)<SwitchDateButtonProps>`
  font-size: 2rem;
  cursor: ${({ notAllowedToSwitch }) =>
    notAllowedToSwitch ? "not-allowed" : "pointer"};
  margin-right: 0.3rem;
  color: ${({ notAllowedToSwitch, theme }) =>
    notAllowedToSwitch ? theme.colors["gray/400"] : ""};
  transition: all 200ms;
  opacity: ${({ notAllowedToSwitch }) => (notAllowedToSwitch ? 0.5 : 1)};

  &:hover {
    color: ${({ notAllowedToSwitch, theme }) =>
      notAllowedToSwitch ? theme.colors["gray/400"] : theme.colors.softYellow};
  }
`;

export const SwitchNextIcon = styled(ArrowCircleRight)<SwitchDateButtonProps>`
  font-size: 2rem;
  cursor: ${({ notAllowedToSwitch }) =>
    notAllowedToSwitch ? "not-allowed" : "pointer"};
  margin-left: 0.3rem;
  color: ${({ notAllowedToSwitch, theme }) =>
    notAllowedToSwitch ? theme.colors["gray/400"] : ""};
  transition: all 200ms;
  opacity: ${({ notAllowedToSwitch }) => (notAllowedToSwitch ? 0.5 : 1)};

  &:hover {
    color: ${({ notAllowedToSwitch, theme }) =>
      notAllowedToSwitch ? theme.colors["gray/400"] : theme.colors.softYellow};
  }
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

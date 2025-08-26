import {
  Buildings,
  CaretDown,
  CaretRight,
  House,
  User,
  UserCircle,
} from "phosphor-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SideBarStyleProps } from "./side-bar.interface";

export const Wrapper = styled.div<SideBarStyleProps>`
  display: ${({ isSideBarOpen }) => (isSideBarOpen ? "flex" : "none")};
  flex-direction: column;
  position: relative;
  min-width: ${({ isSideBarOpen }) => (isSideBarOpen ? "25rem" : "8.5rem")};
  max-width: ${({ isSideBarOpen }) => (isSideBarOpen ? "25rem" : "8.5rem")};
  height: 100%;
  transition: all 0.2s ease-in-out 0s;

  @media (max-width: 450px) {
    min-width: ${({ isSideBarOpen }) => (isSideBarOpen ? "100%" : "8.5rem")};
    max-width: ${({ isSideBarOpen }) => (isSideBarOpen ? "100%" : "8.5rem")};
  }
`;

export const AlternativeCredentialContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors["gray/200"]};
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors["gray/300"]};
`;

export const ProfileContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const ProfileIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors["gray/300"]};
  margin-right: 1rem;
`;

export const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const MessageCredential = styled.span`
  color: ${({ theme }) => theme.colors["gray/600"]};
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

export const MessageQuote = styled.cite`
  color: ${({ theme }) => theme.colors["gray/500"]};
  font-size: 1.25rem;
`;

export const CredentialButtonContainter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SignInButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  padding: 0.8rem 0 0.8rem 0;
  width: 11rem;
  outline: none;
  background-color: ${({ theme }) => theme.colors.softOrange};
  text-decoration: none;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors["gray/50"]};
  font-weight: bold;
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.softOrange};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.softOrange};
  }
`;

export const CreateAccountButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  padding: 0.8rem 0 0.8rem 0;
  width: 11rem;
  outline: none;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.softOrange};
  text-decoration: none;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.softOrange};
  font-weight: bold;
  transition: all 500ms;

  &:hover {
    border-color: ${({ theme }) => theme.colors.softOrange};
    color: ${({ theme }) => theme.colors.softOrange};
  }

  &:active {
    border-color: ${({ theme }) => theme.colors.softOrange};
    color: ${({ theme }) => theme.colors.softOrange};
  }
`;

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors["gray/50"]};
  height: 100%;
  width: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors["gray/300"]};
  overflow-y: auto;
`;

export const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span<SideBarStyleProps>`
  color: ${({ theme }) => theme.colors["gray/900"]};
  font-size: 1.2rem;
  font-weight: 500;
  opacity: ${({ isSideBarOpen }) => (isSideBarOpen ? "1" : "0")};
  display: ${({ isSideBarOpen }) => (isSideBarOpen ? "block" : "none")};
`;

export const UserPosition = styled.span<SideBarStyleProps>`
  color: ${({ theme }) => theme.colors["gray/700"]};
  font-size: 1.1rem;
  font-style: italic;
  display: inline-block;
  margin-bottom: 1rem;
  opacity: ${({ isSideBarOpen }) => (isSideBarOpen ? "1" : "0")};
  display: ${({ isSideBarOpen }) => (isSideBarOpen ? "block" : "none")};
`;

export const AdvisorsButton = styled(Link)<SideBarStyleProps>`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  justify-content: ${({ isSideBarOpen }) =>
    isSideBarOpen ? "start" : "center"};
  font-weight: 400;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors["gray/500"]};
  padding: 1rem;
  border-radius: 1rem;
  transition: all 200ms;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors["gray/600"]};
  }
`;

export const GenericButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-top: 1rem;
`;

export const GenericButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  height: 4rem;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors["gray/500"]};
  padding: 1rem;
  border-radius: 1rem;
  transition: all 200ms;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors["gray/600"]};
  }
`;

export const SideBarContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
`;

export const HomeIcon = styled(House)`
  color: white;
`;

export const AdvisorsIcon = styled(UserCircle)`
  color: white;
`;

export const PatrimoniosIcon = styled(Buildings)`
  color: white;
`;

export const SideBarTitle = styled(Link)<SideBarStyleProps>`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  justify-content: ${({ isSideBarOpen }) =>
    isSideBarOpen ? "start" : "center"};
  font-weight: 400;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  padding: 1rem;
  border-radius: 1rem;
  transition: all 200ms;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkerBlue};
  }
`;

export const TextOptionSideBar = styled.span<SideBarStyleProps>`
  font-size: 1.2rem;
  margin-left: 0.5rem;
  opacity: ${({ isSideBarOpen }) => (isSideBarOpen ? "1" : "0")};
  display: ${({ isSideBarOpen }) => (isSideBarOpen ? "block" : "none")};
`;

export const SideBarOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogoutContainer = styled.div`
  margin-top: 1rem;
`;

// OPTION SIDE BAR

export const OptionSideBarDirectLink = styled(Link)`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors["gray/200"]};
  color: ${({ theme }) => theme.colors["blue/500"]};
  display: flex;
  font-size: 1.2rem;
  padding: 1rem 0;
  text-decoration: none;
`;

export const OptionSideBarSubBar = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors["gray/200"]};
  color: ${({ theme }) => theme.colors["blue/500"]};
  display: flex;
  justify-content: end;
  font-size: 1.2rem;
  padding: 1rem 0;
  text-decoration: none;
  cursor: pointer;
`;

export const DescriptionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ArrowRightIcon = styled(CaretRight)`
  font-size: 1.5rem;
  margin-left: auto;
  color: ${({ theme }) => theme.colors["blue/500"]};
`;

// ICONS

export const ProfileIcon = styled(User)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.softOrange};
`;

export const ArrowDownIcon = styled(CaretDown)`
  font-size: 1.7rem;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors["blue/500"]};
`;

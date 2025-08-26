import styled from "styled-components";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import media from "styled-media-query";
import { Password, User } from "phosphor-react";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: block;

  ${media.greaterThan("medium")`
    display: flex;
  `}
`;

export const BackgroundLogo = styled.div`
  display: none;

  ${media.greaterThan("medium")`
    display: flex;
  `}

  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 60%;
  border-right: 1px solid ${({ theme }) => theme.colors["gray/300"]};
  background-image: linear-gradient(
    to right top,
    #001933,
    #001f40,
    #00264d,
    #002d59
  );
`;

export const LogoMobile = styled.div`
  display: flex;
  margin-top: 5rem;
  ${media.greaterThan("medium")`
        display: none;
    `}
`;

export const LogoContainer = styled.div`
  display: flex;
`;

export const TextLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextLogoContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextState = styled.span`
  font-size: 1.8rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors["gray/100"]};
`;

export const TextStateMobile = styled.span`
  font-size: 1.4rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors["gray/900"]};
`;

export const TextPGE = styled.h2`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors["gray/100"]};
`;

export const TextPGEMobile = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors["gray/900"]};
`;

export const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  ${media.greaterThan("medium")`
    width: 40%;
    padding: 0;
  `}
`;

export const JvrisSubTitleMobile = styled.div`
  position: relative;
  width: 8rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 2rem;

  &::before {
    content: "";
    width: 8rem;
    height: 2rem;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.menuTextColorHover};
    animation: rotating 4s linear infinite;
  }

  &:after {
    content: "JVRIS 4.0";
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: absolute;
    inset: 2px;
    background-color: white;
    border-radius: 2rem;
    color: ${({ theme }) => theme.colors["gray/900"]};
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  ${media.greaterThan("medium")`
        display: none;
    `}
`;

export const JvrisSubTitle = styled.div`
  position: relative;
  width: 8rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 2rem;

  &::before {
    content: "";
    width: 8rem;
    height: 2rem;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.menuTextColorHover};
    animation: rotating 4s linear infinite;
  }

  &:after {
    content: "JVRIS 4.0";
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: absolute;
    inset: 2px;
    background-color: #00264d;
    border-radius: 2rem;
    color: ${({ theme }) => theme.colors["gray/100"]};
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const WelcomeText = styled.span`
  display: inline-block;
  font-size: 1.8rem;
  margin-bottom: 3rem;
  margin-right: auto;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.jvrisAqua};
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 10rem;

  ${media.greaterThan("medium")`
        margin-bottom: 0;
    `}
`;

export const Logo = styled.img`
  width: 28rem;

  ${media.greaterThan("medium")`
        width: 30rem;
    `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 36rem;

  ${media.greaterThan("medium")`
        width: 30rem;
    `}
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors["gray/300"]};
  background-color: white;
  margin-bottom: 1.5rem;
`;

export const LabelInput = styled.label`
  margin-right: 0.5rem;
`;

export const UserIcon = styled(User)`
  font-size: 1.8rem;
`;

export const TextInput = styled.input`
  outline: none;
  border: none;
  background-color: white;
  width: 100%;
  font-size: 1.2rem;
  ${media.greaterThan("medium")`
        font-size: 1.3rem;
  `}
`;

export const InputPasswordContainer = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  width: 100%;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors["gray/300"]};
`;

export const ContainerText = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ForgotPasswordLink = styled(Link)`
  margin-left: auto;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors["gray/700"]};
  text-decoration: none;
  transition: color 500ms;

  &:hover {
    color: ${({ theme }) => theme.colors.jvrisAqua};
    text-decoration: underline;
  }
`;

export const PasswordIcon = styled(Password)`
  font-size: 1.8rem;
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
  background-color: white;
  padding-left: 0.25rem;
`;

export const SeePasswordIcon = styled(Eye)`
  font-size: 1.5rem;
  user-select: none;
`;

export const DontSeePasswordIcon = styled(EyeSlash)`
  font-size: 1.5rem;
  user-select: none;
`;

export const SubmitContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
`;

export const SubmitButton = styled.button`
  position: relative;
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.darkerBlue};
  outline: none;
  border: none;
  text-align: center;
  color: white;
  border-radius: 1.2rem;
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.8rem 1.5rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: all 500ms;

  &:hover {
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.3);
  }
`;

export const LoadingSpinner = styled.div`
  animation: is-rotating 1s infinite;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 2rem;
  width: 2rem;
  margin-left: 2rem;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.softRed};
  font-size: 1.2rem;
`;

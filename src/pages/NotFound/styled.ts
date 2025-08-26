import styled from "styled-components";
import { Link } from "react-router-dom";
import { House } from "@phosphor-icons/react";
import media from "styled-media-query";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const Logo = styled.img`
  width: 16rem;
  margin-top: 2rem;
  position: absolute;
  top: 0;

  ${media.greaterThan("medium")`
      width: 20rem;
  `}
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  width: 32rem;
`;

export const MessageTitle = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkerGrey};

  ${media.greaterThan("medium")`
        font-size: 6rem;
    `}
`;

export const MessageContent = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-align: justify;

  ${media.greaterThan("medium")`
        font-size: 1.3rem;
    `}
`;

export const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  text-decoration: none;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.darkerBlue};
  padding: 1rem;
  border: 1px solid black;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.jvrisAqua};
  }
`;

export const HomeIcon = styled(House)`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

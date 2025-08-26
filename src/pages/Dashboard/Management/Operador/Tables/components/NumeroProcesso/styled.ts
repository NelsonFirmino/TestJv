import { ShareFat } from "@phosphor-icons/react";
import {
  Circle,
  Copy,
  CurrencyDollarSimple,
  Info,
  Shuffle,
} from "phosphor-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type ContainerActType = {
  txStatusCadastroAto: string;
};

type ContainerRelevance = {
  relevance: string;
};

type ContainerRedistribution = {
  isRedistribuicaoRecusada: boolean;
};

type ContainerInacao = {
  isDespachoRecusado: boolean;
};

const relevaciaStyle = {
  Normal: "#5CB85C",
  Urgente: "#D9534F",
  Importante: "#C66422",
  "Valor Expressivo": "#F0AD4E",
  "Sustentação Oral": "#8189d0",
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerProcessDetails = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const ContainerDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerCopyIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 50%;
  margin-left: 0.5rem;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors["gray/300"]};
  cursor: pointer;
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors["gray/400"]};
  }
`;

export const CopyIcon = styled(Copy)`
  font-size: 1.3rem;
`;

export const NumberProcess = styled(Link)`
  font-size: 1.35rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Details = styled.div`
  display: flex;
`;

const ContainerTag = styled.div`
  display: flex;
  border-radius: 0.3rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  background-color: ${({ theme }) => theme.colors["gray/900"]};
  color: white;
  width: 2.2rem;
  height: 2rem;

  &:not(last-child) {
    margin-right: 0.2rem;
  }
`;

export const ContainerProcessRelevance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.2rem;
`;

export const RelevanceIcon = styled(Circle)<ContainerRelevance>`
  font-size: 1.3rem;
  color: ${({ relevance }) => relevaciaStyle[relevance]};
  /* margin-right: 0.4rem; */
`;

export const ContainerSigilo = styled(ContainerTag)`
  background-color: ${({ theme }) => theme.colors["gray/900"]};
`;

export const ContainerGrau = styled(ContainerTag)`
  background-color: ${({ theme }) => theme.colors.blueTag};
`;

export const ContainerActType = styled(ContainerTag)<ContainerActType>`
  background-color: ${({ theme, txStatusCadastroAto }) =>
    txStatusCadastroAto === "A"
      ? theme.colors.softGreen
      : theme.colors.softYellow};
`;

export const ContainerRedistribution = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.2rem;
`;

export const ContainerInacao = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.2rem;
`;

export const ContainerRequestInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.2rem;
`;

export const RedistributionIcon = styled(Shuffle)<ContainerRedistribution>`
  font-size: 1.8rem;
  color: ${({ isRedistribuicaoRecusada, theme }) =>
    isRedistribuicaoRecusada ? theme.colors.softRed : theme.colors.softGreen};
`;

export const InacaoIcon = styled(ShareFat)<ContainerInacao>`
  font-size: 1.6rem;
  color: ${({ isDespachoRecusado, theme }) =>
    isDespachoRecusado ? theme.colors.softRed : theme.colors.softGreen};
`;

export const RequestInfoIcon = styled(Info)`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.softGreen};
`;

export const ContadoriaIcon = styled(CurrencyDollarSimple)<{
  devolvida: boolean;
}>`
  font-size: 1.8rem;
  color: ${({ theme, devolvida }) =>
    devolvida ? theme.colors.softGreen : theme.colors.softRed};
`;

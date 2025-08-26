import { Circle } from "@phosphor-icons/react";
import styled from "styled-components";

type ContainerRelevance = {
  relevance: string;
};

const relevaciaStyle = {
  Normal: "#5CB85C",
  Urgente: "#D9534F",
  Importante: "#C66422",
  "Valor Expressivo": "#F0AD4E",
  "Sustentação Oral": "#8189d0",
};

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

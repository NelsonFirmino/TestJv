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

export const RedistribuicaoSymbol = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 0.5rem 0.8rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  border-radius: 6px;
`;

export const SemRedistribuicaoSymbol = styled.div`
  font-size: 1.5rem;
  padding: 0.5rem 0.8rem;
  font-size: 1.3rem;
`;

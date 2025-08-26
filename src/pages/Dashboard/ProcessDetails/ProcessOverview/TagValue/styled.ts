import styled from "styled-components";

type ContainerTagValueParams = {
  color: string;
};

export const ContainerTagValue = styled.div<ContainerTagValueParams>`
  display: inline-block;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  background-color: ${({ color }) => color};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

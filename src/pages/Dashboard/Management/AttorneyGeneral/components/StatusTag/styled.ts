import styled from "styled-components";

type TagProps = {
  color: string;
};

export const Tag = styled.div<TagProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ color }) => color};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.05rem;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
`;

import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  margin-bottom: -0.5rem;
  @media (max-width: 450px) {
    margin-top: 2rem;
    margin-left: 0.5rem;
  }
`;

export const Button = styled.button`
  width: 20rem;
  height: 3rem;
  font-size: 1.3rem;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

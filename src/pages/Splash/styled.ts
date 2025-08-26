import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const Title = styled.div`
  display: flex;
  text-align: center;
  text-transform: uppercase;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: bold;
  border-bottom: 1px solid black;
  padding-bottom: 0.2rem;
`;

export const SubTitle = styled.div`
  font-size: 1.2rem;
  padding-top: 0.2rem;
  margin-bottom: 2rem;
`;

export const Loading = styled.div`
  animation: is-rotating 1s infinite;
  border: 5px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 4rem;
  width: 4rem;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;

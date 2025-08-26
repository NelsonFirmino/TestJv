import styled from "styled-components";

export const Wrapper = styled.div`
    margin-bottom: 2rem;
    min-width: 19rem;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: 0 5px 15px 0 #00000026;
    transition: .2s ease all;
    padding: 0.8rem;
    border-top: 3px solid ${({ theme }) => theme.colors.jvrisAqua};

    &:hover {
        box-shadow: 0 5px 5px 0 #00000026;
    }
`

export const ContainerCardTitle = styled.div`
    display: flex;
    margin-bottom: 1rem;
    position: relative;
`
export const CardTitle = styled.h2`
    font-size: 1.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors["gray/900"]};
`

export const CardButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
`

export const LoadingSpinner = styled.div`
  animation: is-rotating 1s infinite;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 2rem;
  width: 2rem;
  margin: auto;
  margin-top: 2rem;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;
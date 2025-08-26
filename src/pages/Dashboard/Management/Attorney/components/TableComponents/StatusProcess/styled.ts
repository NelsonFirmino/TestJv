import styled from "styled-components";

type WrapperProps = {
    color: string;
}

export const Wrapper = styled.div<WrapperProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: ${({ color }) => color};
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.colors["gray/100"]};
    font-size: 1.1rem;
    font-weight: 500;
`
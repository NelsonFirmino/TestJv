import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 28rem;
    width: fit-content;
    //overflow: hidden;
    border-radius: 0.3rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
    background-color: white;
`;

export const TitleContainer = styled.div`
    padding: 1.5rem 3rem;
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const Title = styled.h3`
    font-size: 1.5rem;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`;

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem 1rem;
    background-color: ${({ theme }) => theme.colors.white};
`;

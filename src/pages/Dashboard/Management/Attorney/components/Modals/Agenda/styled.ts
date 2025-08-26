import styled from "styled-components";

export const TipoAudienciaWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.darkGrey};
    padding: 0.4rem 0.6rem;
    color: ${({ theme }) => theme.colors.white};
    width: fit-content;
    border-radius: 0.2rem;
    font-size: 0.9rem;
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const GravacaoAudienciaWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.darkGrey};
    padding: 0.4rem 0.6rem;
    color: ${({ theme }) => theme.colors.white};
    width: fit-content;
    border-radius: 0.2rem;
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const AudienciaHeadWrapper = styled.div`
    display: flex;
    font-size: 1.2rem;
    flex-direction: column;
`;

export const AudienciaHeadIconsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`;

export const AudienciasWrapper = styled.div`
    width: 100%;
`;

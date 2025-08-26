import styled from "styled-components";

export const ProcessoOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    font-size: 2.4rem;
`;

export const OptionsIconsContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 6px;
    align-items: center;
    gap: 0.2rem;
`;

export const NumProcessContainer = styled.div`
    display: flex;
`;

export const NumProcess = styled.div`
    width: 200px;
    cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
    font-size: 14px;

    &:hover {
        transition: 0.15s ease-in-out;
        color: ${({ theme, onClick }) =>
            onClick ? theme.colors.jvrisAqua : "#000"};
    }
`;

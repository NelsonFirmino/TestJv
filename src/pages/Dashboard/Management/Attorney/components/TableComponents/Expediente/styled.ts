import { Files } from "phosphor-react";
import styled from "styled-components";

export const DocumentButton = styled.button`
    width: 100%;
    border: 0;
    outline: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    opacity: ${({ disabled }) => disabled ? "0.2" : "1"};
    background-color: ${({ theme }) => theme.colors["gray/300"]};
    height: 4rem;
    border-radius: 0.5rem;
    transition: all 500ms;

    &:hover {
        background-color: ${({ theme }) => theme.colors.jvrisAqua};
    }

    &:hover > svg {
        color: ${({ theme }) => theme.colors["gray/200"]};
    }
`

export const DocumentIcon = styled(Files)`
    font-size: 2.2rem;
`
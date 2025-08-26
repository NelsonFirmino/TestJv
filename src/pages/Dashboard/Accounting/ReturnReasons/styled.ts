import { CurrencyDollarSimple } from "phosphor-react";
import styled from "styled-components";

export const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PageIcon = styled(CurrencyDollarSimple)`
    font-size: 2rem;
    margin-right: 1rem;
`;
export const Button = styled.div<{
    hoverColor: string;
}>`
    background-color: ${({ theme }) => theme.colors.grey};
    border-radius: 5px;
    padding: 5px 0px;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;

    &:hover {
        background-color: ${({ hoverColor }) => hoverColor};
    }
`;
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    min-height: 100%;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
`;

export const ContainerButtons = styled.div`
    display: flex;
    padding-left: 2rem;
`;

export const SubmitButton = styled.button`
    transition: all 500ms ease;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    background-color: ${({ theme, disabled }) =>
        disabled ? theme.colors.grey : theme.colors.softGreen};
    outline: none;
    border: none;
    text-align: center;
    width: 15rem;
    padding: 1rem;
    letter-spacing: 1px;
    color: white;
    border-radius: 0.5rem;
    font-size: 1.5rem;
`;

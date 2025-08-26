import styled from "styled-components";

export const ContentSwitcherContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    grid-gap: 2rem;
`;

export const ContentSwitcherButtonContainer = styled.div<{
    index: number;
    current: number;
}>`
    display: flex;
    background-color: ${({ theme, index, current }) =>
        index == current ? theme.colors.midnightBlue : theme.colors.lightGrey};
    align-items: center;
    justify-content: center;
    border: ${({ theme, index, current }) =>
        index == current
            ? `2px solid ${theme.colors.jvrisAqua}`
            : `2px solid ${theme.colors.lightGrey}`};
    padding: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.1s;
    user-select: none;

    &:hover {
        border: ${({ theme }) => `2px solid ${theme.colors.jvrisAqua}`};
    }
`;

export const ContentSwitcherText = styled.p<{
    index: number;
    current: number;
}>`
    font-size: 1.35rem;
    user-select: none;
    color: ${({ theme, index, current }) =>
        index == current
            ? theme.colors.white //  ? theme.colors.jvrisAqua
            : theme.colors.MenuTextColor};
`;

export const ContentSwitcherPendenciesText = styled.p<{
    index: number;
    current: number;
}>`
    background-color: ${({ theme, index, current }) =>
        index == current ? theme.colors.jvrisAqua : theme.colors.grey};
    height: 30px;
    width: 40px;
    margin-right: 0.8rem;
    margin-left: 0.8rem;
    border-radius: 5px;
    display: flex;
    font-size: 1.35rem;
    color: ${
        ({ theme }) => theme.colors.white //  ? theme.colors.jvrisAqua
    };
    align-items: center;
    justify-content: center;
    user-select: none;
`;

export const ContentSwitcherPendenciesContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
`;

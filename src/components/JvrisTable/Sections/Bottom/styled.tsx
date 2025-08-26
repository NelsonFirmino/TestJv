import styled from "styled-components";
export const MovePageSectionTitle = styled.div`
    font-size: 1rem;
    position: sticky;
    left: 1.5rem;
    //padding-left: 1.4rem;
`;

export const PageSelectorButton = styled.button<{
    page?: boolean;
}>`
    background-color: ${(props) =>
        props.page ? props.theme.colors.darkGrey : props.theme.colors.grey};
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    width: 38px;
    height: 35px;
    cursor: pointer;
    //margin-left: 10px;
    align-items: center;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: ${(props) =>
        props.page
            ? props.theme.colors.darkerGrey
            : props.theme.colors.darkgrey_2};
        transition: 0.2s;
    }
`;

export const PageinputContainer = styled.div`
    background-color: ${(props) => props.theme.colors.jvrisAqua};
    width: 48px;
    height: 35px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const Pageinput = styled.input`
    background-color: transparent;
    width: 100%;
    color: white;
    border: none;
    text-align: center;
    font-size: 20px;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    outline: none;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    cursor: pointer;
`;

export const MovePageButton = styled(PageSelectorButton)`
    background-color: ${(props) => props.theme.colors.jvrisAquaDark};

    &:hover {
        background-color: ${(props) => props.theme.colors.jvrisAquaDarker};
        transition: 0.2s;
    }
`;

export const MovePageButtonsContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: 0.6rem;
`;

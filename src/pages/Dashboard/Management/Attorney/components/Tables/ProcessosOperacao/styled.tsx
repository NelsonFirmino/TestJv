import styled from "styled-components";

export const ModalWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 2rem 0rem;
    font-size: 2rem;
`;

export const SelectedButton = styled.button`
    display: flex;
    width: 180px;
    height: 40px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.jvrisAqua};
    margin-bottom: 2rem;
    border: none;
    cursor: pointer;
`;

export const SelectedButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

export const SelectedButtonText = styled.p`
    color: ${(props) => props.theme.colors.white};
    font-size: 1.4rem;
`;

export const RequestForInactionModal = styled.button`
    padding: 0.8rem 0rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    min-width: 19rem;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 1.5rem;
    background-color: ${(props) => props.theme.colors.jvrisAqua};

    :hover {
        background-color: ${(props) => props.theme.colors.jvrisAquaDark};
        cursor: pointer;
        transition: 300ms;
    }
`;

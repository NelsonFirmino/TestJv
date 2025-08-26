import Select from "react-select";
import styled from "styled-components";

export const ModalWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 2rem 0rem;
    font-size: 2rem;
`;

export const SelectedButton = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0.5rem;
    background-color: ${({ theme }) => theme.colors["gray/700"]};
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.15rem;
    text-decoration: none;
    transition: all 500ms;
    margin-right: 0.5rem;
    border: 2px solid ${({ theme }) => theme.colors.jvrisAqua};
    &:hover {
        background-color: ${({ theme }) => theme.colors["gray/900"]};
    }
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

export const SecretariaSelect = styled(Select)`
    width: max-content;

    * {
        font-size: 1.3rem;
    }
`;

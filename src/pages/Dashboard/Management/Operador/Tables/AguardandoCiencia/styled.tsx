import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";
import styled from "styled-components";

export const MainDropDownButton = styled.a`
    border-radius: 0.5rem;
    display: flex;
    color: white;
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    transition: 500ms;
    border: 0;
    text-decoration: none;
    align-items: center;
    cursor: pointer;
    justify-items: center;
    &:hover {
        background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
        color: white;
    }

    &:active {
        background-color: ${({ theme }) => theme.colors.jvrisAquaDarker};
        color: white;
    }
`;

export const DropDown = styled(Dropdown)`
    border-radius: 0.5rem;
`;

export const DropdownToggle = styled(Dropdown.Toggle)`
    font-size: 1.3rem;
    width: 5rem;
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    color: white;
    border: 0;
    border-left: 1px solid ${({ theme }) => theme.colors["gray/200"]};

    &:hover {
        background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
        color: white;
        border-left: 1px solid ${({ theme }) => theme.colors["gray/300"]};
    }

    &:active {
        background-color: ${({ theme }) => theme.colors.jvrisAquaDarker};
        color: white;
    }
`;

export const DropDownItem = styled(Dropdown.Item)`
    width: 18rem;
    padding-top: 0.3rem;
    display: flex;
    font-size: 1.3rem;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors["gray/300"]};
    }
`;

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

export const SecretariaSelect = styled(Select)`
    width: max-content;

    * {
        font-size: 1.3rem;
    }
`;

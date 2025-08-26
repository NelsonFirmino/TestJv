import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const MainDropDownButton = styled(Link)`
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

export const ContainerLink = styled(Link)`
    display: flex;
    font-size: 1.2rem;
    width: 100%;
    text-decoration: none;
    color: ${({ theme }) => theme.colors["gray/900"]};

    &:hover {
        text-decoration: underline;
    }
`;

import { Eye, Trash } from "phosphor-react";
import styled from "styled-components";

export const TrashIcon = styled(Trash)`
    cursor: pointer;
    color: ${({ theme }) => theme.colors.lightGray};
    width: 25px;
    height: 25px;
    padding: 5px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.softRed};

    transition: 0.1s ease-in-out;
    &:hover {
        background-color: #ff0000;
    }
`;

export const EyeIcon = styled(Eye)`
    cursor: pointer;
    color: ${({ theme }) => theme.colors.lightGray};
    width: 25px;
    height: 25px;
    padding: 5px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.softPurple};

    transition: 0.1s ease-in-out;
    &:hover {
        background-color: #6c63ff;
    }
`;

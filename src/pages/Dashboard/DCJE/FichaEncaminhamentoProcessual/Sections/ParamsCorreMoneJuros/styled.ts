import styled from "styled-components";

export const AddJurosButton = styled.div`
    width: 14rem;
    height: 14rem;
    background-color: #ccc;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius: 0.5rem;

    transition: background-color 0.2s;

    &:hover {
        background-color: #ddd;
    }
`;

export const JurosWrapper = styled.div`
    padding: 1rem;
    border: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    width: 54rem;
    border-radius: 0.5rem;
`;

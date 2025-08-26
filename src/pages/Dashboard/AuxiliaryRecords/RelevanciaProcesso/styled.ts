import ReactSelect from "react-select";
import styled from "styled-components";

export const InputContainer = styled.div<{
    flex?: number;
}>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: ${({ flex }) => flex};
`;

export const InputsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    align-items: flex-end;
    margin-top: 60px;
    margin-bottom: 10px;
`;

export const InputLabel = styled.p`
    font-size: 1.6rem;
`;

export const Select = styled(ReactSelect)`
    //border: 1px solid #ccc;
    border-radius: 4px;
    //padding: 8px;
    height: 36px;

    * {
        font-size: 1.3rem;
    }
`;

export const Input = styled.input`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    height: 36px;
    font-size: 1.3rem;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const Container = styled.div`
    margin: 10px;
    user-select: none;
`;

export const SaveButtonContainer = styled.div<{
    flex?: number;
}>`
    display: flex;
    font-size: 1.4rem;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    padding: 6px 18px;
    border-radius: 4px;
    transition: 0.2s;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
    }
`;
export const ButtonContainer = styled.div<{
    isSelected?: boolean;
}>`
    display: flex;
    width: fit-content;
    min-width: 140px;
    height: 40px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: 0.2s;
    font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
    background-color: ${({ isSelected, theme }) =>
        isSelected ? theme.colors.jvrisAqua : theme.colors.white};

    color: ${({ isSelected, theme }) =>
        isSelected ? theme.colors.white : theme.colors.jvrisAqua};

    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.jvrisAqua};
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const ButtonLabel = styled.p`
    font-size: 1.4rem;

    //padding: 0 10px;
`;

import styled from "styled-components";

export const SearchBarContainer = styled.div<{
    isInFocus?: boolean;
}>`

    align-items: center;
    display: flex;
    //justify-content: center;
    outline: ${(props) => (props.isInFocus ? "2px" : "1px")} solid
        ${(props) => props.theme.colors.jvrisAqua};
    color: ${(props) => props.theme.colors.jvrisAqua};
    border-radius: 5px;
    &:hover {
        outline: 2px solid ${(props) => props.theme.colors.jvrisAqua};
    }
`;

export const SearchBarInput = styled.input`
    width: clamp(20rem, 20vw, 30rem);
    height: 3.8rem;
    font-size: 1.3rem;
    border: none;
    outline: none;
    /* border: 1px solid ${(props) => props.theme.colors.grey};
    border-radius: 5px; */
    text-indent: 1rem;
    color: ${(props) => props.theme.colors.midnightBlue};

   
`;

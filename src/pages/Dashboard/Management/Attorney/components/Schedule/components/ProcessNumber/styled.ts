import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled(Link)`
    display: flex;
    font-weight: bold;
    font-size: 1.3rem;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
    
`
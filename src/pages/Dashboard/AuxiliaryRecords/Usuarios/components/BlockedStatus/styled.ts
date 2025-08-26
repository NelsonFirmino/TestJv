import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    font-size: 1.4rem;
`

export const BlockedStatus = styled.span`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.softRed};
    font-weight: bold;
`
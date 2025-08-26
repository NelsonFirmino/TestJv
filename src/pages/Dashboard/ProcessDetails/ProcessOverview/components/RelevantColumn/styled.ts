import styled from "styled-components";

type ConditionalTextRelevantProps = {
    isUrgente: boolean;
}

export const ConditionalTextRelevant = styled.span<ConditionalTextRelevantProps>`
    font-size: 1.4rem;
    color: ${({ theme, isUrgente }) => isUrgente ? theme.colors.softRed : ""};
    font-weight: ${({ isUrgente }) => isUrgente ? "bold" : ""}; ;
` 
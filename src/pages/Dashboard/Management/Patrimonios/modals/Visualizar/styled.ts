import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";

export const AccordionTitle = styled(Accordion.Header)`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.darkGrey};
`;

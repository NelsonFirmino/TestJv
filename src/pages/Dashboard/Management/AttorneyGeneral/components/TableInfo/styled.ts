import styled from "styled-components";

export const StatusColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5rem 1rem 3rem 0;
`;

export const StatusWrapper = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    flex-wrap: wrap;
    &:first-child {
        margin-bottom: 2rem;
    }
`;

export const StatusLabelTitle = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gray};
`;

export const StatusSection = styled.div`
    display: flex;
    padding-left: 1.2rem;
    align-items: center;
`;

export const StatusLabel = styled.div`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.grey};
    margin-left: 0.2rem;
`;

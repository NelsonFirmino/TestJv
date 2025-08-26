import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #f2f2f2;
`;

export const Title = styled.h2`
  text-align: left;
  font-size: 1.4rem;
  border-bottom: 1px solid black;
  padding-bottom: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr {
    &:not(last-child) {
      border-bottom: 1px solid black;
    }
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    font-size: 1.2rem;
  }
`;

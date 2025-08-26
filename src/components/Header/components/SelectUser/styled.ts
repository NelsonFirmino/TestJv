import Select from "react-select";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 450px) {
    width: 20rem;
  }
`;

export const CustomSelect = styled(Select)`
  width: 32rem;
  position: absolute;
  z-index: 9999;
  * {
    font-size: 1.3rem;
  }
`;

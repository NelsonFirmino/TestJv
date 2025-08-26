import styled from "styled-components";
import Select from "react-select";

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 4rem;
`;

export const CustomSelect = styled(Select)`
  width: 32rem;
  * {
    font-size: 1.3rem;
  }
`;

import styled from "styled-components";


export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0rem ;
  font-size: 2rem;
`;

export const RequestForInactionModal = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 1.5rem;
  background-color: ${props => props.theme.colors.jvrisAqua};
  
  :hover{
    background-color: ${props => props.theme.colors.jvrisAquaDark};
    cursor: pointer;
    transition: 300ms;
  }

`;

import styled from "styled-components";
import media from "styled-media-query";

export const ObsAddButton = styled.button`
  font-size: 2rem;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.1rem 1rem;
  margin-left: 0.5rem;
  background-color: ${({ theme }) => theme.colors.darkgrey_2};

  :hover {
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    cursor: pointer;
    transition: 300ms;
  }
`;

export const ModalPage = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  `;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 80rem; */
  /* height: 50rem; */
  position: absolute;
  transform: translate(-50%, -50%);
  top: 30%;
  left: 50%;
  line-height: 1.4;
  background: white;
  border-radius: 12px;
  max-width: 600px;
  min-width: 300px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: none;
  border-radius: 12px 12px 0 0;
  font-size: 2rem;
  color: white;
  height: 6rem;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
`;

export const ModalHeaderTitle = styled.div`
  font-size: 1.6rem;
  margin-left: 2rem;
`;

export const ModalCloseButton = styled.button`
  margin-right: 2rem;
  font-size: 1.3rem;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  background-color: orange;
  color: white;

  :hover {
    cursor: pointer;
    background-color: darkorange;
    transition: 300ms;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
  margin-right: 3rem;
`;

export const ModalContentTitle = styled.div`
  font-size: 1.2rem;
  margin-top: 2rem;
`;

export const ModalContentObstitle = styled.div`
  font-size: 1.2rem;
  font-weight: lighter;
  margin-bottom: 0.5rem;
`;

export const ModalContentObsArea = styled.textarea`
font-size: 1.2rem;
padding: 1rem;
border-color: ${({ theme }) => theme.colors.grey};
border-radius: 4px;
`;

export const ModalContentObsSaveButton = styled.button`
  font-size: 1.3rem;
  border: none;
  border-radius: 3px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  color: white;
  
  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
    transition: 300ms;
  }
`;

export const Border = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
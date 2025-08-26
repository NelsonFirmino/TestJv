import { PresentationChart } from "phosphor-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 100%;
`;
export const FormContainer = styled.main`
  background-color: white;
  height: 100%;
`;
export const PageTitleContainer = styled.div`
position: sticky;
top: 0;
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  background-color: white;
  z-index: 999;
  user-select: none;
  padding: 1rem 1.8rem;
  border-bottom: 1px solid #f9fafb;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;
export const PageIcon = styled(PresentationChart)`
  font-size: 2rem;
  margin-right: 1rem;
`;
export const PageTitle = styled.h2`
  color: ${({ theme }) => theme.colors.titlePage};
  font-size: 1.4rem;
  margin: 0;
  padding: 0;
  font-weight: 600;
`;

export const ContainerButton = styled.div`
  /* position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%); */
`;

import { Trash } from "phosphor-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #f2f2f2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
`;

export const ObservationHeader = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  padding-bottom: 0.5rem;
`;

export const Name = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 0.5rem;
`;

export const Date = styled.h4`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

export const Observation = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkerGrey};
`;

export const DeleteObservationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-left: auto;
  border-radius: 50%;
  transition: all 500ms;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.MenuTextColor};
    & > svg {
      color: ${({ theme }) => theme.colors.softRed};
    }
  }
`;

export const RemoveIcon = styled(Trash)`
  font-size: 1.4rem;
`;

import { List, Plus } from "phosphor-react";
import styled from "styled-components";
import Select from "react-select";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const PageIcon = styled(List)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const RegisterUserButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 50%;
  margin-left: auto;
  width: 4rem;
  height: 4rem;
  transition: all 500ms;
  background-color: ${({ theme }) => theme.colors.pageButton};
  cursor: "pointer";

  &:hover {
    background-color: ${({ theme }) => theme.colors.pageButtonDark};
  }
`;

export const RegisterUserIcon = styled(Plus)`
  font-size: 2rem;
`;

export const ContainerHeader = styled.div`
	display: flex;
	background-color: ${({ theme }) =>
    theme.colors.jvrisAqua};
	align-items: center;
	padding: 1.8rem 1.8rem;
	max-height: 6rem;
	//border-radius: 0.8rem;
`;


export const Checkbox = styled.input`
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;  
  
`;

export const FieldTitle = styled.h3`
  display: flex;
  position: relative;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-bottom: 0.5rem;
  align-items: center;
`;

export const DateInput = styled.input`
  text-indent: 0.3rem;
  font-size: 1.3rem;
  height: 3.6rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  outline: ${({ theme }) => theme.colors.softGreen};
  //width: 100%;
  border-radius: 0.4rem;
  * {
    font-size: 1.3rem;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const SelectInput = styled(Select)`
  flex: auto;
  font-size: 1.3rem;
  height: 3.6rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;
  * {
    font-size: 1.3rem;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;


export const TextInput = styled.input`
  flex: auto;
  font-size: 1.3rem;
  height: 3.6rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  text-indent: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;
  background-color: ${({ disabled }) => (disabled ? "#f2f2f2" : "")};
  border-color: ${({ disabled }) => (disabled ? "#e6e6e6" : "")};
  color: ${({ disabled }) => (disabled ? "#999999" : "")};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const ContainerField = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
export const ContainerFieldRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  margin-top: 2rem;
  justify-content: space-evenly;
  align-items: center;
`;

export const Container = styled.div`
  margin: 20px;
`;

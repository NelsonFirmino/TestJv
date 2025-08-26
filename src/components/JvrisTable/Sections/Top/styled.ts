import styled from "styled-components";
import Select from "react-select";
import { CheckFat } from "@phosphor-icons/react";
import { CheckSquare } from "phosphor-react";

export const TableTopRow = styled.div`
	display: flex;
	margin: 1.5rem;
	align-items: center;
	justify-content: flex-end;
`;

export const ButtonsContainer = styled.div`
    //padding-right: 20px;
    width: fit-content;
    position: sticky;
    right: 1.5rem;
    display: grid;
    grid-gap: 1rem;
    grid-auto-flow: column;
`;

export const Check = styled(CheckSquare) <{check: boolean|number}>`
	/* width: 1.5rem;
	height: 1.5rem; */
	color: ${(props) => props.check ? props.theme.colors.jvrisAqua : props.theme.colors.gray};
	transition: all 0.2s ease-in-out;
`

export const FuncsContainer = styled.div`
	position: relative;
	width: fit-content;
	right: 1.5rem;
	display: flex;
	gap: 1.2rem;
	align-items: center;
	justify-content: center;
	//margin: 2rem 0rem;
`;

export const InputsContainer = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	gap: 1.2rem;
	border: 2px solid ${(props) => props.theme.colors.jvrisAqua};
	padding: 0.5rem;
	border-radius: 0.5rem;
`;

export const Dash = styled.div`
	width: 40px;
	height: 6px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.colors.jvrisAqua};
`;

export const InputContainer = styled.div`
	background-color: ${(props) => props.theme.colors.gray};
	width: 48px;
	height: 35px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

export const Pageinput = styled.input`
	background-color: transparent;
	width: 100%;
	color: white;
	border: none;
	text-align: center;
	font-size: 20px;
	outline: none;
	::-webkit-outer-spin-button,
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	cursor: pointer;
`;

export const TableTopRowButton = styled.button`
	display: flex;
	border: none;
	padding: 1rem;
	text-align: center;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.theme.colors.jvrisAqua};
	border-radius: 0.5rem;
	font-size: 1.4rem;
	font-weight: bold;
	color: white;
	width: max-content;
	cursor: pointer;

	&:hover {
		background-color: ${(props) => props.theme.colors.jvrisAquaDark};
	}
`;

export const TableTopRowContainer = styled.div`
	display: flex;
	margin: 1.5rem;
	flex-direction: row;
	align-items: center;
`;

export const TableTopRowText = styled.div`
	font-size: 1.2rem;
	color: ${(props) => props.theme.colors.gray};
`;
export const SelectRowLimits = styled(Select)`
	width: max-content;

	* {
		font-size: 1.3rem;
	}
`;
export const SearchBarContainerWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

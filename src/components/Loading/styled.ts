import styled from "styled-components";

export const LoadingSpinner = styled.div`
	position: absolute;
	animation: is-rotating 1s infinite;
	border: 2px solid
		${({ theme }) => theme.colors.mediumGrey};
	border-radius: 50%;
	border-top-color: ${({ theme }) =>
		theme.colors.jvrisAqua};
	height: 2rem;
	width: 2rem;
	right: 0;
	top: 25%;
	margin-right: 1rem;

	@keyframes is-rotating {
		to {
			transform: rotate(1turn);
		}
	}
`;

export const LoadingSpinner2 = styled.div`
	animation: is-rotating 1s infinite;
	border: 2px solid
		${({ theme }) => theme.colors.mediumGrey};
	border-radius: 50%;
	border-top-color: ${({ theme }) =>
		theme.colors.jvrisAqua};
	height: 2rem;
	width: 2rem;

	@keyframes is-rotating {
		to {
			transform: rotate(1turn);
		}
	}
`;

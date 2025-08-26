import { ArrowClockwise } from "phosphor-react";
import styled from "styled-components";

const Wrapper = styled.div`
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        background-color: ${(props) => props.theme.colors.jvrisAqua};
        border-radius: 0.5rem;
        width: 46px;
        height: 46px;
        cursor: pointer;

        &:hover {
            background-color: ${(props) => props.theme.colors.jvrisAquaDark};
        }
    `;


const ReSeed = ({ onClick }: { onClick: () => void }) => {

    return (
        <Wrapper
            onClick={onClick}>
            <ArrowClockwise color="white" size={32} weight="bold" />
        </Wrapper>
    )
}

export default ReSeed;
import { ArrowSquareIn, Eye, EyeClosed } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ContentParagraphProps } from "./interfaces";

type SwitchCardProps = {
    isSelected: boolean;
};

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
`;

export const ContainerSwitchCards = styled.div`
    display: flex;
    margin-left: 2rem;
    @media (max-width: 450px) {
        margin-left: 0.5rem;
    }
`;

export const TableInfoContainer = styled.div`
    display: flex;
    margin-left: 2rem;
    margin-top: 2rem;

    @media (max-width: 450px) {
        margin-top: 1rem;
        margin-left: 0.5rem;
    }
`;

export const SwitchCard = styled.div<SwitchCardProps>`
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 400;
    background-color: ${({ theme, isSelected }) =>
        isSelected ? theme.colors.jvrisAqua : theme.colors["gray/700"]};
    padding: 1rem;
    border-radius: 1rem;
    transition: all 200ms;
    text-decoration: none;
    object-fit: contain;
    cursor: pointer;
    margin-right: 0.5rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: ${({ theme }) => theme.colors["gray/800"]};
    }

    &:not(:last-child) {
        margin-right: 1rem;
    }
`;

type CardNumberProps = {
    isMoreThanZero: boolean;
};

export const LoadingSpinner = styled.div`
    position: relative;
    animation: is-rotating 1s infinite;
    border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
    border-radius: 50%;
    border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
    height: 1.5rem;
    width: 1.5rem;
    right: 0;
    margin-right: 1rem;

    @keyframes is-rotating {
        to {
            transform: rotate(1turn);
        }
    }
`;

interface ProcessosViewProps {
    processosOptions: any[];
}
export const ProcessosView = ({ processosOptions }: ProcessosViewProps) => {
    const [showProcessos, setShowProcessos] = useState(false);
    const ProcessosViewContainer = styled.div`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 560px;
    `;
    const ProcessosViewWrapper = styled.div`
        display: flex;
        flex-wrap: wrap;
        max-height: 200px;
        overflow: auto;
        gap: 1rem;
    `;
    const ProcessosViewItem = styled.p`
        font-size: 1.2rem;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        background-color: ${({ theme }) => theme.colors.lighterGrey};
        color: ${({ theme }) => theme.colors.darkerGrey};
        border: 2px solid ${({ theme }) => theme.colors.jvrisAqua};
    `;
    const ProcessosViewAmount = styled.p`
        display: flex;
        font-size: 1.2rem;
        padding: 1rem;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        background-color: ${({ theme }) => theme.colors.jvrisAqua};
        color: ${({ theme }) => theme.colors.white};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
    `;
    const EyeIconWrapper = styled.div`
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${({ theme }) => theme.colors.jvrisAqua};
        color: ${({ theme }) => theme.colors.white};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        transition: 0.2s ease;
        padding: 0.6rem;
        gap: 0.5rem;

        &:hover {
            background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
        }
    `;

    const Text = styled.p`
        font-size: 1.2rem;
        margin-right: 1rem;
    `;

    const InfoWrapper = styled.div`
        display: flex;
        gap: 1rem;
    `;
    return (
        <ProcessosViewContainer>
            <InfoWrapper>
                <ProcessosViewAmount>
                    {processosOptions.length} processos
                </ProcessosViewAmount>

                <EyeIconWrapper
                    onClick={() => setShowProcessos(!showProcessos)}
                >
                    {!showProcessos ? (
                        <>
                            <Eye size={24} />
                            <Text>Visualizar</Text>
                        </>
                    ) : (
                        <EyeClosed size={24} />
                    )}
                </EyeIconWrapper>
            </InfoWrapper>

            <ProcessosViewWrapper>
                {showProcessos &&
                    processosOptions.map((item, index) => {
                        return (
                            <ProcessosViewItem
                                key={index}
                                //isSelected={item.isSelected || item.isFixed}
                            >
                                {item.label}
                            </ProcessosViewItem>
                        );
                    })}
            </ProcessosViewWrapper>
        </ProcessosViewContainer>
    );
};

export const FlagContainer = styled.div`
    display: flex;
    margin-bottom: 3rem;
`;

export const Flag = styled.div`
    padding: 1rem;
    padding-right: 2rem;
    clip-path: polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%);
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    text-align: center;
`;

export const SubtitleSection = styled.section`
    display: flex;
    //margin: 2rem 0;
    margin: 5rem 0 3rem 1rem;
`;

export const Subtitle = styled.span`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.gray};
    font-weight: bold;
    margin-right: 1rem;
`;

export const SubtitleContainer = styled.div`
    display: flex;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.darkerGrey};

    &:not(last-child) {
        margin-right: 0.5rem;
    }
`;

export const SubtitleIcon = styled.div`
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    background-color: #fa8564;
    margin-right: 0.5rem;
`;

export const SubtitleText = styled.span`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.darkerGrey};
    font-weight: bold;
`;

export const CardsGrid = styled.div`
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
`;

export const ScheduleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.6rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors["gray/700"]};
    transition: all 200ms;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    outline: none;
    border: none;

    &:hover {
        scale: 1.1;
    }
`;

export const ScheduleButtonIcon = styled(ArrowSquareIn)`
    font-size: 1.5rem;
    color: white;
`;

export const PecasNaoFinalizadasButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    margin-top: -0.3rem;
    margin-left: 2.5rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors["gray/700"]};
    transition: all 200ms;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    outline: none;
    border: none;

    &:hover {
        scale: 1.1;
    }
`;

export const PecasNaoFinalizadasButtonIcon = styled(ArrowSquareIn)`
    font-size: 1.4rem;
    color: white;
`;

export const PecasNaoFinalizadasLine = styled.div`
    display: flex;
`;

export const PecasNaoFinalizadasNumber = styled.span<CardNumberProps>`
    font-size: 1.4rem;
    color: ${({ theme, isMoreThanZero }) =>
        isMoreThanZero ? theme.colors.softOrange : theme.colors["gray/700"]};
`;

export const PecasFinalizadasMesNumber = styled.span<CardNumberProps>`
    font-size: 1.4rem;
    color: ${({ theme, isMoreThanZero }) =>
        isMoreThanZero ? theme.colors.softGreen : theme.colors["gray/700"]};
`;

export const CardLineContent = styled.span`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors["gray/700"]};
`;

export const CardNumberToday = styled.span<CardNumberProps>`
    font-size: 1.4rem;
    color: ${({ theme, isMoreThanZero }) =>
        isMoreThanZero ? theme.colors.darkRed : theme.colors["gray/700"]};
`;

export const CardNumberTomorrow = styled.span<CardNumberProps>`
    font-size: 1.4rem;
    color: ${({ theme, isMoreThanZero }) =>
        isMoreThanZero
            ? theme.colors.softYellowDark
            : theme.colors["gray/700"]};
`;

export const ContentParagraph = styled.p<ContentParagraphProps>`
    font-size: 1.4rem;
    font-style: ${({ bold }) => (bold ? "bold" : "regular")};
    color: ${({ theme }) => theme.colors.darkerGrey};
    margin: 0.5rem 0;

    &.name {
        font-weight: bold;
    }

    &.job-role {
        //font-weight: bold;
        font-style: italic;
        color: ${({ theme }) => theme.colors.gray};
    }
`;

export const LinkButton = styled(Link)`
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    font-size: 1.35rem;
    text-align: center;
    border-radius: 5px;
    color: white;
    padding: 5px 3.5rem;
    margin-top: 0.5rem;
    text-decoration: none;

    &:hover {
        cursor: pointer;
        background-color: #1ca59e;
    }
`;
export const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    font-size: 1.35rem;
    text-align: center;
    border-radius: 5px;
    color: white;
    padding: 5px 3.5rem;
    margin-top: 0.5rem;
    text-decoration: none;
    border: none;

    &:hover {
        cursor: pointer;
        background-color: #1ca59e;
    }
`;
export const Butt = styled.div`
    width: 40px;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export function buttHelper(
    text: string,
    onclick: () => void,
    Icon: React.ReactNode
) {
    return (
        <Butt
            style={{
                fontSize: "1.35rem"
            }}
            onClick={onclick}
        >
            {text}
            {Icon}
        </Butt>
    );
}

export const OptionsTableContainer = styled.div`
    margin-top: 3rem;
    display: flex;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
`;

export const OptionTable = styled.span`
    cursor: pointer;
    padding: 2rem 1rem;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.jvrisAqua};
`;

export const CountOptionTable = styled.span`
    padding: 0.75rem;
    margin-left: 0.5rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.darkerGrey};
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.1rem;
    font-weight: bold;
`;

export const StatusColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5rem 1rem 3rem 0;
`;

export const StatusWrapper = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;

    &:first-child {
        margin-bottom: 2rem;
    }
`;

export const StatusLabelTitle = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gray};
`;

export const StatusSection = styled.div`
    display: flex;
    padding-left: 1.2rem;
    align-items: center;
`;

export const StatusLabel = styled.div`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.grey};
    margin-left: 0.2rem;
`;

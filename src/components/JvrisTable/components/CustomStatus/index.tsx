import theme from "../../../../globalStyle/theme";
import * as S from "./styled";

const CustomStatus = ({ value }: { value: number }) => {
    return (
        <S.StatusContainer
            style={{
                backgroundColor:
                    value < 0
                        ? theme.colors.softRed
                        : !value ? theme.colors.darkerGrey
                            : value == 0
                                ? theme.colors.softPurple
                                : /* : value == -1
                        ? theme.colors.darkerGrey */
                                value < 8
                                    ? theme.colors.softYellow
                                    : theme.colors.softGreen
            }}
        >
            <p
                style={{
                    color: theme.colors.white,
                    fontSize: "12px",
                    textAlign: "center",
                    maxWidth: "50px",
                }}
            >
                {value < 0
                    ? "Prazo Vencido"
                    : !value ? "Sem Prazo"
                        : value == 0
                            ? "Vence Hoje"
                            : /* : value === -1
                    ? "Sem Prazo" */
                            `${value == 1 ? "Falta" : "Faltam"} ${value} ${value == 1 ? "dia" : "dias"
                            }`}
            </p>
        </S.StatusContainer>
    );
};

export default CustomStatus;

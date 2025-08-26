import { Circle } from "phosphor-react";
import * as S from "../../styled";
import theme from "../../../../../../globalStyle/theme";

const TablesInfo = () => {
    return (
        <S.StatusWrapper>
            <S.StatusLabelTitle>Relevâncias:</S.StatusLabelTitle>
            <S.StatusSection>
                <Circle
                    color={theme.colors.softGreen}
                    size={"1.1rem"}
                    weight="bold"
                />
                <S.StatusLabel>Normal</S.StatusLabel>
            </S.StatusSection>
            <S.StatusSection>
                <Circle
                    color={theme.colors.softOrange}
                    size={"1.1rem"}
                    weight="fill"
                />
                <S.StatusLabel>Urgente</S.StatusLabel>
            </S.StatusSection>

            <S.StatusSection>
                <img src={require('../../../Attorney/components/TableInfo/icons/ponto-de-exclamacao-em-um-circulo.png')} alt="Importante" style={{ width: "1.1rem", height: "1.1rem", marginRight: "0.4rem" }} />
                <S.StatusLabel>Importante</S.StatusLabel>
            </S.StatusSection>
            <S.StatusSection>
                <img src={require('../../../Attorney/components/TableInfo/icons/cifrao.png')} alt="Valor Expressivo" style={{ width: "1.4rem", height: "1.4rem", }} />
                <S.StatusLabel>Valor Expressivo</S.StatusLabel>
            </S.StatusSection>
            <S.StatusSection>
                <img src={require('../../../Attorney/components/TableInfo/icons/sustentacao_oral_fundo_transparente_1.png')} alt="Sustentacao oral" style={{ width: "1.4rem", height: "1.4rem", }} />
                <S.StatusLabel>Sustentação Oral</S.StatusLabel>
            </S.StatusSection>


        </S.StatusWrapper>
    )
}

export default TablesInfo
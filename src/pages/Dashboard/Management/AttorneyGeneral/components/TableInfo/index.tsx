import {
  ShareFat,
  BookmarkSimple,
  ChatsCircle,
  Circle,
  CurrencyDollarSimple,
  Info,
  Shuffle,
  User,
} from "@phosphor-icons/react";
import theme from "../../../../../../globalStyle/theme";
import * as S from "./styled";

const TableInfo = () => {
  return (
    <S.StatusColumn>
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
          <Circle color={theme.colors.softRed} size={"1.1rem"} weight="fill" />
          <S.StatusLabel>Importante</S.StatusLabel>
        </S.StatusSection>
        <S.StatusSection>
          <Circle
            color={theme.colors.softYellow}
            size={"1.1rem"}
            weight="fill"
          />
          <S.StatusLabel>Valor Expressivo</S.StatusLabel>
        </S.StatusSection>
        <S.StatusSection>
          <Circle
            color={theme.colors.softPurple}
            size={"1.1rem"}
            weight="fill"
          />
          <S.StatusLabel>Sustentação Oral</S.StatusLabel>
        </S.StatusSection>
      </S.StatusWrapper>

      <S.StatusWrapper>
        <S.StatusLabelTitle>Ícones:</S.StatusLabelTitle>
        <S.StatusSection>
          <User color={theme.colors.gray} size={"1.4rem"} weight="fill" />
          <S.StatusLabel>Assessor</S.StatusLabel>
        </S.StatusSection>
        <S.StatusSection>
          <BookmarkSimple
            color={theme.colors.gray}
            size={"1.4rem"}
            weight="fill"
          />
          <S.StatusLabel>Peça</S.StatusLabel>
        </S.StatusSection>
        <S.StatusSection>
          <ShareFat color={theme.colors.gray} size={"1.4rem"} weight="fill" />
          <S.StatusLabel>Pedido de Inação</S.StatusLabel>
        </S.StatusSection>
        <S.StatusSection>
          <CurrencyDollarSimple
            color={theme.colors.gray}
            size={"1.4rem"}
            weight="bold"
          />
          <S.StatusLabel>Contadoria (DCJE)</S.StatusLabel>
        </S.StatusSection>
        <S.StatusSection>
          <Info color={theme.colors.gray} size={"1.4rem"} weight="bold" />
          <S.StatusLabel>Solicitação de Informação</S.StatusLabel>
        </S.StatusSection>
        <S.StatusSection>
          <Shuffle color={theme.colors.gray} size={"1.4rem"} weight="bold" />
          <S.StatusLabel>Pedido de Redistribuição</S.StatusLabel>
        </S.StatusSection>
        <S.StatusSection>
          <ChatsCircle
            color={theme.colors.gray}
            size={"1.6rem"}
            weight="duotone"
          />
          <S.StatusLabel>Observação</S.StatusLabel>
        </S.StatusSection>
      </S.StatusWrapper>
    </S.StatusColumn>
  );
};

export default TableInfo;

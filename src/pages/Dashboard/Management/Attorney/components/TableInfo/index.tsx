import {
  BookmarkSimple,
  ChatsCircle,
  Circle,
  CurrencyDollarSimple,
  Info,
  ShareFat,
  Shuffle,
  User,
} from "@phosphor-icons/react";
import { Grau } from "../../../../../../components/JvrisTable/styled";
import theme from "../../../../../../globalStyle/theme";
import { IconeRelevancia } from "./icons/iconeRelevancia";
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
          <IconeRelevancia
            alt="Importante"
            src={require("./icons/ponto-de-exclamacao-em-um-circulo.png")}
            width="1.1rem"
            height="1.1rem"
            marginRight="0.4rem"
          />
          <S.StatusLabel>Importante</S.StatusLabel>
        </S.StatusSection>
        <S.StatusSection>
          <img
            src={require("./icons/cifrao.png")}
            alt="Valor Expressivo"
            style={{ width: "1.4rem", height: "1.4rem" }}
          />
          <S.StatusLabel>Valor Expressivo</S.StatusLabel>
        </S.StatusSection>
        <S.StatusSection>
          <img
            src={require("./icons/sustentacao_oral_fundo_transparente_1.png")}
            alt="Sustentacao oral"
            style={{ width: "1.4rem", height: "1.4rem" }}
          />
          <S.StatusLabel>Sustentação Oral</S.StatusLabel>
        </S.StatusSection>
      </S.StatusWrapper>

      <S.StatusWrapper style={{ marginTop: "1rem" }}>
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
        {/* sigilo removido por enquanto estiver em homologação */}
        {/* <S.StatusSection>
          <Sigilo
            style={{
              backgroundColor: theme.colors.black,
              width: "3rem",
              height: "1.7rem",
              marginRight: "0.2rem",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            S-0
          </Sigilo>
          <S.StatusLabel style={{ marginRight: "0rem" }}>Sigilo</S.StatusLabel>
        </S.StatusSection> */}
        <S.StatusSection>
          <Grau
            style={{
              backgroundColor: "#295D94",
              width: "2rem",
              height: "1.7rem",
              marginRight: "0.2rem",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            1°
          </Grau>
          <S.StatusLabel style={{ marginRight: "0rem" }}>
            Grau do Processo
          </S.StatusLabel>
        </S.StatusSection>
      </S.StatusWrapper>
    </S.StatusColumn>
  );
};

export default TableInfo;

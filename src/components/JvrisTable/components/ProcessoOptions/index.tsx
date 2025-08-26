import { ChatsCircle, Circle, Copy, ShareFat } from "@phosphor-icons/react";
import * as S from "./styled";

import {
  BookmarkSimple,
  CurrencyDollarSimple,
  Info,
  Shuffle,
} from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import theme from "../../../../globalStyle/theme";
import { HotToastSucess } from "../../../HotToastFuncs";
import { JvrisTableContext } from "../../context/JvrisTableContext";
import { CadastroAto, Grau, Sigilo } from "../../styled";
import { ProcessOptionsI } from "./ProcessoOptions.interfaces";

const NumProcessOptions = (props: ProcessOptionsI) => {
  const {
    copy,
    cadastro,
    numero,
    tipo,
    sigilo,
    grau,
    inacao,
    informacao,
    observacao,
    redistribuicao,
    peca,
    ficha,
  } = props;

  const { clikedRow } = useContext(JvrisTableContext);
  const [prevClickedRow, setPrevClickedRow] = useState(clikedRow);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clikedRow != prevClickedRow) {
      setClicked(false);
      setPrevClickedRow(clikedRow);
      numero.onClick && numero.onClick(clikedRow);
    }
  }, [clicked]);

  const [sigiloName, setSigiloName] = useState("");

  useEffect(() => {
    switch (sigilo?.value) {
      case 0:
        setSigiloName("Público");
        break;
      case 1:
        setSigiloName("Segredo");
        break;
      case 2:
        setSigiloName("Mínimo");
        break;
      case 3:
        setSigiloName("Médio");
        break;
      case 4:
        setSigiloName("Intenso");
        break;
      case 5:
        setSigiloName("Absoluto");
        break;
      default:
        setSigiloName("");
    }
  }, [sigilo?.value]);

  const [grauProcesso, setGrauProcesso] = useState("");

  useEffect(() => {
    switch (grau?.value) {
      case 1:
        setGrauProcesso("1");
        break;
      case 2:
        setGrauProcesso("2");
        break;
      case 3:
        setGrauProcesso("3");
        break;
      default:
        setGrauProcesso("");
    }
  }, [grau?.value]);

  return (
    <S.ProcessoOptionsContainer>
      <S.NumProcessContainer>
        <S.NumProcess
          onClick={
            numero.onClick
              ? () => {
                  setClicked(!clicked);
                }
              : undefined
          }
          title={numero.title}
        >
          {numero.value}
        </S.NumProcess>
        {copy && (
          <Copy
            size={16}
            onClick={() => {
              navigator.clipboard.writeText(numero.value.toString());
              copy.onClick && copy.onClick();
              HotToastSucess(`${numero.value} copiado!`);
            }}
            alt="Copiar"
            style={{
              cursor: "pointer",
              marginLeft: "-10px",
            }}
            weight="fill"
          />
        )}
      </S.NumProcessContainer>

      <S.OptionsIconsContainer>
        {peca && (
          <BookmarkSimple
            alt="Peça cadastrada para este Ato"
            size={16}
            weight="fill"
            color={theme.colors.softPurple}
          />
        )}

        {tipo && (
          <Circle
            alt={`Processo - ${tipo.value}`}
            size={16}
            weight={
              tipo?.value == "Urgente"
                ? "fill"
                : tipo?.value == "Importante"
                ? "fill"
                : tipo?.value == "Valor Expressivo"
                ? "fill"
                : tipo?.value == "Sustentação Oral"
                ? "bold"
                : "bold"
            }
            color={
              tipo?.value == "Urgente"
                ? theme.colors.softRed
                : tipo?.value == "Importante"
                ? theme.colors.softOrange
                : tipo?.value == "Valor Expressivo"
                ? theme.colors.softYellow
                : tipo?.value == "Sustentação Oral"
                ? theme.colors.softPurple
                : theme.colors.softGreen
            }
          />
        )}

        {sigilo && (
          <Sigilo
            style={{
              backgroundColor: theme.colors.black,
            }}
            title={`Sigilo nível ${sigilo?.value}: ${sigiloName}`}
          >
            {sigilo?.value == 0
              ? "S-0"
              : sigilo?.value == 1
              ? "S-1"
              : sigilo?.value == 2
              ? "S-2"
              : sigilo?.value == 3
              ? "S-3"
              : sigilo?.value == 4
              ? "S-4"
              : "S-5"}
          </Sigilo>
        )}
        {grau?.value && (
          <Grau
            style={{
              backgroundColor: "#295D94",
            }}
            title={`Processo de ${grau?.value}° grau`}
          >
            {grau?.value == 1
              ? "1"
              : grau?.value == 2
              ? "2"
              : grau?.value == 3
              ? "3"
              : ""}
          </Grau>
        )}
        {cadastro && (
          <CadastroAto
            style={{
              backgroundColor:
                cadastro?.value == "automaticamente"
                  ? theme.colors.softGreen
                  : theme.colors.softYellow,
            }}
            title={`Ato cadastrado ${cadastro?.value}`}
          >
            {cadastro?.value == "automaticamente" ? "A" : "M"}
          </CadastroAto>
        )}
        {inacao && (
          <ShareFat
            color={inacao.value ? theme.colors.softRed : theme.colors.softGreen}
            size={16}
            weight="fill"
            alt={
              inacao.value
                ? "Pedido de inação: Recusado"
                : "Pedido de inação: Aguardando acato da Chefia"
            }
          />
        )}
        {informacao && (
          <Info
            color={theme.colors.softGreen}
            size={16}
            weight="fill"
            alt={
              informacao.value
                ? "Pedido de Informação: Resposta Disponível"
                : "Pedido de Informação: Aguardando resposta da especializada"
            }
          />
        )}
        {ficha && (
          <CurrencyDollarSimple
            color={
              ficha.value == "Ficha Processual: Devolvida"
                ? theme.colors.softRed
                : ficha.value == "Ficha Processual: Resposta Disponível"
                ? theme.colors.softGreen
                : theme.colors.softYellow
            }
            size={16}
            weight="fill"
            alt={ficha.value}
          />
        )}
        {observacao && (
          <ChatsCircle
            color={theme.colors.gray}
            size={16}
            weight="fill"
            alt={observacao.value}
          />
        )}
        {redistribuicao && (
          <Shuffle
            color={
              redistribuicao.value
                ? theme.colors.softOrange
                : theme.colors.softGreen
            }
            size={16}
            weight="bold"
            alt={
              redistribuicao.value
                ? "Pedido de redistribuição: Negado"
                : "Pedido de redistribuição: Aguardando acato da Chefia"
            }
          />
        )}
      </S.OptionsIconsContainer>
    </S.ProcessoOptionsContainer>
  );
};

export default NumProcessOptions;

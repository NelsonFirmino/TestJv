import { ChatsCircle } from "phosphor-react";
import toast from "react-hot-toast";
import { ProcessoInAction } from "../../../../../../../api/services/attorneys/attorneys.interface";
import theme from "../../../../../../../globalStyle/theme";
import { IconeRelevancia } from "../../TableInfo/icons/iconeRelevancia";
import * as S from "./styled";

interface ProcessNumberProps {
  data: ProcessoInAction;
}

export const ProcessNumber = ({ data }: ProcessNumberProps) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Código de processo copiado!", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
    } catch (err) {
      console.log("Falha ao copiar o texto", err);
    }
  };

  const sigiloLevel = {
    0: "Público",
    1: "Segredo",
    2: "Mínimo",
    3: "Médio",
    4: "Intenso",
    5: "Absoluto",
  };

  const relevaciaStyle = {
    Normal: "bold",
    Urgente: "fill",
    Importante: "bold",
    "Valor Expressivo": "fill",
    "Sustentação Oral": "bold",
  };

  return (
    <S.Wrapper>
      <S.ContainerProcessDetails>
        <S.ContainerDetails>
          <S.NumberProcess
            onClick={() => {
              window.open(
                `/dashboard/detalhes-processo/espelho-processos/${data?.idProcesso}`,
                "_blank"
              );
            }}
          >
            {data?.txNumero ||
              data?.txNumeroProcesso ||
              data?.txNumeroFormatado}
          </S.NumberProcess>
          <S.Details>
            {data?.txRelevancia != null && (
              <S.ContainerProcessRelevance
                title={`Relevância do Processo - ${data.txRelevancia}`}
              >
                {data?.txRelevancia == "Importante" ? (
                  <IconeRelevancia
                    alt="Importante"
                    src={require("../../../components/TableInfo/icons/ponto-de-exclamacao-em-um-circulo.png")}
                    width="1.3rem"
                    height="1.3rem"
                  />
                ) : data?.txRelevancia == "Valor Expressivo" ? (
                  <IconeRelevancia
                    alt="Importante"
                    src={require("../../../components/TableInfo/icons/cifrao.png")}
                    width="1.3rem"
                    height="1.3rem"
                  />
                ) : data?.txRelevancia == "Sustentação Oral" ? (
                  <IconeRelevancia
                    alt="Importante"
                    src={require("../../../components/TableInfo/icons/sustentacao_oral_fundo_transparente_1.png")}
                    width="1.3rem"
                    height="1.3rem"
                  />
                ) : (
                  <S.RelevanceIcon
                    relevance={data.txRelevancia}
                    weight={relevaciaStyle[data.txRelevancia]}
                  />
                )}
              </S.ContainerProcessRelevance>
            )}

            {data?.nuSigilo != null && (
              <S.ContainerSigilo
                title={`Sigilo nível ${data.nuSigilo}: ${
                  sigiloLevel[data.nuSigilo] || ""
                }`}
              >
                S-{data.nuSigilo}
              </S.ContainerSigilo>
            )}

            {data?.nuInstancia && (
              <S.ContainerGrau title={`Processo de ${data.nuInstancia}° grau`}>
                {data.nuInstancia + "°"}
              </S.ContainerGrau>
            )}
            {data?.idFichaProcessual > 0 && (
              <S.ContainerRedistribution
                title={`Ficha Processual: ${
                  data.isFichaProcessualDevolvida
                    ? "Devolvida"
                    : data.idRespostaFichaProcessual > 0
                    ? "Resposta Disponível"
                    : "Aguardando resposta da DCJE"
                }`}
              >
                <S.ContadoriaIcon
                  weight="bold"
                  isFichaProcessualDevolvida={data.isFichaProcessualDevolvida}
                  idRespostaFichaProcessualMaiorZero={
                    data.idRespostaFichaProcessual > 0
                  }
                />
              </S.ContainerRedistribution>
            )}
            {data?.txStatusCadastroAto && (
              <S.ContainerActType
                title={`Ato cadastrado ${
                  data.txStatusCadastroAto === "M"
                    ? "manualmente"
                    : "automaticamente"
                }`}
                txStatusCadastroAto={data.txStatusCadastroAto}
              >
                {data.txStatusCadastroAto}
              </S.ContainerActType>
            )}

            {data?.idSolicitacaoInformacao > 0 && (
              <S.ContainerRequestInfo
                title={`Pedido de Informação: ${
                  data.idSolicitacaoInformacaoResposta > 0
                    ? "Resposta Disponível"
                    : "Aguardando resposta da especializada"
                }`}
              >
                <S.RequestInfoIcon weight="fill" />
              </S.ContainerRequestInfo>
            )}

            {data?.idDespacho > 0 && (
              <S.ContainerInacao
                title={`Pedido de inação: ${
                  data.isDespachoRecusado
                    ? "Recusado"
                    : "Aguardando acato da chefia"
                }`}
              >
                <S.InacaoIcon
                  weight="fill"
                  isDespachoRecusado={data.isDespachoRecusado}
                />
              </S.ContainerInacao>
            )}

            {data?.idRedistribuicao > 0 && (
              <S.ContainerRedistribution
                title={`Pedido de redistribuição: ${
                  data.isRedistribuicaoRecusada
                    ? "Negado"
                    : "Aguardando acato da chefia"
                }`}
              >
                <S.RedistributionIcon
                  weight="bold"
                  isRedistribuicaoRecusada={data.isRedistribuicaoRecusada}
                />
              </S.ContainerRedistribution>
            )}

            {data?.txUltimaObservacao && (
              <ChatsCircle
                color={theme.colors.gray}
                size={"1.8rem"}
                weight="duotone"
                alt={`${data?.txUltimaObservacao}`}
              />
            )}
          </S.Details>
        </S.ContainerDetails>
        <S.ContainerCopyIcon onClick={() => copyToClipboard(data?.txNumero)}>
          <S.CopyIcon
            alt={`Copiar número do processo: ${data?.txNumero}`}
            weight="light"
          />
        </S.ContainerCopyIcon>
      </S.ContainerProcessDetails>
    </S.Wrapper>
  );
};

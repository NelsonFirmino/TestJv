import toast from "react-hot-toast";
import { ProcessoInAction } from "../../../../../../../api/services/attorneys/attorneys.interface";
import * as S from "./styled";

interface ProcessNumberProps {
  data: ProcessoInAction;
  hasEspelho?: boolean;
}

export const NumeroProcessoComponent = ({
  data,
  hasEspelho,
}: ProcessNumberProps) => {
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

  return (
    <S.Wrapper>
      <S.ContainerProcessDetails>
        <S.ContainerDetails>
          {hasEspelho ? (
            <S.NumberProcess
              to={`/dashboard/detalhes-processo/espelho-processos/${data?.idProcesso}`}
            >
              {data?.txNumeroFormatado ||
                data?.txNumeroProcesso ||
                data?.txNumeroFormatado}
            </S.NumberProcess>
          ) : (
            <span style={{ fontSize: "1.35rem" }}>
              {data?.txNumeroFormatado ||
                data?.txNumeroProcesso ||
                data?.txNumeroFormatado}
            </span>
          )}

          <S.Details>
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
          </S.Details>
        </S.ContainerDetails>
        <S.ContainerCopyIcon
          onClick={() => copyToClipboard(data?.txNumeroFormatado)}
        >
          <S.CopyIcon
            alt={`Copiar número do processo: ${data?.txNumeroFormatado}`}
            weight="light"
          />
        </S.ContainerCopyIcon>
      </S.ContainerProcessDetails>
    </S.Wrapper>
  );
};

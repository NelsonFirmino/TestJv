import toast from "react-hot-toast";
import { ProcessoInAction } from "../../../../../../api/services/attorneys/attorneys.interface";
import * as S from "./styled";

interface ProcessNumberProps {
  data: ProcessoInAction;
}

export const NumeroProcessoComponent = ({ data }: ProcessNumberProps) => {
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
          <S.NumberProcess
            onClick={() => {
              window.open(
                `/dashboard/detalhes-processo/espelho-processos/${data?.id}`,
                "_blank"
              );
            }}
          >
            {data?.txNumeroFormatado}
          </S.NumberProcess>
          <S.Details>
            {data?.nuInstancia && (
              <S.ContainerGrau title={`Processo de ${data.nuInstancia}° grau`}>
                {data.nuInstancia + "°"}
              </S.ContainerGrau>
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

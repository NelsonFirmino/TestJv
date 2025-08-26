import { IconeRelevancia } from "../../../../Attorney/components/TableInfo/icons/iconeRelevancia";
import * as S from "./styled";

interface ProcessRelevanceProps {
  txRelevancia: string | null | undefined;
}

export const ProcessRelevance = ({ txRelevancia }: ProcessRelevanceProps) => {
  if (!txRelevancia) return null;

  const iconMap: Record<string, string> = {
    Importante: require("../../../../../../Dashboard/Management/Attorney/components/TableInfo/icons/ponto-de-exclamacao-em-um-circulo.png"),
    "Valor Expressivo": require("../../../../../../Dashboard/Management/Attorney/components/TableInfo/icons/cifrao.png"),
    "Sustentação Oral": require("../../../../../../Dashboard/Management/Attorney/components/TableInfo/icons/sustentacao_oral_fundo_transparente_1.png"),
  };

  const iconSrc = iconMap[txRelevancia];

  const relevaciaStyle = {
    Normal: "bold",
    Urgente: "fill",
    Importante: "bold",
    "Valor Expressivo": "fill",
    "Sustentação Oral": "bold",
  };

  return (
    <S.ContainerProcessRelevance
      title={`Relevância do Processo - ${txRelevancia}`}
    >
      {iconSrc ? (
        <IconeRelevancia
          alt={txRelevancia}
          src={iconSrc}
          width="1.3rem"
          height="1.3rem"
        />
      ) : (
        <S.RelevanceIcon
          relevance={txRelevancia}
          weight={relevaciaStyle[txRelevancia]}
        />
      )}
    </S.ContainerProcessRelevance>
  );
};

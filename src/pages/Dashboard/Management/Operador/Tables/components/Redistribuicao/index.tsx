import * as S from "./styled";

interface RedistribuicaoProps {
  txStatusRedistribuicaoAto: string | null | undefined;
}

export const Redistribuicao = ({
  txStatusRedistribuicaoAto,
}: RedistribuicaoProps) => {
  if (!txStatusRedistribuicaoAto) return null;

  const iconMap: Record<string, string> = {
    Importante: require("../../../../../../Dashboard/Management/Attorney/components/TableInfo/icons/ponto-de-exclamacao-em-um-circulo.png"),
    "Valor Expressivo": require("../../../../../../Dashboard/Management/Attorney/components/TableInfo/icons/cifrao.png"),
    "Sustentação Oral": require("../../../../../../Dashboard/Management/Attorney/components/TableInfo/icons/sustentacao_oral_fundo_transparente_1.png"),
  };

  return (
    <>
      {txStatusRedistribuicaoAto === "R" ? (
        <S.ContainerProcessRelevance title={`Pedido de Redistribuição`}>
          <S.RedistribuicaoSymbol>R</S.RedistribuicaoSymbol>
        </S.ContainerProcessRelevance>
      ) : (
        <S.SemRedistribuicaoSymbol>--</S.SemRedistribuicaoSymbol>
      )}
    </>
  );
};

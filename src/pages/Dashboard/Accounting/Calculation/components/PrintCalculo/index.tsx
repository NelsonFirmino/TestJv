import { getArquivoRespostaDcje } from "../../../../../../api/services/RespostaDcje/respostaDcje";
import { openPDFInNewTab } from "../../../../../../utils/openPDFInNewTab.util";
import * as S from "./styled";

export const PrintCalculo = (dataTable: any) => {
  async function getResponseArquivo(id: number | any) {
    if (!id) throw new Error("id is required");

    const resposta = await getArquivoRespostaDcje(id);

    return resposta;
  }

  const openArquivo = async (index: any) => {
    getResponseArquivo(index).then((res) => {
      {
        dataTable ? openPDFInNewTab(res?.data.file_stream) : "ERROR";
      }
    });
  };
  return (
    <S.Wrapper onClick={() => openArquivo(dataTable.dataTable.id)} to={""}>
      Imprimir
    </S.Wrapper>
  );
};

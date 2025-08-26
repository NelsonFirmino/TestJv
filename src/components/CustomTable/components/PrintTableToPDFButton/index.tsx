import { DocumentRendererPDF } from "../DocumentRendererPDF";
import { PrintTableToPDFButtonProps } from "./interfaces/print-table-to-pdf.interface";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";
import * as S from "./styled";
import { formatFileNameWithCurrentDate } from "../../../../utils/formatFileNameWithCurrentDate";

export const PrintTableToPDFButton = ({
  fileName,
  columns,
  data,
}: PrintTableToPDFButtonProps) => {
  async function exportToPDF() {
    try {
      const renderedPDF = <DocumentRendererPDF columns={columns} data={data} />;
      const asPdf = await pdf(renderedPDF).toBlob();
      saveAs(asPdf, `${formatFileNameWithCurrentDate(fileName)}.pdf`);
      toast("Tabela exportada para PDF! Cheque a pasta de downloads.", {
        icon: "✔",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
    } catch (error) {
      toast.error("Error ao exportar tabela para PDF!", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#e57373",
          color: "#fff",
          fontSize: "30px",
        },
      });
      console.error("Error generating PDF:", error);
    }
  }
  return (
    <S.Wrapper onClick={exportToPDF}>
      <S.Icon alt="Exportar para PDF" />
    </S.Wrapper>
  );
};

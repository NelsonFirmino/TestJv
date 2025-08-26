import { Parser } from "@json2csv/plainjs";
import { convertNumberToCurrency } from "../../../../utils/convertNumberToCurrency.util";
import { formatDateToCustomTable } from "../../../../utils/formatDateToCustomTable.util";
import { PrintTableToCSVButtonProps } from "./interfaces/print-table-table.interface";
import { saveAs } from "file-saver";
import * as S from "./styled";
import { formatFileNameWithCurrentDate } from "../../../../utils/formatFileNameWithCurrentDate";

export const PrintTableToCSVButton = ({
  fileName,
  columns,
  data,
}: PrintTableToCSVButtonProps) => {
  const formatOptions = (key: string, value) => {
    const column = columns.find((col) => col.key === key);
    if (column && column.formatToDate) {
      return formatDateToCustomTable(value);
    } else if (column && column.formatToCurrency) {
      return convertNumberToCurrency(+value);
    } else if (column.key === "nuIncidencia") {
      switch (+value) {
        case 1:
          return "Permanente";
        case 2:
          return "Percentual sobre vencimento";
        case 3:
          return "Natureza não habitual";
        default:
          return "---";
      }
    }
    return value;
  };

  const exportToCSV = () => {
    try {
      const jsonData = data.map((row) => {
        const obj = {};
        columns.forEach((column) => {
          obj[column.name] = formatOptions(column.key, row[column.key]);
        });
        return obj;
      });
      const parser = new Parser({
        delimiter: ";",
        withBOM: true,
      });
      const csv = parser.parse(jsonData);
      const csvData = new Blob([csv || ""], {
        type: "text/plain;charset=UTF-8",
      });
      saveAs(csvData, `${formatFileNameWithCurrentDate(fileName)}.csv`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <S.Wrapper onClick={exportToCSV}>
      <S.Icon alt="Exportar para CSV" />
    </S.Wrapper>
  );
};

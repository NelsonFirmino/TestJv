import { DocumentExportFileProps } from "./interfaces/document-export-file.util";
import { styles } from "./styled";
import { Page, Document, Text, View } from "@react-pdf/renderer";
import { adjustFontSize } from "../../../JvrisTable/Helpers/utils";
import { formatDateToCustomTable } from "../../../../utils/formatDateToCustomTable.util";
import { convertNumberToCurrency } from "../../../../utils/convertNumberToCurrency.util";

export const DocumentRendererPDF = ({
  columns,
  data,
}: DocumentExportFileProps) => {
  function formatOptions(key: string, data: string): any {
    if (columns.find((col) => col.key === key && col?.formatToDate)) {
      return formatDateToCustomTable(data);
    } else if (
      columns.find((col) => col.key === key && key === "nuIncidencia")
    ) {
      switch (+data) {
        case 1:
          return "Permanente";
        case 2:
          return "Percentual sobre vencimento";
        case 3:
          return "Natureza não habitual";
        default:
          return "---";
      }
    } else if (
      columns.find((col) => col.key === key && col?.formatToCurrency)
    ) {
      return convertNumberToCurrency(+data);
    }
    return data;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={[styles.section, { fontSize: adjustFontSize(columns.length) }]}
        >
          <View style={styles.RowContainer}>
            {columns.map((column) => (
              <View style={styles.container}>
                <Text style={styles.tableHeader}>{column.name}</Text>
              </View>
            ))}
          </View>
          <View>
            {data.map((obj) => (
              <View style={styles.RowContainer}>
                {columns.map((c) => (
                  <View style={styles.container}>
                    <Text style={styles.Row}>
                      {formatOptions(c.key, obj[c.key])}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

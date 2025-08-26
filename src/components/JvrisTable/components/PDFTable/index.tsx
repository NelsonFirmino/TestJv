import { Page, Document, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { adjustFontSize } from "../../Helpers/utils";
import { PDFTableI } from "./PDFTable.interface";

const PDFTable = (props: PDFTableI) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View
                style={[
                    styles.section,
                    { fontSize: adjustFontSize(props.columns.length) < 15 ? adjustFontSize(props.columns.length) : 15 }
                ]}
            >
                <View style={styles.RowContainer}>
                    {props.columns.map((column, index) => (
                        index < props.data[0].length &&
                        <View style={styles.container}>
                            <Text style={styles.tableHeader}>{column}</Text>
                        </View>
                    ))}
                </View>
                <View>
                    {props.data.map((row) => {
                        return (
                            <View style={styles.RowContainer}>
                                {row.map((rowColumn) => (
                                    <View style={styles.container}>
                                        <Text style={styles.Row}>

                                            {rowColumn}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        );
                    })}
                </View>
            </View>
        </Page>
    </Document>
);

export default PDFTable;

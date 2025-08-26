import { JvrisTableColumnNDataI } from "./JvrisTable.interface";
import { Parser } from "@json2csv/plainjs";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import PDFTable from "./components/PDFTable";
import { useContext } from "react";
import { JvrisTableContext } from "./context/JvrisTableContext";

const useJvrisTable = () => {
    const {
        setDownloadingPDFCSV
    } = useContext(JvrisTableContext);
    function StatusDealer(data: JvrisTableColumnNDataI) {
        if (data.dataName == "Status") {
            const val = parseInt(data.text);
            if (val < 0) return "Prazo Vencido";
            else if (val == 0 || Number.isNaN(val)) return "Sem Prazo";
            else {
                return `Falta ${val} dias`;
            }
        }
        return data.text;
    }
    function exportCSV(
        data: JvrisTableColumnNDataI[][],
        columns: JvrisTableColumnNDataI[]
    ) {
        try {
            //convert data to json format
            const jsonData = data.map((row) => {
                const obj: any = {};
                row.forEach((col, index) => {
                    obj[columns[index].text] = StatusDealer(col);
                });
                return obj;
            });
            const parser = new Parser({
                delimiter: ";",
                withBOM: true
            });
            const csv = parser.parse(jsonData);
            const csvData = new Blob([csv || ""], {
                type: "text/plain;charset=UTF-8"
            });

            saveAs(csvData, "JvrisTable.csv");
            setDownloadingPDFCSV(false);
        } catch (err) {
            console.error(err);
        }

    }
    function exportPDF(
        data: JvrisTableColumnNDataI[][],
        columns: JvrisTableColumnNDataI[]
    ) {
     
        const doc = (
            <PDFTable
                data={data.map((row) => row.map((data) => StatusDealer(data)))}
                columns={columns.map((col) => col.text)}
            />
        );
        pdf(doc).toBlob().then((blob) => {
            saveAs(blob, "JvrisTable.pdf");
            setDownloadingPDFCSV(false);
        })
    }

    return { exportCSV, exportPDF };
};

export default useJvrisTable;

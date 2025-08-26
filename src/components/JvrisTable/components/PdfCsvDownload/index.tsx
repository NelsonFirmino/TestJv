import { useContext, useEffect, useState } from "react";
import { JvrisTableContext } from "../../context/JvrisTableContext";
import useJvrisTable from "../../useJvrisTable";
import { minMaxDownload } from "../../Sections/Top/intefaces";
import * as S from "../../Sections/Top/styled";
import { Check, FileCsv, FilePdf, X } from "phosphor-react";
import { JvrisTableColumnNDataI } from "../../JvrisTable.interface";
import JvrisLoading from "../../../JvrisLoading";

const PdfCsvDownload = () => {
    const {
        TableProps,
        pagesArray,
        setDownloadingPDFCSV,
        downloadingPDFCSV,
        selectedRows,
        currentData,
        limitedRows,
        tablePage

    } = useContext(JvrisTableContext);
    const { exportCSV, exportPDF } = useJvrisTable();
    const [childrenAmount, setChildrenAmount] = useState(0);
    const [openDownload, setOpenDownload] = useState(false);
    const [minMaxDownload, setMinMaxDownload] = useState<minMaxDownload>();

    useEffect(() => {
        if (pagesArray) {
            setMinMaxDownload({ min: 1, max: pagesArray?.length, type: '' })
        }
    }, [pagesArray]);

    useEffect(() => {
        let childrenA = 3;
        //if (TableProps.download) childrenA++;
        //if (limitedRowsPerPage)childrenA++;
        //if (TableProps.Searchable)childrenA++;

        setChildrenAmount(childrenA);
    }, []);

    return (TableProps.download && (
        <>
            {
                !openDownload &&
                <>
                    <S.TableTopRowButton
                        onClick={() => {
                            setMinMaxDownload({ ...minMaxDownload, type: 'csv' })
                            setOpenDownload(true);
                        }}
                    >
                        <FileCsv width={26} height={26} color="white" weight="bold" />
                    </S.TableTopRowButton>
                    <S.TableTopRowButton
                        onClick={() => {
                            setMinMaxDownload({ ...minMaxDownload, type: 'pdf' })
                            setOpenDownload(true);
                        }}
                    >
                        <FilePdf width={26} height={26} color="white" weight="bold" />
                    </S.TableTopRowButton>
                </>
            }

            {
                openDownload &&
                <>
                    <S.InputsContainer>
                        {selectedRows?.rows.length > 0 ?
                            <S.Check weight="fill" check={selectedRows.rows.length} size={30} />
                            :
                            <>
                                <S.InputContainer>
                                    <S.Pageinput
                                        type="number"
                                        min={1}
                                        max={pagesArray?.length}
                                        value={minMaxDownload.min}
                                        onBlur={(e) => {
                                            let value = 0

                                            if (Number(e.target.value) > pagesArray?.length)
                                                value = pagesArray?.length ?? 1
                                            else if (Number(e.target.value) < 1)
                                                value = 1
                                            else
                                                value = Number(e.target.value)

                                            //console.log(value)

                                            setMinMaxDownload({ ...minMaxDownload, min: value })
                                        }}
                                        onChange={(e) => {
                                            setMinMaxDownload({ ...minMaxDownload, min: e.target.value.length ? Number(e.target.value) : 0 })
                                        }}
                                    />
                                </S.InputContainer>
                                <S.Dash />
                                <S.InputContainer>

                                    <S.Pageinput
                                        type="number"
                                        min={1}
                                        value={minMaxDownload.max}
                                        max={pagesArray?.length}
                                        onBlur={(e) => {
                                            let value = 0

                                            if (Number(e.target.value) > pagesArray?.length)
                                                value = pagesArray?.length ?? 1
                                            else if (Number(e.target.value) < 1)
                                                value = 1
                                            else
                                                value = Number(e.target.value)

                                            //console.log(value)

                                            setMinMaxDownload({ ...minMaxDownload, max: value })
                                        }}
                                        onChange={(e) => {
                                            setMinMaxDownload({ ...minMaxDownload, max: e.target.value.length ? Number(e.target.value) : 0 })
                                        }}
                                    />
                                </S.InputContainer>
                            </>
                        }


                    </S.InputsContainer>
                    <Check
                        style={{
                            cursor: 'pointer'
                        }}
                        size={30}
                        onClick={() => {
                            setDownloadingPDFCSV(true)


                            setTimeout(() => {
                                const copyData: JvrisTableColumnNDataI[][] = currentData.map((row) => {
                                    return row.data.map((column) => {
                                        return { ...column }
                                    })
                                })
                                if (!selectedRows || selectedRows.rows.length == 0) {
                                    const dataPerPage = Math.ceil(copyData.length / pagesArray.length)
                                    const dta = copyData.slice((minMaxDownload.min - 1) * dataPerPage, minMaxDownload.max * dataPerPage)
    
    
    
                                    if (minMaxDownload.type === 'csv')
                                        exportCSV(dta, TableProps.columns);
                                    else
                                        exportPDF(dta, TableProps.columns);
                                }
                                else {
                                    let dta: JvrisTableColumnNDataI[][] = []
                                    if (selectedRows.pageOnly) {
    
                                        const start = limitedRows * tablePage
                                        const end = start + limitedRows
                                        for (let i = start; i < end; i++) {
                                            if (copyData[i]) {
                                                dta.push(copyData[i])
                                            }
                                        }
                                    }
                                    else {
    
                                        //dta = selectedRows.rows.map((row) => copyData[row])
                                        for (let i = 0; i < selectedRows.rows.length; i++) {
                                            if (copyData[selectedRows.rows[i]]) {
                                                dta.push(copyData[selectedRows.rows[i]])
                                            }
                                        }
                                    }
    
    
    
                                    if (minMaxDownload.type === 'csv')
                                        exportCSV(dta, TableProps.columns);
                                    else
                                        exportPDF(dta, TableProps.columns);
                                }
                                setOpenDownload(false);
                            }, 500);
                        }}
                    />
                    <X
                        style={{
                            cursor: 'pointer'
                        }}
                        size={30}
                        onClick={() => {
                            setOpenDownload(false);
                        }}
                    />
                </>
            }

            {
                downloadingPDFCSV &&
                <JvrisLoading size="small" loading />
            }
        </>
    )
    )
}

export default PdfCsvDownload;
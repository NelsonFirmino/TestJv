import { useState, createContext, useEffect } from "react";
import { JvrisTableDataI, JvrisTableI } from "../JvrisTable.interface";
import {
  JvrisTableContextI,
  JvrisTableProviderI,
  RowslimitI,
  selectedRowsI,
} from "./JvrisTableContext.interface";

export const JvrisTableContext = createContext<JvrisTableContextI>({} as any);

export const JvrisTableProvider = (props: JvrisTableProviderI) => {
  const maxRows = 10;
  const limitedRowsPerPage: RowslimitI[] = ["Todos", 10, 25, 50].map(
    (element) => {
      return {
        value: element.toString() == "Todos" ? 9999 : element.toString(),
        label: element.toString(),
      };
    }
  );

  const [sortColumnIndex, setSortColumnIndex] = useState<number>(-1);
  const [sortAscending, setSortAscending] = useState<number>(-1);
  const [currentData, setCurrentData] = useState<JvrisTableDataI[]>([]);
  const [tablePageIndexes, setTablePageIndexes] = useState<any[]>([0, maxRows]);
  const [dataCopy, setDataCopy] = useState<JvrisTableDataI[]>([]);
  const [tablePage, setTablePage] = useState<number>(0);
  const [tablePageNumber, setTablePageNumber] = useState<number[][]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [limitedRows, setLimitedRows] = useState<number | undefined>(maxRows);
  const [selectedRows, setSelectedRows] = useState<selectedRowsI>({
    all: false,
    rows: [],
  });
  const [tableWidth, setTableWidth] = useState<number>(0);
  const [actualTableWidth, setActualTableWidth] = useState<number>(0);
  const [subMenuOpen, setSubMenuOpen] = useState<number>(-1);
  const [clikedRow, setClikedRow] = useState<number>(-1);
  const [tableData, setTableData] = useState(props)
  const [showFullTabela, setShowFullTabela] = useState<boolean>(false);
  const [downloadingPDFCSV, setDownloadingPDFCSV] = useState<boolean>(false);
  const [dataByColumn, setDataByColumn] = useState<string[][]>([])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  useEffect(() => {
    if (props) {
      setTableData(props)
    }
  }, [props])

  useEffect(() => {
    filterDataBySearch(searchFilter);
  }, [searchFilter]);

  useEffect(() => {
    if (tableData.data) {
      const currData: JvrisTableDataI[] = [];

      tableData.data.map((row, index) => {
        currData.push({ data: row, id: index });
      });
      setDataCopy(currData);
      setCurrentData(currData);
      //console.log(currData)
      const dataByColumn = []
      for (let i = 0; i < currData.length; i++) {
        for (let j = 0; j < currData[i].data.length; j++) {
          if (dataByColumn[j] == undefined) dataByColumn[j] = []
          //if currData[i].data[j].text is not already in dataByColumn[j] push it
          if (!dataByColumn[j].includes(currData[i].data[j].text))
            dataByColumn[j].push(currData[i].data[j].text)

        }
      }
      setDataByColumn(dataByColumn)
    }

  }, [tableData.data]);

  useEffect(() => {
    if (tablePageNumber.length) {
      setTablePageIndexes(tablePageNumber[tablePage]);
    }
  }, [tablePage, tablePageNumber]);

  useEffect(() => {
    if (currentData.length && tablePageIndexes.length) {
      const totalPages = Math.ceil(currentData.length / limitedRows!);

      const indexArray = [];
      const pagesArray = [];

      for (let x = 0; x < totalPages; x++) {
        indexArray.push([limitedRows! * x, limitedRows! * x + limitedRows!]);

        pagesArray.push(x);
      }
      setTablePageNumber(indexArray);
      setPagesArray(pagesArray);
    }
  }, [currentData, limitedRows]);

  useEffect(() => {
    if (props.onSelectedRows && selectedRows) {
      if(selectedRows.pageOnly)
      {
        const start = limitedRows * tablePage
        const end = start + limitedRows
        props.onSelectedRows(selectedRows.rows.slice(start, end));
      }
      else {
        props.onSelectedRows(selectedRows.rows);
      }
    }
    
  
  }, [selectedRows]);

  useEffect(() => {
    if (props.columnDefaultOrder && dataCopy.length) {
      let sortAscending = 1;
      if (props.columnDefaultOrder.order == "ascendente") {
        setSortAscending(1)
      }
      else {
        setSortAscending(0)
        sortAscending = 0
      }
      setSortColumnIndex(props.columnDefaultOrder.columnIndex);
      sortDataByColumn(props.columnDefaultOrder.columnIndex, sortAscending);
    }
  }, [props.columnDefaultOrder, dataCopy])

  function sortDataByColumn(columnIndex: number, ascending: number) {
    let cpy = [...dataCopy];
    if (ascending == -1) {
      setCurrentData(cpy);
      return;
    }

    function checkIfIsMoney(value: string) {
      if (value.includes("R$")) {
        return parseFloat(value.replace("R$", "").replace(".", "").replace(",", "."));
      }
      return value;
    }

    cpy.sort((a, b) => {
      const aTxt = checkIfIsMoney(a.data[columnIndex].text);
      const bTxt = checkIfIsMoney(b.data[columnIndex].text);

      
        if (aTxt < bTxt) return -1;
        else if (aTxt > bTxt) return 1;
      
      return 0;
    });

    if (ascending == 1) cpy.reverse();
    console.log(cpy)
    setCurrentData(cpy);
  }

  function filterDataByColumn(columnIndex: number) {
    let sortAsc = sortAscending;

    function triggerReset() {
      setSortAscending(-1);
      sortAsc = -1;
      setSortColumnIndex(-1);
    }

    function toggleSort() {
      setSortAscending(sortAscending + 1);
      sortAsc = sortAscending + 1;
      setSortColumnIndex(columnIndex);
    }

    if (columnIndex != sortColumnIndex && sortColumnIndex != -1) {
      setSortAscending(0);
      setSortColumnIndex(columnIndex);
      sortDataByColumn(columnIndex, 0);
      return;
    }

    if (sortAscending < 1) toggleSort();
    else triggerReset();

    sortDataByColumn(columnIndex, sortAsc);
  }

  function filterDataByMany(search: string[]) {
    if (search.length) {
      //console.log('search', search)
      const cpy = [...dataCopy];

      //console.log('cpy', cpy)
      const filtered = []

      for (let j = 0; j < cpy.length; j++) {
        const row = cpy[j]
        //console.log('row', row)
        let found = 0

        for (let k = 0; k < row.data.length; k++) {
          const cell = row.data[k]
          //console.log('cell', cell.text)
          for (let i = 0; i < search.length; i++) {
            const searchValue = search[i]
            if (searchValue === cell.text) {
              found++
            }
          }
        }
        let sLen = 0
        for (let i = 0; i < search.length; i++) {
          if (search[i]) sLen++
        }
        /* //console.log('found', found)
        //console.log('sLen', sLen) */
        if (found === sLen) filtered.push(row)
      }

      //console.log('filtered', filtered)
      setCurrentData(filtered);
    }
  }

  function filterDataBySearch(search: string) {
    if (search.length) {
      //console.log('search', search)
      const cpy = [...dataCopy];
      const filtered = cpy.filter((row) => {
        let found = false;
        row.data.forEach((cell) => {
          const searchComp = search.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9]/g, ""); //remove all dashes and dots
          //console.log(searchComp)
          const txtComp = cell.text
            .toLowerCase()
            .normalize("NFD") //remove all dashes and dots
            .replace(/\p{Diacritic}/gu, "").replace(/[^a-zA-Z0-9]/g, ""); //remove all dashes and dots

          //console.log(txtComp)

          if (txtComp.includes(searchComp)) found = true;
        });
        return found;
      });
      setCurrentData(filtered);
    } else {
      setCurrentData(dataCopy);
    }
  }

  const onChangeRowLimit = (selected: any) => {
    if (selected.value) {
      setLimitedRows(parseInt(selected.value));
      //console.log(selected.value);
      setTablePageIndexes([0, parseInt(selected.value)]);
      //console.log([0, parseInt(selected.value)]);
    } else {
      setLimitedRows(undefined);
      setTablePageIndexes([0, currentData.length]);

    }
    setTablePage(0);

  };

  function toogleAllSelected() {
    if (selectedRows?.all && selectedRows.pageOnly) {
      setSelectedRows({
        all: false,
        rows: [],

      });
    } else {
      if (selectedRows.pageOnly == undefined) {
        setSelectedRows({
          all: true,
          rows: currentData.map((row) => row.id),
          pageOnly: false
        });
      }
      else {
        setSelectedRows({
          all: true,
          rows: currentData.map((row) => row.id),
          pageOnly: true
        });
      }
    }
  }

  function selectRow(index: number) {
    if (selectedRows?.rows.includes(index)) {
      setSelectedRows({
        all: false,
        rows: selectedRows?.rows.filter((row) => row !== index),
      });
    } else {
      const all = selectedRows
        ? selectedRows.rows.length + 1 == currentData.length
        : 1 == currentData.length;
      if (selectedRows && selectedRows.rows.length)
        setSelectedRows({
          all: all,
          rows: [...selectedRows?.rows, index],
        });
      else
        setSelectedRows({
          all: all,
          rows: [index],
        });
    }
  }

  return (
    <JvrisTableContext.Provider
      value={
        {
          pagesArray,
          tablePage,
          setTablePage,
          setTablePageIndexes,
          limitedRowsPerPage,
          onChangeRowLimit,
          setSearchFilter,
          limitedRows,
          tablePageIndexes,
          filterDataByColumn,
          sortColumnIndex,
          sortAscending,
          currentData,
          selectedRows,
          toogleAllSelected,
          selectRow,
          setSubMenuOpen,
          subMenuOpen,
          searchFilter,
          setTableWidth,
          tableWidth,
          clikedRow,
          setClikedRow,
          showFullTabela,
          setShowFullTabela,
          actualTableWidth,
          setActualTableWidth,
          setDownloadingPDFCSV,
          downloadingPDFCSV,
          dataByColumn,
          filterDataByMany,
          setSelectedFilters,
          selectedFilters,
          TableProps: tableData as JvrisTableI,
        } as JvrisTableContextI
      }
    >
      {props.children}
    </JvrisTableContext.Provider>
  );
};

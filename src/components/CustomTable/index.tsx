import React, { useEffect, useState } from "react";
import { SharedState } from "../../context/SharedContext";
import { convertNumberToCurrency } from "../../utils/convertNumberToCurrency.util";
import { formatDateToCustomTable } from "../../utils/formatDateToCustomTable.util";
import { hashString } from "../../utils/hashString.util";
import { ColumnCustomTable } from "./components/Column";
import { PaginationControls } from "./components/Pagination";
import { PrintTableToCSVButton } from "./components/PrintTableToCSVButton";
import { PrintTableToPDFButton } from "./components/PrintTableToPDFButton";
import { SelectDataColumn } from "./components/SelectDataColumn";
import { checkFilterTextOnTable } from "./filterFunctions/checkFilterTextOnTable";
import { filterByColumn } from "./filterFunctions/filterByColumn";
import {
  CustomTableProps,
  SortStateProps,
} from "./interfaces/custom-table.interface";
import { checkSortColumnConfig } from "./sortFunctions/checkSortColumnConfig";
import * as S from "./styled";

export const CustomTable = ({
  columns,
  data,
  possibleDataKeyToBeNull,
  isLoading,
  selectRows,
  showSelectNumberOfRows,
  showTodayButton,
  showClearButton,
  showPagination,
  tableFontSize,
  maxButtonPagination,
  showSearchField,
  onlyShowTableIfData,
  tootTipSearcField,
  defaultSortKeyColumn,
  csvButton,
  pdfButton,
  selectDataColumnButton,
  requestPagination,
  keySelectData,
}: CustomTableProps) => {
  const {
    setPagination,
    selectedDataTable,
    setSelectedDataTable,
    selectedRowHashes,
    setSelectedRowHashes,
    selectedProcessoInActionDataTable,
    setSelectedProcessoInActionDataTable,
    selectedInactionDataTable,
    setSelectedInactionDataTable,
    selectedRedistributionDataTable,
    setSelectedRedistributionDataTable,
  } = SharedState();
  const [sortConfig, setSortConfig] =
    useState<SortStateProps>(defaultSortKeyColumn);
  const [selectAllRows, setSelectAllRows] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [showShadowCell, setShowShadowCell] = useState(false);
  const [filterDataBySelectValueColumn, setFilterDataBySelectValueColumn] =
    useState<{ label: any; keyData: any; index: number; type: string }[]>([]);

  const handleRowClick = (rowHash: number) => {
    if (selectedRowHashes.includes(rowHash)) {
      const updatedHashList = selectedRowHashes.filter(
        (hash) => hash !== rowHash
      );
      setSelectedRowHashes(updatedHashList);
      switch (keySelectData) {
        case "ATUACAO": {
          setSelectedProcessoInActionDataTable(
            data.filter((row) =>
              updatedHashList.includes(hashString(JSON.stringify(row)))
            )
          );
          break;
        }
        case "INACAO": {
          setSelectedInactionDataTable(
            data.filter((row) =>
              updatedHashList.includes(hashString(JSON.stringify(row)))
            )
          );
          break;
        }
        case "REDISTRIBUICAO": {
          setSelectedRedistributionDataTable(
            data.filter((row) =>
              updatedHashList.includes(hashString(JSON.stringify(row)))
            )
          );
          break;
        }
        default: {
          setSelectedDataTable(
            data.filter((row) =>
              updatedHashList.includes(hashString(JSON.stringify(row)))
            )
          );
        }
      }
      if (
        selectedRowHashes.length - 1 ===
        filteredAndSortedData.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        ).length
      ) {
        setSelectAllRows(true);
      } else {
        setSelectAllRows(false);
      }
    } else {
      setSelectedRowHashes([...selectedRowHashes, rowHash]);

      // se for necessário criar um novo estado para um tela que possui mais de uma tabela que usa select,
      // criar um estado global primeiro e relizar as seguinte tratativas abaixo
      // adicionar também os casos em que precisa limpar as linhas, está tudo aqui nesse arquivo
      switch (keySelectData) {
        case "ATUACAO": {
          setSelectedProcessoInActionDataTable([
            ...selectedProcessoInActionDataTable,
            data.find((row) => rowHash === hashString(JSON.stringify(row))),
          ]);
          break;
        }
        case "INACAO": {
          setSelectedInactionDataTable([
            ...selectedInactionDataTable,
            data.find((row) => rowHash === hashString(JSON.stringify(row))),
          ]);
          break;
        }
        case "REDISTRIBUICAO": {
          setSelectedRedistributionDataTable([
            ...selectedRedistributionDataTable,
            data.find((row) => rowHash === hashString(JSON.stringify(row))),
          ]);
          break;
        }
        default: {
          setSelectedDataTable([
            ...selectedDataTable,
            data.find((row) => rowHash === hashString(JSON.stringify(row))),
          ]);
        }
      }
      if (
        selectedRowHashes.length + 1 ===
        filteredAndSortedData.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        ).length
      ) {
        setSelectAllRows(true);
      } else {
        setSelectAllRows(false);
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    if (!requestPagination?.totalItens) setCurrentPage(1);
    /* setSelectedRowHashes([]);
    setSelectedDataTable([]);
    setSelectedProcessoInActionDataTable([]);
    setSelectedInactionDataTable([]);
    setSelectedRedistributionDataTable([]); */
    setSelectAllRows(false);
  };

  const changeSelectAllRows = () => {
    let rows = [];

    if (filteredAndSortedData.length) {
      rows = requestPagination?.totalItens
        ? filteredAndSortedData
        : filteredAndSortedData.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
          );
    }

    if (
      rows.length === selectedRowHashes.length &&
      selectedRowHashes.length !== 0
    ) {
      setSelectedRowHashes([]);
      setSelectedDataTable([]);
      setSelectedProcessoInActionDataTable([]);
      setSelectedInactionDataTable([]);
      setSelectedRedistributionDataTable([]);
    } else {
      setSelectedRowHashes(rows.map((r) => hashString(JSON.stringify(r))));

      switch (keySelectData) {
        case "ATUACAO": {
          setSelectedProcessoInActionDataTable(rows);
          break;
        }
        case "INACAO": {
          setSelectedInactionDataTable(rows);
          break;
        }
        case "REDISTRIBUICAO": {
          setSelectedRedistributionDataTable(rows);
          break;
        }
        default: {
          setSelectedDataTable(rows);
        }
      }
    }
    setSelectAllRows(!(rows.length === selectedRowHashes.length));
  };

  const changePage = (page) => {
    setSelectAllRows(false);
    // Trecho abaixo comentado para permitir que as linhas continuem selecionadas e os dados passados ao mudar de página
    // setSelectedRowHashes([]);
    // setSelectedDataTable([]);
    // setSelectedProcessoInActionDataTable([]);
    // setSelectedInactionDataTable([]);
    // setSelectedRedistributionDataTable([]);
    setCurrentPage(page);
  };

  const filteredAndSortedData = React.useMemo(() => {
    let sortableData = !isLoading ? [...data] : [];

    if (filterDataBySelectValueColumn.length > 0) {
      sortableData = filterByColumn(data, filterDataBySelectValueColumn);
    }

    sortableData = checkFilterTextOnTable(filterText, sortableData, columns);

    checkSortColumnConfig(sortConfig, sortableData, columns);

    return sortableData;
  }, [sortConfig, filterText, filterDataBySelectValueColumn, columns]);

  // [data] foi tirado de useMemo, ver se ocorre algum efeito colateral
  useEffect(() => {
    if (!requestPagination) {
      setCurrentPage(1);
    }
  }, [data, filterDataBySelectValueColumn]);

  const totalPages = !isLoading
    ? requestPagination?.totalItens
      ? Math.ceil(requestPagination?.totalItens / rowsPerPage)
      : Math.ceil(filteredAndSortedData.length / rowsPerPage)
    : 0;

  if (onlyShowTableIfData && !Boolean(data?.length)) {
    return;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Os meses são de 0 a 11
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <>
      <S.FilterAndPaginationOptionsContainer
        open={showSelectNumberOfRows && Boolean(data.length)}
      >
        {showSelectNumberOfRows && data.length > 0 && (
          <S.SelectorPageContainer>
            <S.TextSelect>Exibe</S.TextSelect>
            <S.CustomSelect
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPagination({ page: currentPage, pageSize: +e.target.value });
                setSelectedRowHashes([]);
                setSelectedDataTable([]);
                setSelectedProcessoInActionDataTable([]);
                setSelectedInactionDataTable([]);
                setSelectedRedistributionDataTable([]);
                setSelectAllRows(false);
              }}
            >
              <S.CustomOption value="10">10</S.CustomOption>
              <S.CustomOption value="25">25</S.CustomOption>
              <S.CustomOption value="50">50</S.CustomOption>
              <S.CustomOption value="100">100</S.CustomOption>
              <S.CustomOption value="250">250</S.CustomOption>
            </S.CustomSelect>
            <S.TextSelect>registros por página</S.TextSelect>
          </S.SelectorPageContainer>
        )}

        <S.TextAndButtonsContainer>
          {pdfButton && data.length > 0 && (
            <PrintTableToPDFButton
              fileName={pdfButton.nameFile}
              columns={columns
                .filter((c) => c?.component?.isButton !== true)
                .map((c) => ({
                  name: c.name,
                  key: c.keyData,
                  formatToDate: c?.formatToDate,
                  formatToCurrency: c?.formatToCurrency,
                }))}
              data={
                selectedRowHashes.length > 0
                  ? data.filter((row) =>
                      selectedRowHashes.includes(
                        hashString(JSON.stringify(row))
                      )
                    )
                  : filteredAndSortedData.length > 0
                  ? requestPagination?.totalItens
                    ? filteredAndSortedData
                    : filteredAndSortedData.slice(
                        (currentPage - 1) * rowsPerPage,
                        currentPage * rowsPerPage
                      )
                  : []
              }
            />
          )}
          {csvButton && data.length > 0 && (
            <PrintTableToCSVButton
              fileName={csvButton.nameFile}
              columns={columns
                .filter((c) => c?.component?.isButton !== true)
                .map((c) => ({
                  name: c.name,
                  key: c.keyData,
                  formatToDate: c?.formatToDate,
                  formatToCurrency: c?.formatToCurrency,
                }))}
              data={
                selectedRowHashes.length > 0
                  ? data.filter((row) =>
                      selectedRowHashes.includes(
                        hashString(JSON.stringify(row))
                      )
                    )
                  : filteredAndSortedData.length > 0
                  ? requestPagination?.totalItens
                    ? filteredAndSortedData
                    : filteredAndSortedData.slice(
                        (currentPage - 1) * rowsPerPage,
                        currentPage * rowsPerPage
                      )
                  : []
              }
            />
          )}
          {selectDataColumnButton && data.length > 0 && (
            <SelectDataColumn
              filterDataBySelectValueColumn={filterDataBySelectValueColumn}
              setFilterDataBySelectValueColumn={
                setFilterDataBySelectValueColumn
              }
              columns={selectDataColumnButton.columns}
              data={data}
            />
          )}
          {showTodayButton && data.length > 0 && (
            <S.TodayButtonWrapper>
              <S.TodayButton
                onClick={() =>
                  setFilterDataBySelectValueColumn([
                    {
                      label: formattedDate,
                      keyData: "dtPrazo",
                      index: 4,
                      type: "DEFAULT",
                    },
                  ])
                }
              >
                <S.TodayButtonName>Hoje</S.TodayButtonName>
              </S.TodayButton>
            </S.TodayButtonWrapper>
          )}

          {showClearButton && data.length > 0 && (
            <S.ClearButtonWrapper>
              <S.ClearButton
                onClick={() => setFilterDataBySelectValueColumn([])}
              >
                <S.ClearButtonName alt="Limpar campos" />
              </S.ClearButton>
            </S.ClearButtonWrapper>
          )}

          {selectedRowHashes.length > 0 && (
            <S.CountRowsText>
              <S.CountRows>{selectedRowHashes.length}</S.CountRows>{" "}
              {selectedRowHashes.length > 1 ? "linhas " : "linha "}
              {selectedRowHashes.length > 1 ? "selecionadas" : "selecionada"}
            </S.CountRowsText>
          )}
        </S.TextAndButtonsContainer>

        {showSearchField && (
          <S.FilterContainer>
            {tootTipSearcField && (
              <S.InfoContainerField>
                <S.InfoIcon />
                <S.InfoText>{tootTipSearcField}</S.InfoText>
              </S.InfoContainerField>
            )}
            <S.FilterInput
              type="search"
              placeholder="Pesquisar..."
              value={filterText}
              onChange={handleFilterChange}
            />
          </S.FilterContainer>
        )}
      </S.FilterAndPaginationOptionsContainer>

      <S.ContainerTable
        onScroll={(el) => {
          if (!showShadowCell) {
            setShowShadowCell(true);
          }
        }}
      >
        <S.Table>
          <S.Thead>
            <S.Tr>
              {selectRows && (
                <S.ThSelectRows colSpan={1} rowSpan={1}>
                  <S.HiddenCheckbox />
                  <S.StyledCheckbox
                    onClick={changeSelectAllRows}
                    checked={selectAllRows}
                  >
                    <S.CheckIcon weight="fill" />
                  </S.StyledCheckbox>
                </S.ThSelectRows>
              )}
              {columns.map((c, i) => (
                <ColumnCustomTable
                  name={c.name}
                  sortConfig={sortConfig}
                  setSortConfig={setSortConfig}
                  isSortable={c.isSortable}
                  keyData={c.keyData}
                  keyTime={c?.includeDateTimeKey}
                  selectRows={selectRows}
                  key={i}
                  index={i}
                  showShadow={showShadowCell}
                  switchContentToRight={c.switchContentToRight}
                />
              ))}
            </S.Tr>
          </S.Thead>

          <S.TBody>
            {!isLoading ? (
              filteredAndSortedData.length > 0 ? (
                requestPagination?.totalItens ? (
                  filteredAndSortedData.map((item, i) => {
                    const rowHash = hashString(JSON.stringify(item));
                    const isSelected = selectedRowHashes.includes(rowHash);
                    return (
                      <S.Tr key={i}>
                        {selectRows && (
                          <td
                            style={{
                              padding: "auto",
                              verticalAlign: "middle",
                              textAlign: "center",
                              position: "inherit",
                              left: 0,
                              zIndex: 100,
                            }}
                          >
                            <S.HiddenCheckbox />
                            <S.StyledCheckbox
                              checked={isSelected}
                              onClick={() => handleRowClick(rowHash)}
                            >
                              <S.CheckIcon weight="fill" />
                            </S.StyledCheckbox>
                          </td>
                        )}
                        {columns.map((col, i) => {
                          let cellData = item[col.keyData];

                          // Verifica se o dado está listada para ser possivelmente null
                          const nullDataConfig = possibleDataKeyToBeNull?.find(
                            (cfg) => cfg.key === col.keyData
                          );

                          if (cellData === undefined && nullDataConfig) {
                            cellData = nullDataConfig.fallback;
                          }

                          if (col.component) {
                            // Usar o componente personalizado se disponível
                            cellData = col.component.element(item);
                          } else if (
                            col.formatToDate &&
                            col?.includeDateTimeKey
                          ) {
                            cellData =
                              formatDateToCustomTable(cellData) +
                              " " +
                              item[col.includeDateTimeKey];
                          } else if (col.formatToDate) {
                            cellData = formatDateToCustomTable(cellData);
                          } else if (col.formatToCurrency) {
                            cellData = convertNumberToCurrency(cellData);
                          }

                          return (
                            <S.Td
                              isFirst={i === 0}
                              showShadow={i === 0 && showShadowCell}
                              key={col.keyData}
                              selectRows={selectRows}
                              tableFontSize={tableFontSize}
                              breakTextOnFirstColumn={
                                col.breakTextOnFirstColumn
                              }
                            >
                              {cellData}
                            </S.Td>
                          );
                        })}
                      </S.Tr>
                    );
                  })
                ) : (
                  filteredAndSortedData
                    .slice(
                      (currentPage - 1) * rowsPerPage,
                      currentPage * rowsPerPage
                    )
                    .map((item, i) => {
                      const rowHash = hashString(JSON.stringify(item));
                      const isSelected = selectedRowHashes.includes(rowHash);
                      return (
                        <S.Tr key={i}>
                          {selectRows && (
                            <td
                              style={{
                                padding: "auto",
                                verticalAlign: "middle",
                                textAlign: "center",
                                position: "inherit",
                                left: 0,
                                zIndex: 100,
                              }}
                            >
                              <S.HiddenCheckbox />
                              <S.StyledCheckbox
                                checked={isSelected}
                                onClick={() => handleRowClick(rowHash)}
                              >
                                <S.CheckIcon weight="fill" />
                              </S.StyledCheckbox>
                            </td>
                          )}
                          {columns.map((col, i) => {
                            let cellData = item[col.keyData];

                            // Verifica se o dado está listada para ser possivelmente null
                            const nullDataConfig =
                              possibleDataKeyToBeNull?.find(
                                (cfg) => cfg.key === col.keyData
                              );

                            if (
                              (cellData === undefined ||
                                cellData?.length === 0) &&
                              nullDataConfig
                            ) {
                              cellData = nullDataConfig.fallback;
                            }

                            if (col.component) {
                              // Usar o componente personalizado se disponível
                              cellData = col.component.element(item);
                            } else if (
                              col.formatToDate &&
                              col?.includeDateTimeKey
                            ) {
                              cellData =
                                formatDateToCustomTable(cellData) +
                                " " +
                                item[col.includeDateTimeKey];
                            } else if (col.formatToDate) {
                              cellData = formatDateToCustomTable(cellData);
                            } else if (col.formatToCurrency) {
                              cellData = convertNumberToCurrency(cellData);
                            }

                            return (
                              <S.Td
                                isFirst={i === 0}
                                showShadow={i === 0 && showShadowCell}
                                tableFontSize={tableFontSize}
                                key={col.keyData}
                                selectRows={selectRows}
                                breakTextOnFirstColumn={
                                  col.breakTextOnFirstColumn
                                }
                              >
                                {cellData}
                              </S.Td>
                            );
                          })}
                        </S.Tr>
                      );
                    })
                )
              ) : (
                <S.Tr>
                  <S.Td
                    colSpan={columns.length}
                    isFirst={false}
                    selectRows={false}
                  >
                    Nenhum dado disponível.
                  </S.Td>
                </S.Tr>
              )
            ) : (
              <S.TdLoading colSpan={columns.length}>
                <S.LoadingSpinner />
              </S.TdLoading>
            )}
          </S.TBody>
        </S.Table>
      </S.ContainerTable>

      {showPagination && !isLoading && data.length > 0 && (
        <PaginationControls
          changePage={changePage}
          currentPage={currentPage}
          totalPages={totalPages}
          maxButtons={maxButtonPagination}
          sortableDataCount={filteredAndSortedData.length}
          totalRows={
            requestPagination?.totalItens
              ? requestPagination.totalItens
              : data.length
          }
          setSelectedDataTable={setSelectedDataTable}
          rowsPerPage={rowsPerPage}
        />
      )}
    </>
  );
};

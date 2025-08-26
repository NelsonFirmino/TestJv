import { useContext, useEffect, useRef, useState } from "react";
import { ClicableButton } from "../../components/ClicableButton";
import { GenericButton } from "../../components/GenericButton";
import { JvrisTableContext } from "../../context/JvrisTableContext";
import * as S from "./styled";

const TableSection = () => {
  const {
    tablePageIndexes,
    filterDataByColumn,
    sortColumnIndex,
    sortAscending,
    currentData,
    TableProps,
    toogleAllSelected,
    selectRow,
    setClikedRow,
    showFullTabela,
  } = useContext(JvrisTableContext);

  return (
    <S.TableSlider
      style={TableProps.TableContainerStyle}
    >
      <S.Table
        style={TableProps?.TableStyle}
      >
        <S.ColumnsContainer>
          {TableProps.ShowSelect && (
            <S.Column hover={false}>
              <S.SelectBox onClick={() => toogleAllSelected()}
              />
            </S.Column>
          )}
          {TableProps?.columns.map((column, index) => (
            <S.Column
              key={index}
              onClick={() => {
                if (index < TableProps.data[0].length) {
                  filterDataByColumn(index);
                }
              }}
            >
              <S.ColumnWrapper
                key={index}
                reduced={!showFullTabela}
                index={index}
                sortColumnIndex={sortColumnIndex}
              >
                {column.customComponent ? column.customComponent : column.text}
                {index == sortColumnIndex && <S.FilteringArrow
                  key={index}
                  index={index}
                  sortAscending={sortAscending}
                  sortColumnIndex={sortColumnIndex}
                />}
              </S.ColumnWrapper>
            </S.Column>
          ))}
        </S.ColumnsContainer>

        {currentData
          .filter((row) => row.data.filter((data) => data.text).length)
          .slice(tablePageIndexes[0], tablePageIndexes[1])
          .map((row) => {
            return (
              <S.RowContainer
                key={row.id}
                onClick={() => {
                  setClikedRow(row.id);
                }}
              >
                {TableProps.ShowSelect && (
                  <S.Row>
                    <S.SelectBox
                      onClick={() => {
                        selectRow(row.id);
                      }}
                      index={row.id}
                    />
                  </S.Row>
                )}
                {row.data.map((cell, index) => (
                  <S.Row>
                    <S.RowWrapper
                      amountOfCols={TableProps.columns.length}
                      reduced={!showFullTabela}
                      index={index}
                      autoPrimaryColumn={TableProps.autoPrimaryColumn}
                      onClick={() => cell.onClick && cell.onClick(row.id)}
                      hasOnClick={cell.onClick ? true : false}
                    >
                      {cell.customComponent ? (
                        cell.customComponent
                      ) : (
                        cell.text
                      )}
                    </S.RowWrapper>
                  </S.Row>
                ))}
                {TableProps.GenericButton && (
                  <S.Row
                    style={{
                      width: `${TableProps.GenericButton
                        ? TableProps.GenericButton.length
                        : 1 * 60
                        }px`,
                    }}
                  >
                    <S.GenericButtonContainerWrapper>
                      {TableProps.GenericButton.map((value) => {
                        return (
                          <GenericButton
                            key={value.text}
                            backColor={value.backColor}
                            text={value.text}
                            subOptions={value.subOptions}
                            hoverColor={value.hoverColor}
                            icon={value.icon}
                            onClick={
                              value?.onClick
                                ? () => {
                                  value.onClick(row.id);
                                }
                                : undefined
                            }
                          />
                        );
                      })}
                    </S.GenericButtonContainerWrapper>
                  </S.Row>
                )}
                {TableProps.ClicableButton && (
                  <S.Row
                    style={{
                      width: "fit-content",
                    }}
                  >
                    <ClicableButton
                      text={TableProps.ClicableButton.text}
                      index={row.id}
                      subOptions={TableProps.ClicableButton.subOptions}
                      onClick={() => {
                        if (TableProps.ClicableButton?.onClick)
                          TableProps.ClicableButton.onClick(row.id);
                      }}
                    />
                  </S.Row>
                )}

                {TableProps.GenericButtonOnSpecificLines && (
                  <S.Row
                    style={{
                      width: `${TableProps.GenericButton
                        ? TableProps.GenericButton.length
                        : 1 * 60
                        }px`,
                    }}
                  >

                    <S.GenericButtonContainerWrapper
                      style={{
                        //width: 'fit-content'
                        marginRight: "1.5rem",
                      }}
                    >
                      {TableProps.GenericButtonOnSpecificLines &&
                        TableProps.GenericButtonOnSpecificLines[row.id] &&
                        TableProps.GenericButtonOnSpecificLines[row.id].map(
                          (value) => {
                            return (
                              <GenericButton
                                text={value.text}
                                subOptions={value.subOptions}
                                hoverColor={value.hoverColor}
                                icon={value.icon}
                                onClick={() => {
                                  if (value?.onClick) value.onClick(row.id);
                                }}
                              />
                            );
                          }
                        )}
                    </S.GenericButtonContainerWrapper>

                  </S.Row>
                )}

                {TableProps.CustomClicable && (
                  <S.Row
                    style={{
                      width: "fit-content",
                    }}
                  >
                    {TableProps.CustomClicable(row.id)}
                  </S.Row>
                )}
              </S.RowContainer>
            );
          })}
        {/* {[...Array(limitedRows - currentData
          .filter((row) => row.data.filter((data) => data.text).length)
          .slice(tablePageIndexes[0], tablePageIndexes[1]).length)].map((_, index) => {

            return (
              <S.RowContainer>


                <S.Row>
                  <S.RowWrapper
                    amountOfCols={TableProps.columns.length}
                    reduced={!showFullTabela}
                    index={index}
                    autoPrimaryColumn={TableProps.autoPrimaryColumn}
                    hasOnClick={false}
                  >
                    <div style={{
                      //width: '100px',
                      height: '50px',
                    }} />
                  </S.RowWrapper>
                </S.Row>



              </S.RowContainer>
            )
          })
        } */}
      </S.Table>
    </S.TableSlider>

  );
};

export default TableSection;

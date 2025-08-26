import { ColumnCustomTableProps } from "./interfaces/column.interface";
import * as S from "./styled";

export const ColumnCustomTable = ({
  name,
  isSortable = false,
  sortConfig,
  setSortConfig,
  keyData,
  keyTime,
  index,
  selectRows,
  showShadow,
  switchContentToRight,
  breakTextOnFirstColumn,
}: ColumnCustomTableProps) => {
  const requestSort = (key: string) => {
    if (isSortable) {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction, keyTime });
    }
  };

  return (
    <S.Th
      onClick={() => requestSort(keyData)}
      isSortable={sortConfig && sortConfig.key === keyData}
      isFirst={index === 0}
      showShadow={index === 0 && showShadow}
      selectRows={selectRows}
      breakTextOnFirstColumn={breakTextOnFirstColumn}
    >
      <S.Wrapper>
        <S.ColumnName switchContentToRight={switchContentToRight}>
          {name}
        </S.ColumnName>
        {isSortable && (
          <S.ArrowIcon
            weight="bold"
            isSorted={
              sortConfig &&
              sortConfig.key === keyData &&
              sortConfig.direction === "descending"
            }
          />
        )}
      </S.Wrapper>
    </S.Th>
  );
};

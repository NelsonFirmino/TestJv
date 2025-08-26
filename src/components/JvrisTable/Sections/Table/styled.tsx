import styled from "styled-components";
import { CaretDown, Check, Circle, Square } from "phosphor-react";
import theme from "../../../../globalStyle/theme";
import { selectedRowsI } from "../../context/JvrisTableContext.interface";
import { useContext, useState } from "react";
import { JvrisTableColumnNDataI } from "../../JvrisTable.interface";
import { JvrisTableContext } from "../../context/JvrisTableContext";

export const Table = styled.table<{ reduced?: boolean; }>`
  border-collapse: collapse;
  //border-spacing: 0;
  //text-align: left;
  width: 100%;
`;

export const ColumnsContainer = styled.tr`
  border-top: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-bottom: 3px solid ${(props) => props.theme.colors.jvrisAqua};
`;

export const TableSlider = styled.div<{ minWidthToCollapse?: string | number; }>`
  min-width: ${(props) => props.minWidthToCollapse};
  overflow: auto;
`;

export const Column = styled.th<{ hover?: boolean; }>`
  cursor: pointer;
  user-select: none;
  //max-width: 100px;
  
  &:hover {
    background-color: ${({ theme, hover }) =>
    hover == true || hover == undefined
      ? theme.colors.lightGrey
      : "transparent"};
    transition: 0.2s;
  }
`;

export const ColumnWrapper = styled.div<{ sortColumnIndex: number; index: number; reduced?: boolean; }>`
  color: ${(props) =>
    props.index == props.sortColumnIndex
      ? props.theme.colors.jvrisAqua
      : "GrayText"};
  display: flex;
  align-items: center;
  //justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  transition: 0.2s;
  padding: 1rem 0.4rem;
  text-align: left;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

export interface FilteringArrowI {
  sortAscending: number;
  sortColumnIndex: number;
  index: number;
}

export const FilteringArrow = (props: FilteringArrowI) => {
  return (
    <CaretDown
      weight="fill"
      style={{
        transform: props.sortAscending == 1 ? "rotate(180deg)" : "rotate(0deg)",
        opacity: props.index == props.sortColumnIndex ? 1 : 0,
        marginLeft: "5px",
        fontSize: "1.2rem",
        color: theme.colors.jvrisAqua,
        transition: "0.2s",
      }}
    />
  );
};

export const RowContainer = styled.tr`
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};

  &:hover {
    background-color: ${(props) => props.theme.colors.lighterGrey};
    transition: 0.2s;
  }
`;

export const Row = styled.td` 
  //padding: 0rem 0.6rem;
`;

export const ReducedRW = styled.div<{ index: number; autoPrimaryColumn?: boolean; hasOnClick?: boolean; reduced?: boolean; amountOfCols: number; }>`
  font-weight: ${(props) =>
    ((props.index == 0 &&
      (props.autoPrimaryColumn || props.autoPrimaryColumn == undefined)) || props.hasOnClick) &&
    "bold"};
  display: flex;
  align-items: center;
  width: max-content;
  max-width: ${(props) => (props.amountOfCols >= 3 ? "200px" : "500px")};
  font-size: 1.2rem;
  margin: 1rem;
  
  text-decoration: ${({ hasOnClick }) => (hasOnClick ? "underline" : "none")};
  transition: 0.15s ease;

  cursor: ${({ hasOnClick }) => (hasOnClick ? "pointer" : "default")};
  &:hover {
    color: ${({ theme, hasOnClick }) =>
    hasOnClick ? theme.colors.jvrisAqua : "#000"};
  }
`;

interface ReducedRowWrapperI extends React.HTMLAttributes<HTMLDivElement> {
  amountOfCols: number;
  index: number;
  cell: JvrisTableColumnNDataI
}

export const ReducedRowWrapper = (props: ReducedRowWrapperI) => {
  const { amountOfCols, index, children, cell } = props;
  const [openRow, setOpenRow] = useState(cell.text.length > 15 && amountOfCols > 3 ? false : true);

  return (
    <ReducedRW
      onMouseOver={() => {
        if (cell.text.length > 10 && amountOfCols > 3) {
          setOpenRow(true);
        }
      }}
      onMouseLeave={() => {
        if (cell.text.length > 10 && amountOfCols > 3) {
          setOpenRow(false);
        }
      }}
      {...props}
    >
      {openRow ?
        cell.text
        : (cell.text.substring(0, 10) + "...")}
    </ReducedRW>
  )
}

interface RowWrapperI {
  index: number;
  autoPrimaryColumn?: boolean;
  hasOnClick?: boolean;
  reduced?: boolean;
  amountOfCols: number;
}
export const RowWrapper = styled.div<RowWrapperI>`
  font-weight: ${(props) =>
    ((props.index == 0 &&
      (props.autoPrimaryColumn || props.autoPrimaryColumn == undefined)) || props.hasOnClick) &&
    "bold"};
  display: flex;
  align-items: center;
  //justify-content: center;
  max-width: ${(props) => (props.amountOfCols > 3 ? "300px" : "none")};
  font-size: 1.2rem;
  text-align: left;
  margin: 1rem 0.4rem;
  
  //width: max-content;
  text-decoration: ${({ hasOnClick }) => (hasOnClick ? "underline" : "none")};

  cursor: ${({ hasOnClick }) => (hasOnClick ? "pointer" : "default")};
  &:hover {
      transition: 0.15s ease-in-out;
      color: ${({ theme, hasOnClick }) =>
    hasOnClick ? theme.colors.jvrisAqua : "#000"};
   
  }
`;




export const SelectBox = ({
  onClick,
  index,
}: {
  onClick: () => void;
  index?: number;

}) => {

  const SelectBoxWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1rem;
    border: 1px solid ${(props) => selectedRows.pageOnly ? props.theme.colors.softYellow : props.theme.colors.jvrisAqua};
    background-color: ${(props) => props.theme.colors.white};
    width: 26px;
    height: 26px;
    cursor: pointer;
    font-size: 1.2rem;
    &:hover {
      background-color: ${(props) => props.theme.colors.mediumGrey};
      transition: 0.2s;
    }
  `;

  const AllSelectBox = styled(Square)`
    width: 20px;
    height: 20px;
    color: ${(props) => props.theme.colors.jvrisAqua};
  `;

  const PageSelectBox = styled(Circle)`
  width: 20px;
  height: 20px;
  color: ${(props) => props.theme.colors.softYellow};
  `;
  const { selectedRows } = useContext(JvrisTableContext);
  return (
    <SelectBoxWrapper onClick={onClick}>
      {index != undefined && selectedRows?.rows?.includes(index) ? (
        selectedRows.pageOnly ? <PageSelectBox weight="fill" /> : <AllSelectBox weight="fill" />
      ) : selectedRows?.all ? (
        selectedRows.pageOnly ? <PageSelectBox weight="fill" /> : <AllSelectBox weight="fill" />
      ) : null}
    </SelectBoxWrapper>
  );
};

export const GenericButtonContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
`;

export const RowText = styled.p``;

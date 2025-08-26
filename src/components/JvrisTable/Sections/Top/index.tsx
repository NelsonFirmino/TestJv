import { useContext } from "react";
import theme from "../../../../globalStyle/theme";
import ColumnFilter from "../../components/ColumnFilter";
import PdfCsvDownload from "../../components/PdfCsvDownload";
import { SearchBar } from "../../components/SearchBar";
import ReSeed from "../../components/reSeed";
import { JvrisTableContext } from "../../context/JvrisTableContext";
import { ForStickyContiner } from "../../styled";
import * as S from "./styled";

const TopSection = () => {
  const {
    limitedRowsPerPage,
    onChangeRowLimit,
    setSearchFilter,
    TableProps,
    searchFilter,
  } = useContext(JvrisTableContext);

  return (
    <ForStickyContiner minWidthToCollapse={TableProps.minWidthToCollapse}>
      {TableProps.Searchable != false && (
        <SearchBar
          value={searchFilter}
          onChange={(value) => {
            setSearchFilter(value);
          }}
        />
      )}
      {TableProps.maxRows != false && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.8rem",
            fontSize: "1.4rem",
            width: "max-content",
          }}
        >
          Exibe
          <S.SelectRowLimits
            styles={{
              control: (provided, state) => ({
                ...provided,
                border: "none",
                boxShadow: "none",
                outline: `1px solid ${theme.colors.jvrisAqua}`,
              }),
            }}
            defaultValue={limitedRowsPerPage[1]}
            onChange={onChangeRowLimit}
            placeholder={"Linhas por página"}
            options={limitedRowsPerPage}
          />
          Resultados por página
        </div>
      )}

      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <S.FuncsContainer>
          {TableProps.reSeed && <ReSeed onClick={TableProps.reSeed} />}
          {TableProps.columnFilter != false && <ColumnFilter />}
          <PdfCsvDownload />
        </S.FuncsContainer>
      </div>
    </ForStickyContiner>
  );
};

export default TopSection;

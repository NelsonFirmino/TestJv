import { CaretLeft, CaretRight } from "phosphor-react";
import * as S from "./styled";
import { useContext } from "react";
import { JvrisTableContext } from "../../context/JvrisTableContext";
import { useState, useEffect } from "react";
import { ForStickyContiner } from "../../styled";

const BottomSection = () => {
  const {
    limitedRows,
    tablePageIndexes,
    pagesArray,
    setTablePage,
    setTablePageIndexes,
    tablePage,
    currentData,
    TableProps,
    tableWidth,
  } = useContext(JvrisTableContext);
  const [tablePageCopy, setTablePageCopy] = useState(tablePage);

  useEffect(() => {
    setTablePageCopy(tablePage);
  }, [tablePage]);



  const maxLimit = 3;
  return (limitedRows && (
    <ForStickyContiner
      childrenAmount={2}
      minWidthToCollapse={TableProps.minWidthToCollapse}
    >
      <S.MovePageSectionTitle>
        Exibindo página {tablePage + 1} de{" "}
        {Math.ceil(currentData.length / limitedRows)} no total de{" "}
        {currentData.length} Registro(s)
      </S.MovePageSectionTitle>

      <S.MovePageButtonsContainer>
        {tablePage > 0 && (
          <S.MovePageButton
            onClick={() => {
              setTablePage(tablePage - 1);
              limitedRows &&
                setTablePageIndexes([
                  tablePageIndexes[0] - limitedRows,
                  tablePageIndexes[1] - limitedRows,
                ]);
            }}
          >
            <CaretLeft size={18} weight="bold" />
          </S.MovePageButton>
        )}

        {pagesArray && pagesArray.length <= 1 ? (
          <></>
        ) : pagesArray.length < maxLimit ? (
          pagesArray?.map((x) => (
            <S.PageSelectorButton
              key={x}
              onClick={() => setTablePage(x)}
              page={x == tablePage}
            >
              {x + 1}
            </S.PageSelectorButton>
          ))
        ) : (
          <>
            {pagesArray?.slice(0, maxLimit).map((x) => (
              <S.PageSelectorButton
                key={x}
                onClick={() => setTablePage(x)}
                page={x == tablePage}
              >
                {x + 1}
              </S.PageSelectorButton>
            ))}
            {pagesArray && pagesArray?.length > maxLimit && (
              <>
                <S.PageinputContainer>
                  <S.Pageinput
                    value={tablePageCopy + 1}
                    type="number"
                    min={1}
                    max={pagesArray?.length}
                    onChange={(e) => {
                      setTablePageCopy(e.target.valueAsNumber - 1);
                    }}
                    onBlur={(e) => {
                      if (!pagesArray) return;

                      if (e.target.valueAsNumber > pagesArray.length) {
                        setTablePage(pagesArray.length - 1);

                        const NewPage = Math.ceil(
                          currentData.length / limitedRows
                        );

                        limitedRows &&
                          setTablePageIndexes([
                            (NewPage - 2) * limitedRows,
                            (NewPage - 1) * limitedRows + limitedRows,
                          ]);
                      } else if (
                        e.target.valueAsNumber > 0 &&
                        e.target.valueAsNumber <= pagesArray.length
                      ) {
                        setTablePage(e.target.valueAsNumber - 1);
                        const NewPage =
                          (e.target.valueAsNumber - 1) * limitedRows;
                        limitedRows &&
                          setTablePageIndexes([
                            NewPage,
                            NewPage + limitedRows,
                          ]);
                      } else if (e.target.valueAsNumber <= 0) {
                        setTablePage(0);
                        limitedRows &&
                          setTablePageIndexes([0, limitedRows]);
                      }
                    }}
                  />

                </S.PageinputContainer>
                {pagesArray
                  ?.slice((pagesArray?.length - maxLimit) < maxLimit ? maxLimit : (pagesArray?.length - maxLimit), pagesArray?.length)
                  .map((x) => (
                    <S.PageSelectorButton
                      key={x}
                      onClick={() => setTablePage(x)}
                      page={x == tablePage}
                    // pageIndex={tablePage}
                    >
                      {x + 1}
                    </S.PageSelectorButton>
                  ))}
              </>
            )}
          </>
        )}

        {tablePage < Math.ceil(currentData.length / limitedRows) - 1 && (
          <S.MovePageButton
            onClick={() => {
              setTablePage(tablePage + 1);
              limitedRows &&
                setTablePageIndexes([
                  tablePageIndexes[0] + limitedRows,
                  tablePageIndexes[1] + limitedRows,
                ]);
            }}
          >
            <CaretRight size={18} weight="bold" />
          </S.MovePageButton>
        )}
      </S.MovePageButtonsContainer>
    </ForStickyContiner>
  )
  );
};

export default BottomSection;

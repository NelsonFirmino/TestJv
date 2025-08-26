import { CaretLeft, CaretRight } from "phosphor-react";
import { SharedState } from "../../../../context/SharedContext";
import { PaginationProps } from "./interfaces/pagination.interface";
import * as S from "./styled";

export const PaginationControls = ({
  currentPage,
  changePage,
  totalPages,
  totalRows,
  requestPagination,
  rowsPerPage,
  maxButtons,
  sortableDataCount,
}: PaginationProps) => {
  const { setPagination } = SharedState();
  const MAX_BUTTONS = maxButtons ? maxButtons : 5; // o número máximo de botões de página a serem mostrados
  const sideButtons = Math.floor(MAX_BUTTONS / 2);

  let startPage = Math.max(currentPage - sideButtons, 1);
  let endPage = Math.min(currentPage + sideButtons, totalPages);

  if (currentPage <= sideButtons) {
    endPage = Math.min(MAX_BUTTONS, totalPages);
  } else if (currentPage > totalPages - sideButtons) {
    startPage = Math.max(totalPages - MAX_BUTTONS + 1, 1);
  }

  const formatTextInfo = () => {
    if (sortableDataCount !== totalRows) {
      return `Exibindo página ${currentPage} de ${totalPages} no total de ${sortableDataCount} Registro(s) (filtrado de ${totalRows} regitros totais)`
    } else {
      return `Exibindo página ${currentPage} de ${totalPages} no total de ${totalRows} Registro(s)`
    }
  }


  return (
    <S.Container>
      <S.PaginationStatus>
        {formatTextInfo()}
      </S.PaginationStatus>
      <S.PaginationContainer>
        <S.PaginationButton
          disabled={currentPage === 1}
          onClick={() => {
            changePage(currentPage - 1);
            setPagination({ page: currentPage - 1, pageSize: rowsPerPage });
          }}
        >
          <CaretLeft />
        </S.PaginationButton>

        {startPage > 1 && (
          <>
            <S.PaginationButton
              onClick={() => {
                changePage(1);
                setPagination({ page: 1, pageSize: rowsPerPage });
              }}
            >
              1
            </S.PaginationButton>
            <S.PaginationButton disabled>...</S.PaginationButton>
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }).map((_, idx) => (
          <S.PaginationButton
            key={idx + startPage}
            active={idx + startPage === currentPage}
            onClick={() => {
              changePage(idx + startPage);
              setPagination({ page: idx + startPage, pageSize: rowsPerPage });
            }}
          >
            {idx + startPage}
          </S.PaginationButton>
        ))}

        {endPage < totalPages && (
          <>
            <S.PaginationButton disabled>...</S.PaginationButton>
            <S.PaginationButton
              onClick={() => {
                changePage(totalPages);
                setPagination({ page: totalPages, pageSize: rowsPerPage });
              }}
            >
              {totalPages}
            </S.PaginationButton>
          </>
        )}

        <S.PaginationButton
          disabled={currentPage === totalPages}
          onClick={() => {
            changePage(currentPage + 1);
            setPagination({ page: currentPage + 1, pageSize: rowsPerPage });
          }}
        >
          <CaretRight />
        </S.PaginationButton>
      </S.PaginationContainer>
    </S.Container>
  );
};

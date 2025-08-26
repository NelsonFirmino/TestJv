import * as S from "./styled";

export const HearingLinkButton = (dataTable: any) => {
  return (
    <>
      {dataTable.dataTable.txLink ? (
        <S.Wrapper target="_blank" to={`${dataTable.dataTable.txLink}`}>
          <S.LinkIcon alt="Link para reunião de audiência" weight="bold" />
        </S.Wrapper>
      ) : (
        "--"
      )}
    </>
  );
};

import { PageTitle } from "../TitlePage";
import { NotFoundWarningProps } from "./not-found-warning.interface";
import * as S from "./styled";

export const NotFoundWarning = ({
  title_page,
  message,
}: NotFoundWarningProps) => {
  return (
    <S.Wrapper>
      <PageTitle pageTitle={title_page} pageIcon={<S.PageIcon />} />
      <S.ContentContainer>
        <S.Msg>{message}</S.Msg>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

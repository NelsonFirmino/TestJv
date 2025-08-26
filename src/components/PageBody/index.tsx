import { Outlet } from "react-router-dom";
import * as S from "./styled";

export const PageBody = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <Outlet />
      </S.Container>
    </S.Wrapper>
  );
};

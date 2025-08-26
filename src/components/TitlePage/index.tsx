import { getVerboseCurrentDate } from "../../utils/getVerboseCurrentDate.util";
import { PageTitleProps } from "./interfaces/title-page.interface";
import * as S from "./styled";

export const PageTitle = (props: PageTitleProps) => {
  return (
    <S.PageTitleContainer>
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>
      {props.pageIcon ? props.pageIcon : <S.PageIcon weight="bold" />}
      <S.PageTitle>{props.pageTitle} { props.showCurrentDate && ` - ${getVerboseCurrentDate()}` }</S.PageTitle>
      
      </div>
      <S.ContainerButton>{props.button}</S.ContainerButton>
    </S.PageTitleContainer>
  );
};

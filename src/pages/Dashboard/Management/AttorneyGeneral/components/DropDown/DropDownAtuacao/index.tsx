import { useState } from "react";
import * as S from "./styled";

export const DropDownAtuacao = (data) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <S.Wrapper onClick={() => setShowOptions(!showOptions)}>
      <S.DropDownIcon weight="fill" />
      <S.ContainerOptions showOptions={showOptions}></S.ContainerOptions>
    </S.Wrapper>
  );
};

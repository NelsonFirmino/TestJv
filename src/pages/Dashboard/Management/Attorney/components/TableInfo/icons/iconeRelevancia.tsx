// Icon.js

import React from "react";
import * as S from "./styled";

interface IconProps {
  src: string;
  alt: string;
  width: string;
  height: string;
  marginRight?: string;
  style?: React.CSSProperties;
}

export const IconeRelevancia = ({
  src,
  alt,
  width,
  height,
  marginRight,
  style,
}: IconProps) => {
  return (
    <S.Imagem
      src={src}
      alt={alt}
      style={{ width, height, marginRight, ...style }}
    />
  );
};

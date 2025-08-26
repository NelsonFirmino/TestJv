import { useState } from "react";
import * as S from "./styled";

const CardContainerLegenda = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <S.Wrapper>
      <S.Button
        onClick={() => setIsVisible(!isVisible)}
        className="p-2 bg-blue-500 text-black rounded"
      >
        {isVisible ? "Ocultar Legenda" : "Mostrar Legenda"}
      </S.Button>
      {isVisible && <div className="mt-4">{children}</div>}
    </S.Wrapper>
  );
};

export default CardContainerLegenda;

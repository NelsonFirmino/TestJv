import * as S from "./styled";
import BrasaoRN from "../../assets/brasaoRN.png";

const Splash = () => {
  return (
    <S.Wrapper>
      <S.Title>
        Governo do Estado
        <br />
        do Rio Grande do Norte
      </S.Title>
      <S.SubTitle>Procuradoria-Geral - PGE</S.SubTitle>
      <S.Loading />
    </S.Wrapper>
  );
};

export default Splash;

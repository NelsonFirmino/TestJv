import * as S from "./styled";
import BrasaoRN from "../../assets/brasaoRN.png";

const NotAuthorized = () => {
  return (
    <S.Wrapper>
      <S.Logo
        src={BrasaoRN}
        alt="Brasão da Procuradoria Geral do Estado do Rio Grande do Norte contendo duas palmeiras, um barco ao fundo com a descrição do governo"
      />
      <S.MessageContainer>
        <S.MessageTitle>401</S.MessageTitle>
        <S.MessageContent>
          Acesso negado. Você não está autorizado a acessar este recurso.
        </S.MessageContent>
        <S.HomeLink to="/">
          <S.SignInIcon
            weight="fill"
            alt="Desenho de uma casinha que simboliza o retorno para o dashboard"
          />
          Ir para o login
        </S.HomeLink>
      </S.MessageContainer>
    </S.Wrapper>
  );
};

export default NotAuthorized;

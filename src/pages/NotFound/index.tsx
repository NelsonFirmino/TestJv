import * as S from "./styled";
import BrasaoRN from "../../assets/brasaoRN.png";
import { SharedState } from "../../context/SharedContext";

const NotFound = () => {
  const { homeLink } = SharedState();

  return (
    <S.Wrapper>
      <S.Logo
        src={BrasaoRN}
        alt="Brasão da Procuradoria Geral do Estado do Rio Grande do Norte contendo duas palmeiras, um barco ao fundo com a descrição do governo"
      />
      <S.MessageContainer>
        <S.MessageTitle>404</S.MessageTitle>
        <S.MessageContent>
          O recurso que você está procurando pode ter sido removido, ter tido
          seu nome alterado ou estar temporariamente indisponível.
        </S.MessageContent>
        <S.HomeLink to={homeLink}>
          <S.HomeIcon
            weight="fill"
            alt="Desenho de uma casinha que simboliza o retorno para o dashboard"
          />
          Ir para Home
        </S.HomeLink>
      </S.MessageContainer>
    </S.Wrapper>
  );
};

export default NotFound;

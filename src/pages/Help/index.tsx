import { PageTitle } from "../../components/TitlePage";
import * as S from "./styled";

const Help = () => {
  return (
    <>
      <PageTitle pageTitle="Ajuda" pageIcon={<S.PageIcon weight="fill" />} />
      <S.Wrapper>
        <S.TitleContainer>
          <S.IconDocument />
          <S.Title>Manuais</S.Title>
        </S.TitleContainer>
        <S.ContainerLinks>
          <S.ContainerCustomLink
            href="/ModuloProcurador.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <S.IconDownload />
            <S.CustomLink>JVRIS - Módulo Procurador</S.CustomLink>
          </S.ContainerCustomLink>
          <S.ContainerCustomLink
            href="/CartilhaSEIUsuárioExterno.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <S.IconDownload />
            <S.CustomLink>Cartilha SEI - para Usuários Externos</S.CustomLink>
          </S.ContainerCustomLink>
          <S.ContainerCustomLink
            href="/CartilhaSEIManualdeUso.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <S.IconDownload />
            <S.CustomLink>Cartilha SEI - Manual de Uso</S.CustomLink>
          </S.ContainerCustomLink>
          <S.ContainerCustomLink
            href="https://www.pje.jus.br/wiki/index.php/Manual_do_Advogado"
            target="_blank"
            rel="noopener noreferrer"
          >
            <S.IconDownload />
            <S.CustomLink>PJe - Manual do Advogado - PGE</S.CustomLink>
          </S.ContainerCustomLink>
          <S.ContainerCustomLink
            href="https://www.pje.jus.br/wiki/index.php/Manual_dos_Representantes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <S.IconDownload />
            <S.CustomLink>PJe - Manual dos Representantes - PGE</S.CustomLink>
          </S.ContainerCustomLink>
        </S.ContainerLinks>
      </S.Wrapper>
      ;
    </>
  );
};

export default Help;

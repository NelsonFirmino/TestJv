import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { MetabaseIframe } from "../../../../components/MetabaseIframe";

const FlowActReports = () => {
  const METABASE_KEY = process.env.REACT_APP_METABASE_BI_ATOS_RELATORIOS_KEY;
  return (
    <>
      <PageTitle
        pageTitle="FLUXO DOS ATOS - RELATÓRIOS"
        pageIcon={<S.PageIcon weight="bold" />}
      />
      <S.Wrapper>
        <MetabaseIframe dashboardKey={METABASE_KEY} />
      </S.Wrapper>
    </>
  );
};

export default FlowActReports;

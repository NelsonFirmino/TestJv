import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { MetabaseIframe } from "../../../../components/MetabaseIframe";

const FlowAct = () => {
  const METABASE_KEY = process.env.REACT_APP_METABASE_BI_ATOS_KEY;
  return (
    <>
      <PageTitle
        pageTitle="FLUXO DOS ATOS"
        pageIcon={<S.PageIcon weight="bold" />}
      />
      <S.Wrapper>
        <MetabaseIframe dashboardKey={METABASE_KEY} />
      </S.Wrapper>
    </>
  );
};

export default FlowAct;

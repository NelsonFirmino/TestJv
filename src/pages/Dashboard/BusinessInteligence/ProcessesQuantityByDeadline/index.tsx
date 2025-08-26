import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { MetabaseIframe } from "../../../../components/MetabaseIframe";

const ProcessesQuantityByDeadline = () => {
  const METABASE_KEY =
    process.env.REACT_APP_METABASE_BI_REL_QUANTITATIVO_PROCESSO_PRAZO_KEY;
  return (
    <>
      <PageTitle
        pageTitle="QUANTITATIVO DE PROCESSO POR PRAZO"
        pageIcon={<S.PageIcon weight="bold" />}
      />
      <S.Wrapper>
        <MetabaseIframe dashboardKey={METABASE_KEY} />
      </S.Wrapper>
    </>
  );
};

export default ProcessesQuantityByDeadline;

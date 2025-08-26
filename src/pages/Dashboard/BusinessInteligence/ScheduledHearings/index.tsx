import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { MetabaseIframe } from "../../../../components/MetabaseIframe";

const ScheduledHearings = () => {
  const METABASE_KEY = process.env.REACT_APP_METABASE_BI_AGENDA_KEY;
  return (
    <>
      <PageTitle
        pageTitle="AGENDA DE AUDIÊNCIAS"
        pageIcon={<S.PageIcon weight="bold" />}
      />
      <S.Wrapper>
        <MetabaseIframe dashboardKey={METABASE_KEY} />
      </S.Wrapper>
    </>
  );
};

export default ScheduledHearings;

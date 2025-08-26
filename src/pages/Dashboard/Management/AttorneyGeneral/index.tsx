import * as S from "./styled";
import Modals from "./components/Modals";
import AttorneyTables from "./components/Tables";
import DashboardProcuradorContext from "./context";

const GeneralAttorney = () => {
  return (
    <DashboardProcuradorContext>
      <Modals />
      <S.Wrapper>
        <S.FlagContainer>
          <S.Flag>Dashboard Procurador Geral</S.Flag>
        </S.FlagContainer>
        <AttorneyTables />
      </S.Wrapper>
    </DashboardProcuradorContext>
  );
};

export default GeneralAttorney;

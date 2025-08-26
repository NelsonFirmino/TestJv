import { OperadorProvider } from "./context";
import Modals from "./Modals";
import * as S from "./styled";

import OperadorTables from "./Tables";

const DashboardOperador = () => {
  return (
    <OperadorProvider>
      <S.Wrapper>
        <Modals />

        <S.FlagContainer>
          <S.Flag>Dashboard Operador</S.Flag>
        </S.FlagContainer>

        <OperadorTables />
      </S.Wrapper>
    </OperadorProvider>
  );
};

export default DashboardOperador;

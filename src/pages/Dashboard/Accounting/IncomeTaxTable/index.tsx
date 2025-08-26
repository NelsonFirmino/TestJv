import { useNavigate } from "react-router-dom";
import * as MockData from "./mockData";
import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import JvrisTable from "../../../../components/JvrisTable";
import theme from "../../../../globalStyle/theme";
import { X, PencilSimple } from "phosphor-react";

const IncomeTaxTable = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle
        pageTitle="LISTA DA TABELA DE IMPOSTO DE RENDA"
        pageIcon={<S.PageIcon />}
      />

      <S.TableWrapper>
        <JvrisTable
          autoPrimaryColumn={false}
          
          columns={MockData.TableDataTitle()}
          data={MockData.TableDataContent()}
          GenericButton={[
            {
              hoverColor: theme.colors.softYellow,
              icon: <PencilSimple weight="fill" size={20} />,
              onClick: () => {
                navigate("/");
              },
            },
            {
              hoverColor: theme.colors.softRed,
              icon: <X weight="bold" size={20} />,
              onClick: () => {
                navigate("/");
              },
            },
          ]}
        />
      </S.TableWrapper>
    </>
  );
};

export default IncomeTaxTable;

import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { CustomTable } from "../../../../components/CustomTable";
import { useRubricas } from "../../../../hooks/useRubricas";
import { Incidencia } from "./components/Incidencia";
import { ButtonChangeType } from "./components/ButtonChangeType";

const Rubrica = () => {
  const { rubricas, isLoadingRubricas } = useRubricas();
  return (
    <>
      <PageTitle pageTitle="SIP - RUBRICAS" pageIcon={<S.PageIcon />} />
      <S.Wrapper>
        <CustomTable
          columns={[
            {
              name: "Código",
              isSortable: true,
              keyData: "id",
            },
            {
              name: "Rubrica",
              isSortable: true,
              keyData: "txSipRubrica",
            },
            {
              name: "Incidência",
              isSortable: true,
              keyData: "nuIncidencia",
              component: {
                element: (data) => <Incidencia dataTable={data} />,
                isButton: false,
              },
            },
            {
              name: "",
              isSortable: false,
              keyData: "fesfddkajb",
              component: {
                element: (data) => <ButtonChangeType dataTable={data} />,
                isButton: true,
              },
            },
          ]}
          data={rubricas?.data ? rubricas.data : []}
          showSelectNumberOfRows={true}
          possibleDataKeyToBeNull={[{ key: "txSipRubrica", fallback: "--" }]}
          isLoading={isLoadingRubricas}
          showPagination={true}
          showSearchField={true}
          selectRows={true}
          pdfButton={{
            nameFile: "sip-rubricas",
          }}
          csvButton={{
            nameFile: "sip-rubricas",
          }}
          defaultSortKeyColumn={{
            key: "id",
            direction: "ascending",
          }}
        />
      </S.Wrapper>
    </>
  );
};

export default Rubrica;

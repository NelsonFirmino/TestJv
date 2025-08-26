import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useListaPartesProcessos } from "../../../../hooks/useProcessParts";
import { EditButton } from "./components/EditButton";
import * as S from "./styled";

const PartesDeProcessos = () => {
  const { listaPartes, isLoadingListaPartes } = useListaPartesProcessos();

  return (
    <>
      <PageTitle
        pageTitle="LISTA DE PARTES DE PROCESSOS"
        pageIcon={<S.PageIcon />}
      />

      <S.Wrapper>
        <CustomTable
          isLoading={isLoadingListaPartes}
          data={listaPartes?.data ? listaPartes.data : []}
          columns={[
            {
              name: "Número Processo",
              isSortable: true,
              keyData: "txNumeroProcesso",
            },
            {
              name: "Tribunal",
              isSortable: true,
              keyData: "txSigla",
            },
            {
              name: "Instância",
              isSortable: true,
              keyData: "nuInstancia",
            },
            {
              name: "Nome da Parte",
              isSortable: true,
              keyData: "txParte",
            },
            {
              name: "",
              isSortable: false,
              keyData: "a",
              component: {
                element: (data) => <EditButton dataTable={data} />,
                isButton: true,
              },
            },
          ]}
          showPagination={true}
          showSearchField={true}
          showSelectNumberOfRows={true}
          csvButton={{
            nameFile: "parte-processo",
          }}
          pdfButton={{
            nameFile: "parte-processo",
          }}
          selectRows={true}
          defaultSortKeyColumn={{
            key: "txNumeroProcesso",
            direction: "ascending",
          }}
        />
      </S.Wrapper>
    </>
  );
};

export default PartesDeProcessos;

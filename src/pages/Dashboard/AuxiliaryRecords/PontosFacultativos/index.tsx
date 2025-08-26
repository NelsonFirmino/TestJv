import * as S from "./styled";

import { CreateButton } from './components/CreateButton';
import { CustomTable } from '../../../../components/CustomTable';
import { EditButton } from "./components/EditButton";
import { PageTitle } from '../../../../components/TitlePage';
import { RemoveButton } from "./components/RemoveButton";
import { usePontosFacultativos } from '../../../../hooks/usePontosFacultativos';
import { useState } from 'react';

const PontosFacultativos = () => {
  const { pontosFacultativos, isLoadingPontosFacultativos } = usePontosFacultativos();
  const [isVisible, setIsVisible] = useState(false);

  const ToggleElement = () => {
    setIsVisible(!isVisible);
  };

  //*! =========================================[HANDLES]==========================================

  const podeRenderizar = (data, ButtonComponent) =>
    new Date(data.dtPontoFacultativo) > new Date()
      ? <ButtonComponent dataTable={data} />
      : null;

  return (
    <>
      <PageTitle pageTitle="PONTOS FACULTATIVOS" pageIcon={<S.PageIcon />} />

  //*! ========================================[CABEÇALHO]=========================================
      <S.Wrapper>
      <S.Row>
        <S.ContainerButtons>
          <S.SubmitButton onClick={() => setIsVisible(true)}>
            Adicionar
          </S.SubmitButton>
        </S.ContainerButtons>
        <CreateButton isOpen={isVisible} resetStates={() => {}} onClose={() => setIsVisible(false)} />
      </S.Row>
  //*! ==========================================[TABELA]==========================================
        <CustomTable
          isLoading={isLoadingPontosFacultativos}
          data={pontosFacultativos?.data ? pontosFacultativos?.data : []}
          columns={[
            {
              name: "Nome",
              keyData: "txPontoFacultativo",
              isSortable: true,
            },
            {
              name: "Data",
              keyData: "dtPontoFacultativo",
              isSortable: true,
              formatToDate: true,
            },
            {
              name: "Diário Oficial",
              keyData: "txDiarioOficial",
              isSortable: true,
            },
            {
              name: "",
              isSortable: false,
              keyData: "a",
              component: {
                element: (data) => podeRenderizar(data, EditButton),
                isButton: true,
              },
            },
            {
              name: "",
              isSortable: false,
              keyData: "b",
              component: {
                element: (data) => podeRenderizar(data, RemoveButton),
                isButton: true,
              },
            }
          ]}
          defaultSortKeyColumn={{
            key: "dtPontoFacultativo",
            direction: "descending"
          }}
          selectRows={false}
          csvButton={{
            nameFile: "pontosFacultativos"
          }}
          pdfButton={{
            nameFile: "pontosFacultativos"
          }}
          showPagination={true}
          showSearchField={true}
          showSelectNumberOfRows={true}
          onlyShowTableIfData={false}
        />
      </S.Wrapper>
    </>
  );
};

export default PontosFacultativos;

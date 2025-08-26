import * as S from "./styled";

import { useState } from "react";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useCredenciaisPje } from "../../../../hooks/useCredenciaisPje";
import { CreateCredencialButton } from "./components/CreateButton";
import { EditCredencialButton } from "./components/EditButton";
import { RemoveCredencialButton } from "./components/RemoveButton";

const CredenciaisPje = () => {
  const { credenciaisPje, isLoadingCredenciaisPje } = useCredenciaisPje();
  const [isVisible, setIsVisible] = useState(false);

  const ToggleElement = () => {
    setIsVisible(!isVisible);
  };

  //*! =========================================[HANDLES]==========================================
  return (
    <>
      <PageTitle pageTitle="CREDENCIAIS PJE" pageIcon={<S.PageIcon />} />
      //*!
      ========================================[CABEÇALHO]=========================================
      <S.Wrapper>
        <S.Row>
          <S.ContainerButtons></S.ContainerButtons>
          <CreateCredencialButton isOpen={isVisible} />
        </S.Row>
        //*!
        ==========================================[TABELA]==========================================
        <CustomTable
          isLoading={isLoadingCredenciaisPje}
          data={credenciaisPje ? credenciaisPje?.data : []}
          columns={[
            {
              name: "Tribunal",
              keyData: "txTribunal",
              isSortable: true,
            },
            {
              name: "Instância",
              keyData: "nuInstancia",
              isSortable: false,
            },
            {
              name: "Atualizado em",
              keyData: "dtAtualizacao",
              isSortable: true,
              formatToDate: true,
            },
            {
              name: "",
              isSortable: false,
              keyData: "a",
              component: {
                element: (data) => <EditCredencialButton dataTable={data} />,
                isButton: true,
              },
            },
            {
              name: "",
              isSortable: false,
              keyData: "b",
              component: {
                element: (data) => <RemoveCredencialButton dataTable={data} />,
                isButton: true,
              },
            },
          ]}
          defaultSortKeyColumn={{
            key: "nuInstancia",
            direction: "descending",
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

export default CredenciaisPje;

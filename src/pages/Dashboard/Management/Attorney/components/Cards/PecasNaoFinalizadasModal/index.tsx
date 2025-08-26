import { CustomTable } from "../../../../../../../components/CustomTable";
import { SharedState } from "../../../../../../../context/SharedContext";
import { usePecasNaoFinalizadas } from "../../../../../../../hooks/usePecasNaoFinalizadas";
import { useTablesContext } from "../../../context/TablesContext";
import { EditButton } from "./components/EditButton";
import { ProcessNumber } from "./components/ProcessNumber";
import * as S from "./styled";

export const PecasNaoFinalizadasModal = () => {
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id.toString();
  const { pecasNaoFinalizadas, isLoadingPecasNaoFinalizadas } =
    usePecasNaoFinalizadas(+user_id);

  const { data: dataTable } = useTablesContext();

  return (
    <S.Wrapper>
      {dataTable?.loading?.loadingData ? (
        <S.LoadingSpinner />
      ) : (
        <CustomTable
          columns={[
            {
              keyData: "txNumeroProcesso",
              name: "Processo",
              isSortable: false,
              component: {
                isButton: false,
                element: (data) => <ProcessNumber dataTable={data} />,
              },
            },
            {
              keyData: "txDescricao",
              name: "Descrição",
              isSortable: true,
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
          showSelectNumberOfRows={false}
          showSearchField={false}
          data={pecasNaoFinalizadas?.data ? pecasNaoFinalizadas?.data : []}
          isLoading={isLoadingPecasNaoFinalizadas}
          maxButtonPagination={3}
        />
      )}
    </S.Wrapper>
  );
};

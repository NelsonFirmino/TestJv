import { useState } from "react";
import toast from "react-hot-toast";
import useRequisitorioService from "../../../../../../api/services/rpv/Requisitorio";
import { BaseModal } from "../../../../../../components/BaseModal";
import * as S from "./styled";

export const RemoveButton = (dataTable: any) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const { deleteRequisitorio } = useRequisitorioService();

  const handleToast = (msg: string, error: boolean) => {
    !error
      ? toast(msg, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
    setOpenModal(false);
  };

  return (
    <S.Wrapper>
      <BaseModal
        title="Tem certeza que deseja excluir?"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.ContainerForm>
          <S.ButtonContainer>
            <S.CancelButton onClick={() => setOpenModal(false)}>
              Cancelar
            </S.CancelButton>
            <S.ConfirmButton
              onClick={async () =>
                deleteRequisitorio(dataTable.dataTable.id)
                  .then((res) => {
                    if (res?.status == "OK") {
                      handleToast("Removido com sucesso", false);
                    } else {
                      handleToast("Erro ao remover", true);
                    }
                  })
                  .catch((err) => {
                    handleToast("Erro ao remover", false);
                  })
              }
            >
              Sim
            </S.ConfirmButton>
          </S.ButtonContainer>
        </S.ContainerForm>
      </BaseModal>
      <S.Button onClick={() => setOpenModal(true)}>Excluir</S.Button>
    </S.Wrapper>
  );
};

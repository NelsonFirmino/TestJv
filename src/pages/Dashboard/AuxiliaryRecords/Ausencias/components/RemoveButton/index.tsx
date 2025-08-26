import { useState } from "react";
import * as S from "./styled";
import { BaseModal } from "../../../../../../components/BaseModal";
import { useMutation } from "react-query";
import { deleteAbsencesAttorney } from "../../../../../../api/services/absences/absences";
import toast from "react-hot-toast";

export const RemoveButton = (dataTable: any) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const deleteAudience = useMutation(deleteAbsencesAttorney, {
    onSettled: (data) => {
      if (data.status === "OK") {
        toast(data.message, {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        window.location.reload();
      } else {
        toast(data.message, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      }
      setOpenModal(false);
    },
  });

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
                deleteAudience.mutate(dataTable.dataTable.id)
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

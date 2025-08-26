import * as S from "./styled";

import { useMutation, useQueryClient } from "react-query";

import { BaseModal } from "../../../../../../components/BaseModal";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteCredencialPje } from "../../../../../../api/services/credenciais-pje/credenciaisPje-Service";

export const RemoveCredencialButton = (dataTable: any) => {
  const queryClient = useQueryClient();

  const [isOpenModal, setOpenModal] = useState(false);
  const deleteCredencial = useMutation(deleteCredencialPje, {
    onSettled: (data) => {
      if (data.status === "OK" || data.status === "NoContent") {
        toast(data.message, {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        queryClient.invalidateQueries(`credenciaisPje`);
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
                deleteCredencial.mutate(dataTable.dataTable.id)
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

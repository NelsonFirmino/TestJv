import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteIndice } from "../../../../../../api/services/indices/indices";
import { BaseModal } from "../../../../../../components/BaseModal";
import * as S from "./styled";

export const RemoveIndice = ({ dataTable }: any) => {
  const navigate = useNavigate();
  const [isOpenModal, setOpenModal] = useState(false);

  const reloadPage = () => {
    navigate(0);
  };

  const deleteIndiceMutation = useMutation(deleteIndice, {
    onSettled: ({ status, message }) => {
      if (status === "OK") {
        console.log(status);
        console.log(message);

        toast(message, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        setOpenModal(false);
        setTimeout(() => {
          reloadPage();
        }, 2000);
      } else {
        toast.error(message, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      }
    },
  });

  return (
    <>
      <BaseModal
        title="Edição de Valores de Índice"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.ContainerForm>
          <S.WarningMessage>
            Tem certeza que deseja excluir o índice?
          </S.WarningMessage>

          <S.OptionsContainer>
            <S.OptionCancel onClick={() => setOpenModal(false)}>
              Cancelar
            </S.OptionCancel>
            <S.OptionRemove
              onClick={() => deleteIndiceMutation.mutate(dataTable.id)}
            >
              Excluir
            </S.OptionRemove>
          </S.OptionsContainer>
        </S.ContainerForm>
      </BaseModal>
      <S.Wrapper onClick={() => setOpenModal(true)}>Excluir</S.Wrapper>
    </>
  );
};

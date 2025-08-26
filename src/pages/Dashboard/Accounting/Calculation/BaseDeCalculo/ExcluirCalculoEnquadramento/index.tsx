import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { deleteExcluirCalculoEnquadramento } from "../../../../../../api/services/RespostaDcje/respostaDcje";
import { BaseModal } from "../../../../../../components/BaseModal";
import { useCalculosContext } from "../../context/CalculosContext";
import * as S from "./styled";

interface Excluir {
  dataTable?: any;
  onClick?: () => void;
}

export const ExcluirCalculoEnquadramento = (props: Excluir) => {
  const { updateData, setUpdateData } = useCalculosContext();
  const [isOpenModal, setOpenModal] = useState(false);

  const deleteCalculoMutation = useMutation(deleteExcluirCalculoEnquadramento, {
    onSettled: ({ status, message }) => {
      if (status === "OK") {
        toast(message, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        setUpdateData(!updateData);
        setOpenModal(false);
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
        title="Excluir Cálculo Financeiro"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.ContainerForm>
          <S.WarningMessage>
            Tem certeza que deseja excluir o cálculo financeiro?
          </S.WarningMessage>

          <S.OptionsContainer>
            <S.OptionCancel onClick={() => setOpenModal(false)}>
              Cancelar
            </S.OptionCancel>
            <S.OptionRemove
              onClick={() => deleteCalculoMutation.mutate(props.dataTable.id)}
            >
              Excluir
            </S.OptionRemove>
          </S.OptionsContainer>
        </S.ContainerForm>
      </BaseModal>
      <S.Wrapper
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Excluir
      </S.Wrapper>
    </>
  );
};

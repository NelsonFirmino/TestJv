import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { deleteExcluirPlanilhaResultado } from "../../../../../api/services/RespostaDcje/respostaDcje";
import { BaseModal } from "../../../../../components/BaseModal";
import { useCalculosContext } from "../../Calculation/context/CalculosContext";
import * as S from "./styled";

export const ExcluirDadosCalculo = ({ dataTable }: any) => {
  const { updateData, setUpdateData, idCalculoContext } = useCalculosContext();
  const [isOpenModal, setOpenModal] = useState(false);

  const deleteCalculoMutation = useMutation(deleteExcluirPlanilhaResultado, {
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
        setOpenModal(false);
        setUpdateData(!updateData);
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
        title="Excluir Cálculo"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.ContainerForm>
          <S.WarningMessage>
            Tem certeza que deseja excluir o cálculo?
          </S.WarningMessage>

          <S.OptionsContainer>
            <S.OptionCancel onClick={() => setOpenModal(false)}>
              Cancelar
            </S.OptionCancel>
            <S.OptionRemove
              onClick={() => deleteCalculoMutation.mutate(idCalculoContext)}
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

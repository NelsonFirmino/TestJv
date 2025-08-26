import { useMutation } from "react-query";
import * as S from "./styled";
import { toast } from "react-hot-toast";
import { ModalRemoveProps } from "./interfaces/modal-remove.interface";
import { deleteAct } from "../../../../../../api/services/acts/acts";
import { useNavigate } from "react-router-dom";

export const ModalRemove = ({ setShowModal, id }: ModalRemoveProps) => {
  const reloadPage = () => {
    navigate(0);
  };

  const navigate = useNavigate();
  const deleteActMutation = useMutation(deleteAct, {
    onSettled: (data) => {
      if (data.status === "BadRequest") {
        toast.error(data.message, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      } else {
        toast("A conclusão do ato foi excluida com sucesso!", {
          icon: "",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });

        setTimeout(() => {
          reloadPage();
        }, 2500);
      }
      setShowModal(false);
    },
  });

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Excluir ato</S.TitleModal>
          <S.CloseModal onClick={() => setShowModal(false)}>
            Fechar
          </S.CloseModal>
        </S.TitleContainer>

        <S.ContainerForm>
          <S.ContainerField>
            <S.FieldTitle>
              Essa ação também excluirá os despachos realizados. Deseja
              Continuar com a exclusão da conclusão do Ato?
            </S.FieldTitle>
          </S.ContainerField>

          <S.ButtonContainer>
            <S.CancelButton onClick={() => setShowModal(false)}>
              Cancelar
            </S.CancelButton>
            <S.ComfirmButton onClick={async () => deleteActMutation.mutate(id)}>
              Excluir
            </S.ComfirmButton>
          </S.ButtonContainer>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

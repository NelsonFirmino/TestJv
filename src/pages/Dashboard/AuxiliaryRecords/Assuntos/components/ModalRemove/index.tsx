import { useQueryClient } from "react-query";
import * as S from "./styled";
import { ModalRemoveProps } from "./modalremove.interface";
import toast from "react-hot-toast";
import theme from "../../../../../../globalStyle/theme";
import { deleteOrgaoJulgadorByID } from "../../../../../../api/services/OrgaosJulgadores/orgaojulgador";
import { deleteAssunto } from "../../../../../../api/services/assuntos/assuntos";

export const ModalRemove = ({
  setShowModalRemove: setShowModalRemove,
  id,
  txAssunto,
}: ModalRemoveProps) => {
  const queryClient = useQueryClient();

  const handleToast = (msg: string, error: boolean = false) => {
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
    setShowModalRemove(false);
  };

  const handleSubmit = () => {
    deleteAssunto(id).then((response) => {
      if (response && response.status == "NotFound") {
        queryClient.invalidateQueries(`assuntosSemPaginacao`);
        handleToast("Assunto Removido com Sucesso");
      } else {
        handleToast(
          "Erro ao Tentar Remover Assunto",
          true
        );
      }
    });
  };

  const handleCancel = () => {
    setShowModalRemove(false);
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Remover Assunto</S.TitleModal>
          <S.CloseModal
            onClick={() => {
              setShowModalRemove(false);
            }}
          >
            Fechar
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.ContainerField>
            <S.FieldTitle>Tem certeza que deseja excluir?</S.FieldTitle>
          </S.ContainerField>

          <S.ButtonContainer>
            <S.ComfirmButton onClick={handleSubmit}>Sim</S.ComfirmButton>
            <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
          </S.ButtonContainer>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

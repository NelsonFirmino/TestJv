import { useQueryClient } from "react-query";
import * as S from "./styled";
import { ModalRemoveComarcaProps } from "./modalremovecomarca.interface";
import toast from "react-hot-toast";
import theme from "../../../../../../globalStyle/theme";
import { deleteComarca } from "../../../../../../api/services/comarcas/comarcas";

export const ModalRemoveComarca = ({
  setShowModalRemoveComarca,
  id,
}: ModalRemoveComarcaProps) => {
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
    setShowModalRemoveComarca(false);
  };

  const handleSubmit = () => {
    deleteComarca(id).then((response) => {
      if (response.status == "NotFound") {
        queryClient.invalidateQueries(`comarcas`);
        handleToast("Comarca Removido com Sucesso");
      } else {
        handleToast("Erro ao Tentar Remover Comarca, tente novamente!", true);
      }
    });
  };

  const handleCancel = () => {
    setShowModalRemoveComarca(false);
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Remover Comarca</S.TitleModal>
          <S.CloseModal
            onClick={() => {
              setShowModalRemoveComarca(false);
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

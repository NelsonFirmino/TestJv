import { useQueryClient } from "react-query";
import * as S from "./styled";
import { ModalRemoveProps } from "./modalremove.interface";
import { deleteMotoristaByID } from "../../../../../../api/services/motoristas/motoristas";
import toast from "react-hot-toast";
import theme from "../../../../../../globalStyle/theme";

export const ModalRemove = ({
  setShowModalRemove: setShowModalRemove,
  id,
  txMotorista,
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
    deleteMotoristaByID(id).then((response) => {
      if (response.status == "OK") {
        queryClient.invalidateQueries(`motoristas`);
        handleToast("Motorista Removido com Sucesso");
      } else {
        handleToast("Erro ao Tentar Remover Motorista, tente novamente!", true);
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
          <S.TitleModal>Remover Motorista</S.TitleModal>
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

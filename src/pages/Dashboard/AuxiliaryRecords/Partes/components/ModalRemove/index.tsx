import { useQueryClient } from "react-query";
import * as S from "./styled";
import { ModalRemoveProps } from "./modalremove.interface";
import toast from "react-hot-toast";
import theme from "../../../../../../globalStyle/theme";
import { deleteParte } from "../../../../../../api/services/partes/partes";

export const ModalRemove = ({ setShowModalRemove, id }: ModalRemoveProps) => {
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
    deleteParte(id)
      .then((response) => {
        if (response.status == "OK") {
          queryClient.invalidateQueries(`partes`);
          handleToast("Parte Removida com Sucesso");
        } else if (
          response.status == "BadRequest" &&
          response.message.includes("O CPF informado é inválido")
        ) {
        } else if (
          response.status == "BadRequest" &&
          response.message.includes("O CNPJ informado é inválido")
        ) {
          handleToast("CNPJ Inválido", true);
        } else {
          handleToast("Desculpe... Algo não funcionou como esperado.", true);
        }
      })
      .catch((err) => {
        if (
          err.status == "BadRequest" &&
          err.message.includes("O CPF informado é inválido")
        ) {
        } else if (
          err.status == "BadRequest" &&
          err.message.includes("O CNPJ informado é inválido")
        ) {
          handleToast("CNPJ Inválido", true);
        } else {
          handleToast("Desculpe... Algo não funcionou como esperado.", true);
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
          <S.TitleModal>Remover Parte</S.TitleModal>
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

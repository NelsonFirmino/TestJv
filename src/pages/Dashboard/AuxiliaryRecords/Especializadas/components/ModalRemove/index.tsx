import { useQueryClient } from "react-query";
import * as S from "./styled";
import { ModalRemoveProps } from "./modalremove.interface";
import toast from "react-hot-toast";
import theme from "../../../../../../globalStyle/theme";
import { deleteEspecializadaByID } from "../../../../../../api/services/specials/specials";

export const ModalRemove = ({
  setShowModalRemove: setShowModalRemove,
  id,
  txEspecializada,
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
    deleteEspecializadaByID(id)
      .then((response) => {
        if (response.status == "NotFound") {
          queryClient.invalidateQueries(`allSpecialsList`);
          handleToast("Especializada Removida com Sucesso");
        } else {
          handleToast(
            "Erro ao Tentar Remover Especializada, tente novamente!",
            true
          );
        }
      })
      .catch((e) => {
        handleToast(
          "Erro ao Tentar Remover Especializada, tente novamente!",
          true
        );
      });
  };

  const handleCancel = () => {
    setShowModalRemove(false);
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Remover Especializada</S.TitleModal>
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
            <S.FieldTitle htmlFor="txEspecializada">
              Tem certeza que quer remover a Especializada {txEspecializada}?
            </S.FieldTitle>
            <S.TextAreaInput hidden defaultValue={id} />
          </S.ContainerField>

          <S.ContainerSubmitButton>
            <S.SubmitButton onClick={handleSubmit}>Sim</S.SubmitButton>
            <S.SubmitButton
              style={{
                marginLeft: "1rem",
                backgroundColor: theme.colors.softRed,
              }}
              onClick={handleCancel}
            >
              Cancelar
            </S.SubmitButton>
          </S.ContainerSubmitButton>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

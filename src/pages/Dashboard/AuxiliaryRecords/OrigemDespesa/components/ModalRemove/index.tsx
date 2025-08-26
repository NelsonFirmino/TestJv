import { useQueryClient } from "react-query";
import * as S from "./styled";
import { ModalRemoveProps } from "./modalremove.interface";
import toast from "react-hot-toast";
import theme from "../../../../../../globalStyle/theme";
import { deleteOrigemDespesasByID } from "../../../../../../api/services/rpvOrigemDespesas/rpvOrigemDespesas";

export const ModalRemove = ({
  setShowModalRemove: setShowModalRemove,
  id,
  txOrigem,
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
    deleteOrigemDespesasByID(id).then((response) => {
      if (response.status == "OK") {
        queryClient.invalidateQueries(`origemDespesas`);
        handleToast("Origem da Despesa Removida com Sucesso");
      } else {
        handleToast(
          "Erro ao Tentar Remover Origem da Despesa, tente novamente!",
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
          <S.TitleModal>Remover Origem da Despesa</S.TitleModal>
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
            <S.FieldTitle htmlFor="txOrigem">
              Tem certeza que quer remover a Origem da Despesa {txOrigem}?
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

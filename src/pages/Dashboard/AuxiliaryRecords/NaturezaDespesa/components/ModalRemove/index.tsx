import { useQueryClient } from "react-query";
import * as S from "./styled";
import { ModalRemoveProps } from "./modalremove.interface";
import toast from "react-hot-toast";
import theme from "../../../../../../globalStyle/theme";
import { deleteNaturezaDespesasByID } from "../../../../../../api/services/rpvNaturezaDespesas/rpvNaturezaDespesas";

export const ModalRemove = ({
  setShowModalRemove: setShowModalRemove,
  id,
  txNatureza,
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
    deleteNaturezaDespesasByID(id).then((response) => {
      if (response.status == "OK") {
        queryClient.invalidateQueries(`naturezaDespesas`);
        handleToast("Natureza da Despesa Removida com Sucesso");
      } else {
        handleToast(
          "Erro ao Tentar Remover Natureza da Despesa, tente novamente!",
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
          <S.TitleModal>Remover Natureza da Despesa</S.TitleModal>
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
            <S.FieldTitle htmlFor="txNatureza">
              Tem certeza que quer remover a Natureza da Despesa {txNatureza}?
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

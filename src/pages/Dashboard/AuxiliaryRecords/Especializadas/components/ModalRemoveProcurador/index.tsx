import * as S from "./styled";
import { ModalRemoveProps } from "./modalremove.interface";
import toast from "react-hot-toast";
import theme from "../../../../../../globalStyle/theme";
import { deleteEspecializadaByIDAndProcurador } from "../../../../../../api/services/specials/specials";
import { URI } from "tinymce";
import { removeHTMLFormat } from "../../../../../../utils/removeHTMLFormat";
import { useQueryClient } from "react-query";

export const ModalRemoveProcurador = ({
  setShowModalRemove: setShowModalRemove,
  idEspecializada,
  idProcurador,
  txProcurador,
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
      : toast.error(removeHTMLFormat(msg).toString(), {
          icon: "😥",
          duration: 10000,
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
    deleteEspecializadaByIDAndProcurador(idEspecializada, idProcurador)
      .then((response) => {
        if (response.status == "NotFound") {
          handleToast("Procurador Removido com Sucesso");
          queryClient.invalidateQueries(`allSpecialsList`);
          //window.location.reload();
        } else {
          handleToast(response.message, true);
        }
      })
      .catch((e) => {
        handleToast(
          "Erro ao Tentar Remover Procurador, tente novamente!",
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
          <S.TitleModal>Atenção</S.TitleModal>
          <S.CloseModal onClick={handleCancel}>Fechar</S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.ContainerField>
            <S.FieldTitle htmlFor="txEspecializada">
              Deseja remover o procurador {txProcurador}?
            </S.FieldTitle>
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

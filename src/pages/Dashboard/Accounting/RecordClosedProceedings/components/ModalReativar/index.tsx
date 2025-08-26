import { ModalReativarProps } from "./modal-reativar.interface";
import * as S from "./styled";
import { DeleteEncerramentoFichaDCJE } from "../../../../../../api/services/process/process";
import { toast } from "react-hot-toast";

export const ModalReativar = ({
  showModalReativar,
  setShowModalReativar,
}: ModalReativarProps) => {
  async function handleReativar(id: string) {
    await DeleteEncerramentoFichaDCJE({ id })
      .then((res: any) => {
        if (res.status == "OK") {
          toast("Solicitação Reativada com Sucesso", {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#81c784",
              color: "#fff",
              fontSize: "30px",
            },
          });
        }
        window.location.reload();
      })
      .catch((e) => {
        toast.error("Error ao Reativar Solicitação...", {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      });
    resetModal(true);
  }

  function resetModal(upd: boolean) {
    setShowModalReativar({
      open: false,
      id: "0",
    });
  }

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Reativar Solicitação</S.TitleModal>
          <S.CloseModal onClick={() => resetModal(false)}>Fechar</S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.WarningMessage>
            Deseja reativar a Solicitação Nº {showModalReativar.id} ?
          </S.WarningMessage>

          <S.OptionsContainer>
            <S.OptionCancel onClick={() => resetModal(false)}>
              Cancelar
            </S.OptionCancel>
            <S.OptionRemoveAttachment
              onClick={() => {
                handleReativar(showModalReativar.id);
              }}
            >
              Reativar
            </S.OptionRemoveAttachment>
          </S.OptionsContainer>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

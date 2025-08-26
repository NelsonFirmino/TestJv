import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { deleteFichaDCJEByID } from "../../../../../../api/services/fichaDCJE/fichaDCJE";
import theme from "../../../../../../globalStyle/theme";
import { ModalRemoveProps } from "./modalremove.interface";
import * as S from "./styled";

export const ModalRemove = ({
    setShowModalRemove: setShowModalRemove,
    id
}: ModalRemoveProps) => {
    const handleToast = (msg: string, error: boolean = false) => {
        !error
            ? toast(msg, {
                  icon: "👏",
                  style: {
                      borderRadius: "10px",
                      background: "#81c784",
                      color: "#fff",
                      fontSize: "30px"
                  }
              })
            : toast.error(msg, {
                  icon: "😥",
                  style: {
                      borderRadius: "10px",
                      background: "#e57373",
                      color: "#fff",
                      fontSize: "30px"
                  }
              });
        setShowModalRemove(false);
    };
    const queryClient = useQueryClient();
    const handleSubmit = () => {
        deleteFichaDCJEByID(id)
            .then((response) => {
                if (response.status == "OK") {
                    handleToast("Processo Pendente Removido com Sucesso");
                    queryClient.invalidateQueries(`distsppddcje`);
                } else {
                    handleToast(
                        "Erro ao Tentar Remover Processo Pendente, tente novamente!",
                        true
                    );
                }
            })
            .catch((e) => {
                handleToast(
                    "Erro ao Tentar Remover Processo Pendente, tente novamente!",
                    true
                );
            });
    };

    const handleCancel = () => {
        setShowModalRemove(null);
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
                        <S.FieldTitle>
                            Tem certeza que quer remover o processo pendente?
                        </S.FieldTitle>
                    </S.ContainerField>

                    <S.ContainerSubmitButton>
                        <S.SubmitButton onClick={handleSubmit}>
                            Sim
                        </S.SubmitButton>
                        <S.SubmitButton
                            style={{
                                marginLeft: "1rem",
                                backgroundColor: theme.colors.softRed
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

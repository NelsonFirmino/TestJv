import toast from "react-hot-toast";
import { deleteReasonsRequestsByID } from "../../../../../../api/services/reasonsRequests/reasonsRequests";
import theme from "../../../../../../globalStyle/theme";
import { ModalRemoveProps } from "./modalremove.interface";
import * as S from "./styled";

export const ModalRemove = ({
    setShowModalRemove: setShowModalRemove,
    id,
    name
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

    const handleSubmit = () => {
        deleteReasonsRequestsByID(id)
            .then((response) => {
                if (response.status == "OK") {
                    handleToast(
                        `${name || "Razão para Pedido"} Removida com Sucesso`
                    );
                } else {
                    handleToast(
                        `Erro ao Tentar Remover ${
                            name || "Razão para Pedido"
                        }, tente novamente!`,
                        true
                    );
                }
            })
            .catch((e) => {
                handleToast(
                    `Erro ao Tentar Remover ${
                        name || "Razão para Pedido"
                    }, tente novamente!`,
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
                            Tem certeza que quer remover a{" "}
                            {name || "Razão para Pedido"}?
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

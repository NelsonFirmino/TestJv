import { useQueryClient } from "react-query";
import { deleteMotivosDevolucaoByID } from "../../../../../../api/services/motivos-devolucao/motivosDevolucao";
import {
    HotToastError,
    HotToastSucess
} from "../../../../../../components/HotToastFuncs";
import theme from "../../../../../../globalStyle/theme";
import { ModalRemoveProps } from "./modalremove.interface";
import * as S from "./styled";

export const ModalRemove = ({
    setShowModalRemove: setShowModalRemove,
    id,
    txMotivo
}: ModalRemoveProps) => {
    const queryClient = useQueryClient();

    const handleToast = (msg: string, error: boolean = false) => {
        !error ? HotToastSucess(msg) : HotToastError(msg);
        setShowModalRemove(false);
    };

    const handleSubmit = () => {
        deleteMotivosDevolucaoByID(id)
            .then((response) => {
                if (response.status == "OK") {
                    queryClient.invalidateQueries(`motivosDevolucao`);
                    handleToast("Motivo para Devolução Removido com Sucesso");
                } else {
                    handleToast(response.message, true);
                }
            })
            .catch((e) => {
                handleToast(
                    "Erro ao Tentar Remover Motivo para Devolução, tente novamente!",
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
                    <S.TitleModal>Remover Motivo para Devolução</S.TitleModal>
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
                        <S.FieldTitle htmlFor="txMotivo">
                            Tem certeza que quer remover o Motivo para
                            Devolução?
                        </S.FieldTitle>
                        <S.TextAreaInput hidden defaultValue={id} />
                    </S.ContainerField>

                    <S.ContainerSubmitButton>
                        <S.SubmitButton
                            style={{
                                backgroundColor: theme.colors.softGreen
                            }}
                            onClick={handleSubmit}
                        >
                            Sim
                        </S.SubmitButton>
                        <S.SubmitButton
                            style={{
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

import { SubmitHandler, useForm } from "react-hook-form";
import { AlterarPrazoProps, SubmitAlterarPrazo } from "./alterar-prazo.interface";
import * as S from './styled'
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { BaseModalV2 } from "../../../../../../../../../components/BaseModalV2";
import { useMutation, useQueryClient } from "react-query";
import { PutActTime } from "../../../../../../../../../api/services/acts/acts";
import toast from "react-hot-toast";

export const AlterarPrazo = ({ idAto, dtPrazo, txNumeroProcesso, keyStateOpenModal, setKeyStateOpenModal, keyString }: AlterarPrazoProps) => {
    const { user, selectedUser } = SharedState();
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        register,
        formState: { isValid }
    } = useForm<SubmitAlterarPrazo>({
        mode: "onChange",
    });

    const { mutate: mutatePutActTime, isLoading: isLoadingPutActTime } = useMutation(PutActTime, {
        onSuccess: (res) => {
            toast(res.message, {
                icon: "✔",
                style: {
                    borderRadius: "10px",
                    background: "#81c784",
                    color: "#fff",
                    fontSize: "30px",
                },
            });
            queryClient.invalidateQueries(`distributions-attorney-${selectedUser?.id || +user["Jvris.User.Id"]}`);
            setKeyStateOpenModal(false);
        },
        onError: (error: Error) => {
            toast.error(error?.message, {
                icon: "❌",
                style: {
                    borderRadius: "10px",
                    background: "#e57373",
                    color: "#fff",
                    fontSize: "30px",
                },
            })
        }
    })

    const onSubmit: SubmitHandler<SubmitAlterarPrazo> = async (params) => {
        mutatePutActTime({
            idAto,
            dtPrazo: params.dtPrazo,
        })
    }

    return (
        <BaseModalV2 title='Alterar prazo'
            keyStateOpenModal={keyStateOpenModal}
            setKeyStateOpenModal={setKeyStateOpenModal}
            keyString={keyString}>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
                <S.Section>
                    <S.SectionTitle>Número do Processo</S.SectionTitle>
                    <S.Text>{txNumeroProcesso}</S.Text>
                </S.Section>

                <S.Section>
                    <S.SectionTitle>Novo prazo</S.SectionTitle>
                    <S.InputDate {...register("dtPrazo", {
                        required: true,
                    })} defaultValue={dtPrazo} type="date" />
                </S.Section>

                <S.ButtonContainer>
                    <S.ConfirmButton type='submit' disabled={isLoadingPutActTime || !isValid}>Salvar</S.ConfirmButton>

                    {isLoadingPutActTime && (
                        <S.LoadingSpinner />
                    )}
                </S.ButtonContainer>
            </S.Form>
        </BaseModalV2>
    )
}
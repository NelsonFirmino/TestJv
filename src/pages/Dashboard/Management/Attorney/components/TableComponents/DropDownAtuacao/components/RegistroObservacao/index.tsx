import { useMutation, useQueryClient } from "react-query";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { RegistrarObservacaoProps, SubmitRegistrarObservacao } from "./registro-observacao.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseModalV2 } from "../../../../../../../../../components/BaseModalV2";
import * as S from './styled'
import { PostActObservationV2 } from "../../../../../../../../../api/services/actObservations/actObservations";
import toast from "react-hot-toast";
import { useActObservations } from "../../../../../../../../../hooks/useActObservations";
import { CustomTable } from "../../../../../../../../../components/CustomTable";

export const RegistrarObservacao = ({ idAto, txNumeroProcesso, keyStateOpenModal, setKeyStateOpenModal, keyString }: RegistrarObservacaoProps) => {
    const queryClient = useQueryClient();
    const { user } = SharedState();
    const { actObservations, isLoadingActObservations } = useActObservations(idAto.toString());
    const {
        reset,
        handleSubmit,
        register,
        formState: { isValid }
    } = useForm<SubmitRegistrarObservacao>({
        mode: "onChange",
    });

    const { mutate: mutateActObservation, isLoading: isLoadingActObservation } = useMutation(PostActObservationV2, {
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
            queryClient.invalidateQueries(`actObservation-${idAto}`);
            reset({ txObservacao: "" });
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
    });

    const onSubmit: SubmitHandler<SubmitRegistrarObservacao> = async (params) => {
        mutateActObservation({
            idAto,
            txObservacao: params.txObservacao,
            idUsuarioCadastro: user["Jvris.User.Id"],
        })
    };

    return (
        <BaseModalV2 title='Registro de observação do ato'
            keyStateOpenModal={keyStateOpenModal}
            setKeyStateOpenModal={setKeyStateOpenModal}
            keyString={keyString}>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
                <S.Section>
                    <S.SectionTitle>Número do Processo</S.SectionTitle>
                    <S.Text>{txNumeroProcesso}</S.Text>
                </S.Section>

                <S.Section>
                    <S.SectionTitle>Observação</S.SectionTitle>

                    <S.TextArea {...register("txObservacao", {
                        required: true,
                    })} placeholder='Escreva aqui...' />
                </S.Section>

                <S.Section>
                    <S.SectionTitle>Observações anteriores</S.SectionTitle>

                    <CustomTable
                        isLoading={isLoadingActObservations}
                        data={actObservations?.data ? actObservations.data : []}
                        columns={[
                            {
                                name: "Observação",
                                keyData: "txObservacao",
                                isSortable: false,
                                breakTextOnFirstColumn: true
                            },
                            {
                                name: "Nome",
                                keyData: "txNomeUsuario",
                                isSortable: false
                            },
                            {
                                name: "Data",
                                keyData: "dtCadastro",
                                isSortable: true,
                                formatToDate: true
                            }
                        ]}
                        showPagination
                        showSearchField={false}
                        showSelectNumberOfRows={false}
                    />
                </S.Section>

                <S.ButtonContainer>
                    <S.ConfirmButton type='submit' disabled={isLoadingActObservation || !isValid}>Salvar</S.ConfirmButton>

                    {isLoadingActObservation && (
                        <S.LoadingSpinner />
                    )}
                </S.ButtonContainer>

            </S.Form>
        </BaseModalV2>
    )
}
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { SubmitRegistrarObservacaoEmLote } from "./registrar-observacao-em-lote.interface";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import toast from "react-hot-toast";
import { PostActObservationV2 } from "../../../../../../../../../api/services/actObservations/actObservations";
import { BaseModal } from "../../../../../../../../../components/BaseModal";
import * as S from './styled';
import { Eye, EyeSlash } from "phosphor-react";

export const RegistrarObservacaoEmLote = () => {
    const [isOpenModal, setOpenModal] = useState(false);
    const [showSelectedProcess, setShowSelectedProcess] = useState(false);
    const { user, selectedProcessoInActionDataTable, setSelectedProcessoInActionDataTable, setSelectedRowHashes } = SharedState();
    const queryClient = useQueryClient();
    const {
        reset,
        handleSubmit,
        register,
        formState: { isValid }
    } = useForm<SubmitRegistrarObservacaoEmLote>({
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
            queryClient.invalidateQueries(`actObservation-${res.data.idAto}`);
            reset({ txObservacao: "" });
            if (selectedProcessoInActionDataTable.length > 0) {
                setSelectedProcessoInActionDataTable([])
                setSelectedRowHashes([]);
            };
            setOpenModal(false);
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

    const onSubmit: SubmitHandler<SubmitRegistrarObservacaoEmLote> = async (params) => {
        selectedProcessoInActionDataTable.forEach((p) => {
            mutateActObservation({
                idAto: p.id,
                txObservacao: params.txObservacao,
                idUsuarioCadastro: user["Jvris.User.Id"],
            });
        })
    };


    return (
        <>
            <BaseModal title='Registro de observação do ato' isOpenModal={isOpenModal} setOpenModal={setOpenModal} >
                <S.Form onSubmit={handleSubmit(onSubmit)}>
                    <S.Section>
                        <S.SectionTitle>Número dos processos ({selectedProcessoInActionDataTable.length})
                            <S.ContainerShowProcessNumber onClick={() => setShowSelectedProcess(!showSelectedProcess)}>
                                {showSelectedProcess ? <Eye size={20} /> : <EyeSlash size={20} />}
                            </S.ContainerShowProcessNumber>
                        </S.SectionTitle>

                        <S.SelectedProcessNumberContainer isOpen={showSelectedProcess}>
                            {selectedProcessoInActionDataTable.map((p) => (
                                <S.SelectedProcessNumber>{p.txNumero}</S.SelectedProcessNumber>
                            ))}
                        </S.SelectedProcessNumberContainer>

                    </S.Section>

                    <S.Section>
                        <S.SectionTitle>Observação</S.SectionTitle>

                        <S.TextArea {...register("txObservacao", {
                            required: true,
                        })} placeholder='Escreva aqui...' />
                    </S.Section>

                    <S.ButtonContainer>
                        <S.ConfirmButton type='submit' disabled={isLoadingActObservation || !isValid}>Salvar</S.ConfirmButton>

                        {isLoadingActObservation && (
                            <S.LoadingSpinner />
                        )}
                    </S.ButtonContainer>

                </S.Form>
            </BaseModal>
            <S.Button onClick={() => setOpenModal(true)}>Registrar observação</S.Button>
        </>

    )
}
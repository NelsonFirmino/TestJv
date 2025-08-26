import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitAlterarPrazoEmLote } from "./alterar-prazo-em-lote.interface";
import * as S from './styled'
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { useMutation, useQueryClient } from "react-query";
import { PutActTime } from "../../../../../../../../../api/services/acts/acts";
import toast from "react-hot-toast";
import { BaseModal } from "../../../../../../../../../components/BaseModal";
import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";

export const AlterarPrazoEmLote = () => {
    const [isOpenModal, setOpenModal] = useState(false);
    const [showSelectedProcess, setShowSelectedProcess] = useState(false);
    const { user, selectedUser, selectedProcessoInActionDataTable, setSelectedProcessoInActionDataTable, setSelectedRowHashes } = SharedState();
    const defaultDate = new Date().toISOString().substring(0, 10);
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        register,
        formState: { isValid }
    } = useForm<SubmitAlterarPrazoEmLote>({
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
    })

    const onSubmit: SubmitHandler<SubmitAlterarPrazoEmLote> = async (params) => {
        selectedProcessoInActionDataTable.forEach((p) => {
            mutatePutActTime({
                idAto: p.id,
                dtPrazo: params.dtPrazo,
            })
        })
    }

    return (
        <>
            <BaseModal title='Alterar prazo' isOpenModal={isOpenModal} setOpenModal={setOpenModal} >
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
                        <S.SectionTitle>Novo prazo</S.SectionTitle>
                        <S.InputDate {...register("dtPrazo", {
                            required: true,
                        })} defaultValue={defaultDate} type="date" />
                    </S.Section>

                    <S.ButtonContainer>
                        <S.ConfirmButton type='submit' disabled={isLoadingPutActTime || !isValid}>Salvar</S.ConfirmButton>

                        {isLoadingPutActTime && (
                            <S.LoadingSpinner />
                        )}
                    </S.ButtonContainer>
                </S.Form>
            </BaseModal>

            <S.Button onClick={() => setOpenModal(true)}>Alterar prazo</S.Button>
        </>

    )
}
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SubmitAlterarRelevanciaEmLote } from "./alterar-relevancia-em-lote.interface";
import toast from "react-hot-toast";
import { PutProcessRelevance } from "../../../../../../../../../api/services/process/process";
import { PutActRelevance } from "../../../../../../../../../api/services/acts/acts";
import { BaseModal } from "../../../../../../../../../components/BaseModal";
import * as S from './styled';
import { Eye, EyeSlash } from "phosphor-react";
import { useProcessRelevance } from "../../../../../../../../../hooks/useProcessRelevance";

export const AlterarRelevanciaEmLote = () => {
    const [isProcess, setIsProcess] = useState(false);
    const [isAto, setIsAto] = useState(false);
    const [isUrgente, setIsUrgente] = useState(false);
    const [isOpenModal, setOpenModal] = useState(false);
    const { processRelevanceList, loadingProcessRelevanceResponseList } =
        useProcessRelevance();
    const [showSelectedProcess, setShowSelectedProcess] = useState(false);
    const { user, selectedUser, selectedProcessoInActionDataTable, setSelectedProcessoInActionDataTable, setSelectedRowHashes } = SharedState();
    const queryClient = useQueryClient();
    const {
        reset,
        control,
        handleSubmit,
        register,
        formState: { isValid }
    } = useForm<SubmitAlterarRelevanciaEmLote>({
        mode: "onChange",
    });

    const { mutate: mutateProcessRelevance, isLoading: isLoadingProcessRelevance } = useMutation(PutProcessRelevance, {
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
            setIsAto(false);
            setIsProcess(false);
            reset({ tipoRelevancia: null });
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

    const { mutate: mutateActRelevance, isLoading: isLoadingActRelevance } = useMutation(PutActRelevance, {
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
            setIsAto(false);
            setIsProcess(false);
            reset({ tipoRelevancia: null });
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

    const onSubmit: SubmitHandler<SubmitAlterarRelevanciaEmLote> = async (params) => {
        if (params?.isProcess) {
            selectedProcessoInActionDataTable.forEach((p) => {
                mutateProcessRelevance({
                    idProcesso: p.idProcesso,
                    txRelevancia: params.tipoRelevancia.value,
                })
            })
        }

        if (params?.isAto) {
            selectedProcessoInActionDataTable.forEach((p) => {
                mutateActRelevance({
                    idAto: p.id,
                    isUrgente: params.isUrgente,
                })
            })
        }
    };

    return (
        <>
            <BaseModal title='Alterar relevância' isOpenModal={isOpenModal} setOpenModal={setOpenModal} >
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
                        <S.SectionTitle>Alterar relevância?</S.SectionTitle>
                        <S.ContainerRadioButton>
                            <S.ContentRadioButton>
                                <S.RadioButtonLabel value={isProcess} >
                                    {isProcess ? "SIM" : "NÃO"}
                                </S.RadioButtonLabel>

                                <S.ToggleButton
                                    {...register("isProcess")}
                                    checked={isProcess}
                                    onChange={() => setIsProcess(!isProcess)}
                                />
                            </S.ContentRadioButton>
                        </S.ContainerRadioButton>
                    </S.Section>

                    {isProcess && (
                        <S.Section>
                            <S.SectionTitle>Nova relevância do processo</S.SectionTitle>
                            <Controller
                                control={control}
                                {...register("tipoRelevancia")}
                                render={({ field }) => (
                                    <S.CustomSelect
                                        isClearable={false}
                                        options={processRelevanceList}
                                        isLoading={loadingProcessRelevanceResponseList}
                                        {...field}
                                    />)}
                            />
                        </S.Section>
                    )}

                    <S.Section>
                        <S.SectionTitle>Ato</S.SectionTitle>
                        <S.ContainerRadioButton>
                            <S.ContentRadioButton>
                                <S.RadioButtonLabel value={isAto} >
                                    {isAto ? "SIM" : "NÃO"}
                                </S.RadioButtonLabel>

                                <S.ToggleButton
                                    {...register("isAto")}
                                    checked={isAto}
                                    onChange={() => setIsAto(!isAto)}
                                />
                            </S.ContentRadioButton>
                        </S.ContainerRadioButton>
                    </S.Section>

                    {isAto && (
                        <S.Section>
                            <S.SectionTitle>Urgente</S.SectionTitle>
                            <S.ContainerRadioButton>
                                <S.ContentRadioButton>
                                    <S.RadioButtonLabel value={isUrgente} >
                                        {isUrgente ? "SIM" : "NÃO"}
                                    </S.RadioButtonLabel>

                                    <S.ToggleButton
                                        {...register("isUrgente")}
                                        checked={isUrgente}
                                        onChange={() => setIsUrgente(!isUrgente)}
                                    />
                                </S.ContentRadioButton>
                            </S.ContainerRadioButton>
                        </S.Section>
                    )}

                    <S.ButtonContainer>
                        <S.ConfirmButton type='submit' disabled={isLoadingProcessRelevance || isLoadingActRelevance || !isValid || (!isProcess && !isAto)}>
                            Salvar
                        </S.ConfirmButton>

                        {isLoadingProcessRelevance || isLoadingActRelevance && (
                            <S.LoadingSpinner />
                        )}
                    </S.ButtonContainer>

                </S.Form>
            </BaseModal>
            <S.Button onClick={() => setOpenModal(true)}>Alterar relevância</S.Button>
        </>
    );
}
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { AnexosAtoProps, SubmitAnexoAto } from "./anexos-ato.interface";
import { BaseModalV2 } from "../../../../../../../../../components/BaseModalV2";
import * as S from './styled';
import { useActAttachments } from "../../../../../../../../../hooks/useActAttachments";
import { CustomTable } from "../../../../../../../../../components/CustomTable";
import { Acoes } from "./components/Acoes";
import { ChangeEvent, useState } from "react";
import { getBase64 } from "../../../../../../../../../utils/getBase64.util";
import toast from "react-hot-toast";
import { postActAttachmentsById } from "../../../../../../../../../api/services/acts/acts";

export const AnexosAto = ({ idAto, txNumeroProcesso, keyStateOpenModal, setKeyStateOpenModal, keyString }: AnexosAtoProps) => {
    const { actAttachments, isLoadingActAttachments } = useActAttachments(idAto.toString());
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { user } = SharedState();
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        formState: { isValid },
        register,
        reset,
    } = useForm<SubmitAnexoAto>({
        mode: "onChange",
    });

    const { mutate: mutatePostActAttachmentsById, isLoading: isLoadingPostActAttachmentsById } = useMutation(postActAttachmentsById, {
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
            queryClient.invalidateQueries(`actAttachments-${idAto}`);
            setSelectedFile(null);
            reset({ anexo: null });
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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (
            e.target.files &&
            e.target.files.length > 0 &&
            e.target.files[0].size <= 15 * 1024 * 1024
        ) {
            setSelectedFile(e.target.files[0]);
            return;
        } else if (e.target.files && e.target.files.length > 0) {
            alert(
                "O arquivo é muito grande! Por favor, selecione um arquivo de até 15MB."
            );
            e.target.value = "";
            setSelectedFile(null);
            return;
        } else {
            setSelectedFile(null);
            return;
        }
    };

    const onSubmit: SubmitHandler<SubmitAnexoAto> = async (params) => {
        if (selectedFile) {
            const file_stream = await getBase64(selectedFile);
            const name = selectedFile.name;
            mutatePostActAttachmentsById({
                file_stream: file_stream.toString(),
                name,
                idUsuarioCadastro: user["Jvris.User.Id"],
                idAto,
            });
            setSelectedFile(null);
        }
    };

    return (
        <BaseModalV2 title='Anexos do ato'
            keyStateOpenModal={keyStateOpenModal}
            setKeyStateOpenModal={setKeyStateOpenModal}
            keyString={keyString}>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
                <S.Section>
                    <S.SectionTitle>Número do Processo</S.SectionTitle>
                    <S.Text>{txNumeroProcesso}</S.Text>
                </S.Section>

                <S.Section>
                    <S.SectionTitle>Adicionar anexo</S.SectionTitle>

                    <S.AttachmentsInput
                        id="file-input"
                        type="file"
                        accept=".pdf, .xlsx, .xls"
                        {...register("anexo")}
                        onChange={(e) => {
                            handleFileChange(e);
                        }} />
                </S.Section>

                <S.Section>
                    <S.SectionTitle>Anexos</S.SectionTitle>

                    <CustomTable
                        isLoading={isLoadingActAttachments}
                        data={actAttachments?.data ? actAttachments.data : []}
                        columns={[
                            {
                                name: "Descrição",
                                keyData: "txDescricao",
                                isSortable: false,
                                breakTextOnFirstColumn: true,
                            },
                            {
                                name: "Data de cadastro",
                                keyData: "dtCadastro",
                                formatToDate: true,
                                isSortable: true,
                            },
                            {
                                name: "",
                                isSortable: false,
                                keyData: "fake123",
                                component: {
                                    element: (data) => <Acoes dataTable={data} attachmentIdKeyCacheRevalidate={idAto.toString()} />,
                                    isButton: true
                                },

                            }
                        ]}
                        showPagination
                        showSearchField={false}
                        showSelectNumberOfRows={false}
                    />
                </S.Section>

                <S.ButtonContainer>
                    <S.ConfirmButton type='submit' disabled={isLoadingPostActAttachmentsById || !isValid || !selectedFile}>Adicionar</S.ConfirmButton>

                    {isLoadingPostActAttachmentsById && (
                        <S.LoadingSpinner />
                    )}
                </S.ButtonContainer>
            </S.Form>
        </BaseModalV2>
    )

}
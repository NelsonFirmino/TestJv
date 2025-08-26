import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { BaseModal } from "../../../../../../components/BaseModal";
import { CustomTable } from "../../../../../../components/CustomTable";
import {
    HotToastError,
    HotToastSucess
} from "../../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../../context/SharedContext";
import { getBase64 } from "../../../../../../utils/getBase64.util";
import { openOctetStreamInNewTab } from "../../../../../../utils/openOctetStreamInNewTab.util";
import {
    deleteAnexoImoveis,
    getPatriAnexos,
    posAnexoImoveis
} from "../../apiHooks/usePatrimonios";
import { PatrimonioI } from "../../interfaces";
import * as S from "./styled";

export interface AnexosProps {
    idAto: number;
    txNumeroProcesso: string;
    keyStateOpenModal: string | false;
    keyString: string | false;
    setKeyStateOpenModal: Dispatch<SetStateAction<string | false>>;
}

export interface SubmitAnexo {
    anexo: any;
}

interface ModalProps {
    isOpenModal: boolean;
    setOpenModal: (value: boolean) => void;
    clikedData?: PatrimonioI;
}

export const Anexos = ({
    isOpenModal,
    setOpenModal,
    clikedData
}: ModalProps) => {
    if (!clikedData) return null;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { user } = SharedState();
    const [patriAnexos, setPatriAnexos] = useState<any[]>([]);
    const [loadPatrimonioAnexos, setLoadPatrimonioAnexos] =
        useState<boolean>(false);
    const seedAnexos = () => {
        //console.log(clikedData);
        if (clikedData.id) {
            setLoadPatrimonioAnexos(true);
            getPatriAnexos(clikedData.id)
                .then((data) => {
                    setPatriAnexos(data.data);
                    setLoadPatrimonioAnexos(false);
                })
                .catch((error) => {
                    setLoadPatrimonioAnexos(false);
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        seedAnexos();
    }, [clikedData]);
    const {
        handleSubmit,
        formState: { isValid },
        register,
        reset
    } = useForm<SubmitAnexo>({
        mode: "onChange"
    });

    const { mutate: mutatePost, isLoading: isLoadingPost } = useMutation(
        posAnexoImoveis,
        {
            onSuccess: (res) => {
                HotToastSucess(res.message);
                setSelectedFile(null);
                reset({ anexo: null });
            },
            onError: (error: Error) => {
                HotToastError(error?.message);
            }
        }
    );

    const { mutate: deleteAnexo } = useMutation(deleteAnexoImoveis, {
        onSuccess: (res) => {
            HotToastSucess(res.message);
            setSelectedFile(null);
            reset({ anexo: null });
            seedAnexos();
        },
        onError: (error: Error) => {
            HotToastError(error?.message);
        }
    });

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

    const onSubmit: SubmitHandler<SubmitAnexo> = async (params) => {
        if (selectedFile && clikedData.id) {
            const file_stream = await getBase64(selectedFile);
            const name = selectedFile.name;

            mutatePost(
                {
                    file_stream: file_stream.toString(),
                    name,
                    idImovel: clikedData.id,
                    idUsuarioCadastro: +user["Jvris.User.Id"],
                    txTipoArquivo: selectedFile.type
                },
                {
                    onSuccess: () => {
                        seedAnexos();
                    }
                }
            );
            setSelectedFile(null);
        }
    };

    return (
        <BaseModal
            title="Anexos"
            isOpenModal={isOpenModal}
            setOpenModal={setOpenModal}
        >
            <S.Form onSubmit={handleSubmit(onSubmit)}>
                <S.Section>
                    <S.SectionTitle>Número do Processo</S.SectionTitle>
                    <S.Text>{clikedData.id}</S.Text>
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
                        }}
                    />
                </S.Section>

                <S.Section>
                    <S.SectionTitle>Anexos</S.SectionTitle>

                    <CustomTable
                        isLoading={loadPatrimonioAnexos}
                        data={patriAnexos || []}
                        columns={[
                            {
                                name: "Anexo",
                                keyData: "name",
                                isSortable: false,
                                breakTextOnFirstColumn: true
                            },
                            {
                                name: "Data de cadastro",
                                keyData: "dtCadastro",
                                formatToDate: true,
                                isSortable: true
                            },
                            {
                                name: "",
                                isSortable: false,
                                keyData: "fake123",
                                component: {
                                    element: (data) => (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row"
                                            }}
                                        >
                                            <S.ActionButton
                                                onClick={() =>
                                                    openOctetStreamInNewTab(
                                                        data.file_stream,
                                                        data.name
                                                    )
                                                }
                                            >
                                                <S.DownloadIcon alt="Ver anexo" />
                                            </S.ActionButton>
                                            <S.ActionButton
                                                onClick={() => {
                                                    deleteAnexo(data.id);
                                                }}
                                            >
                                                <S.InfoObservationIcon alt="Remover anexo" />
                                            </S.ActionButton>
                                        </div>
                                    ),
                                    isButton: true
                                }
                            }
                        ]}
                        showPagination
                        showSearchField={false}
                        showSelectNumberOfRows={false}
                    />
                </S.Section>

                <S.ButtonContainer>
                    <S.ConfirmButton
                        type="submit"
                        disabled={isLoadingPost || !isValid || !selectedFile}
                    >
                        Adicionar
                    </S.ConfirmButton>

                    {isLoadingPost && <S.LoadingSpinner />}
                </S.ButtonContainer>
            </S.Form>
        </BaseModal>
    );
};

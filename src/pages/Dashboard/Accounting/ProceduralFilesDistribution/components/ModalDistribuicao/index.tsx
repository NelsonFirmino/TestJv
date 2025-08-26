import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useContadoresService from "../../../../../../api/services/contadores";
import { postDistribuicaoDCJE } from "../../../../../../api/services/distribuicaoDCJE/distribuicaoDCJE";
import { CustomTable } from "../../../../../../components/CustomTable";
import {
    HotToastError,
    HotToastSucess
} from "../../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../../context/SharedContext";
import theme from "../../../../../../globalStyle/theme";
import { ModalDistProps } from "./modaldevolucao.interface";
import * as S from "./styled";

export const ModalDistribuicao = ({
    setShowModalDevolucao: setShowModalDist
}: ModalDistProps) => {
    const { selectedDataTable, user } = SharedState();

    const {
        register,
        handleSubmit,
        control,
        formState: { isValid, errors }
    } = useForm<ModalDistProps>({
        mode: "onChange"
    });

    const handleCancel = () => {
        setShowModalDist(null);
    };

    const { getContadores, contadores } = useContadoresService();

    useEffect(() => {
        getContadores();
    }, []);

    const onSubmit: SubmitHandler<ModalDistProps> = async (data: any) => {
        try {
            selectedDataTable.forEach(async (processo) => {
                const res = await postDistribuicaoDCJE({
                    idFichaProcessual: processo.idFichaProcessual,
                    idContador: data.idContador.value,
                    idUsuarioCadastro: parseInt(user["Jvris.User.Id"])
                });
            });
            HotToastSucess(`Processos distribuídos com sucesso.`);
            setShowModalDist(false);
        } catch {
            HotToastError(`Erro ao distribuir processos.`);
        }
    };

    const [showProcessos, setShowProcessos] = useState(false);
    const [idContador, setIdContador] = useState<number | undefined>(undefined);

    return (
        <>
            <S.Wrapper>
                <S.Modal>
                    <S.TitleContainer>
                        <S.TitleModal>DEVOLUÇÃO DE FICHA</S.TitleModal>
                        <S.CloseModal onClick={handleCancel}>
                            Fechar
                        </S.CloseModal>
                    </S.TitleContainer>
                    <S.ContainerForm>
                        <S.Form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <S.SelectedProcsWrapper
                                    onClick={() =>
                                        setShowProcessos(!showProcessos)
                                    }
                                >
                                    <S.FieldTitle
                                        onClick={() =>
                                            setShowProcessos(!showProcessos)
                                        }
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    >{`${selectedDataTable.length} Processo(s) Selecionado(s)`}</S.FieldTitle>
                                </S.SelectedProcsWrapper>
                                {showProcessos && (
                                    <CustomTable
                                        columns={[
                                            {
                                                isSortable: true,
                                                keyData: "idFichaProcessual",
                                                name: "Nº da Ficha Processual"
                                            },
                                            {
                                                isSortable: true,
                                                keyData: "txNumeroFormatado",
                                                name: "Número do Processo"
                                            }
                                        ]}
                                        data={selectedDataTable}
                                        isLoading={false}
                                        showPagination
                                        showSearchField
                                        showSelectNumberOfRows={false}
                                    />
                                )}
                            </div>
                            <S.ContainerField>
                                <S.FieldTitle>Contadores: *</S.FieldTitle>
                                <Controller
                                    name="idContador"
                                    control={control}
                                    render={({ field }) => (
                                        <S.CustomSelect
                                            menuPosition="fixed"
                                            placeholder="Selecione um contador"
                                            isLoading={contadores.length === 0}
                                            options={contadores.map(
                                                (contador) => ({
                                                    value: contador.id,
                                                    label: contador.txContador
                                                })
                                            )}
                                            required={true}
                                            isClearable={true}
                                            onChange={(e: any) =>
                                                setIdContador(e?.value)
                                            }
                                            {...field}
                                        />
                                    )}
                                />
                            </S.ContainerField>

                            <S.ContainerSubmitButton>
                                <S.SubmitButton disabled={!isValid}>
                                    Executar Distribuição
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
                        </S.Form>
                    </S.ContainerForm>
                </S.Modal>
            </S.Wrapper>
        </>
    );
};

import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getErgonRubricasAutoComplete } from "../../../../../../api/services/ergonrubricas/ergonRubricas";
import {
    postReasonsRequests,
    putReasonsRequestsByID
} from "../../../../../../api/services/reasonsRequests/reasonsRequests";
import {
    getReasonsRequestsRubricByRazaoPedido,
    postReasonsRequestsRubric
} from "../../../../../../api/services/reasonsRequestsRubrics/reasonsRequestsRubrics";
import { CustomTable } from "../../../../../../components/CustomTable";
import { SharedState } from "../../../../../../context/SharedContext";
import theme from "../../../../../../globalStyle/theme";
import { ModalAddProps } from "./modaladd.interface";
import { ModalRemove } from "./ModalRemove";
import * as S from "./styled";

export const ModalAdd = ({
    setShowModalAdd: setShowModalAdd,
    id,
    txRazaoPedido,
    txInformacao
}: ModalAddProps) => {
    const { user } = SharedState();
    const [rubricId, setRubricId] = useState<number>(0);
    const [showModalRemove, setShowModalRemove] = useState(null);
    const [reasonsRequestsRubricList, setReasonsRequestsRubricList] = useState(
        []
    );

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { isValid, errors }
    } = useForm<ModalAddProps>({
        mode: "onChange"
    });

    useEffect(() => {
        if (id > 0) {
            getReasonsRequestsRubricByRazaoPedido({ id }).then((response) => {
                setReasonsRequestsRubricList(response.data);
            });
        }
    }, [id]);

    useEffect(() => {
        if (showModalRemove == false) {
            getReasonsRequestsRubricByRazaoPedido({ id }).then((response) => {
                setReasonsRequestsRubricList(response.data);
                resetStates();
            });
        }
    }, [showModalRemove]);

    const resetStates = () => {
        setShowModalRemove(null);
    };

    const handleToast = (
        msg: string,
        error: boolean = false,
        setModal: boolean = true
    ) => {
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
        if (setModal) setShowModalAdd(false);
    };

    const toastReasonsRequestsError = () => {
        handleToast(
            "Erro ao Tentar Adicionar Razão para Pedido, tente novamente!",
            true
        );
    };
    const toastReasonsRequestsRubricError = () => {
        handleToast("Erro ao Tentar Adicionar Rubrica, tente novamente!", true);
    };

    const loadOptions = (inputValue: string, callback: any) => {
        if (!inputValue || inputValue.length < 3) {
            callback(null);
        } else {
            getErgonRubricasAutoComplete({ txRubrica: inputValue }).then(
                (response) => {
                    const autocompleteList = response?.data
                        ? response.data.map((atc) => ({
                              label: atc.txRubrica,
                              value: atc.id
                          }))
                        : [];
                    callback(autocompleteList);
                }
            );
        }
    };

    const handleCancel = () => {
        setShowModalAdd(null);
    };

    const onSubmit: SubmitHandler<ModalAddProps> = async (data: any) => {
        if (!id) {
            postReasonsRequests({
                txRazaoPedido: data.txRazaoPedido,
                txInformacao: data.txInformacao,
                idUsuarioCadastro: +user["Jvris.User.Id"]
            })
                .then((responseReasonsRequests: any) => {
                    if (responseReasonsRequests.status == "Created") {
                        handleToast("Razão para Pedido Adicionada com Sucesso");
                        if (data.idRubrica) {
                            postReasonsRequestsRubric({
                                idErgonRubrica: data.idRubrica.value,
                                idRazaoPedido: responseReasonsRequests.data.id
                            })
                                .then((responseReasonsRequestsRubric: any) => {
                                    if (
                                        responseReasonsRequestsRubric.status ==
                                        "Created"
                                    ) {
                                        handleToast(
                                            "Rubrica Adicionada com Sucesso"
                                        );
                                    } else {
                                        toastReasonsRequestsRubricError();
                                    }
                                })
                                .catch((e) => {
                                    toastReasonsRequestsRubricError();
                                });
                        }
                    } else {
                        toastReasonsRequestsError();
                    }
                })
                .catch((e) => {
                    toastReasonsRequestsError();
                });
        } else if (id > 0) {
            putReasonsRequestsByID({
                id: id,
                txRazaoPedido: data.txRazaoPedido,
                txInformacao: data.txInformacao,
                idUsuarioCadastro: +user["Jvris.User.Id"]
            })
                .then((responseRR: any) => {
                    if (responseRR.status == "OK") {
                        if (data.idRubrica) {
                            handleToast(
                                "Razão para Pedido Atualizada com Sucesso",
                                false,
                                false
                            );
                            postReasonsRequestsRubric({
                                idErgonRubrica: data.idRubrica.value,
                                idRazaoPedido: id
                            })
                                .then((responseReasonsRequestsRubric: any) => {
                                    if (
                                        responseReasonsRequestsRubric.status ==
                                        "Created"
                                    ) {
                                        handleToast(
                                            "Rubrica Adicionada com Sucesso",
                                            false,
                                            false
                                        );
                                        setValue("idRubrica", null);
                                        setShowModalRemove(false);
                                    } else {
                                        toastReasonsRequestsRubricError();
                                    }
                                })
                                .catch((e) => {
                                    toastReasonsRequestsRubricError();
                                });
                        } else {
                            handleToast(
                                "Razão para Pedido Atualizada com Sucesso"
                            );
                        }
                    } else {
                        toastReasonsRequestsError();
                    }
                })
                .catch((e) => {
                    toastReasonsRequestsError();
                });
        }
    };

    return (
        <>
            {showModalRemove && (
                <ModalRemove
                    setShowModalRemove={setShowModalRemove}
                    id={rubricId}
                />
            )}

            <S.Wrapper>
                <S.Modal>
                    <S.TitleContainer>
                        <S.TitleModal>
                            {id
                                ? "Editar Razão para Pedido"
                                : "Adicionar Nova Razão para Pedido"}
                        </S.TitleModal>
                        <S.CloseModal onClick={handleCancel}>
                            Fechar
                        </S.CloseModal>
                    </S.TitleContainer>
                    <S.ContainerForm>
                        <S.Form onSubmit={handleSubmit(onSubmit)}>
                            <S.ContainerField>
                                <S.FieldTitle>Razão para Pedido *</S.FieldTitle>
                                <S.TextInput
                                    defaultValue={txRazaoPedido}
                                    placeholder="Digite aqui a Razão para Pedido"
                                    {...register("txRazaoPedido", {
                                        maxLength: 56,
                                        minLength: 3,
                                        required: true
                                    })}
                                />
                            </S.ContainerField>
                            <S.ContainerField>
                                <S.FieldTitle>Informações</S.FieldTitle>
                                <S.TextAreaInput
                                    defaultValue={txInformacao}
                                    placeholder="Digite aqui as informações da Razão para Pedido"
                                    {...register("txInformacao")}
                                />
                            </S.ContainerField>
                            <S.ContainerField>
                                <S.FieldTitle>Rubrica</S.FieldTitle>
                                <Controller
                                    name="idRubrica"
                                    control={control}
                                    render={({ field }) => (
                                        <S.CustomAutocomplete
                                            menuPosition="fixed"
                                            placeholder="Digite no mínimo 3 digitos iniciais"
                                            cacheOptions={true}
                                            loadOptions={loadOptions}
                                            defaultOptions
                                            noOptionsMessage={() =>
                                                "Rubrica não encontrada"
                                            }
                                            isClearable
                                            {...field}
                                        />
                                    )}
                                />
                            </S.ContainerField>
                            <S.ContainerSubmitButton>
                                <S.SubmitButton disabled={!isValid}>
                                    Salvar
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
                        {reasonsRequestsRubricList?.length > 0 && (
                            <S.TableWrapper style={{ paddingTop: "2rem" }}>
                                <CustomTable
                                    columns={[
                                        {
                                            isSortable: true,
                                            keyData: "txErgonRubrica",
                                            name: "Rubrica",
                                            breakTextOnFirstColumn: true
                                        },
                                        {
                                            isSortable: false,
                                            keyData: "fake123",
                                            name: "",
                                            component: {
                                                element: (item) => (
                                                    <S.Button
                                                        hoverColor={
                                                            theme.colors.softRed
                                                        }
                                                        onClick={() => {
                                                            setRubricId(
                                                                item.id
                                                            );
                                                            setShowModalRemove(
                                                                !showModalRemove
                                                            );
                                                        }}
                                                    >
                                                        <X
                                                            color="white"
                                                            weight="bold"
                                                            size={20}
                                                        />
                                                    </S.Button>
                                                ),
                                                isButton: true
                                            }
                                        }
                                    ]}
                                    data={reasonsRequestsRubricList}
                                    isLoading={false}
                                    showPagination={false}
                                    showSearchField={false}
                                    showSelectNumberOfRows={false}
                                />
                            </S.TableWrapper>
                        )}
                    </S.ContainerForm>
                </S.Modal>
            </S.Wrapper>
        </>
    );
};

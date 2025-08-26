import { useEffect, useState } from "react";
import { BaseModal } from "../../../../../../components/BaseModal";
import {
    HotToastError,
    HotToastSucess,
    HotToastWarning
} from "../../../../../../components/HotToastFuncs";
import { atualizarPatrimonioStatus } from "../../apiHooks/usePatrimonios";
import { PatrimonioI } from "../../interfaces";
import * as S from "../../styled";

interface AtivarDesativarModalProps {
    isOpenModal: boolean;
    setOpenModal: (value: boolean) => void;
    clikedData?: PatrimonioI;
}

const AtivarDesativarModal = ({
    clikedData,
    isOpenModal,
    setOpenModal
}: AtivarDesativarModalProps) => {
    if (!clikedData) return null;
    const [nAto, setNAto] = useState<string>("");
    const [nProcessoSEI, setnProcessoSEI] = useState<string>("");
    const [motivo, setMotivo] = useState<string>("");

    const clearFields = () => {
        setNAto("");
        setnProcessoSEI("");
        setMotivo("");
    };

    useEffect(() => {
        if (!isOpenModal) {
            clearFields();
        }
    }, [isOpenModal]);

    useEffect(() => {
        if (clikedData) {
            setMotivo(clikedData.dadosAdicionais.txMotivo);
        }
    }, [clikedData, isOpenModal]);

    const submit = () => {
        //validate all fields
        if (!nProcessoSEI) return;

        if (!nAto || !motivo) {
            HotToastWarning("Preencha todos os campos");
            return;
        }
        //call api
        atualizarPatrimonioStatus({
            id: clikedData?.id,
            idAto: parseInt(nAto),
            txMotivo: motivo,
            txProcessoSei: parseInt(nProcessoSEI),
            isAtivo: !clikedData?.isAtivo
        })
            .then((res) => {
                console.log("res", res);
                if (res.status === "OK") {
                    HotToastSucess("Patrimônio atualizado com sucesso");
                    setOpenModal(false);
                } else {
                    HotToastError(
                        `Erro ao atualizar patrimônio: ${res.message}`
                    );
                }
            })
            .catch((err) => {
                HotToastError(`Erro ao atualizar patrimônio: ${err}`);
            });
    };

    return (
        <BaseModal
            title={clikedData?.isAtivo ? "Desativar" : "Ativar"}
            isOpenModal={isOpenModal}
            setOpenModal={setOpenModal}
        >
            <S.ContainerForm>
                <S.FieldValueContainer>
                    <S.Label>Motivo:</S.Label>
                    <S.TextArea
                        onChange={(e) => setMotivo(e.target.value)}
                        value={motivo}
                    />
                </S.FieldValueContainer>
                <S.FieldValueContainer>
                    <S.Label>Nº do Ato:</S.Label>
                    <S.TextInput
                        onChange={(e) => setNAto(e.target.value)}
                        value={nAto}
                        type="number"
                    />
                </S.FieldValueContainer>
                <S.FieldValueContainer>
                    <S.Label>Nº do processo SEI:</S.Label>
                    <S.TextInput
                        onChange={(e) => {
                            //mask to xxxxxxxx.xxxxxx/xxxx-xx
                            let value = e.target.value;
                            //set limit of characters
                            const onlyNumbers = value.replace(/\D/g, "");
                            if (onlyNumbers.length > 20) {
                                return;
                            }
                            value = value.replace(/\D/g, "");
                            value = value.replace(
                                /(\d{8})(\d{6})(\d{4})(\d{2})/,
                                "$1.$2/$3-$4"
                            );
                            setnProcessoSEI(value);
                        }}
                        value={nProcessoSEI}
                    />
                </S.FieldValueContainer>

                <S.OptionsContainer>
                    <S.OptionAction onClick={submit}>Confirmar</S.OptionAction>
                </S.OptionsContainer>
            </S.ContainerForm>
        </BaseModal>
    );
};

export default AtivarDesativarModal;

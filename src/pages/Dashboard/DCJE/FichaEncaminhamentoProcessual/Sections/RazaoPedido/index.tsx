import { useEffect, useState } from "react";
import { useReasonsRequests } from "../../../../../../hooks/useReasonsRequests";
import { SelectOption } from "../../interfaces";
import * as S from "../../styled";
import useFEPContext from "../../useFEPContext";
const RazaoPedido = () => {
    const {
        inputs: {
            values: { razaoPedido },
            updateInputs
        }
    } = useFEPContext();
    const { reasonsRequestsList, loadingReasonsRequestsList } =
        useReasonsRequests();

    const [currRazao, setCurrRazao] = useState<SelectOption>();

    useEffect(() => {
        const isInitialMount = currRazao == undefined;

        if (razaoPedido && isInitialMount) {
            setCurrRazao(
                reasonsRequestsList?.find(
                    (razao) => razao.value === razaoPedido?.idRazaoPedido
                )
            );
        }
    }, [razaoPedido]);

    return (
        <S.Section>
            <S.TitleSectionContainer>
                <S.TitleSection> Razão do Pedido</S.TitleSection>
            </S.TitleSectionContainer>
            <S.ContentSection>
                <S.ContainerField>
                    <S.FieldTitle>Assunto: *</S.FieldTitle>
                    {currRazao ? (
                        <S.CustomSelect
                            required={true}
                            options={reasonsRequestsList}
                            value={currRazao}
                            placeholder="Selecione o assunto"
                            isClearable={false}
                            onChange={(option) => {
                                setCurrRazao(option as SelectOption);
                                const value = (option as SelectOption).value;
                                //console.log(value);
                                updateInputs({
                                    razaoPedido: {
                                        idRazaoPedido: parseInt(
                                            value.toString()
                                        )
                                    }
                                });
                            }}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
                <S.ContainerField></S.ContainerField>
            </S.ContentSection>
        </S.Section>
    );
};

export default RazaoPedido;

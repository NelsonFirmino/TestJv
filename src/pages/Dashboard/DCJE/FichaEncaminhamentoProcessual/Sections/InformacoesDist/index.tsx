import { useEffect, useState } from "react";
import { useAct } from "../../../../../../hooks/useAct";
import { useAttorneys } from "../../../../../../hooks/useAttorneys";
import { SelectOption } from "../../interfaces";
import * as S from "../../styled";
import useFEPContext from "../../useFEPContext";
import { CalculistaRespOptions } from "./options";

const InformacoesDist = () => {
    const {
        defaultDate,
        actId,
        inputs: {
            values: { informacoesDist },
            updateInputs
        }
    } = useFEPContext();
    const { attorneysList } = useAttorneys();
    const { act } = useAct(actId);

    const [currProcurador, setCurrProcurador] = useState<SelectOption>();
    const [currCalculista, setCurrCalculista] = useState<SelectOption>();

    useEffect(() => {
        const isInitialMount =
            currProcurador == undefined || currCalculista == undefined;

        if (informacoesDist && isInitialMount) {
            setCurrProcurador(
                attorneysList?.find(
                    (adv) => adv.value === informacoesDist?.idProcurador
                )
            );
            setCurrCalculista(
                CalculistaRespOptions.find(
                    (calc) => calc.value === informacoesDist?.txFaseProcessual
                )
            );
        }
    }, [informacoesDist]);

    return (
        <S.Section>
            <S.TitleSectionContainer>
                <S.TitleSection>Informações de Distribuição</S.TitleSection>
            </S.TitleSectionContainer>
            <S.ContentSection>
                <S.ContainerField>
                    <S.FieldTitle>
                        Procurador (a) Responsável: Dr. (a) *
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Preencher com o nome do procurador responsável
                                pela defesa do processo.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {informacoesDist ? (
                        <S.CustomSelect
                            required={true}
                            placeholder="Selecione o(a) procurador(a)"
                            value={currProcurador}
                            options={attorneysList}
                            isClearable={false}
                            onChange={(e: SelectOption) => {
                                setCurrProcurador(e);
                                updateInputs({
                                    informacoesDist: {
                                        idProcurador: parseInt(
                                            e.value.toString()
                                        )
                                    }
                                });
                            }}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>

                <S.ContainerField>
                    <S.FieldTitle>
                        Prazo p/ Procurador (a): *
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Data fatal para a defesa do processo.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {informacoesDist ? (
                        <S.DateContent>
                            <S.DateInput
                                type="date"
                                required={true}
                                max={defaultDate}
                                defaultValue={
                                    informacoesDist?.dtPrazo ||
                                    act?.data?.dtPrazo
                                }
                                onChange={(e) => {
                                    updateInputs({
                                        informacoesDist: {
                                            dtPrazo: e.target.value
                                        }
                                    });
                                }}
                            />
                        </S.DateContent>
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
            </S.ContentSection>

            <S.ContentSection>
                <S.ContainerField>
                    <S.FieldTitle>
                        Calculista Responsável - DCJE: *
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>Marcar conforme o processo.</S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {informacoesDist ? (
                        <S.CustomSelect
                            required={true}
                            placeholder="Digite mais de 5 caracteres"
                            options={CalculistaRespOptions}
                            value={currCalculista}
                            isClearable={false}
                            onChange={(e: SelectOption) => {
                                setCurrCalculista(e);
                                updateInputs({
                                    informacoesDist: {
                                        txFaseProcessual: e.value.toString()
                                    }
                                });
                            }}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>

                <S.ContainerField>
                    <S.FieldTitle>
                        Prazo p/ DCJE: *
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Data para que o processo retorne da DCJE.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {informacoesDist ? (
                        <S.DateContent>
                            <S.DateInput
                                required={true}
                                type="date"
                                defaultValue={informacoesDist?.dtPrazoDCJE}
                                onChange={(e) => {
                                    updateInputs({
                                        informacoesDist: {
                                            dtPrazoDCJE: e.target.value
                                        }
                                    });
                                }}
                            />
                        </S.DateContent>
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
            </S.ContentSection>
        </S.Section>
    );
};

export default InformacoesDist;

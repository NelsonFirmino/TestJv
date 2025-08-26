import { useEffect, useState } from "react";
import { SelectOption } from "../../interfaces";
import * as S from "../../styled";
import useFEPContext from "../../useFEPContext";
import { BaseIncidenciaOpt } from "./options";
const DadosColAutos = () => {
    const {
        defaultDate,
        formatarNumero,
        inputs: {
            values: { dadosColAutos },
            updateInputs
        }
    } = useFEPContext();

    const [currBaseIncidencia, setCurrBaseIncidencia] =
        useState<SelectOption>();

    useEffect(() => {
        const isInitialMount = currBaseIncidencia == undefined;

        if (dadosColAutos && isInitialMount) {
            const base =
                BaseIncidenciaOpt.find(
                    (base) => base.value === dadosColAutos?.txBaseIncidencia
                ) ?? BaseIncidenciaOpt[0];

            setCurrBaseIncidencia(base);
        }
    }, [dadosColAutos]);

    return (
        <S.Section>
            <S.TitleSectionContainer>
                <S.TitleSection>Dados coletados dos autos</S.TitleSection>
            </S.TitleSectionContainer>
            <S.ContentSection>
                <S.ContainerField>
                    <S.FieldTitle>
                        Ajuizamento/Impetração: *
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Data em que o processo inicial/conhecimento teve
                                início.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {dadosColAutos ? (
                        <S.DateContent>
                            <S.DateInput
                                required={true}
                                type="date"
                                value={dadosColAutos.dtAjuizamento}
                            />
                        </S.DateContent>
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
                <S.ContainerField>
                    <S.FieldTitle>
                        Data de Citação/Notificação: *
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Data em que a parte contrária foi citada ou
                                notificada.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {dadosColAutos ? (
                        <S.DateContent>
                            <S.DateInput
                                required={true}
                                type="date"
                                defaultValue={dadosColAutos?.dtCitacao}
                            />
                        </S.DateContent>
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
                <S.ContainerField>
                    <S.FieldTitle>
                        Data do Trânsito em Julgado:
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Data em que a sentença ou acórdão transitou em
                                julgado.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {dadosColAutos ? (
                        <S.DateContent>
                            <S.DateInput
                                type="date"
                                defaultValue={dadosColAutos?.dtTransitoJulgado}
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
                        Honorários de Sucumbência Fixados:
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Valor dos honorários de sucumbências fixados na
                                decisão judicial
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {dadosColAutos ? (
                        <S.TextInput
                            type="text"
                            maxLength={15}
                            value={formatarNumero(
                                dadosColAutos?.vaHonorariosFixos * 100 || null
                            )}

                            //onChange={handleChangeHonorariosFixados}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
            </S.ContentSection>
            <S.ContentSection>
                <S.ContainerField>
                    <S.FieldTitle>
                        Base de Incidência:
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                A base da incidência dos honorários definidos na
                                decisão judicial.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {dadosColAutos ? (
                        <S.CustomSelect
                            placeholder="Digite mais de 5 caracteres"
                            options={BaseIncidenciaOpt}
                            isClearable={false}
                            value={currBaseIncidencia}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
                <S.ContainerField>
                    <S.FieldTitle>
                        Data de Fixação:
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Data da decisão judicial que fixou os honorários
                                de sucumbência.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {dadosColAutos ? (
                        <S.DateContent>
                            <S.DateInput
                                type="date"
                                max={defaultDate}
                                disabled={true}
                                value={dadosColAutos?.txBaseIncidencia}
                            />
                        </S.DateContent>
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
                <S.ContainerField>
                    <S.FieldTitle>
                        Honorários de Sucumbência (%):
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Honorários de sucumbências definidos na decisão
                                judicial.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {dadosColAutos ? (
                        <S.TextInput
                            type="text"
                            maxLength={6}
                            value={formatarNumero(
                                dadosColAutos?.nuHonorariosPercentual * 10000 ||
                                    null
                            )}

                            // onChange={handleChangeHonorarios}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
            </S.ContentSection>
        </S.Section>
    );
};

export default DadosColAutos;

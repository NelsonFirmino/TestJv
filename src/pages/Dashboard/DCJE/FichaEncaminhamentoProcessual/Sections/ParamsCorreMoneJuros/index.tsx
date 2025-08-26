import { Minus, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { SelectI } from "../../../../Requisitorios/interfaces";
import { FichasProcessuaisParametrosCalculo } from "../../interfaces";
import * as S from "../../styled";
import useFEPContext from "../../useFEPContext";
import { IndicesCorreMon, IndicesJurosMora, Tipos } from "./options";
import { AddJurosButton, JurosWrapper } from "./styled";

const Juros = ({
    param,
    index
}: {
    param: Partial<FichasProcessuaisParametrosCalculo>;
    index: number;
}) => {
    const [tipo, setTipo] = useState<SelectI>();
    const [indice, setIndice] = useState<SelectI>(null);
    const [Indices, setIndices] = useState<SelectI[]>([]);
    const { inputs } = useFEPContext();

    useEffect(() => {
        setTipo(Tipos.find((t) => t.value === param.txTipo));
    }, []);

    useEffect(() => {
        console.log("tipo", tipo);
        if (tipo) {
            const Indices =
                tipo.value === "Juros" ? IndicesJurosMora : IndicesCorreMon;
            setIndices(Indices);
            setIndice(Indices.find((i) => i.value === param.txIndice));
        }
    }, [tipo]);

    return (
        <JurosWrapper>
            <Minus
                style={{
                    backgroundColor: "#d1d1d1",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    cursor: "pointer",
                    alignSelf: "flex-end"
                }}
                size={22}
                onClick={() => {
                    const newParams = [...inputs.values.paramsCorreMoneJuros];
                    newParams.splice(index, 1);
                    //setParams(newParams);
                    inputs.forceUpdateInput({
                        paramsCorreMoneJuros: newParams
                    });
                }}
            />
            <S.ContentSection>
                <S.ContainerField>
                    <S.FieldTitle>
                        Tipo
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Termo onde inicia a contagem dos juros de mora.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {Tipos ? (
                        <S.CustomSelect
                            placeholder="Digite mais de 5 caracteres"
                            value={tipo}
                            options={Tipos}
                            isClearable={false}
                            onChange={(e: any) => {
                                const value = e.value;
                                const newParams = [
                                    ...inputs.values.paramsCorreMoneJuros
                                ];
                                newParams[index].txTipo = value;
                                //setParams(newParams);
                                inputs.updateInputs({
                                    paramsCorreMoneJuros: newParams
                                });
                                setTipo(e);
                            }}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
                <S.ContainerField>
                    <S.FieldTitle>
                        Indice
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Tipo da correção monetária definida na decisão
                                judicial.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>

                    {Indices ? (
                        <S.CustomSelect
                            placeholder="Digite mais de 5 caracteres"
                            options={Indices}
                            value={indice}
                            isClearable={false}
                            onChange={(e: any) => {
                                const value = e.value;
                                const newParams = [
                                    ...inputs.values.paramsCorreMoneJuros
                                ];
                                newParams[index].txIndice = value;
                                //// setParams(newParams);
                                inputs.updateInputs({
                                    paramsCorreMoneJuros: newParams
                                });
                                setIndice(e);
                            }}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
                <S.ContainerField>
                    <S.FieldTitle>
                        Observação
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Outras observações acerca dos juros de mora.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    <S.TextInput
                        type="text"
                        maxLength={100}
                        value={param.txObservacao}
                        onChange={(e) => {
                            const value = e.target.value;
                            const newParams = [
                                ...inputs.values.paramsCorreMoneJuros
                            ];
                            newParams[index].txObservacao = value;
                            //// setParams(newParams);
                            inputs.updateInputs({
                                paramsCorreMoneJuros: newParams
                            });
                        }}
                    />
                </S.ContainerField>
            </S.ContentSection>
            <S.ContentSection>
                <S.ContainerField>
                    <S.FieldTitle>
                        Data Inicial
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Data de início da contagem dos juros de mora.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    <S.DateContent>
                        <S.DateInput
                            type="date"
                            defaultValue={param?.dtInicio}
                            onChange={(e) => {
                                const value = e.target.value;
                                const newParams = [
                                    ...inputs.values.paramsCorreMoneJuros
                                ];
                                newParams[index].dtInicio = value;
                                //// setParams(newParams);
                                inputs.updateInputs({
                                    paramsCorreMoneJuros: newParams
                                });
                            }}
                        />
                    </S.DateContent>
                </S.ContainerField>
                <S.ContainerField>
                    <S.FieldTitle>
                        Data Final
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Data de término da contagem dos juros de mora.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    <S.DateContent>
                        <S.DateInput
                            type="date"
                            defaultValue={param?.dtFim}
                            onChange={(e) => {
                                const value = e.target.value;
                                const newParams = [
                                    ...inputs.values.paramsCorreMoneJuros
                                ];
                                newParams[index].dtFim = value;
                                //// setParams(newParams);
                                inputs.updateInputs({
                                    paramsCorreMoneJuros: newParams
                                });
                            }}
                        />
                    </S.DateContent>
                </S.ContainerField>
            </S.ContentSection>
        </JurosWrapper>
    );
};

const ParamsCorreMoneJuros = () => {
    const { fichaDCJE, inputs } = useFEPContext();

    function checkDataInterval(dataIni: string, dataFim: string) {
        //checar sem ja tem uma data igual entre os inputs.values.paramsCorreMoneJuros
    }

    return (
        <S.Section>
            <S.TitleSectionContainer
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <S.TitleSection>
                    Parâmetros de correção monetária e juros de mora
                </S.TitleSection>
            </S.TitleSectionContainer>
            <div
                style={{
                    gap: "1rem",
                    display: "flex",
                    flexWrap: "wrap"
                }}
            >
                {inputs.values.paramsCorreMoneJuros ? (
                    inputs.values.paramsCorreMoneJuros.map((param, index) => (
                        <Juros param={param} index={index} key={index} />
                    ))
                ) : (
                    <S.LoadingSpinner />
                )}
                <AddJurosButton
                    onClick={() => {
                        //create new empty param
                        const newParam: Partial<FichasProcessuaisParametrosCalculo> =
                            {
                                idFichaProcessual: fichaDCJE.id
                            };
                        inputs.updateInputs({
                            paramsCorreMoneJuros: [
                                ...inputs.values.paramsCorreMoneJuros,
                                newParam
                            ]
                        });
                    }}
                >
                    <Plus size={62} />
                </AddJurosButton>
            </div>
        </S.Section>
    );
};

export default ParamsCorreMoneJuros;

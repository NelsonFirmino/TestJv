import * as S from "../../styled";
import useFEPContext from "../../useFEPContext";

const OrientacaoCalc = () => {
    const {
        inputs: {
            values: { orientacaoCalc },
            updateInputs
        }
    } = useFEPContext();

    return (
        <S.Section>
            <S.TitleSectionContainer>
                <S.TitleSection>
                    Orientação sobre o cálculo conforme sentença e/ou acórdão
                </S.TitleSection>
            </S.TitleSectionContainer>
            <S.ContentSection>
                <S.ContainerFieldTextArea>
                    <S.FieldTitle>
                        Descrição do Cálculo: *{" "}
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Parâmetros jurídicos sobre o cálculo.
                            </S.InfoText>
                        </S.InfoContainerField>
                        <S.LettersCounter>
                            {orientacaoCalc?.txOrientacaoCalculo.length} / 10000
                        </S.LettersCounter>
                    </S.FieldTitle>
                    {orientacaoCalc ? (
                        <S.TextAreaInput
                            required={true}
                            minLength={2}
                            maxLength={10000}
                            defaultValue={
                                orientacaoCalc?.txOrientacaoCalculo || ""
                            }
                            placeholder="Digite aqui uma descrição do cálculo de no máximo 10000 caracteres."
                            onChange={(e) => {
                                updateInputs({
                                    orientacaoCalc: {
                                        txOrientacaoCalculo: e.target.value
                                    }
                                });
                            }}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerFieldTextArea>
            </S.ContentSection>

            <S.ContentSection>
                <S.ContainerFieldTextArea>
                    <S.FieldTitle>
                        Informações Complementares:
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>Informações Gerais</S.InfoText>
                        </S.InfoContainerField>
                        <S.LettersCounter>
                            {orientacaoCalc?.txObservacoesGerais?.length} / 2000
                        </S.LettersCounter>
                    </S.FieldTitle>
                    {orientacaoCalc ? (
                        <S.TextAreaInput
                            minLength={2}
                            maxLength={2000}
                            defaultValue={
                                orientacaoCalc?.txObservacoesGerais || ""
                            }
                            placeholder="Digite aqui uma observação de no máximo 2000 caracteres."
                            onChange={(e) => {
                                updateInputs({
                                    orientacaoCalc: {
                                        txObservacoesGerais: e.target.value
                                    }
                                });
                            }}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerFieldTextArea>
            </S.ContentSection>
        </S.Section>
    );
};

export default OrientacaoCalc;

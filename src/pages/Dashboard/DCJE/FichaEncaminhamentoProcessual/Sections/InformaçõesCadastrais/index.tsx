import { useState } from "react";
import * as S from "../../styled";
import useFEPContext from "../../useFEPContext";

const InformaçõesCadastrais = () => {
    const { fichaDCJE: ficha, defaultDate, formatarNumero } = useFEPContext();
    const [valor, setValor] = useState<number>(ficha?.vaTotal);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValor(Number(e.target.value));
    };

    return (
        <S.Section>
            <S.TitleSectionContainer>
                <S.TitleSection>
                    Informações Cadastrais do Processo
                </S.TitleSection>
            </S.TitleSectionContainer>
            <S.ContentSection>
                <S.ContainerField>
                    <S.FieldTitle>
                        Número do Processo: *
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Número do processo que está sendo objeto de
                                análise.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {ficha ? (
                        <S.TextInput
                            type="text"
                            placeholder="Número do processo"
                            disabled={true}
                            defaultValue={ficha.txNumeroFormatado}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>

                <S.ContainerField>
                    <S.FieldTitle>
                        Tribunal:
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Número da vara ou juizado do processo que está
                                sendo objeto de análise.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {ficha ? (
                        <S.Text>{ficha?.txOrgao}</S.Text>
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>

                <S.ContainerField>
                    <S.FieldTitle>Órgão Julgador:</S.FieldTitle>
                    {ficha ? (
                        <S.Text>{ficha?.txVara}</S.Text>
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
            </S.ContentSection>

            <S.ContentSection>
                
                <S.ContainerField>
                    <S.FieldTitle>
                        Autor/Reclamante/Exequente: *
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Nome da(s) parte(s) autora(s) do processo.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {ficha ? (
                        <S.TextInput
                            type="text"
                            required={true}
                            placeholder="Nome do autor, reclamente ou exequente"
                            defaultValue={ficha?.txAutor}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>

                <S.ContainerField>
                    <S.FieldTitle>
                        Réus/Reclamados/Executados: *
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Nome da(s) parte(s) contrária (as) do processo.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {ficha ? (
                        <S.TextInput
                            type="text"
                            required={true}
                            placeholder="Nome do autor, reclamente ou exequente"
                            defaultValue={ficha?.txReu}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>
            </S.ContentSection>

            <S.ContentSection>
                <S.ContainerField>
                    <S.FieldTitle>
                        Número de Autores/Substituídos: *
                    </S.FieldTitle>
                    {ficha ? (
                        <S.TextInput
                            required={true}
                            type="number"
                            placeholder="Número de Autores"
                            defaultValue={ficha?.nuAutores}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>

                <S.ContainerField>
                    <S.FieldTitle>
                        Valor Total Pleiteado/Executado R$: *
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Valor total que está sendo cobrado do processo.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {ficha ? (
                        <S.TextInput
                            type="text"
                            placeholder="Número do processo"
                            required={true}
                            value={formatarNumero(
                                valor ||
                                    ficha?.vaTotal * 100 ||
                                    ficha?.vaTotal * 100
                            )}
                            onChange={handleChange}
                        />
                    ) : (
                        <S.LoadingSpinner />
                    )}
                </S.ContainerField>

                <S.ContainerField>
                    <S.FieldTitle>
                        Atualizados Até: *
                        <S.InfoContainerField>
                            <S.InfoIcon />
                            <S.InfoText>
                                Data da atualização do valor que está sendo
                                cobrado.
                            </S.InfoText>
                        </S.InfoContainerField>
                    </S.FieldTitle>
                    {ficha ? (
                        <S.DateContent>
                            <S.DateInput
                                type="date"
                                required={true}
                                max={defaultDate}
                                defaultValue={ficha?.dtAtualizacaoValor}
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

export default InformaçõesCadastrais;

import ErrorLabel from "../../../../components/ErrorLabel";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const InformacoesImovel = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerFieldTextArea>
            <S.FieldTitle>
                Mais informações do imóvel: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText>Informações adicionais do imóvel.</S.InfoText>
                </S.InfoContainerField>
                <ErrorLabel
                    field={form.errors.dadosImovel?.informacoesImovel}
                />
            </S.FieldTitle>
            <S.TextAreaInput
                error={!!form.errors.dadosImovel?.informacoesImovel}
                id="dadosImovel.informacoesImovel"
                placeholder="Digite aqui uma descrição do imóvel de no máximo 10000 caracteres."
                {...form.register("dadosImovel.informacoesImovel", {
                    required: true,
                    maxLength: 1000,
                    minLength: 2,
                    disabled: patrimonio.isLoading
                })}
            />
        </S.ContainerFieldTextArea>
    );
};

export default InformacoesImovel;

import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import ErrorLabel from "../../../../components/ErrorLabel";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const AreaContruida = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Área Construída: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText>Área construída.</S.InfoText>
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
                <ErrorLabel field={form.errors.dadosImovel?.areaConstruida} />
            </S.FieldTitle>

            <S.TextInput
                error={!!form.errors.dadosImovel?.areaConstruida}
                id="dadosImovel.areaConstruida"
                placeholder="Digite a área construída"
                type="number"
                {...form.register("dadosImovel.areaConstruida", {
                    required: true,
                    disabled: patrimonio.isLoading
                })}
            />
        </S.ContainerField>
    );
};

export default AreaContruida;

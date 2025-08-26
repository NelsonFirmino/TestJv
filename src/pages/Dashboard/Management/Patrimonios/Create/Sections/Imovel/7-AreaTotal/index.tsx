import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import ErrorLabel from "../../../../components/ErrorLabel";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const AreaTotal = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Área Total: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText>Área total.</S.InfoText>
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
                <ErrorLabel field={form.errors.dadosImovel?.areatoal} />
            </S.FieldTitle>

            <S.TextInput
                error={!!form.errors.dadosImovel?.areatoal}
                id="dadosImovel.areatoal"
                placeholder="Digite a área total"
                type="number"
                {...form.register("dadosImovel.areatoal", {
                    required: true,
                    disabled: patrimonio.isLoading
                })}
            />
        </S.ContainerField>
    );
};

export default AreaTotal;

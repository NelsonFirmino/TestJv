import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import ErrorLabel from "../../../../components/ErrorLabel";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const NcartaAfo = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Nº da carta de aforamento: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
                <ErrorLabel field={form.errors.dadosApoio?.nCartaAfo} />
            </S.FieldTitle>

            <S.TextInput
                error={!!form.errors.dadosApoio?.nCartaAfo}
                id="dadosApoio.nCartaAfo"
                placeholder="Digite o número da carta de aforamento"
                type="number"
                {...form.register("dadosApoio.nCartaAfo", {
                    required: true,
                    disabled: patrimonio.isLoading
                })}
            />
        </S.ContainerField>
    );
};

export default NcartaAfo;

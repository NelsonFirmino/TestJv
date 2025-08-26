import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import ErrorLabel from "../../../../components/ErrorLabel";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const NPasta = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Nº da pasta: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
                <ErrorLabel field={form.errors.dadosApoio?.nPasta} />
            </S.FieldTitle>
            <S.TextInput
                error={!!form.errors.dadosApoio?.nPasta}
                id="dadosApoio.nPasta"
                placeholder="Digite o número da pasta"
                type="number"
                {...form.register("dadosApoio.nPasta", {
                    required: true,
                    disabled: patrimonio.isLoading
                })}
            />
        </S.ContainerField>
    );
};

export default NPasta;

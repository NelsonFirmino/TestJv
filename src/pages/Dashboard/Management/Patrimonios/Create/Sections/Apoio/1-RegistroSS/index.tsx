import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import ErrorLabel from "../../../../components/ErrorLabel";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const RegistroSS = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerFieldTextArea>
            <S.FieldTitle>
                Nº de registro SUPAT(SEAD): *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
                <ErrorLabel field={form.errors.dadosApoio?.nregistroSSP} />
            </S.FieldTitle>

            <S.TextInput
                error={!!form.errors.dadosApoio?.nregistroSSP}
                id="dadosApoio.nregistroSSP"
                placeholder="Digite o número de registro SUPAT(SEAD)"
                type="number"
                {...form.register("dadosApoio.nregistroSSP", {
                    required: true,
                    disabled: patrimonio.isLoading
                })}
            />
        </S.ContainerFieldTextArea>
    );
};

export default RegistroSS;

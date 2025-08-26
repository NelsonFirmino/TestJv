import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const Complemento = () => {
    const { form, patrimonio, loadingCEP } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Complemento: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading || loadingCEP}
                    size="very-small"
                />
            </S.FieldTitle>

            <S.TextAreaInput
                error={!!form.errors.dadosEndereco?.bairro}
                id="dadosEndereco.complemento"
                placeholder="Digite o complemento"
                {...form.register("dadosEndereco.complemento", {
                    required: true,
                    disabled: patrimonio.isLoading || loadingCEP,
                    minLength: 2,
                    maxLength: 10000
                })}
            />
        </S.ContainerField>
    );
};

export default Complemento;

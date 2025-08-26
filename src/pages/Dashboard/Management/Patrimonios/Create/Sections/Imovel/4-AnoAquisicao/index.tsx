import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import ErrorLabel from "../../../../components/ErrorLabel";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const AnoAquisicao = () => {
    const { form, patrimonio } = useEPContext();

    return (
        <S.ContainerField>
            <S.FieldTitle>
                Ano de aquisição: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText>Ano de aquisição do imóvel.</S.InfoText>
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
                <ErrorLabel field={form.errors.dadosImovel?.anoAquisicao} />
            </S.FieldTitle>
            <S.TextInput
                error={!!form.errors.dadosImovel?.anoAquisicao}
                id="dadosImovel.anoAquisicao"
                placeholder="Ano de aquisição"
                type="number"
                {...form.register("dadosImovel.anoAquisicao", {
                    required: true,
                    maxLength: 4,
                    minLength: 2,
                    disabled: patrimonio.isLoading
                })}
                onChange={(e) => {
                    const currYear = new Date().getFullYear();
                    const year = parseInt(e.target.value);
                    if (e.target.value.length == 4) {
                        if (year > currYear) {
                            form.setValue("dadosImovel.anoAquisicao", currYear);
                        } else if (year < 1900) {
                            form.setValue("dadosImovel.anoAquisicao", 1900);
                        }
                    } else
                        form.setValue(
                            "dadosImovel.anoAquisicao",
                            parseInt(e.target.value.slice(0, 4))
                        );
                }}
                onBlur={(e) => {
                    const currYear = new Date().getFullYear();
                    const year = parseInt(e.target.value);
                    if (year > currYear) {
                        form.setValue("dadosImovel.anoAquisicao", currYear);
                    } else if (year < 1900) {
                        form.setValue("dadosImovel.anoAquisicao", 1900);
                    }
                }}
            />
        </S.ContainerField>
    );
};

export default AnoAquisicao;

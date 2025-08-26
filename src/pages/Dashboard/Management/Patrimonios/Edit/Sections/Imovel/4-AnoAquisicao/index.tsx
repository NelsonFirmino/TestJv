import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../components/JvrisLoading";
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
            </S.FieldTitle>
            <Controller
                name="dadosImovel.anoAquisicao"
                control={form.control}
                render={({ field }) => {

                    return (
                        <S.TextInput
                            {...field}
                            type="number"
                            placeholder="Ano de aquisição"
                            maxLength={4}
                            minLength={2}
                            required={true}
                            disabled={patrimonio.isLoading}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default AnoAquisicao;

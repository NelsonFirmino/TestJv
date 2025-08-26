import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../../components/JvrisLoading";
import * as S from "../../../../../styled";
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
            </S.FieldTitle>

            <Controller
                name="dadosImovel.areaConstruida"
                control={form.control}
                render={({ field }) => {
                    //mask to m2 format
                    //const value = v ? v.toString().replace(".", ",") : "";

                    return (
                        <S.TextInput
                            {...field}
                            type="number"
                            required={true}
                            placeholder="Digite a área construída"
                            disabled
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default AreaContruida;

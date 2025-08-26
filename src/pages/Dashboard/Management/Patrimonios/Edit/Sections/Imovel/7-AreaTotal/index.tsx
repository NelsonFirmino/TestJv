import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../components/JvrisLoading";
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
            </S.FieldTitle>

            <Controller
                name="dadosImovel.areatoal"
                control={form.control}
                render={({ field }) => {
                    //mask to m2 format
                    //const value = v ? v.toString().replace(".", ",") : "";

                    return (
                        <S.TextInput
                            {...field}
                                type="number"
                            required={true}
                            placeholder="Digite a área total"
                            disabled={patrimonio.isLoading}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default AreaTotal;

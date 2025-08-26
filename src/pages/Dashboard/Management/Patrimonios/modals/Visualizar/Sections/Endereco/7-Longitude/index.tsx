import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../../components/JvrisLoading";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const Longitude = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Longitude: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
            </S.FieldTitle>

            <Controller
                name="dadosEndereco.longitude"
                control={form.control}
                render={({ field }) => {
                    // const value = patrimonio.data?.endereco.nuLongitude;

                    return (
                        <S.TextInput
                            {...field}
                            type="number"
                            placeholder="Digite a longitude"
                            required={true}
                            // value={value}
                            disabled
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Longitude;

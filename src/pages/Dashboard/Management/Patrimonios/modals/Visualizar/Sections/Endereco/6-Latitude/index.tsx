import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../../components/JvrisLoading";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const Latitude = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Latitude: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
            </S.FieldTitle>

            <Controller
                name="dadosEndereco.latitude"
                control={form.control}
                render={({ field }) => {
                    // const value = patrimonio.data?.endereco.nuLatitude;
                    return (
                        <S.TextInput
                            {...field}
                            type="number"
                            placeholder="Digite a latitude"
                            required={true}
                            //value={value}
                            disabled
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Latitude;

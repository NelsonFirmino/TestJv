import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../../components/JvrisLoading";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const Municipio = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField flex>
            <S.FieldTitle>
                Municipio: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
            </S.FieldTitle>
            <Controller
                name="dadosEndereco.municipio"
                control={form.control}
                render={({ field }) => {
                    return (
                        <S.TextInput
                            {...field}
                            type="text"
                            placeholder="Digite o Municipio"
                            required={true}
                            disabled
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Municipio;

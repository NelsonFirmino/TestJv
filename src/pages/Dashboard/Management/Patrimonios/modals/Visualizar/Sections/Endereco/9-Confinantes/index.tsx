import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../../components/JvrisLoading";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const Confinantes = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Confinantes: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
            </S.FieldTitle>

            <Controller
                name="dadosEndereco.confinantes"
                control={form.control}
                render={({ field }) => {
                    //const value = patrimonio.data?.endereco.txConfinantes;
                    return (
                        <S.TextAreaInput
                            {...field}
                            required={true}
                            minLength={2}
                            maxLength={10000}
                            placeholder="Digite os confinantes"
                            disabled
                            // value={value}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Confinantes;

import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../../components/JvrisLoading";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const Complemento = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Complemento: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
            </S.FieldTitle>

            <Controller
                name="dadosEndereco.complemento"
                control={form.control}
                render={({ field }) => {
                    //const value = patrimonio.data?.endereco.txComplemento;
                    return (
                        <S.TextAreaInput
                            {...field}
                            required={true}
                            minLength={2}
                            maxLength={10000}
                            placeholder="Digite o complemento"
                            disabled
                            // value={value}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Complemento;

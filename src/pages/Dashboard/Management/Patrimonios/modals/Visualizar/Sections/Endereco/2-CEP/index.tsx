import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../../components/JvrisLoading";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const CEP = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                CEP: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
            </S.FieldTitle>

            <Controller
                name="dadosEndereco.cep"
                control={form.control}
                render={({ field }) => {
                    return (
                        <S.TextInput
                            {...field}
                            type="text"
                            placeholder="Digite o CEP"
                            required={true}
                            disabled
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default CEP;

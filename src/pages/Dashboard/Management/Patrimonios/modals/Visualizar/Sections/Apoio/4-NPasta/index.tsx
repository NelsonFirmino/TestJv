import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../../components/JvrisLoading";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const NPasta = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Nº da pasta: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
            </S.FieldTitle>
            <Controller
                name="dadosApoio.nPasta"
                control={form.control}
                render={({ field }) => {
                    /*  const value =
                        patrimonio.data?.dadosAdicionais.txNumeroPasta; */
                    return (
                        <S.TextInput
                            {...field}
                            type="text"
                            placeholder="Digite o número da pasta"
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

export default NPasta;

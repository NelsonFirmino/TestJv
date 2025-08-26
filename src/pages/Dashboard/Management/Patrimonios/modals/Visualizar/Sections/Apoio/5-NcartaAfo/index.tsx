import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../../components/JvrisLoading";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const NcartaAfo = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Nº da carta de aforamento: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
            </S.FieldTitle>

            <Controller
                name="dadosApoio.nCartaAfo"
                control={form.control}
                render={({ field }) => {
                    /*   const value =
                        patrimonio.data?.dadosAdicionais
                            .txNumeroCartaAforamento; */
                    return (
                        <S.TextInput
                            {...field}
                            type="text"
                            placeholder="Digite o número da carta de aforamento"
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

export default NcartaAfo;

import { Controller } from "react-hook-form";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const Outorgado = () => {
    const {
        form,
        patrimonio: { data: patrimonio, isLoading: isLoadingPatrimonio }
    } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Outorgado: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText>Outorgado.</S.InfoText>
                </S.InfoContainerField>
            </S.FieldTitle>

            <Controller
                name="dadosImovel.outorgado"
                control={form.control}
                render={({ field }) => {
                    return (
                        <S.TextInput
                            error={!!form.errors.dadosImovel?.outorgado}
                            id="dadosImovel.outorgado"
                            placeholder="Outorgado"
                            {...form.register("dadosImovel.outorgado", {
                                required: true,
                                disabled: isLoadingPatrimonio
                            })}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Outorgado;

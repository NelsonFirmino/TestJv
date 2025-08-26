import { Controller } from "react-hook-form";
import * as S from "../../../../../styled";
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
                    const options = patrimonio?.outorgas.map((data) => ({
                        value: data.id,
                        label: data.txNome
                    }));
                    /* const outorga = patrimonio?.outorgas.find(
                        (data) => data.isOutorgado
                    );
                    const value = {
                        value: outorga?.id,
                        label: outorga?.txNome
                    }; */

                    return (
                        <S.CustomSelect
                            {...field}
                            required={true}
                            menuPosition="fixed"
                            placeholder="Selecione o outorgado"
                            isLoading={isLoadingPatrimonio}
                            options={options}
                            // value={value}
                            isClearable={true}
                            isDisabled
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Outorgado;

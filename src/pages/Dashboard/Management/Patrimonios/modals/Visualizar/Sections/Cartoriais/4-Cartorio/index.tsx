import { Controller } from "react-hook-form";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const Cartorio = () => {
    const {
        form,
        patrimonio: { data: patrimonio, isLoading: isLoadingPatrimonio }
    } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Cartório de Registro de Imóveis (CRI): *
            </S.FieldTitle>
            <Controller
                name="dadosCartoriais.cartoriosRegistro"
                control={form.control}
                render={({ field }) => {
                    /* const options = */

                    return (
                        <S.CustomSelect
                            {...field}
                            //required={true}
                            placeholder="Selecione o cartório de registro de imóveis"
                            // options={options}
                            isClearable={false}
                            isDisabled
                            isLoading={isLoadingPatrimonio}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Cartorio;

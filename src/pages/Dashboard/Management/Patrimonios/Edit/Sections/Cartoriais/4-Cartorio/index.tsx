import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { getCartorios } from "../../../../apiHooks/usePatrimonios";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const Cartorio = () => {
    const { data: cartorios, isLoading: isLoadingCartorios } = useQuery(
        [`cartorios`],
        () => getCartorios(),
        {
            staleTime: 1000 * 60 * 60 * 24
        }
    );
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
                    const options = cartorios?.map((data) => ({
                        value: data.id,
                        label: data.txOficio
                    }));

                    return (
                        <S.CustomSelect
                            {...field}
                            placeholder="Selecione o cartório de registro de imóveis"
                            options={options}
                            isClearable={false}
                            isDisabled={isLoadingPatrimonio}
                            isLoading={isLoadingPatrimonio}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Cartorio;

import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { getCartorios } from "../../../../apiHooks/usePatrimonios";
import ErrorLabel from "../../../../components/ErrorLabel";
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
        patrimonio: { isLoading: isLoadingPatrimonio }
    } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Cartório de Registro de Imóveis (CRI): *
                <ErrorLabel
                    field={
                        form.errors.dadosCartoriais?.cartoriosRegistro as any
                    }
                />
            </S.FieldTitle>
            <Controller
                name="dadosCartoriais.cartoriosRegistro"
                control={form.control}
                rules={{
                    required: true
                }}
                render={({ field }) => {
                    const options = cartorios?.map((data) => ({
                        value: data.id,
                        label: data.txOficio
                    }));

                    return (
                        <S.CustomSelect
                            {...field}
                            error={
                                !!form.errors.dadosCartoriais?.cartoriosRegistro
                            }
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

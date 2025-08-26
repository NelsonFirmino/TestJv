import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { getFormasAquisicoes } from "../../../../apiHooks/usePatrimonios";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const FormaAquisição = () => {
    const {
        form,
        patrimonio: { isLoading: isLoadingPatrimonios }
    } = useEPContext();

    const { data: formasAquisicoes, isLoading: isLoadingFormasAquisicoes } =
        useQuery([`formasAquisicoes`], () => getFormasAquisicoes(), {
            staleTime: 1000 * 60 * 60 * 24
        });

    return (
        <S.ContainerField>
            <S.FieldTitle>
                Forma de aquisição: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText>Forma de aquisição do imóvel.</S.InfoText>
                </S.InfoContainerField>
            </S.FieldTitle>

            <Controller
                name="dadosImovel.formaAquisicao"
                control={form.control}
                render={({ field }) => {
                    const options = formasAquisicoes?.map((data) => ({
                        value: data.id,
                        label: data.txFomaAquisicao
                    }));
                   /*  const value = options?.find(
                        (tipo) => tipo.label === field.value
                    ); */

                    return (
                        <S.CustomSelect
                            {...field}
                            required={true}
                            menuPosition="fixed"
                            placeholder="Selecione a forma de aquisição"
                            isLoading={
                                isLoadingFormasAquisicoes ||
                                isLoadingPatrimonios
                            }
                            options={options}
                            isClearable={true}
                            //value={value}
                            isDisabled={
                                isLoadingFormasAquisicoes ||
                                isLoadingPatrimonios
                            }
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default FormaAquisição;

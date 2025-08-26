import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { getFormasAquisicoes } from "../../../../apiHooks/usePatrimonios";
import ErrorLabel from "../../../../components/ErrorLabel";
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
                <ErrorLabel
                    field={form.errors.dadosImovel?.formaAquisicao as any}
                />
            </S.FieldTitle>

            <Controller
                rules={{
                    required: true
                }}
                name="dadosImovel.formaAquisicao"
                control={form.control}
                render={({ field }) => {
                    const options = formasAquisicoes?.map((data) => ({
                        value: data.id,
                        label: data.txFomaAquisicao
                    }));

                    return (
                        <S.CustomSelect
                            error={!!form.errors.dadosImovel?.formaAquisicao}
                            {...field}
                            menuPosition="fixed"
                            placeholder="Selecione a forma de aquisição"
                            isLoading={
                                isLoadingFormasAquisicoes ||
                                isLoadingPatrimonios
                            }
                            options={options}
                            isClearable={true}
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

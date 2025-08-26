import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { getTiposImoveis } from "../../../../apiHooks/usePatrimonios";
import ErrorLabel from "../../../../components/ErrorLabel";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const TipoImovel = () => {
    const { data: tiposImoveis, isLoading: isLoadingTiposImoveis } = useQuery(
        [`tiposImoveis`],
        () => getTiposImoveis(),
        {
            staleTime: 1000 * 60 * 60 * 24
        }
    );

    const {
        form,
        patrimonio: { isLoading: isLoadingPatrimonios }
    } = useEPContext();

    return (
        <S.ContainerField>
            <S.FieldTitle>
                Tipo do imóvel: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText>Tipo do imóvel.</S.InfoText>
                </S.InfoContainerField>
                <ErrorLabel
                    field={form.errors.dadosImovel?.tipoImovel as any}
                />
            </S.FieldTitle>
            <Controller
                rules={{
                    required: true
                }}
                name="dadosImovel.tipoImovel"
                control={form.control}
                render={({ field }) => {
                    const options = tiposImoveis?.map((data) => ({
                        value: data.id,
                        label: data.txTipo
                    }));

                    return (
                        <S.CustomSelect
                            {...field}
                            error={!!form.errors.dadosImovel?.tipoImovel}
                            menuPosition="fixed"
                            isDisabled={
                                isLoadingTiposImoveis || isLoadingPatrimonios
                            }
                            placeholder="Selecione o tipo do imóvel"
                            isLoading={
                                isLoadingTiposImoveis || isLoadingPatrimonios
                            }
                            options={options}
                            isClearable={true}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default TipoImovel;

import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { getBeneficiarios } from "../../../../apiHooks/usePatrimonios";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const Beneficiario = () => {
    const { form, patrimonio } = useEPContext();
    const { data: beneficiarios, isLoading: isLoadingbeneficiarios } = useQuery(
        [`beneficiarios`],
        () => getBeneficiarios(),
        {
            staleTime: 1000 * 60 * 60 * 24
        }
    );
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Beneficiário da afetação: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
            </S.FieldTitle>

            <Controller
                name="dadosApoio.beneficiario"
                control={form.control}
                rules={{
                    required: true
                }}
                render={({ field }) => {
                    const options = beneficiarios?.map((data) => ({
                        value: data.id,
                        label: data.txNome
                    }));

                    return (
                        <S.CustomSelect
                            {...field}
                            error={!!form.errors.dadosApoio?.beneficiario}
                            placeholder="Selecione o beneficiário"
                            options={options}
                            isClearable={false}
                            isDisabled={isLoadingbeneficiarios}
                            isLoading={isLoadingbeneficiarios}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Beneficiario;

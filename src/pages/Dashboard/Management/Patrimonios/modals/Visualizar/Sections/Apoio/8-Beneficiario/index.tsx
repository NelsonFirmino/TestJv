import { Controller } from "react-hook-form";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const Beneficiario = () => {
    const { form, patrimonio } = useEPContext();
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
                render={({ field }) => (
                    <S.CustomSelect
                        required={true}
                        menuPosition="fixed"
                        placeholder="Selecione o beneficiário"
                        /* isLoading={isLoadingTiposImoveis}
                        options={tiposImoveis?.map((contador) => ({
                            value: contador.id,
                            label: contador.txTipo
                        }))} */
                        isClearable
                        isDisabled
                        {...field}
                    />
                )}
            />
        </S.ContainerField>
    );
};

export default Beneficiario;

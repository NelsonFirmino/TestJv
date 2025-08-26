import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const RegistroSS = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerFieldTextArea>
            <S.FieldTitle>
                Nº de registro SUPAT(SEAD): *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
            </S.FieldTitle>

            <Controller
                name="dadosApoio.nregistroSSP"
                control={form.control}
                render={({ field }) => {
                  /*   const value =
                        patrimonio.data?.dadosAdicionais.txRegistroSupat; */
                    return (
                        <S.TextInput
                            {...field}
                            type="text"
                            placeholder="Digite o número de registro SUPAT(SEAD)"
                            required={true}
                            //value={value}
                            disabled={patrimonio.isLoading}
                        />
                    );
                }}
            />
        </S.ContainerFieldTextArea>
    );
};

export default RegistroSS;

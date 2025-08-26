import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const Numero = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField flex>
            <S.FieldTitle>
                Numero:
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText></S.InfoText>
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading}
                    size="very-small"
                />
            </S.FieldTitle>
            <Controller
                name="dadosEndereco.numero"
                control={form.control}
                render={({ field }) => {
                    //const value = patrimonio.data?.endereco.txNumero;
                    return (
                        <S.TextInput
                            {...field}
                               type="number"
                            placeholder="Digite o Numero"
                            required={true}
                            //value={value}
                            disabled={patrimonio.isLoading}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Numero;

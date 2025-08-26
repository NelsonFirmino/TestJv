import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const Logradouro = () => {
    const { form, patrimonio, loadingCEP } = useEPContext();

    return (
        <S.ContainerFieldTextArea>
            <S.FieldTitle>
                Logradouro:
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText></S.InfoText>
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading || loadingCEP}
                    size="very-small"
                />
            </S.FieldTitle>
            <Controller
                name="dadosEndereco.logradouro"
                control={form.control}
                render={({ field }) => {
                    //const value = patrimonio.data?.endereco.txLogradouro;
                    return (
                        <S.TextInput
                            {...field}
                            type="text"
                            placeholder="Digite o logradouro"
                            required={true}
                            //value={value}
                            disabled={patrimonio.isLoading || loadingCEP}
                        />
                    );
                }}
            />
        </S.ContainerFieldTextArea>
    );
};

export default Logradouro;

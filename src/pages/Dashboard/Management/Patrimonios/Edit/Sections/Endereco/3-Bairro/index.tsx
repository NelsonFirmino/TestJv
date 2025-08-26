import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const Bairro = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField flex>
            <S.FieldTitle>
                Bairro:
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
                name="dadosEndereco.bairro"
                control={form.control}
                render={({ field }) => {

                    return (
                        <S.TextInput
                            {...field}
                            type="text"
                            placeholder="Digite o bairro"
                            required={true}
                            disabled={patrimonio.isLoading}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Bairro;

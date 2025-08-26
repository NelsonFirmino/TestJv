import * as S from "../../../../styled";
import useEPContext from "../../../context";

const Bairro = () => {
    const { form, loadingCEP, patrimonio } = useEPContext();
    return (
        <S.ContainerField flex>
            <S.FieldTitle>
                Bairro:
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText></S.InfoText>
                </S.InfoContainerField>
            </S.FieldTitle>
            <S.TextInput
                error={!!form.errors.dadosEndereco?.bairro}
                id="dadosEndereco.bairro"
                placeholder="Digite o bairro"
                {...form.register("dadosEndereco.bairro", {
                    required: true,
                    disabled: patrimonio.isLoading || loadingCEP
                })}
            />
        </S.ContainerField>
    );
};

export default Bairro;

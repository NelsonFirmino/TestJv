import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const InfoAquisição = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerFieldTextArea>
            <S.FieldTitle>
                Mais informações da aquisição:
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText>
                        Informações adicionais sobre a aquisição do imóvel.
                    </S.InfoText>
                </S.InfoContainerField>
                <S.LettersCounter>{10} / 10000</S.LettersCounter>
            </S.FieldTitle>
            <Controller
                name="dadosImovel.informacoesAquisicao"
                control={form.control}
                render={({ field }) =>
                    true ? (
                        <S.TextAreaInput
                            minLength={2}
                            maxLength={10000}
                            required={true}
                            placeholder="Digite aqui as informações adicionais da aquisição do imóvel de no máximo 10000 caracteres."
                            {...field}
                        />
                    ) : (
                        <JvrisLoading loading size="small" />
                    )
                }
            />
        </S.ContainerFieldTextArea>
    );
};

export default InfoAquisição;

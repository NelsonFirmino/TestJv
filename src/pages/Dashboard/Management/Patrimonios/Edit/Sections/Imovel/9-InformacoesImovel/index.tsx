import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const InformacoesImovel = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerFieldTextArea>
            <S.FieldTitle>
                Mais informações do imóvel: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText>Informações adicionais do imóvel.</S.InfoText>
                </S.InfoContainerField>
            </S.FieldTitle>
            <Controller
                name="dadosImovel.informacoesImovel"
                control={form.control}
                render={({ field }) =>
                    true ? (
                        <S.TextAreaInput
                            required={true}
                            minLength={2}
                            maxLength={10000}
                            placeholder="Digite aqui uma descrição do imóvel de no máximo 10000 caracteres."
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

export default InformacoesImovel;

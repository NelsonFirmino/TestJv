import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../../components/JvrisLoading";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const Motivo = () => {
    const { form, patrimonio } = useEPContext();

    return (
        <S.ContainerFieldTextArea>
            <S.FieldTitle>
                Motivo* :
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText></S.InfoText>
                </S.InfoContainerField>
            </S.FieldTitle>
            <Controller
                name="dadosCartoriais.motivo"
                control={form.control}
                render={({ field }) =>
                    true ? (
                        <S.TextAreaInput
                            required={true}
                            minLength={2}
                            maxLength={10000}
                            disabled
                            placeholder="Digite aqui o motivo de no máximo 10000 caracteres."
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

export default Motivo;

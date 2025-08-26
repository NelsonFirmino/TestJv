import { Controller } from "react-hook-form";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const MaisInfos = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>Mais informações de dados cartoriais:</S.FieldTitle>
            <Controller
                name="dadosCartoriais.maisInfos"
                control={form.control}
                render={({ field }) => (
                    <S.TextAreaInput
                        required={true}
                        minLength={2}
                        maxLength={10000}
                        disabled
                        placeholder="Digite aqui informações adicionais de no máximo 10000 caracteres."
                        {...field}
                    />
                )}
            />
        </S.ContainerField>
    );
};

export default MaisInfos;

import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../../components/JvrisLoading";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const Matricula = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerFieldTextArea>
            <S.FieldTitle>Matrícula do imóvel: *</S.FieldTitle>
            <Controller
                name="dadosCartoriais.matriculaImovel"
                control={form.control}
                render={({ field }) =>
                    true ? (
                        <S.TextInput
                            type="text"
                            placeholder="Digite a matrícula do imóvel"
                            required={true}
                            disabled
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

export default Matricula;

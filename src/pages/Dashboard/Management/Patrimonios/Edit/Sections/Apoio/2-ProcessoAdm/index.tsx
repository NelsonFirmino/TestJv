import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const ProcessoAdm = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerFieldTextArea>
            <S.FieldTitle>
                Processo(s) Administrativo(s) relacionado(s):
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText></S.InfoText>
                </S.InfoContainerField>
            </S.FieldTitle>
            <Controller
                name="dadosApoio.processoaAdm"
                control={form.control}
                render={({ field }) =>
                    true ? (
                        <S.TextInput
                            type="number"
                            placeholder="Digite o número do processo administrativo"
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

export default ProcessoAdm;

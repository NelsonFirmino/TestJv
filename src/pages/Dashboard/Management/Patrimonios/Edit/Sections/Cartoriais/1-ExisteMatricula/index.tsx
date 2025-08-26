import Form from "react-bootstrap/Form";
import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const ExisteMatricula = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerFieldTextArea>
            <S.FieldTitle>
                Existe matrícula?:
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText></S.InfoText>
                </S.InfoContainerField>
            </S.FieldTitle>

            <Controller
                name="dadosCartoriais.existeMatricula"
                control={form.control}
                render={({ field }) =>
                    true ? (
                        <Form
                            style={{
                                fontSize: "5rem"
                            }}
                            {...field}
                        >
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                checked={field.value}
                                // disabled
                            />
                        </Form>
                    ) : (
                        <JvrisLoading loading size="small" />
                    )
                }
            />
        </S.ContainerFieldTextArea>
    );
};

export default ExisteMatricula;

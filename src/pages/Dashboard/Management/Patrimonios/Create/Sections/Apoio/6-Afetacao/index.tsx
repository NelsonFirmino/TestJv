import Form from "react-bootstrap/Form";
import { Controller } from "react-hook-form";
import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const Afetacao = () => {
    const { form, patrimonio } = useEPContext();
  
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Afetação: *
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
                name="dadosApoio.afetacao"
                control={form.control}
                render={({ field, }) => {
                    
                    return (
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
                                //checked={value}
                                // disabled
                            />
                        </Form>
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Afetacao;

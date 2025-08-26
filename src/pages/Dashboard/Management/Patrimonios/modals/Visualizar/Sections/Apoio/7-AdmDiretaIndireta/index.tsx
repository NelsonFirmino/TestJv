import Form from "react-bootstrap/Form";
import { Controller } from "react-hook-form";
import * as S from "../../../../../styled";
import useEPContext from "../../../context";

const AdmDiretaIndireta = () => {
    const { form, patrimonio } = useEPContext();
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Administração direta ou administração indireta: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
            </S.FieldTitle>

            <Controller
                name="dadosApoio.admDiretaIndireta"
                control={form.control}
                render={({ field }) => (
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
                            disabled
                        />
                    </Form>
                )}
            />
        </S.ContainerField>
    );
};

export default AdmDiretaIndireta;

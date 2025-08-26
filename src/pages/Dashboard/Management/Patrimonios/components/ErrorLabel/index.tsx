import { FieldError } from "react-hook-form";
import * as S from "../../styled";

interface ErrorLabelProps {
    field: FieldError;
}
const ErrorLabel = ({ field }: ErrorLabelProps) => {
    return (
        <>
            {field && field.type === "required" && (
                <S.ErrorLabel>Campo Obrigatório</S.ErrorLabel>
            )}
        </>
    );
};

export default ErrorLabel;

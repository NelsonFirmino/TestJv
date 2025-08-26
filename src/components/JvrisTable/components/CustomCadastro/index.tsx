import theme from "../../../../globalStyle/theme";
import { CadastroAto } from "../../styled";
import { cadastroOptions } from "../../Helpers/consts";

const CustomCadastro = ({ cadastro }: { cadastro: string }) => {
    return (
        <CadastroAto
            style={{
                backgroundColor:
                    cadastro == cadastroOptions.automaticamente
                        ? theme.colors.softGreen
                        : theme.colors.softYellow
            }}
            title={`Ato cadastrado ${cadastro}`}
        >
            {cadastro == cadastroOptions.automaticamente ? "A" : "M"}
        </CadastroAto>
    );
};

export default CustomCadastro;

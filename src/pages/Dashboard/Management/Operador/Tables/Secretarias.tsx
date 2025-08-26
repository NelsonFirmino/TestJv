import theme from "../../../../../globalStyle/theme";
import { useOperadorContext } from "../context";
import { SecretariaSelect } from "./ProcessosPendentesCadastro/styled";

const SecretariasSel = () => {
    const {
        secretarias,
        secretaria: SecId,
        setSecretaria
    } = useOperadorContext();

    return (
        <div
            style={{
                marginBottom: "30px",
                display: "flex",
                //alignItems: "flex-end",
                justifyContent: "center",
                flexDirection: "column"
            }}
        >
            <div
                style={
                    {
                        // border: "1px solid #ccc",
                    }
                }
            >
                <p
                    style={{
                        margin: "5px 0px",
                        fontSize: "1.4rem",
                        fontWeight: "bold"
                        //color: theme.colors.jvrisAqua
                    }}
                >
                    Secretarias
                </p>
                <SecretariaSelect
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            border: "1px solid #ccc",
                            width: "284px",
                            "&:hover": {
                                border: `1px solid ${theme.colors.jvrisAqua}`,
                                boxShadow: "none"
                            }
                        })
                    }}
                    value={{
                        value: SecId,
                        label: secretarias.find(
                            (secretaria) => secretaria.id === SecId
                        )?.txSecretaria
                    }}
                    options={secretarias.map((secretaria) => ({
                        value: secretaria.id,
                        label: secretaria.txSecretaria
                    }))}
                    onChange={(e: any) => setSecretaria(e.value)}
                />
            </div>
        </div>
    );
};

export default SecretariasSel;

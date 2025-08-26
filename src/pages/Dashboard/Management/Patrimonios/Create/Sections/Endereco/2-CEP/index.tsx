import JvrisLoading from "../../../../../../../../components/JvrisLoading";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

interface PositionI {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

const getAdress = async (cep: string): Promise<PositionI> => {
    return new Promise((resolve, reject) => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const getPosition = (adress: string) => {
    //https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=cd9833adf29f42c1a8da73a388f22743
    return new Promise((resolve, reject) => {
        fetch(
            `https://api.geoapify.com/v1/geocode/search?text=${adress}&apiKey=cd9833adf29f42c1a8da73a388f22743`
        )
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
const CEP = () => {
    const { form, patrimonio, loadingCEP, setLoadingCEP } = useEPContext();

    return (
        <S.ContainerField>
            <S.FieldTitle>
                CEP: *
                <S.InfoContainerField>
                    <S.InfoIcon />
                </S.InfoContainerField>
                <JvrisLoading
                    loading={patrimonio.isLoading || loadingCEP}
                    size="very-small"
                />
            </S.FieldTitle>

            <S.TextInput
                error={!!form.errors.dadosImovel?.areatoal}
                id="dadosEndereco.cep"
                placeholder="Digite o CEP"
                type="number"
                {...form.register("dadosEndereco.cep", {
                    required: true,
                    disabled: patrimonio.isLoading || loadingCEP,
                    maxLength: 8
                })}
                onChange={(e) => {
                    if (e.target.value.length > 8) {
                        form.setValue(
                            "dadosEndereco.cep",
                            e.target.value.slice(0, 8)
                        );
                    }
                    if (e.target.value.length == 8) {
                        setLoadingCEP(true);
                        getAdress(e.target.value)
                            .then((data) => {
                                form.setValue(
                                    "dadosEndereco.logradouro",
                                    data.logradouro
                                );
                                form.setValue(
                                    "dadosEndereco.complemento",
                                    data.complemento
                                );
                                form.setValue(
                                    "dadosEndereco.bairro",
                                    data.bairro
                                );
                                form.setValue(
                                    "dadosEndereco.municipio",
                                    data.localidade
                                );
                                getPosition(
                                    `${data.logradouro}, ${data.localidade}, ${data.uf}`
                                )
                                    .then((data: any) => {
                                        if (data.features.length == 0) return;
                                        form.setValue(
                                            "dadosEndereco.latitude",
                                            data.features[0].geometry
                                                .coordinates[1]
                                        );
                                        form.setValue(
                                            "dadosEndereco.longitude",
                                            data.features[0].geometry
                                                .coordinates[0]
                                        );
                                        setLoadingCEP(false);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                }}
            />
        </S.ContainerField>
    );
};

export default CEP;

import { createContext, useContext, useEffect } from "react";
import {
    Control,
    useForm,
    UseFormRegister,
    UseFormWatch
} from "react-hook-form";
import { useQuery } from "react-query";
import {
    getCartorio,
    getFormasAquisicoes,
    getPatrimonio,
    getTiposImoveis
} from "../../apiHooks/usePatrimonios";
import { PatrimonioI, SubmitPatrimonioEdit } from "../../interfaces";

interface EPContextI {
    form: {
        control: Control<SubmitPatrimonioEdit, any>;
        register: UseFormRegister<SubmitPatrimonioEdit>;
        watch: UseFormWatch<SubmitPatrimonioEdit>;
    };
    patrimonio: {
        data: PatrimonioI;
        isLoading: boolean;
    };
}

const FEPContext = createContext<EPContextI>({} as any);

export const EPProvider = ({
    children,
    idPatrimonio
}: {
    children: React.ReactNode;
    idPatrimonio: string;
}) => {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
        watch,
        control,
        reset,
        setValue
    } = useForm<SubmitPatrimonioEdit>({
        mode: "onChange"
    });
    const { data: patrimonio, isLoading: isLoadingPatrimonio } = useQuery(
        [`patrimonio-${idPatrimonio}`, idPatrimonio],
        () => getPatrimonio(idPatrimonio),
        {
            staleTime: 1000 * 60 * 60 * 24
        }
    );

    const { data: formasAquisicoes, isLoading: isLoadingFormasAquisicoes } =
        useQuery([`formasAquisicoes`], () => getFormasAquisicoes(), {
            staleTime: 1000 * 60 * 60 * 24
        });
    const { data: tiposImoveis, isLoading: isLoadingTiposImoveis } = useQuery(
        [`tiposImoveis`],
        () => getTiposImoveis(),
        {
            staleTime: 1000 * 60 * 60 * 24
        }
    );

    useEffect(() => {
        async function fillData() {
            const formasAquisicoesOptions = formasAquisicoes?.map((data) => ({
                value: data.id,
                label: data.txFomaAquisicao
            }));
            const FomaAquisicao = formasAquisicoesOptions?.find(
                (tipo) => tipo.label === patrimonio.txFomaAquisicao
            );
            const outorga = patrimonio?.outorgas.find(
                (data) => data.isOutorgado
            );
            const outorgado = {
                value: outorga?.id,
                label: outorga?.txNome
            };
            const outorgantes = patrimonio?.outorgas
                .filter((data) => data.isOutorgante)
                .map((data) => ({
                    value: data.id,
                    label: data.txNome
                }));
            const cartorioData = await getCartorio(
                patrimonio?.dadosAdicionais.idCartorio
            );
            const cartoriosRegistro = {
                value: patrimonio?.dadosAdicionais.idCartorio,
                label: cartorioData?.txOficio
            };

            const tImovel = tiposImoveis?.find(
                (tipo) => tipo.id === patrimonio.idTipoImovel
            );
            const tipoImovel = {
                value: tImovel?.id,
                label: tImovel?.txTipo
            };
            const frm = {
                dadosImovel: {
                    //informacoesAquisicao: patrimonio.txInfo,
                    tipoImovel: tipoImovel,
                    formaAquisicao: FomaAquisicao,
                    anoAquisicao: patrimonio?.nuAnoAquisicao,
                    outorgado: outorgado,
                    outorgante: outorgantes,
                    areatoal: patrimonio?.nuAreaTotal,
                    areaConstruida: patrimonio?.nuAreaConstruida,
                    informacoesImovel: patrimonio?.txInfo
                },
                dadosEndereco: {
                    logradouro: patrimonio?.endereco?.txLogradouro,
                    numero: patrimonio?.endereco?.txNumero,
                    bairro: patrimonio?.endereco?.txBairro,
                    municipio: patrimonio?.endereco?.txMunicipio,
                    cep: patrimonio?.endereco?.txCep,
                    latitude: patrimonio?.endereco?.nuLatitude,
                    longitude: patrimonio?.endereco?.nuLongitude,
                    complemento: patrimonio?.endereco?.txComplemento,
                    confinantes: patrimonio?.endereco?.txConfinantes
                },
                dadosApoio: {
                    nregistroSSP: patrimonio?.dadosAdicionais?.txRegistroSupat,
                    //  processoaAdm: patrimonio?.txProcessoAdm,
                    //processoJud: patrimonio?.txProcessoJud,
                    nPasta: patrimonio?.dadosAdicionais?.txNumeroPasta,
                    nCartaAfo:
                        patrimonio?.dadosAdicionais?.txNumeroCartaAforamento,
                    afetacao: patrimonio?.dadosAdicionais?.isAfetacao,
                    admDiretaIndireta:
                        patrimonio?.dadosAdicionais?.beneficiarioImovelAfetacao
                            ?.isDireto,
                    beneficiario:
                        patrimonio?.dadosAdicionais?.beneficiarioImovelAfetacao
                            ?.txNome
                },
                dadosCartoriais: {
                    existeMatricula: patrimonio?.dadosAdicionais?.isMatricula,
                    motivo: patrimonio?.dadosAdicionais?.txMotivo,
                    matriculaImovel: patrimonio?.dadosAdicionais?.txMatricula,
                    cartoriosRegistro: cartoriosRegistro,
                    maisInfos:
                        patrimonio?.dadosAdicionais?.txInformacoesAdicionais
                }
            };
            reset(frm);
        }

        if (patrimonio) {
            fillData();
        }
    }, [patrimonio]);

    return (
        <FEPContext.Provider
            value={{
                form: {
                    control,
                    register,
                    watch
                },
                patrimonio: {
                    data: patrimonio,
                    isLoading: isLoadingPatrimonio //true
                }
            }}
        >
            {children}
        </FEPContext.Provider>
    );
};

const useEPContext = () => {
    const context = useContext(FEPContext);
    if (!context) {
        throw new Error("useFEP must be used within an EPProvider");
    }
    return context;
};

export default useEPContext;

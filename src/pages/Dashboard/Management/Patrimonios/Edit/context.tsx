import { createContext, useContext, useEffect } from "react";
import {
    Control,
    FieldErrors,
    SubmitHandler,
    useForm,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
    HotToastError,
    HotToastSucess
} from "../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../context/SharedContext";
import {
    getBeneficiarios,
    getCartorio,
    getFormasAquisicoes,
    getPatrimonio,
    getTiposImoveis,
    putPatrimonio
} from "../apiHooks/usePatrimonios";
import { PatrimonioI, SubmitPatrimonioEdit } from "../interfaces";

interface EPContextI {
    form: {
        control: Control<SubmitPatrimonioEdit, any>;
        errors: FieldErrors<SubmitPatrimonioEdit>;
        handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
        register: UseFormRegister<SubmitPatrimonioEdit>;
        watch: UseFormWatch<SubmitPatrimonioEdit>;
        setValue: UseFormSetValue<SubmitPatrimonioEdit>;
    };
    patrimonio: {
        data: PatrimonioI;
        isLoading: boolean;
    };
}

const FEPContext = createContext<EPContextI>({} as any);

export const EPProvider = ({ children }: { children: React.ReactNode }) => {
    const { idPatrimonio } = useParams<{ idPatrimonio: string }>();

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

    const { user, selectedUser } = SharedState();

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
    const { data: beneficiarios, isLoading: isLoadingbeneficiarios } = useQuery(
        [`beneficiarios`],
        () => getBeneficiarios(),
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
            const beneficiario = beneficiarios?.find(
                (data) =>
                    data.id ===
                    patrimonio?.dadosAdicionais?.beneficiarioImovelAfetacao?.id
            );
            reset({
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
                    beneficiario: {
                        value: beneficiario?.id,
                        label: beneficiario?.txNome
                    }
                },
                dadosCartoriais: {
                    existeMatricula: patrimonio?.dadosAdicionais?.isMatricula,
                    motivo: patrimonio?.dadosAdicionais?.txMotivo,
                    matriculaImovel: patrimonio?.dadosAdicionais?.txMatricula,
                    cartoriosRegistro: cartoriosRegistro,
                    maisInfos:
                        patrimonio?.dadosAdicionais?.txInformacoesAdicionais
                }
            });
        }
        if (patrimonio) {
            fillData();
        }
    }, [patrimonio]);

    const onSubmit: SubmitHandler<SubmitPatrimonioEdit> = (params) => {
        const outorgas = patrimonio.outorgas.map((outorga) => {
            if (outorga.txNome === params.dadosImovel.outorgado.label) {
                return {
                    ...outorga,
                    isOutorgado: true
                };
            }
            const outgnt = params.dadosImovel.outorgante.find(
                (out) => out.label == outorga.txNome
            );
            if (outgnt) {
                return {
                    ...outorga,
                    isOutorgante: true
                };
            }
            return outorga;
        });

        const hasAnyValue = (obj: any) => {
            return Object.values(obj).some((v) => {
                if (typeof v === "object") {
                    return hasAnyValue(v);
                }
                return !!v;
            });
        };

        const dadosAdicionais: any = {
            txRegistroSupat: params.dadosApoio.nregistroSSP,
            txNumeroPasta: params.dadosApoio.nPasta,
            txNumeroCartaAforamento: params.dadosApoio.nCartaAfo,
            isAfetacao: params.dadosApoio.afetacao || false,
            beneficiarioImovelAfetacao: {
                id: params.dadosApoio.beneficiario.value
            },
            isMatricula: params.dadosCartoriais.existeMatricula || false,
            txMatricula: params.dadosCartoriais.matriculaImovel,
            txMotivo: params.dadosCartoriais.motivo,
            txInformacoesAdicionais: params.dadosCartoriais.maisInfos,
            idCartorio: params.dadosCartoriais.cartoriosRegistro?.value
        };
        if (dadosAdicionais.isAfetacao) {
            dadosAdicionais.beneficiarioImovelAfetacao = {
                isDireto: params.dadosApoio.admDiretaIndireta || false,
                txNome: params.dadosApoio.beneficiario
            };
        }
        const hasAdicionais = hasAnyValue(dadosAdicionais);

        const endereco = {
            txLogradouro: params.dadosEndereco.logradouro,
            txNumero: params.dadosEndereco.numero,
            txBairro: params.dadosEndereco.bairro,
            txMunicipio: params.dadosEndereco.municipio,
            txCep: params.dadosEndereco.cep,
            nuLatitude: params.dadosEndereco.latitude,
            nuLongitude: params.dadosEndereco.longitude,
            txComplemento: params.dadosEndereco.complemento,
            txConfinantes: params.dadosEndereco.confinantes
        };
        const hasEndereco = hasAnyValue(endereco);

        const patrim: any = {
            idUsuarioCadastro: +user["Jvris.User.Id"],
            isAtivo: true,
            nuAnoAquisicao: params.dadosImovel.anoAquisicao,
            nuAreaConstruida: params.dadosImovel.areaConstruida,
            nuAreaTotal: params.dadosImovel.areatoal,
            txFomaAquisicao: params.dadosImovel.formaAquisicao.label,
            txInfo: params.dadosImovel.informacoesImovel,
            idTipoImovel: params.dadosImovel.tipoImovel.value,
            outorgas: outorgas,
            id: idPatrimonio
        };
        if (hasAdicionais) {
            patrim.dadosAdicionais = dadosAdicionais;
        }
        if (hasEndereco) {
            patrim.endereco = endereco;
        }
        putPatrimonio(patrim)
            .then((data) => {
                HotToastSucess("Patrimônio atualizado com sucesso!");
            })
            .catch((error) => {
                HotToastError("Erro ao atualizar patrimônio!");
            });
    };

    const submit = handleSubmit(onSubmit);

    return (
        <FEPContext.Provider
            value={{
                form: {
                    control,
                    errors,
                    handleSubmit: submit,
                    register,
                    watch,
                    setValue
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

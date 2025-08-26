import { createContext, useContext, useEffect, useState } from "react";
import {
    Control,
    FieldErrors,
    SubmitHandler,
    useForm,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import {
    HotToastError,
    HotToastSucess
} from "../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../context/SharedContext";
import { postPatrimonio } from "../apiHooks/usePatrimonios";
import { PatrimonioI, SubmitPatrimonioCreate } from "../interfaces";

interface EPContextI {
    form: {
        control: Control<SubmitPatrimonioCreate, any>;
        errors: FieldErrors<SubmitPatrimonioCreate>;
        handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
        register: UseFormRegister<SubmitPatrimonioCreate>;
        watch: UseFormWatch<SubmitPatrimonioCreate>;
        setValue: UseFormSetValue<SubmitPatrimonioCreate>;
    };
    patrimonio: {
        data: PatrimonioI;
        isLoading: boolean;
    };
    activeKey: string;
    setActiveKey: (key: string) => void;
    loadingCEP: boolean;
    setLoadingCEP: (value: boolean) => void;
}

const FEPContext = createContext<EPContextI>({} as any);

export const EPProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors, isSubmitting },
        watch,
        control,
        reset,
        setValue
    } = useForm<SubmitPatrimonioCreate>({
        mode: "onSubmit",
        criteriaMode: "all"
    });
    const [activeKey, setActiveKey] = useState<string>(undefined);
    const [loadingCEP, setLoadingCEP] = useState(false);

    const { user, selectedUser } = SharedState();

    const watchAllFields = watch();

    useEffect(() => {
        console.log("watchAllFields", watchAllFields);
    }, [watchAllFields]);

    const openAcordion = (key: string) => {
        setActiveKey(key);
    };
    useEffect(() => {
        console.log("errors", errors);
        if (errors.dadosImovel) {
            openAcordion("0");
        } else if (errors.dadosEndereco) {
            openAcordion("1");
        } else if (errors.dadosApoio) {
            openAcordion("2");
        } else if (errors.dadosCartoriais) {
            openAcordion("3");
        }
    }, [errors, isSubmitting]);

    const onSubmit: SubmitHandler<SubmitPatrimonioCreate> = (
        params: SubmitPatrimonioCreate
    ) => {
        const hasAnyValue = (obj: any) => {
            return Object.values(obj).some((v) => {
                if (typeof v === "object") {
                    return hasAnyValue(v);
                }
                return !!v;
            });
        };

        const outorgas: any[] = [];
        if (params.dadosImovel.outorgante) {
            params.dadosImovel.outorgante.forEach((outorgante) => {
                if (outorgante) {
                    outorgas.push({
                        txNome: outorgante,
                        isOutorgante: true,
                        isOutorgado: false
                        //idImovel:
                    });
                }
            });
        }

        if (params.dadosImovel.outorgado) {
            outorgas.push({
                txNome: params.dadosImovel.outorgado,
                isOutorgante: false,
                isOutorgado: true
                //idImovel:
            });
        }

        const dadosAdicionais: any = {
            txRegistroSupat: params.dadosApoio.nregistroSSP,
            txNumeroPasta: params.dadosApoio.nPasta,
            txNumeroCartaAforamento: params.dadosApoio.nCartaAfo,
            isAfetacao: params.dadosApoio.afetacao || false,
            beneficiarioImovelAfetacao: params.dadosApoio.beneficiario?.value
                ? {
                      id: params.dadosApoio.beneficiario.value
                  }
                : undefined,
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
            outorgas
        };
        if (hasAdicionais) {
            patrim.dadosAdicionais = dadosAdicionais;
        }
        if (hasEndereco) {
            patrim.endereco = endereco;
        }

        postPatrimonio(patrim)
            .then((data) => {
                HotToastSucess("Patrimônio criado com sucesso!");
                window.location.href = `/dashboard/gerenciamento/patrimonios`;
            })
            .catch((error) => {
                HotToastError("Erro ao criar patrimônio!");
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
                activeKey,
                setActiveKey,
                patrimonio: {
                    data: [] as any,
                    isLoading: false
                },
                loadingCEP,
                setLoadingCEP
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

export interface PatrimonioI {
    id: number;
    endereco: Endereco;
    dadosAdicionais: DadosAdicionais;
    outorgas: Outorga[];
    idUsuarioCadastro: number;
    dtCadastro: string;
    isAtivo: boolean;
    nuAnoAquisicao: number;
    nuAreaConstruida: number;
    nuAreaTotal: number;
    txFomaAquisicao: string;
    txInfo: string;
    idTipoImovel: number;
    processoImoveis: ProcessoImovei[];
}

export type DadosImovelT = {
    informacoesAquisicao?: string;
    tipoImovel: {
        value: number;
        label: string;
    };
    formaAquisicao: {
        value: number;
        label: string;
    };
    anoAquisicao: number;
    outorgado: {
        value: number;
        label: string;
    };
    outorgante: {
        value: number;
        label: string;
    }[];
    areatoal: number;
    areaConstruida?: number;
    informacoesImovel?: string;
};

export type DadosImovelCreate = {
    informacoesAquisicao?: string;
    tipoImovel: {
        value: number;
        label: string;
    };
    formaAquisicao: {
        value: number;
        label: string;
    };
    anoAquisicao: number;
    outorgado: string;
    outorgante: string[];
    areatoal: number;
    areaConstruida?: number;
    informacoesImovel?: string;
};
export type DadosEnderecoT = {
    logradouro: string;
    numero: string;
    bairro: string;
    municipio: string;
    cep: string;
    latitude: number;
    longitude: number;
    complemento: string;
    confinantes: string;
};
export type DadosApoioT = {
    nregistroSSP: string;
    processoaAdm: string;
    processoJud: string;
    nPasta: string;
    nCartaAfo: string;
    afetacao: boolean;
    admDiretaIndireta: boolean;
    beneficiario: any;
};

export type DadosCartoriaisT = {
    existeMatricula: boolean;
    motivo: string;
    matriculaImovel: string;
    cartoriosRegistro: {
        value: number;
        label: string;
    };
    maisInfos?: string;
};

export interface SubmitPatrimonioEdit {
    dadosImovel: DadosImovelT;
    dadosEndereco: DadosEnderecoT;
    dadosApoio: DadosApoioT;
    dadosCartoriais: DadosCartoriaisT;
}
export interface SubmitPatrimonioCreate {
    dadosImovel: DadosImovelCreate;
    dadosEndereco: DadosEnderecoT;
    dadosApoio: DadosApoioT;
    dadosCartoriais: DadosCartoriaisT;
}
export interface ProcessoImovei {
    id: number;
    txNumeroFormatado: string;
    txTipo: string;
    dtCadastro: string;
    hrCadastro: string;
    usuarioCadastro: any;
    idProcesso: number;
    idImovel: number;
}

export interface DadosAdicionais {
    id: number;
    txRegistroSupat: string;
    txNumeroPasta: string;
    txNumeroCartaAforamento: string;
    isAfetacao: boolean;
    txAdministracao: string;
    isMatricula: boolean;
    txMatricula: string;
    txMotivo: string;
    txInformacoesAdicionais: string;
    dtCadastro: string;
    hrCadastro: string;
    idCartorio: number;
    beneficiarioImovelAfetacao: BeneficiarioImovelAfetacao;
    usuarioCadastro: any;
}
export interface BeneficiarioImovelAfetacao {
    id: number;
    txNome: string;
    isDireto: boolean;
    isIndireto: boolean;
    dtCadastro: string;
    hrCadastro: string;
    usuarioCadastro: any;
}
export interface Cartorio {
    id: number;
    txOficio: string;
    txEmail: string;
    txCNS: string;
    dtCadastro: string;
    hrCadastro: string;
    usuarioCadastro: any;
}

export interface Endereco {
    id: number;
    txLogradouro: string;
    txNumero: string;
    txBairro: string;
    txMunicipio: string;
    txCep: string;
    nuLatitude: number;
    nuLongitude: number;
    txComplemento: string;
    txConfinantes: string;
    dtCadastro: string;
    hrCadastro: string;
    usuarioCadastro: any;
}
export interface Outorga {
    id: number;
    txNome: string;
    isOutorgado: boolean;
    isOutorgante: boolean;
    dtCadastro: string;
    hrCadastro: string;
    idImovel: number;
}

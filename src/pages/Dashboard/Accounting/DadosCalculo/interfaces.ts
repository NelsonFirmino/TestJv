export interface AssuntoI {
	id: number;
	txRazaoPedido: string;
	txInformacao: string;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
}

interface stdInputsI {
	InputTitle: string;
	placeholder?: string;
	disabled?: boolean;
	search?: () => void;
	updateVal?: (e: any) => void;
}

//extend React.InputHTMLAttributes<HTMLInputElement> and stdInputsI
export interface CustomInputProps
	extends stdInputsI,
		React.InputHTMLAttributes<HTMLInputElement> {}

export interface CustomSelectProps
	extends stdInputsI {
	values?: {
		value: string | number;
		label: string;
	}[];
	value?: string | number;
	defaultLabel?: string;
	defaultValue?: string | number;
	customB?: {
		B: any;
		onClick: () => void;
	};
}

export interface ExequentesI {
	id: number;
	idProcesso: number;
	idParte: number;
	txParte: string;
	txNumeroProcesso: string;
	nuInstancia: number;
	parte: Parte;
	txPolo: string;
	isPrincipal: boolean;
	totalProcessos: number;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
}

export interface Parte {
	id: number;
	txParte: string;
	txTipoPessoa: string;
	txCpfCnpj: string;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
}

export interface fichaProcI {
	id: number;
	idProcesso: number;
	idAto: number;
	idRazaoPedido: number;
	txOrgao: string;
	txVara: string;
	txAutor: string;
	txReu: string;
	nuAutores: number;
	vaTotal: number;
	dtAtualizacaoValor: string;
	idProcurador: number;
	dtPrazoProcurador: string;
	dtPrazoDCJE: string;
	txFaseProcessual: string;
	dtAjuizamento: string;
	dtCitacao: string;
	vaHonorariosFixos: number;
	txIndiceCorrecao: string;
	txOrientacaoCalculo: string;
	idDistribuicao: number;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
	lsArquivos: LsArquivos;
	txNumeroFormatado: string;
	txTipoProcesso: string;
	idResposta: number;
	vaDivergencia: number;
	isEncerrado: boolean;
	isDevolvido: boolean;
	idDevolucao: number;
	txIndiceJuros: string;
}

export interface LsArquivos {}

export interface calcI {
	id: number;
	idFichaProcessual: number;
	txTipoCalculo: string;
	idParte: number;
	nuMatricula: number;
	nuVinculo: number;
	dtCorrecaoMonetaria: string;
	dtJurosMora: string;
	dtPrescricao: string;
	vaExecucao: number;
	dtAtualizacaoValor: string;
	idRazaoPedido: number;
	nuQtdMeses: number;
	nuQtdDias: number;
	idResposta: number;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
	txParte: string;
	txNumeroFormatado: string;
	idProcesso: number;
	isComPlanilha: number;
	vaResultadoTotal: number;
	idAto: number;
	dtFimUrv: string;
	isFerias: boolean;
	isDecimoTerceiro: boolean;
	vaUrvMarco94: number;
}

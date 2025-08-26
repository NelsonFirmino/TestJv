interface AI {
	id: number;
	txNumeroFormatado: string;
	idClasse: number;
	idSistemaProcessual: number;
	idOrgaoJulgador: number;
	txOrgaojulgador: string;
	dtCiencia: string;
	dtPrazo: string;
	idSecretaria: number;
	isTriagemManual: boolean;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
	porAtos: boolean;
	isImportado: boolean;
	idEspecializada: number;
	temPecaFinalizada: boolean;
	isCiente: boolean;
	idTribunal: number;
	txTribunal: string;
	nuInstancia: number;
	isUrgente: boolean;
	txValor: string;
	txClasse: string;
	txSistemaProcessual: string;
	txOrgaoJulgador: string;
	txSecretaria: string;
	txUsuario: string;
	idProcurador: number;
	idRedistribuicao: number;
	txStatusCadastroAto: string;
	txStatusRedistribuicaoAto: string;
}

export interface AtoI extends AI {
	id: number;
	txNumeroFormatado: string;
	idClasse: number;
	idSistemaProcessual: number;
	dtCiencia: string;
	dtPrazo: string;
	idSecretaria: number;
	isTriagemManual: boolean;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
	porAtos: boolean;
	isImportado: boolean;
	idEspecializada: number;
	temPecaFinalizada: boolean;
	isCiente: boolean;
	isUrgente: boolean;
}

export interface AtoDetalhadoI extends AtoI {
	id: number;
	idProcesso: number;
	txNumeroFormatado: string;
	txAssunto: string;
	txRelevancia: string;
	txValor: string;
	txClasse: string;
	txSistemaProcessual: string;
	nuCodigoAviso: number;
	txOrgaoJulgador: string;
	txTribunal: string;
	txSiglaTribunal: string;
	dtCiencia: string;
	dtPrazo: string;
	idTriagem: number;
	txSecretaria: string;
	dtCadastro: string;
	dtDistribuicao: string;
	txUsuario: string;
	isImportado: boolean;
	idEspecializada: number;
	txEspecializada: string;
	idProcurador: number;
	idRedistribuicao: number;
	isUrgente: boolean;
	txStatusCadastroAto: string;
	txStatusRedistribuicaoAto: string;
}

export interface PecaFinalizadaI {
	id: number;
	idProcesso: number;
	txDescricao: string;
	idTipoDocumento: number;
	idAto: number;
	idProcurador: number;
	dtFinalizacao: string;
	hrFinalizacao: string;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
	txPeca: string;
	txNumeroProcesso: string;
	anexos: Anexos;
	file_stream: string;
	name: string;
	txTipoArquivo: string;
}

export interface AlterarRelevanciaParamsI {
	idProcesso?: number;
	idAto?: number;
	novaRelevanciaProcesso?: any;
	novaRelevanciaAto?: boolean;
	idUsuarioCadastro?: number;
}

export interface AnexoI {
	id?: number;
	idAto: number;
	txDescricao: string;
	idAnexo: string;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
	file_stream: string;
	name: string;
	txTipoArquivo: string;
}
export interface RecPecaI {
	id: number;
	idProcesso: number;
	txDescricao: string;
	idTipoDocumento: number;
	idAto: number;
	idProcurador: number;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
	txPeca: string;
	txNumeroProcesso: string;
	anexos: Anexos;
	file_stream: string;
	name: string;
	txTipoArquivo: string;
}

export interface Anexos {}

// ----------------------------------------
// Excluir ato

export interface AtoResponse {
	status: string;
	message: string;
	data: Ato;
}

export interface Ato {
	id: number;
	idProcesso: number;
	txNumeroFormatado: string;
	nuCodigoAviso: number;
	idClasse: number;
	idSistemaProcessual: number;
	idOrgaoJulgador: number;
	txOrgaojulgador: string;
	dtCiencia: string;
	idSecretaria: number;
	isTriagemManual: boolean;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
	porAtos: boolean;
	isImportado: boolean;
	idEspecializada: number;
	temPecaFinalizada: boolean;
	isCiente: boolean;
	idTribunal: number;
	txTribunal: string;
	nuInstancia: number;
	isUrgente: boolean;
}

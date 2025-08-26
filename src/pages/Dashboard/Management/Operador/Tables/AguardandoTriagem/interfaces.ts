export interface createSubOptI {
	onClick?: (index: number) => void;
	//dataSelected: any;
	option: string;
}
export interface SecretariasI {
	id: number;
	txSecretaria: string;
	nuAtosPendenteCadastro: number;
	nuAtosAguardandoTriagem: number;
	nuAtosPendenteDistribuicao: number;
	nuRecebimentoPendente: number;
	nuAtosTomadaCiencia: number;
}

export interface AguarTriagI {
	id: number;
	idProcesso: number;
	txNumeroFormatado: string;
	txRelevancia: string;
	txValor: string;
	txClasse: string;
	txSistemaProcessual: string;
	nuCodigoAviso: number;
	txOrgaoJulgador: string;
	dtCiencia: string;
	dtPrazo: string;
	txSecretaria: string;
	dtCadastro: string;
	txUsuario: string;
	isImportado: boolean;
	idEspecializada: number;
	idProcurador: number;
	idRedistribuicao: number;
	isUrgente: boolean;
	txStatusCadastroAto: string;
	txStatusRedistribuicaoAto: string;
}

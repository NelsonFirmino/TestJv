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

export interface ProcesssosPendentesI {
	id: number;
	txNumeroFormatado: string;
	txValor: string;
	txClasse: string;
	txSistemaProcessual: string;
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

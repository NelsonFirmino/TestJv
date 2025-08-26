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

export interface AtosFisicosConcluidosI {
	id: number;
	idProcesso: number;
	txNumeroFormatado: string;
	txProcurador: string;
	txTribunal: string;
	txOrgaoJulgador: string;
	dtConclusao: string;
	dtPrazo: string;
	txRelevancia: string;
	txStatusCadastroAto: string;
}

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

export interface AtosI {
	id: number;
	idAto: number;
	nuCodigoAviso: number;
	idProcesso: number;
	txNumeroFormatado: string;
	txAssunto: string;
	txClasse: string;
	txOrgaoJulgador: string;
	dtCiencia: string;
	txTipoComunicacao: string;
	txNivelSigilo: string;
	isMNI: boolean;
	idEspecializada: number;
	txEspecializada: string;
	txRelevancia: string;
	txStatusCadastroAto: string;
}

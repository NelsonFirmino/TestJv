export interface ProcuradorI {
	id: number;
	txProcurador: string;
	isBloqueado: boolean;
	isDistribuicaoAutomatica: boolean;
	isChefe: boolean;
	setores: SetorI[];
}

export interface SetorI {
	id: number;
	txSetor: string;
	isChefe: boolean;
	isBloqueado: boolean;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
	idSetor_Pai?: number;
}

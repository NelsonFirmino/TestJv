export interface UsuariosI {
	id: number;
	txUsuario: string;
	txCpf: string;
	idPerfil: number;
	txPerfil?: string;
	isBloqueado: boolean;
	txLogin: string;
	isChefe: boolean;
	setores?: Setor[];
	setoresUsuarios: SetoresUsuario[];
	procuradoresAssessores: any[];
	txMatricula: string;
}

export interface Setor {
	id: number;
	txSetor: string;
	isChefe: boolean;
	isBloqueado: boolean;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
}

export interface SetoresUsuario {
	id: number;
	idSetor: number;
	idUsuario: number;
	isChefe: boolean;
	isDistribuicaoAutomatica: boolean;
	dtCadastro: string;
	hrCadastro: string;
	idUsuarioCadastro: number;
}

export interface SetoresUsuario2 {
	id?: number;
	idSetor: number;
	txSetor: string;
	idUsuario: number;
	isChefe: boolean;
	isDistribuicaoAutomatica: boolean;
	dtCadastro: string;
	hrCadastro?: string;
	idUsuarioCadastro: number;
	nuPercentualDistribuicao?: number;
}

export interface PerfilI {
	id: number;
	txPerfil: string;
}

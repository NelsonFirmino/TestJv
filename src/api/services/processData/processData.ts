import axiosInstance from "../../axiosInstance";
import {
	GetProcessDataResponse,
	PostProcessDataParams,
	PutProcessDataParams,
} from "./process-data.interface";

export const getProcessData = async (
	processId?: string,
): Promise<GetProcessDataResponse> => {
	const processData = await axiosInstance.get(
		`/api/v1.0/Processos/${processId}`,
	);

	return processData.data;
};

export const patchProcessData = async ({
	idProcesso,
	idAto,
	idUsuarioCadastro,
	idProcesso_Relacionado,
	txNumero,
	txNumeroFormatado,
	txTipo,
	vaProcesso,
	idSistemaProcessual,
	idTribunal,
	nuInstancia,
	txRelevancia,
	isFisico,
	lsProcessoAssunto = [],
	lsProcessoParte = [],
}: PutProcessDataParams): Promise<GetProcessDataResponse> => {
	const processData = await axiosInstance
		.put(
			`/api/v1.0/Processos/${idProcesso}`,
			{
				id: idProcesso,
				idAto,
				idUsuarioCadastro,
				idProcesso_Relacionado,
				txNumero,
				txNumeroFormatado,
				txTipo,
				vaProcesso,
				idSistemaProcessual,
				idTribunal,
				nuInstancia,
				txRelevancia,
				isFisico,
				lsProcessoAssunto,
				lsProcessoParte,
			},
		)
		.then((res) => {
			return res;
		})
		.catch((e) => {
			return e;
		});

	return processData.data;
};
export const postProcessData = async ({
	// id,
	idAto,
	idUsuarioCadastro,
	idProcesso_Relacionado,
	// txNumero,
	txNumeroFormatado,
	txTipo,
	vaProcesso,
	idSistemaProcessual,
	idTribunal,
	nuInstancia,
	txRelevancia,
	isFisico,
	isSigiloso,
	lsProcessoAssunto = [],
	lsProcessoParte = [],
}: PostProcessDataParams): Promise<GetProcessDataResponse> => {
	const processData = await axiosInstance
		.post(`/api/v1.0/Processos`, {
			// id,
			idAto,
			idUsuarioCadastro,
			idProcesso_Relacionado,
			// txNumero,
			txNumeroFormatado,
			txTipo,
			vaProcesso,
			idSistemaProcessual,
			idTribunal,
			nuInstancia,
			txRelevancia,
			isFisico,
			isSigiloso,
			lsProcessoAssunto,
			lsProcessoParte,
		})
		.then((res) => {
			return res;
		})
		.catch((e) => {
			return e;
		});

	return processData.data;
};

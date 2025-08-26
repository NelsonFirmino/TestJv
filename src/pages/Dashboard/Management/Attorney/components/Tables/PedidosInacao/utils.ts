import axiosInstance from "../../../../../../../api/axiosInstance";
import { AttorneyRequestsForInactionDataI } from "../../../../../../../api/services/attorneys/requestsForInaction/attorneys.requestsForInaction.interface";
import { line_attorney_dashnoard_table } from "../../../../../../../components/JvrisTable/Helpers/utils";
import { JvrisTableColumnNDataI } from "../../../../../../../components/JvrisTable/JvrisTable.interface";

export const requestsForInactionColumns: JvrisTableColumnNDataI[] = [
	{ text: "Número do Processo" },
	{ text: "Solicitante" },
	{ text: "Observação" },
	{ text: "Data Pedido Inação" },
];

interface AttorneyRequestsForInactionDataIWithId extends AttorneyRequestsForInactionDataI {
	idProcesso: number;
}

export async function ParseToJvrisRequestsForInaction(data: AttorneyRequestsForInactionDataIWithId[] | undefined) {
	if (!data) return [] as JvrisTableColumnNDataI[][];

	async function addIdProc() {
		for (let i = 0; i < data.length; i++) {
			const numProc = data[i].txNumeroProcesso.replace(/\.|-/g, "");
			const idProcesso = await axiosInstance.get(`/api/v1.0/Processos/numero?txNumero=${numProc}&page=1&pageSize=10`);
			data[i].idProcesso = idProcesso.data.data[0].id;
		}
	}
	await addIdProc();

	const JvrisTableData = data.map((objData) => {
		return line_attorney_dashnoard_table({
			Head: {
				numero: {
					value: objData.txNumeroProcesso,
					onClick: (index) => {
						if (index != undefined) window.location.href = `/dashboard/detalhes-processo/espelho-processos/${objData.idProcesso}`;
					},
				},
				cadastro: {
					value: objData.txStatusCadastroAto == "A" ? "automaticamente" : "manualmente",
				},
				copy: {
					value: true,
				},
			},
			Body: [{ value: objData.txProcurador }, { value: objData.txObservacao }, { value: objData.dtCadastro.split("-").reverse().join("/") }],
		});
	});
	return JvrisTableData;
}

export interface createRequestForInaction {
	clickAcatarPedidos: () => void;
}

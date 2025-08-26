import { UrgenciesOptions } from "../../../../../components/JvrisTable/Helpers/consts";
import { line_attorney_dashnoard_table } from "../../../../../components/JvrisTable/Helpers/utils";
import { JvrisTableColumnNDataI } from "../../../../../components/JvrisTable/JvrisTable.interface";
import theme from "../../../../../globalStyle/theme";
import { CalcStatus } from "../../../../../utils/Date.utils";
import { formatToBrazilianDate } from "../../../../../utils/formatToBrazilianDate.util";
import { AtosI } from "../Tables/AguardandoCiencia/interfaces";
import { AguarTriagI } from "../Tables/AguardandoTriagem/interfaces";
import { ProcesssosPendentesI } from "../Tables/ProcessosPendentesCadastro/interfaces";
import {
	AtosAguardandoDistI,
	AtosDistHjI,
} from "./interfaces";

export function ParseToJvrisTableCienc(
	data: AtosI[] | undefined,
) {
	if (!data)
		return [] as JvrisTableColumnNDataI[][];
	const JvrisTableData = data.map((ObjData) => {
		return line_attorney_dashnoard_table({
			Head: {
				numero: {
					value: ObjData.txNumeroFormatado,
					onClick: (index) => {
						if (index != undefined)
							window.location.href = `/dashboard/detalhes-processo/espelho-processos/${ObjData.idProcesso}`;
					},
				},
				cadastro: {
					value:
						ObjData.txStatusCadastroAto ==
						"A"
							? "automaticamente"
							: "manualmente",
				},

				copy: {
					value: true,
				},
				tipo: {
					value: ObjData.txRelevancia,
				},
			},
			Body: [
				{ value: ObjData.txClasse },
				{
					value: ObjData.txOrgaoJulgador,
				},
				{
					value: formatToBrazilianDate(
						ObjData.dtCiencia,
					),
				},
				{
					value: ObjData.txEspecializada,
				},
				//{ value: ObjData.txRelevancia },
			],
		});
	});
	return JvrisTableData;
}

export function ParseToJvrisTableTriag(
	data: AguarTriagI[] | undefined,
) {
	if (!data)
		return [] as JvrisTableColumnNDataI[][];
	const JvrisTableData = data.map((ObjData) => {
		return line_attorney_dashnoard_table({
			Head: {
				numero: {
					value: ObjData.txNumeroFormatado,
					onClick: (index) => {
						if (index != undefined)
							window.location.href = `/dashboard/detalhes-processo/espelho-processos/${ObjData.idProcesso}`;
					},
				},
				cadastro: {
					value:
						ObjData.txStatusCadastroAto ==
						"A"
							? "automaticamente"
							: "manualmente",
				},
				copy: {
					value: true,
				},
			},
			Body: [
				{ value: ObjData.txClasse },
				{
					value: ObjData.txSistemaProcessual,
				},
				{
					value:
						ObjData.txOrgaoJulgador ??
						"-",
				},
				{
					value: formatToBrazilianDate(
						ObjData.dtCiencia,
					),
				},
				{
					value: ObjData.dtPrazo
						? formatToBrazilianDate(
								ObjData.dtPrazo,
						  )
						: "Sem Prazo",
				},
				{
					value: ObjData.txRelevancia,
					design: {
						name: "RelevanciaAto",
					},
				},
				{
					value: CalcStatus(
						ObjData.dtCiencia,
					),
					design: {
						name: "CustomStatus",
					},
					dataName: "Status",
				},
			],
		});
	});
	return JvrisTableData;
}

export function ParseToJvrisTablePend(
	data: ProcesssosPendentesI[] | undefined,
) {
	if (!data)
		return [] as JvrisTableColumnNDataI[][];
	const JvrisTableData = data.map((ObjData) => {
		return line_attorney_dashnoard_table({
			Head: {
				numero: {
					value: ObjData.txNumeroFormatado,
				},
				cadastro: {
					value:
						ObjData.txStatusCadastroAto ==
						"A"
							? "automaticamente"
							: "manualmente",
				},

				copy: {
					value: true,
				},
			},
			Body: [
				{ value: ObjData.txClasse },
				{
					value: ObjData.txSistemaProcessual,
				},
				{
					value: ObjData.txStatusRedistribuicaoAto,
				},
				{
					value: formatToBrazilianDate(
						ObjData.dtCiencia,
					),
				},
				{
					value: ObjData.dtPrazo
						? formatToBrazilianDate(
								ObjData.dtPrazo,
						  )
						: "Sem Prazo",
				},
				{
					value: CalcStatus(
						ObjData.dtPrazo,
					),
					design: {
						name: "CustomStatus",
					},
					dataName: "Status",
				},
			],
		});
	});
	return JvrisTableData;
}

export function ParseToJvrisTableDist(
	data: AtosAguardandoDistI[] | undefined,
) {
	if (!data)
		return [] as JvrisTableColumnNDataI[][];
	const JvrisTableData = data.map((ObjData) => {
		return line_attorney_dashnoard_table({
			Head: {
				numero: {
					value: ObjData.txNumeroFormatado,
					onClick: (index) => {
						if (index != undefined)
							window.location.href = `/dashboard/detalhes-processo/espelho-processos/${ObjData.idProcesso}`;
					},
				},
				cadastro: {
					value:
						ObjData.txStatusCadastroAto ==
						"A"
							? "automaticamente"
							: "manualmente",
				},

				copy: {
					value: true,
				},
			},
			Body: [
				{
					value:
						ObjData.txClasse ?? "-",
				},
				{
					value:
						ObjData.txSistemaProcessual ??
						"-",
				},
				{
					value:
						ObjData.txOrgaoJulgador ??
						"-",
				},
				{
					value:
						ObjData.txEspecializada ??
						"-",
				},
				{
					value: formatToBrazilianDate(
						ObjData.dtCiencia,
					),
				},
				{
					value: formatToBrazilianDate(
						ObjData.dtPrazo,
					),
				},
				{
					value: ObjData.isUrgente
						? UrgenciesOptions.Urgente
						: UrgenciesOptions.Normal,
					design: {
						name: "RelevanciaAto",
					},
				},
				{
					value: CalcStatus(
						ObjData.dtCadastro,
					),
					design: {
						name: "CustomStatus",
					},
					dataName: "Status",
				},
			],
		});
	});
	return JvrisTableData;
}

export function ParseToJvrisTableDistHJ(
	data: AtosDistHjI[] | undefined,
) {
	if (!data)
		return [] as JvrisTableColumnNDataI[][];
	const JvrisTableData = data.map((ObjData) => {
		return line_attorney_dashnoard_table({
			Head: {
				numero: {
					value: ObjData.txNumeroFormatado,
					onClick: (index) => {
						if (index != undefined)
							window.location.href = `/dashboard/detalhes-processo/espelho-processos/${ObjData.idProcesso}`;
					},
				},
				cadastro: {
					value:
						ObjData.txStatusCadastroAto ==
						"A"
							? "automaticamente"
							: "manualmente",
				},

				copy: {
					value: true,
				},
			},
			Body: [
				{
					value:
						ObjData.txClasse ?? "-",
				},
				{
					value:
						ObjData.txSistemaProcessual ??
						"-",
				},
				{
					value:
						ObjData.txOrgaoJulgador ??
						"-",
				},
				{
					value:
						ObjData.txEspecializada ??
						"-",
				},
				{
					value:
						ObjData.txProcurador ??
						"-",
				},
				{
					value: formatToBrazilianDate(
						ObjData.dtPrazo,
					),
				},
				{
					value: ObjData.isUrgente
						? UrgenciesOptions.Urgente
						: UrgenciesOptions.Normal,
					design: {
						name: "RelevanciaAto",
					},
				},
				{
					value: CalcStatus(
						ObjData.dtPrazo,
					),
					design: {
						name: "CustomStatus",
					},
					dataName: "Status",
				},
			],
		});
	});
	return JvrisTableData;
}

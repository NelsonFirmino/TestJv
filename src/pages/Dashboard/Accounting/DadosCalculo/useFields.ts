import { useEffect, useState } from "react";

interface updateFieldsI {
	TipoCalc?: string;
	Exequente?: string;
	Matricula?: number;
	Assunto?: string;
	valorExecutado?: number;
	DTCorrMonetaria?: Date;
	DTJurosMota?: Date;
	DTPrescricao?: Date;
}

interface useFieldsI {
	CalcData: any;
}

const useFields = (props: useFieldsI) => {
	const [TipoCalc, setTipoCalc] =
		useState<string>();
	const [Exequente, setExequente] =
		useState<string>();
	const [Matricula, setMatricula] =
		useState<number>();
	const [Assunto, setAssunto] =
		useState<string>();
	const [valorExecutado, setValorExecutado] =
		useState<number>();
	const [DTCorrMonetaria, setDTCorrMonetaria] =
		useState<Date>();
	const [DTJurosMota, setDTJurosMota] =
		useState<Date>();
	const [DTPrescricao, setDTPrescricao] =
		useState<Date>();

	const { CalcData } = props;

	function update(params: updateFieldsI) {
		setTipoCalc(params.TipoCalc);
		setExequente(params.Exequente);
		setMatricula(params.Matricula);
		setAssunto(params.Assunto);
		setValorExecutado(params.valorExecutado);
		setDTCorrMonetaria(
			params.DTCorrMonetaria,
		);
		setDTJurosMota(params.DTJurosMota);
		setDTPrescricao(params.DTPrescricao);
	}

	useEffect(() => {
		const tipoCalc = () => {
			switch (CalcData?.txTipoCalculo) {
				case "IND":
					return "Indenização";
				case "DIF":
					return "Diferença diversas";
				case "ENQ":
					return "Enquadramento";
				case "ATR":
					return "Remuneração em Atraso";
				case "URV":
					return "URV";
				case "0":
					return "= Selecione =";
				default:
					return "";
			}
		};
	}, []);

	return {
		TipoCalc,
		Exequente,
		Matricula,
		Assunto,
		valorExecutado,
		DTCorrMonetaria,
		DTJurosMota,
		DTPrescricao,
		update,
	};
};

export default useFields;

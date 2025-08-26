import axiosInstance from "../../axiosInstance";
import {
  BaseDeCalculoResponse,
  CalcFinancUrvByIdResponse,
  CalculoEnquadramentoResponse,
  CalculosDCJEResponse,
  DeleteCalculoFinanceiroResponse,
  DeleteCalculoPlanilhaResponse,
  DeleteCalculoResponse,
  ErgonCargoFuncaoResponse,
  ErgonCategoriaSubcategoriaResponse,
  ErgonRubricaResponse,
  ErgonServidorFinanceiroPorCalcResponse,
  ErgonServidorHistoricoResponse,
  ErgonServidorResponse,
  GetAnexosResponse,
  GetArquivosResponse,
  GetCalculosResponse,
  GetRespostaDcjeResponse,
  ImportarSipResponse,
  PlanilhaDeCalculoResponse,
  PostCalculoEnquadramentoParams,
  PostCalculoEnquadramentoResponse,
  PostCalculoFinanceiro,
  PostCalculoFinanceiroResponse,
  PostCalculoPlanilhaParams,
  PostCalculoPlanilhaResponse,
  PostCalculoResultadoParams,
  PostCalculoResultadoResponse,
  PostCalculos,
  PostCalculosResponse,
  PostCalculoUrvParams,
  PostCalculoUrvResponse,
  PutCalcularEnquadramentoDevidoParams,
  PutCalcularEnquadramentoDevidoResponse,
  RespostaDcjeCalculadoResponse,
  ResultadoDoCalculoRelatorioResponse,
  ResultadoDoCalculoResponse,
} from "./respostaDcje.interface";

export const getRespostaDcje = async (
  id: string | number
): Promise<GetRespostaDcjeResponse> => {
  const respostaDcje = await axiosInstance.get(
    `/api/v1.0/respostas-dcje/${id}`,
    {}
  );

  return respostaDcje.data;
};

export const getAnexosRespostaDcje = async (
  id: string
): Promise<GetAnexosResponse> => {
  const anexosRespostaDcje = await axiosInstance.get(
    `/api/v1.0/respostas-dcje/${id}/anexos`,
    {}
  );

  return anexosRespostaDcje.data;
};

export const getArquivoRespostaDcje = async (
  id: string
): Promise<GetArquivosResponse> => {
  const arquivosRespostaDcje = await axiosInstance.get(
    `/api/v1.0/contadoria/relatorios/calculos?id=${id}`,
    {}
  );

  return arquivosRespostaDcje.data;
};

export const getCalculosDcjeResultados = async (
  idFichaProcessual: number
): Promise<GetCalculosResponse> => {
  const calculossRespostaDcje = await axiosInstance.get(
    `/api/v1.0/calculos-dcje/${idFichaProcessual}/resultados`
  );

  return calculossRespostaDcje.data;
};

export const getCalculosBaseDeCalculo = async (
  idFichaProcessual: number
): Promise<BaseDeCalculoResponse> => {
  const getCalculosBaseDeCalculo = await axiosInstance.get(
    `/api/v1.0/calculos-dcje/${idFichaProcessual}/financeiros`
  );

  return getCalculosBaseDeCalculo.data;
};

export const getCalculosPlanilhaDeCalculo = async (
  id: number
): Promise<PlanilhaDeCalculoResponse> => {
  const getCalculosPlanilhaDeCalculo = await axiosInstance.get(
    `/api/v1.0/calculos-planilhas-dcje/${id}/Calculo`
  );

  return getCalculosPlanilhaDeCalculo.data;
};

export const getCalculosResultadoDoCalculo = async (
  id: number
): Promise<ResultadoDoCalculoResponse> => {
  const getCalculosResultadoDoCalculo = await axiosInstance.get(
    `/api/v1.0/calculos-resultados-dcje/${id}/calculo`
  );

  return getCalculosResultadoDoCalculo.data;
};

export const getRespostaDcjeCalculado = async (
  id: number
): Promise<RespostaDcjeCalculadoResponse> => {
  const getCalculosResultadoDoCalculo = await axiosInstance.get(
    `/api/v1.0/respostas-dcje/${id}/calculado`
  );

  return getCalculosResultadoDoCalculo.data;
};

export const getCalculosDcje = async (
  idFichaProcessual: number
): Promise<CalculosDCJEResponse> => {
  const calculosDcje = await axiosInstance.get(
    `/api/v1.0/calculos-dcje?page=1&pageSize=100&idFichaProcessual=${idFichaProcessual}`
  );

  return calculosDcje.data;
};

export const getCalculosResultadoDoCalculoRelatorio = async (
  id: number
): Promise<ResultadoDoCalculoRelatorioResponse> => {
  const getCalculosResultadoDoCalculoRelatorio = await axiosInstance.get(
    `/api/v1.0/contadoria/relatorios/calculos?id=${id}`
  );

  return getCalculosResultadoDoCalculoRelatorio.data;
};

export const getErgonRubricaByidRazaoPedido = async (
  idRazaoPedido: number
): Promise<ErgonRubricaResponse> => {
  const ergonRubrica = await axiosInstance.get(
    `/api/v1.0/ergonrubricas?page=1&pageSize=1000&idRazaoPedido=${idRazaoPedido}`
  );

  return ergonRubrica.data;
};

export const getErgonRubricaTodos = async (): Promise<ErgonRubricaResponse> => {
  const ergonRubrica = await axiosInstance.get(
    `/api/v1.0/ergonrubricas?page=1&pageSize=1000`
  );

  return ergonRubrica.data;
};

export const getErgonRubricaByCalculo = async (
  idCalculo: number
): Promise<ErgonRubricaResponse> => {
  const ergonRubrica = await axiosInstance.get(
    `/api/v1.0/ergonrubricas/porCalculo?idCalculo=${idCalculo}`
  );

  return ergonRubrica.data;
};

export const getErgonCategSubcateg =
  async (): Promise<ErgonCategoriaSubcategoriaResponse> => {
    const ergonCatSubcat = await axiosInstance.get(
      `/api/v1.0/ErgonCargoFuncao-dcje/Subcategoria?page=1&pageSize=100`
    );

    return ergonCatSubcat.data;
  };

export const getErgonCargoFuncao = async ({
  idErgonCategoria,
  txSubcategoria,
}: {
  idErgonCategoria: number;
  txSubcategoria: string;
}): Promise<ErgonCargoFuncaoResponse> => {
  const encodedTxSubcategoria: string = encodeURIComponent(txSubcategoria);
  const ergonCargoFuncao = await axiosInstance.get(
    `/api/v1.0/ErgonCargoFuncao-dcje?page=1&pageSize=100&idErgonCategoria=${idErgonCategoria}&txSubcategoria=${encodedTxSubcategoria}`
  );

  return ergonCargoFuncao.data;
};

export const getCalculoEnquadramento = async (
  idCalculo: number
): Promise<CalculoEnquadramentoResponse> => {
  const calculoEnquadramento = await axiosInstance.get(
    `/api/v1.0/calculos-enquadramentos-dcje/${idCalculo}/calculo`
  );

  return calculoEnquadramento.data;
};

export const getBaseDeCalculoEnq = async (
  idCalculo: number
): Promise<BaseDeCalculoResponse> => {
  const getCalculosBaseDeCalculo = await axiosInstance.get(
    `/api/v1.0/calculos-dcje/${idCalculo}/financeiros`
  );

  return getCalculosBaseDeCalculo.data;
};

export const getErgonServidorFinanceiroPorCalc = async (
  idCalculo: number
): Promise<ErgonServidorFinanceiroPorCalcResponse> => {
  const getCalculosBaseDeCalculo = await axiosInstance.get(
    `/api/v1.0/ErgonServidorFinanceiro-dcje/porCalculo?idCalculo=${idCalculo}`
  );

  return getCalculosBaseDeCalculo.data;
};

export const getErgonServidor = async (
  idParte: number
): Promise<ErgonServidorResponse> => {
  const ergonServidor = await axiosInstance.get(
    `/api/v1.0/ErgonServidor-dcje?page=1&pageSize=10&idParte=${idParte}`
  );

  return ergonServidor.data;
};

export const getErgonServidorFinanceiro = async ({
  idCalculo,
  dtInicio,
  dtFim,
  idUsuario,
}): Promise<ErgonServidorResponse> => {
  const ergonFinanceiro = await axiosInstance.get(
    `/api/v1.0/ErgonServidorFinanceiro-dcje/importar?idCalculo=${idCalculo}&dtInicio=${dtInicio}&dtFim=${dtFim}&idUsuario=${idUsuario}`
  );

  return ergonFinanceiro.data;
};

export const getErgonServidorFinanceiroFiltrar = async ({
  idCalculo,
  dtInicio,
  dtFim,
  idUsuario,
}): Promise<ErgonServidorResponse> => {
  const ergonFinanceiro = await axiosInstance.get(
    `/api/v1.0//ErgonServidorFinanceiro-dcje/filtrar?idCalculo=${idCalculo}&dtinicio=${dtInicio}&dtFim=${dtFim}&idRubrica=0&idUsuario=${idUsuario}`
  );

  return ergonFinanceiro.data;
};

export const getErgonServidorFinanceiroFiltrarComRub = async ({
  idCalculo,
  dtInicio,
  dtFim,
  idRubrica,
  idUsuario,
}): Promise<ErgonServidorResponse> => {
  const ergonFinanceiro = await axiosInstance.get(
    `/api/v1.0//ErgonServidorFinanceiro-dcje/filtrar?idCalculo=${idCalculo}&dtinicio=${dtInicio}&dtFim=${dtFim}&idRubrica=${idRubrica}&idUsuario=${idUsuario}`
  );

  return ergonFinanceiro.data;
};

export const getErgonServidorHistorico = async ({
  idCalculo,
  dtInicio,
  dtFim,
  idUsuario,
}): Promise<ErgonServidorHistoricoResponse> => {
  const ergonFinanceiro = await axiosInstance.get(
    `/api/v1.0/ErgonServidorHistorico-dcje/importar?idCalculo=${idCalculo}&dtInicio=${dtInicio}&dtFim=${dtFim}&idUsuario=${idUsuario}`
  );

  return ergonFinanceiro.data;
};

export const getCalcFinancUrvById = async (
  idCalculo: number
): Promise<CalcFinancUrvByIdResponse> => {
  const calculoFinancUrv = await axiosInstance.get(
    `/api/v1.0/calculos-financeiros-urv-dcje/${idCalculo}/porCalculo`
  );

  return calculoFinancUrv.data;
};

export const getImportarSip = async ({
  idCalculo,
  idUsuario,
}): Promise<ImportarSipResponse> => {
  const importSip = await axiosInstance.get(
    `/api/v1.0/calculos-financeiros-urv-dcje/sip?idCalculo=${idCalculo}&idUsuario=${idUsuario}`
  );

  return importSip.data;
};

// Delete

export const deleteExcluirCalculo = async (
  id: number
): Promise<DeleteCalculoResponse> => {
  const excluirCalculo = await axiosInstance.delete(
    `/api/v1.0/calculos-dcje/${id}`
  );

  return excluirCalculo.data;
};

export const deleteExcluirCalculoFinanceiro = async (
  id: number
): Promise<DeleteCalculoFinanceiroResponse> => {
  const excluirCalculo = await axiosInstance.delete(
    `/api/v1.0/calculos-financeiros-dcje/${id}`
  );

  return excluirCalculo.data;
};

export const deleteExcluirCalculoEnquadramento = async (
  id: number
): Promise<DeleteCalculoFinanceiroResponse> => {
  const excluirCalculo = await axiosInstance.delete(
    `/api/v1.0/calculos-enquadramentos-dcje/${id}`
  );

  return excluirCalculo.data;
};

export const deleteExcluirCalculoPlanilha = async (
  id: number
): Promise<DeleteCalculoPlanilhaResponse> => {
  const excluirCalculo = await axiosInstance.delete(
    `/api/v1.0//calculos-planilhas-dcje/${id}`
  );

  return excluirCalculo.data;
};

export const deleteExcluirAnexo = async (
  id: number
): Promise<GetCalculosResponse> => {
  const excluirAnexo = await axiosInstance
    .delete(`/api/v1.0/respostas-anexos/${id}`)
    .then((response) => {
      return response.data;
    });

  return excluirAnexo.data;
};

export const deleteExcluirPlanilhaResultado = async (
  id: number
): Promise<DeleteCalculoResponse> => {
  const excluirPlanilhaResultado = await axiosInstance.delete(
    `/api/v1.0/calculos-planilhas-dcje/${id}/calculo`
  );
  return excluirPlanilhaResultado.data;
};

export const deleteCalcFinancUrv = async (
  id: number
): Promise<DeleteCalculoResponse> => {
  const deleteUrvCalc = await axiosInstance.delete(
    `/api/v1.0/calculos-financeiros-urv-dcje/${id}`
  );
  return deleteUrvCalc.data;
};

export const deleteBaseCalcPeriodo = async ({
  idCalculoText,
  idCalculo,
  idRubricaText,
  idRubrica,
  dtIniText,
  dtInicio,
  dtFimText,
  dtFim,
}): Promise<DeleteCalculoResponse> => {
  const deleteBaseCalcPer = await axiosInstance.delete(
    `/api/v1.0/calculos-financeiros-dcje/rubrica/${idCalculoText}${idCalculo}${idRubricaText}${idRubrica}${dtIniText}${dtInicio}${dtFimText}${dtFim}`
  );
  return deleteBaseCalcPer.data;
};

// POST

export const postCalculo = async (
  CalculoPost: PostCalculos
): Promise<PostCalculosResponse> => {
  const postCalculo = await axiosInstance.post(`/api/v1.0/calculos-dcje`, {
    ...CalculoPost,
  });

  return postCalculo.data;
};

export const putCalculo = async (
  CalculoPost: PostCalculos
): Promise<PostCalculosResponse> => {
  const putCalculo = await axiosInstance.put(
    `/api/v1.0/calculos-dcje/${CalculoPost.id}`,
    {
      ...CalculoPost,
    }
  );

  return putCalculo.data;
};

export const postCalculoFinanceiro = async (
  CalculoFinanceiroPost: PostCalculoFinanceiro
): Promise<PostCalculoFinanceiroResponse> => {
  const postCalculoFinanceiro = await axiosInstance.post(
    `/api/v1.0/calculos-financeiros-dcje
`,
    {
      ...CalculoFinanceiroPost,
    }
  );

  return postCalculoFinanceiro.data;
};

export const postCalculoPlanilha = async ({
  id,
  idCalculo,
  idUsuarioCadastro,
}: PostCalculoPlanilhaParams): Promise<PostCalculoPlanilhaResponse> => {
  const postCalculoPlanilha = await axiosInstance.post(
    `/api/v1.0/calculos-planilhas-dcje/${idCalculo}/Calculo
`,
    {
      id,
      idCalculo,
      idUsuarioCadastro,
    }
  );

  return postCalculoPlanilha.data;
};

export const putCalculoPlanilha = async (
  Params: PostCalculoPlanilhaParams
): Promise<PostCalculoPlanilhaResponse> => {
  const putCalculoPlanilha = await axiosInstance.put(
    `/api/v1.0/calculos-planilhas-dcje/${Params.id}/
`,
    {
      ...Params,
    }
  );

  return putCalculoPlanilha.data;
};

export const postCalculoResultado = async (
  Params: PostCalculoResultadoParams
): Promise<PostCalculoResultadoResponse> => {
  const postCalculoRes = await axiosInstance.post(
    `/api/v1.0/calculos-resultados-dcje
`,
    { ...Params }
  );

  return postCalculoRes.data;
};

export const postCalculoEnquadramento = async (
  Params: PostCalculoEnquadramentoParams
): Promise<PostCalculoEnquadramentoResponse> => {
  const postCalculoEnq = await axiosInstance.post(
    `/api/v1.0/calculos-enquadramentos-dcje
`,
    { ...Params }
  );

  return postCalculoEnq.data;
};

export const putCalcularEnquadramentoDevido = async (
  Params: PutCalcularEnquadramentoDevidoParams
): Promise<PutCalcularEnquadramentoDevidoResponse> => {
  const putCalcularEnqDev = await axiosInstance.put(
    `/api/v1.0/calculos-enquadramentos-dcje/${Params.idCalculo}/devido/${Params.idUsuario}
`,
    { ...Params }
  );

  return putCalcularEnqDev.data;
};

export const putCalcularEnquadramentoGratifNat = async (
  Params: PutCalcularEnquadramentoDevidoParams
): Promise<PutCalcularEnquadramentoDevidoResponse> => {
  const putCalcularEnqGratifNat = await axiosInstance.put(
    `/api/v1.0/calculos-financeiros-dcje/${Params.idCalculo}/natalina/${Params.idUsuario}
`,
    { ...Params }
  );

  return putCalcularEnqGratifNat.data;
};

export const putCalcularEnquadramentoFerias = async (
  Params: PutCalcularEnquadramentoDevidoParams
): Promise<PutCalcularEnquadramentoDevidoResponse> => {
  const putCalcularEnqFerias = await axiosInstance.put(
    `/api/v1.0/calculos-financeiros-dcje/${Params.idCalculo}/ferias/${Params.idUsuario}
`,
    { ...Params }
  );

  return putCalcularEnqFerias.data;
};

export const putCalculoResultado = async (
  Params: PostCalculoResultadoParams
): Promise<PostCalculoResultadoResponse> => {
  const putCalculoRes = await axiosInstance.put(
    `/api/v1.0/calculos-resultados-dcje/${Params.id}
`,
    { ...Params }
  );

  return putCalculoRes.data;
};

//URV
export const postCalculoUrv = async (
  Params: PostCalculoUrvParams
): Promise<PostCalculoUrvResponse> => {
  const postCalculoUrv = await axiosInstance.post(
    `/api/v1.0/calculos-financeiros-urv-dcje
`,
    { ...Params }
  );

  return postCalculoUrv.data;
};

export const putCalculoUrv = async (
  Params: PostCalculoUrvParams
): Promise<PostCalculoUrvResponse> => {
  const putCalculoUrv = await axiosInstance.put(
    `/api/v1.0/calculos-financeiros-urv-dcje/${Params.id}
`,
    { ...Params }
  );

  return putCalculoUrv.data;
};

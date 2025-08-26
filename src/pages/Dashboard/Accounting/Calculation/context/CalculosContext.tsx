import { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../api/axiosInstance";
import {
  getCalculosBaseDeCalculo,
  getCalculosDcje,
  getCalculosDcjeResultados,
  getCalculosPlanilhaDeCalculo,
  getCalculosResultadoDoCalculo,
  getErgonRubricaByCalculo,
  getErgonRubricaByidRazaoPedido,
  getErgonRubricaTodos,
  getRespostaDcje,
  getRespostaDcjeCalculado,
} from "../../../../../api/services/RespostaDcje/respostaDcje";
import {
  BaseDeCalculoResponse,
  CalculosDCJEResponse,
  GetCalculosResponse,
  GetRespostaDcjeResponse,
  PlanilhaDeCalculoResponse,
  RespostaDcjeCalculadoResponse,
  ResultadoDoCalculoResponse,
} from "../../../../../api/services/RespostaDcje/respostaDcje.interface";
import { getCalculosDCJEByID } from "../../../../../api/services/calculosDCJE/calculosDCJE";
import { GetResponse } from "../../../../../api/services/calculosDCJE/calculosdcje.interface";
import { getFichaDCJEByID2 } from "../../../../../api/services/fichaDCJE/fichaDCJE";
import { FichaProcessualByIDResponse } from "../../../../../api/services/fichaDCJE/fichadcje.interface";
import { useReasonsRequests } from "../../../../../hooks/useReasonsRequests";
import { useRubricas } from "../../../../../hooks/useRubricas";
import { ExequentesI } from "../interfaces/calculation.interfaces";

export const CalculosContext = createContext<any>({} as any);

export const CalculosProvider = (props: any) => {
  const [respostaCalculo, setRespostaCalculo] = useState<
    GetCalculosResponse | undefined
  >();
  const [isLoadingCalc, setIsLoadingCalc] = useState<boolean>(false);
  const [respostaFichaDCJE, setRespostaFichaDCJE] = useState<
    FichaProcessualByIDResponse | undefined
  >();
  const [isLoadingFichaDCJE, setIsLoadingFichaDCJE] = useState<boolean>(false);
  const [respostaBaseDeCalculo, setRespostaBaseDeCalculo] = useState<
    BaseDeCalculoResponse | undefined
  >();
  const [isLoadingBaseDeCalculo, setIsLoadingBaseDeCalculo] =
    useState<boolean>(false);
  const [respostaPlanilhaDeCalculo, setRespostaPlanilhaDeCalculo] = useState<
    PlanilhaDeCalculoResponse | undefined
  >();
  const [isLoadingPlanilhaDeCalculo, setIsLoadingPlanilhaDeCalculo] =
    useState<boolean>(false);
  const [respostaRespostaDcje, setRespostaRespostaDcje] = useState<
    GetRespostaDcjeResponse | undefined
  >();
  const [isLoadingRespostaRespostaDcje, setIsLoadingRespostaRespostaDcje] =
    useState<boolean>(false);
  const [respostaResultadoDoCalculo, setRespostaResultadoDeCalculo] = useState<
    ResultadoDoCalculoResponse | undefined
  >();
  const [isLoadingResultadoDoCalculo, setIsLoadingResultadoDeCalculo] =
    useState<boolean>(false);
  const [respostaCalculosDcjeById, setRespostaCalculosDcjeById] = useState<
    GetResponse | undefined
  >();
  const [respostaDcjeCalculado, setRespostaDcjeCalculado] = useState<
    RespostaDcjeCalculadoResponse | undefined
  >();
  const [respostaCalculosDcje, setRespostaCalculosDcje] = useState<
    CalculosDCJEResponse | undefined
  >();
  const [isLoadingCalculosDCJE, setIsLoadingCalculosDCJE] =
    useState<boolean>(false);
  const [exequente, setExequente] = useState<ExequentesI>();
  const [assuntos, setAssuntos] = useState([{ label: "", value: null }]);
  const [tipoCalculoContext, setTipoCalculoContext] = useState({
    label: "",
    value: "",
  });
  const [cadastrarCalculo, setCadastrarCalculo] = useState(false);

  const [tipoCalculoDados, setTipoCalculoDados] = useState("");
  const [idCalculo, setIdCalculo] = useState<number>(null);
  const [idCalculoContext, setIdCalculoContext] = useState<number>(null);
  const [vaCalculadoSemResposta, setVaCalculadoSemResposta] =
    useState<number>(null);
  const [isRespostaInicial, setIsRespostaInicial] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<boolean>(false);
  const [nuMatriculaUrv, setNuMatriculaUrv] = useState<string>("");
  const [nuDigitoUrv, setNuDigitoUrv] = useState<string>("");
  const [isErgon, setIsErgon] = useState<number>(null);

  const { id } = useParams();

  // MUTATE
  const {
    mutate: mutateCalculos,
    data: responseCalculos,
    isLoading: isLoadingCalculos,
  } = useMutation(getCalculosDcjeResultados);

  const {
    mutate: mutateFichaDCJE,
    data: responseFichaDCJE,
    isLoading: isLoadingFicha,
  } = useMutation(getFichaDCJEByID2);

  const {
    mutate: mutateBaseDeCalculo,
    data: responseBaseDeCal,
    isLoading: isLoadingBaseDeCalc,
  } = useMutation(getCalculosBaseDeCalculo);

  const {
    mutate: mutatePlanilhaDeCalculo,
    data: responsePlanilhaDeCalc,
    isLoading: isLoadingPlanilhaDeCalc,
  } = useMutation(getCalculosPlanilhaDeCalculo);

  const {
    mutate: mutateResultadoDoCalculo,
    data: responseResultadoDoCalc,
    isLoading: isLoadingResultadoDoCalc,
  } = useMutation(getCalculosResultadoDoCalculo);

  const {
    mutate: mutateRespostaDcje,
    data: responseRespostaDcje,
    isLoading: isLoadingRespostaDcje,
  } = useMutation(getRespostaDcje);

  const {
    mutate: mutateRespostaDcjeCalculado,
    data: responseRespostaDcjeCalculado,
    isLoading: isLoadingRespostaDcjeCalculado,
  } = useMutation(getRespostaDcjeCalculado);

  const {
    mutate: mutateCalculosDCJEById,
    data: responseCalculosDCJEById,
    isLoading: isLoadingCalcDCJEById,
  } = useMutation(getCalculosDCJEByID);

  const {
    mutate: mutateCalculosDCJE,
    data: responseCalculosDCJE,
    isLoading: isLoadingCalcDCJE,
  } = useMutation(getCalculosDcje);

  const {
    mutate: mutateErgonRubrica,
    data: responseErgonRubrica,
    isLoading: isLoadingErgonRubrica,
  } = useMutation(getErgonRubricaByidRazaoPedido);

  const {
    mutate: mutateErgonRubricaTodos,
    data: responseErgonRubricaTodos,
    isLoading: isLoadingErgonRubricaTodos,
  } = useMutation(getErgonRubricaTodos);

  const {
    mutate: mutateErgonRubricaByCalculo,
    data: responseErgonRubricaByCalculo,
    isLoading: isLoadingErgonRubricaByCalculo,
  } = useMutation(getErgonRubricaByCalculo);

  const { reasonsRequestsList, loadingReasonsRequestsList } =
    useReasonsRequests();
  //-----------------------------------------------------------------

  useEffect(() => {
    if (id) {
      mutateCalculos(+id);
      mutateFichaDCJE(+id);
      mutateRespostaDcjeCalculado(+id);
      mutateCalculosDCJE(+id);
    }
  }, [id]);

  // useEffect utilizado para atualizar tabela inicial de calculos quando excluir um deles
  useEffect(() => {
    if (id) {
      mutateCalculosDCJE(+id);
      mutateCalculos(+id);
      // mutateFichaDCJE(+id);
    }
    if (idCalculoContext) {
      mutateCalculosDCJEById(idCalculoContext);
      mutateBaseDeCalculo(idCalculoContext);
      mutatePlanilhaDeCalculo(idCalculoContext);
      mutateResultadoDoCalculo(idCalculoContext);
    } else if (cadastrarCalculo) {
      mutateCalculosDCJEById(null);

      // setRespostaCalculosDcjeById(null);
    }
  }, [updateData]);

  useEffect(() => {
    if (respostaFichaDCJE?.data?.idResposta != 0) {
      mutateRespostaDcje(respostaFichaDCJE?.data?.idResposta);
    }
  }, [respostaFichaDCJE?.data?.idResposta]);

  useEffect(() => {
    if (idCalculoContext) {
      mutateCalculosDCJEById(idCalculoContext);
      mutateBaseDeCalculo(idCalculoContext);
      mutatePlanilhaDeCalculo(idCalculoContext);
      mutateResultadoDoCalculo(idCalculoContext);
    }
  }, [idCalculoContext]);

  // Lista do select de Ergon Rubricas para Base de Cálculo
  interface ErgonRubricaOptions {
    value: number;
    label: string;
  }

  const [listaErgonRubrica, setListaErgonRubrica] = useState<
    ErgonRubricaOptions[]
  >([]);

  useEffect(() => {
    if (responseCalculosDCJEById) {
      mutateErgonRubrica(responseCalculosDCJEById?.data?.idRazaoPedido);
    }
  }, [responseCalculosDCJEById]);

  useEffect(() => {
    if (responseErgonRubrica?.data) {
      const formattedOptions = responseErgonRubrica.data
        .sort((a, b) => a.nuRubrica - b.nuRubrica) // Ordena por nuRubrica
        .map((item) => ({
          value: item.id,
          label: `${item.nuRubrica} - ${item.txRubrica} - ${item.txTipoRubrica}`,
        }));
      setListaErgonRubrica(formattedOptions);
    }
  }, [responseErgonRubrica]);

  // Todos

  const [listaErgonRubricaTodos, setListaErgonRubricaTodos] = useState<
    ErgonRubricaOptions[]
  >([]);
  const [listaErgonRubricaByCalculo, setListaErgonRubricaByCalculo] = useState<
    ErgonRubricaOptions[]
  >([]);
  useEffect(() => {
    if (responseCalculosDCJEById) {
      mutateErgonRubricaTodos();
      mutateErgonRubricaByCalculo(responseCalculosDCJEById?.data?.id);
    }
  }, [responseCalculosDCJEById]);

  useEffect(() => {
    if (responseErgonRubricaTodos?.data) {
      const formattedOptions = responseErgonRubricaTodos.data
        .sort((a, b) => a.nuRubrica - b.nuRubrica) // Ordena por nuRubrica
        .map((item) => ({
          value: item.id,
          label: `${item.nuRubrica} - ${item.txRubrica} - ${item.txTipoRubrica}`,
        }));
      setListaErgonRubricaTodos(formattedOptions);
    }
  }, [responseErgonRubricaTodos]);

  useEffect(() => {
    if (responseErgonRubricaByCalculo?.data) {
      const formattedOptions = responseErgonRubricaByCalculo.data
        .sort((a, b) => a.nuRubrica - b.nuRubrica) // Ordena por nuRubrica
        .map((item) => ({
          value: item.id,
          label: `${item.nuRubrica} - ${item.txRubrica} - ${item.txTipoRubrica}`,
        }));
      setListaErgonRubricaByCalculo(formattedOptions);
    }
  }, [responseErgonRubricaByCalculo]);

  // ----------

  // SIP Rubricas

  const { rubricas, isLoadingRubricas } = useRubricas();

  const [sipRubrica, setSipRubrica] = useState<ErgonRubricaOptions[]>([]);

  useEffect(() => {
    if (rubricas?.data) {
      const formattedOptions = rubricas.data
        .sort((a, b) => a.id - b.id) // Ordena por nuRubrica
        .map((item) => ({
          value: item.id,
          label: `${item.id} - ${item.txSipRubrica}`,
        }));
      setSipRubrica(formattedOptions);
    }
  }, [rubricas]);

  // ----------

  async function getData() {
    setRespostaCalculo(responseCalculos);
    setIsLoadingCalc(isLoadingCalculos);
    setRespostaFichaDCJE(responseFichaDCJE);
    setIsLoadingFichaDCJE(isLoadingFicha);
    setRespostaBaseDeCalculo(responseBaseDeCal);
    setIsLoadingBaseDeCalculo(isLoadingBaseDeCalc);
    setRespostaPlanilhaDeCalculo(responsePlanilhaDeCalc);
    setIsLoadingPlanilhaDeCalculo(isLoadingPlanilhaDeCalc);
    setRespostaResultadoDeCalculo(responseResultadoDoCalc);
    setIsLoadingResultadoDeCalculo(isLoadingResultadoDoCalc);
    setRespostaCalculosDcjeById(responseCalculosDCJEById);
    setRespostaRespostaDcje(responseRespostaDcje);
    setIsLoadingRespostaRespostaDcje(isLoadingRespostaDcje);
    setRespostaCalculosDcje(responseCalculosDCJE);
    setIsLoadingCalculosDCJE(isLoadingCalcDCJEById);
    setAssuntos(reasonsRequestsList);
    setRespostaDcjeCalculado(responseRespostaDcjeCalculado);
    // setTipoCalculoDados(respostaCalculosDCJE)
    // mutateCalculosDCJE(+id);

    // --- Exequente

    if (responseFichaDCJE?.data?.idProcesso) {
      const exequenteRequest = await axiosInstance.get(
        `/api/v1.0/Processos/${responseFichaDCJE?.data?.idProcesso}/partes`
      );
      const responseExe = exequenteRequest?.data?.data?.filter(
        (item: ExequentesI) => item.txPolo === "A"
      );
      const responseExeMap = responseExe?.map((data) => {
        return {
          value: data?.idParte,
          label: data?.txParte,
        };
      });
      setExequente(responseExeMap);
    }
  }

  useEffect(() => {
    if (
      responseCalculos ||
      responseFichaDCJE ||
      responseBaseDeCal ||
      responsePlanilhaDeCalc ||
      responseResultadoDoCalc ||
      responseCalculosDCJEById ||
      responseCalculosDCJE ||
      responseRespostaDcje
    )
      getData();
  }, [
    responseCalculos,
    responseFichaDCJE,
    responseBaseDeCal,
    responsePlanilhaDeCalc,
    responseResultadoDoCalc,
    responseCalculosDCJEById,
    responseCalculosDCJE,
    responseRespostaDcje,
  ]);

  const setNuMatriculaUrvFunc = (data) => {
    setNuMatriculaUrv(data);
  };
  const setNuDigitoUrvFunc = (data) => {
    setNuDigitoUrv(data);
  };
  const setIsErgonFunc = (data) => {
    setIsErgon(data);
  };

  return (
    <CalculosContext.Provider
      value={{
        respostaCalculo,
        isLoadingCalc,
        respostaFichaDCJE,
        isLoadingFichaDCJE,
        respostaBaseDeCalculo,
        isLoadingBaseDeCalculo,
        respostaPlanilhaDeCalculo,
        isLoadingPlanilhaDeCalculo,
        respostaResultadoDoCalculo,
        isLoadingResultadoDoCalculo,
        respostaCalculosDcjeById,
        setRespostaCalculosDcjeById,
        isLoadingCalculosDCJE,
        exequente,
        assuntos,
        tipoCalculoContext,
        setTipoCalculoContext,
        idCalculo,
        setIdCalculo,
        idCalculoContext,
        setIdCalculoContext,
        getData,
        vaCalculadoSemResposta,
        setVaCalculadoSemResposta,
        respostaDcjeCalculado,
        setRespostaDcjeCalculado,
        respostaRespostaDcje,
        isLoadingRespostaRespostaDcje,
        isRespostaInicial,
        setIsRespostaInicial,
        respostaCalculosDcje,
        setRespostaCalculosDcje,
        updateData,
        setUpdateData,
        cadastrarCalculo,
        setCadastrarCalculo,
        listaErgonRubrica,
        listaErgonRubricaTodos,
        listaErgonRubricaByCalculo,
        sipRubrica,
        nuMatriculaUrv,
        setNuMatriculaUrv,
        nuDigitoUrv,
        setNuDigitoUrv,
        setNuMatriculaUrvFunc,
        setNuDigitoUrvFunc,
        setIsErgonFunc,
        isErgon,
      }}
    >
      {props.children}
    </CalculosContext.Provider>
  );
};

export const useCalculosContext = () => {
  const context = useContext(CalculosContext);

  if (!context) {
    throw new Error(
      "useSpecificContext must be used within a SpecificProvider"
    );
  }
  return context;
};

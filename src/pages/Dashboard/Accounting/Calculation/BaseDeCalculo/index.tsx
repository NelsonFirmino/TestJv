import { CaretLeft, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  getBaseDeCalculoEnq,
  getCalcFinancUrvById,
  getCalculoEnquadramento,
  getErgonCargoFuncao,
  getErgonCategSubcateg,
  getErgonServidorFinanceiro,
  getErgonServidorFinanceiroFiltrar,
  getErgonServidorFinanceiroFiltrarComRub,
  getErgonServidorFinanceiroPorCalc,
  getErgonServidorHistorico,
  postCalculoEnquadramento,
  postCalculoFinanceiro,
  postCalculoPlanilha,
  postCalculoUrv,
  putCalcularEnquadramentoDevido,
  putCalcularEnquadramentoFerias,
  putCalcularEnquadramentoGratifNat,
  putCalculoUrv,
} from "../../../../../api/services/RespostaDcje/respostaDcje";
import { CustomTable } from "../../../../../components/CustomTable";
import { PageTitle } from "../../../../../components/TitlePage";
import { SharedState } from "../../../../../context/SharedContext";
import { formatToBrazilianDate } from "../../../../../utils/formatToBrazilianDate.util";
import { ExcluirDadosCalculo } from "../../DadosCalculo/ExcluirDadosCalculo";
import { HomePageIcon, RedirectPage } from "../Calculos/styled";
import { LinkEdit } from "../components/LinkEdit";
import { useCalculosContext } from "../context/CalculosContext";
import { CALC, SubmitCalculo } from "../interfaces/calculation.interfaces";
import { ExcluirCalculoEnquadramento } from "./ExcluirCalculoEnquadramento";
import { ExcluirCalculoUrv } from "./ExcluirCalculoUrv";
import { ExcluirPeriodo } from "./ExcluirPeriodoDifDiv";
import { ExcluirCalculoFinanceiro } from "./modals/ExcluirCalculoFinanceiro";
import * as S from "./styled";

const BaseDeCalculo = (props: CALC) => {
  const {
    tipoCalculoContext,
    respostaCalculo,
    isLoadingCalc,
    respostaFichaDCJE,
    isLoadingFichaDCJE,
    respostaBaseDeCalculo,
    isLoadingBaseDeCalculo,
    setIsRespostaInicial,
    respostaCalculosDcjeById,
    idCalculoContext,
    listaErgonRubrica,
    listaErgonRubricaTodos,
    listaErgonRubricaByCalculo,
    updateData,
    setUpdateData,
    cadastrarCalculo,
    setTipoCalculoContext,
    setCadastrarCalculo,
    nuMatriculaUrv,
    setNuMatriculaUrv,
    nuDigitoUrv,
    setNuDigitoUrv,
    sipRubrica,
    isErgon,
    respostaPlanilhaDeCalculo,
    respostaResultadoDoCalculo,
  } = useCalculosContext();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitCalculo>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

  const [somaVaResultadoTotal, setSomaVaRecebido] = useState(null);
  const [somaVaExecucao, setSomaVaDevido] = useState(null);
  const [somaVaDiferenca, setSomaVaDiferenca] = useState(null);
  const [isOpenExcluirModal, setOpenExcluirModal] = useState(false);
  const [valorDevido, setValorDevido] = useState(null);
  const [valorRecebido, setValorRecebido] = useState(null);
  const [valorFixo, setValorFixo] = useState(null);
  const [percentual, setPercentual] = useState(null);
  const [dtBase, setDtBase] = useState("");
  const [dtAte, setDtAte] = useState("");
  const [dtInicio, setDtInicio] = useState("");
  const [dtFim, setDtFim] = useState("");
  const [dtInicioErgon, setDtInicioErgon] = useState("");
  const [dtFimErgon, setDtFimErgon] = useState("");
  const [ergonRubrica, setErgonRubrica] = useState({
    label: "",
    value: null,
  });
  const [sipRubricaSelected, setSipRubricaSelected] = useState({
    label: "",
    value: null,
  });
  const [ergonRubricaEnq, setErgonRubricaEnq] = useState({
    label: "",
    value: null,
  });
  const [ergonRubricaErgEnq, setErgonRubricaErgEnq] = useState({
    label: "",
    value: null,
  });
  const [ergonRubricaErgon, setErgonRubricaErgon] = useState({
    label: "",
    value: null,
  });
  const [selectErgonRubrica, setSelectErgonRubrica] = useState(null);
  const [selectErgonRubricaEnq, setSelectErgonRubricaEnq] = useState(null);
  const [selectErgonRubricaUrv, setSelectErgonRubricaUrv] = useState(null);
  const [selectAlterarCategEnq, setSelectAlterarCategEnq] = useState(null);
  const [selectAlterarCargFuncEnq, setSelectAlterarCargFuncEnq] =
    useState(null);
  const [alterarButton, setAlterarButton] = useState(false);
  const [alterarButtonEnq, setAlterarButtonEnq] = useState(false);
  const [alterarButtonUrv, setAlterarButtonUrv] = useState(false);
  const [alterarId, setAlterarId] = useState(null);
  const [alterarIdEnq, setAlterarIdEnq] = useState(null);
  const [alterarIdUrv, setAlterarIdUrv] = useState(null);
  const [editButton, setEditButton] = useState(0);
  const [editButtonEnq, setEditButtonEnq] = useState(0);
  const [editButtonUrv, setEditButtonUrv] = useState(0);
  const [jornada, setJornada] = useState(null);
  const [referencia, setReferencia] = useState<string>("");
  const [selectedCategSubcateg, setSelectedCategSubcateg] =
    useState<CategoriaSubcategoriaOptions>({
      label: "",
      value: null,
      dataId: null,
    });
  const [selectedCargoFuncao, setSelectedCargoFuncao] = useState({
    label: "",
    value: null,
  });
  const [ano, setAno] = useState<string>("");
  const [janeiro, setJaneiro] = useState(null);
  const [fevereiro, setFevereiro] = useState(null);
  const [marco, setMarco] = useState(null);
  const [abril, setAbril] = useState(null);
  const [maio, setMaio] = useState(null);
  const [junho, setJunho] = useState(null);
  const [julho, setJulho] = useState(null);
  const [agosto, setAgosto] = useState(null);
  const [setembro, setSetembro] = useState(null);
  const [outubro, setOutubro] = useState(null);
  const [novembro, setNovembro] = useState(null);
  const [dezembro, setDezembro] = useState(null);
  const [idRubricaText, setIdRubricaText] = useState("");
  const [dtIniText, setDtIniText] = useState("");
  const [dtFimText, setDtFimText] = useState("");

  // Lista do select de Ergon Categorias e Subcategorias
  interface CategoriaSubcategoriaOptions {
    value: number;
    label: string;
    dataId?: number;
  }

  const [categSubcateg, setCategSubcateg] = useState<
    CategoriaSubcategoriaOptions[]
  >([]);

  // Lista do select de Ergon Cargos e Funções
  interface CargoFuncaoOptions {
    value: number;
    label: string;
  }

  const [cargoFuncao, setCargoFuncao] = useState<CargoFuncaoOptions[]>([]);

  // Lista do select de Incidência
  interface Incidencias {
    value: number;
    label: string;
  }

  const [nuIncidencia, setNuIncidencia] = useState<Incidencias>();

  const incidenciaOptions = [
    { value: 1, label: "Verba de caráter permanente" },
    {
      value: 2,
      label:
        "Rubrica não entra na média porque é paga em percentual sobre o vencimento básico (art. 19, §1º, “d”, e art. 22, §3º, da Lei 8.880/94)",
    },
    {
      value: 3,
      label:
        " Não entra na média porque é uma verba de natureza não habitual (art. 19, §1º, “b”, da Lei 8.880/94)",
    },
  ];

  const {
    mutate: mutateErgonCategSubcateg,
    data: responseErgonCategSubcateg,
    isLoading: isLoadingErgonCategSubcateg,
  } = useMutation(getErgonCategSubcateg);

  const {
    mutate: mutateErgonCargoFuncao,
    data: responseErgonCargoFuncao,
    isLoading: isLoadingErgonCargoFuncao,
  } = useMutation(getErgonCargoFuncao);

  const {
    mutate: mutateErgonServidorFinanceiro,
    data: responseErgonServidorFinanceiro,
    isLoading: isLoadingErgonServidorFinanceiro,
  } = useMutation(getErgonServidorFinanceiro);

  const {
    mutate: mutateErgonServidorFinanceiroFilt,
    data: responseErgonServidorFinanceiroFilt,
    isLoading: isLoadingErgonServidorFinanceiroFilt,
  } = useMutation(getErgonServidorFinanceiroFiltrar);

  const {
    mutate: mutateErgonServidorFinanceiroPorCalc,
    data: responseErgonServidorFinanceiroPorCalc,
    isLoading: isLoadingErgonServidorFinanceiroPorCalc,
  } = useMutation(getErgonServidorFinanceiroPorCalc);

  const {
    mutate: mutateErgonServidorFinanceiroFiltComRub,
    data: responseErgonServidorFinanceiroFiltComRub,
    isLoading: isLoadingErgonServidorFinanceiroFiltComRub,
  } = useMutation(getErgonServidorFinanceiroFiltrarComRub);

  const {
    mutate: mutateCalculoEnquadramento,
    data: responseCalculoEnquadramento,
    isLoading: isLoadingCalculoEnquadramento,
  } = useMutation(getCalculoEnquadramento);

  const {
    mutate: mutateErgonServidorHistorico,
    data: responseErgonServidorHistorico,
    isLoading: isLoadingErgonServidorHistorico,
  } = useMutation(getErgonServidorHistorico);

  const {
    mutate: mutateErgonCalcEnq,
    data: responseErgonCalcEnq,
    isLoading: isLoadingErgonCalcEnq,
  } = useMutation(getBaseDeCalculoEnq);

  const {
    mutate: mutateCalcFinanUrvById,
    data: responseCalcFinanUrvById,
    isLoading: isLoadingCalcFinanUrvById,
  } = useMutation(getCalcFinancUrvById);

  useEffect(() => {
    if (respostaCalculosDcjeById?.data?.txTipoCalculo == "ENQ") {
      mutateErgonCategSubcateg();
    }
  }, [props.pageName, respostaCalculosDcjeById]);

  useEffect(() => {
    if (respostaCalculosDcjeById?.data?.txTipoCalculo == "URV") {
      mutateCalcFinanUrvById(respostaCalculosDcjeById?.data?.id);
    }
  }, [respostaCalculosDcjeById]);

  //Enquadramento
  useEffect(() => {
    if (responseErgonCategSubcateg?.data) {
      const formattedOptions = responseErgonCategSubcateg?.data?.map(
        (item: any) => ({
          dataId: item?.idErgonCategoria,
          label: `${item?.txCategoria} / ${item?.txSubcategoria}`,
          value: Math.floor(Math.random() * 100000),
        })
      );
      setCategSubcateg(formattedOptions);
    }
  }, [responseErgonCategSubcateg, respostaBaseDeCalculo]);

  //Enquadramento
  const handleErgonCategSubcateg = (data) => {
    setSelectedCategSubcateg(data);
    setSelectedCargoFuncao(null);
  };

  useEffect(() => {
    if (respostaCalculosDcjeById?.data?.txTipoCalculo == "ENQ") {
      mutateCalculoEnquadramento(idCalculoContext);
    }
  }, [respostaCalculosDcjeById]);

  //useEffect para cargo e função
  useEffect(() => {
    if (responseErgonCategSubcateg?.data && selectedCategSubcateg) {
      const novoLabel = selectedCategSubcateg?.label?.split("/")[1]?.trim();
      mutateErgonCargoFuncao({
        idErgonCategoria: selectedCategSubcateg?.dataId,
        txSubcategoria: novoLabel,
      });
    }
  }, [selectedCategSubcateg]);

  useEffect(() => {
    if (responseErgonCargoFuncao) {
      const formattedOptions = responseErgonCargoFuncao.data.map(
        (item: any) => ({
          value: item.id,
          label: `${item.txCargoFuncao} - ${item.nuCodigoCargoFuncao}`,
        })
      );
      setCargoFuncao(formattedOptions);
    }
  }, [responseErgonCargoFuncao]);

  useEffect(() => {
    if (respostaBaseDeCalculo?.data) {
      setSomaVaDevido(
        respostaBaseDeCalculo?.data.reduce(
          (acumulador, objeto) => acumulador + objeto.vaDevido,
          0
        )
      );

      setSomaVaRecebido(
        respostaBaseDeCalculo?.data.reduce(
          (acumulador, objeto) => acumulador + objeto.vaRecebido,
          0
        )
      );

      setSomaVaDiferenca(
        respostaBaseDeCalculo?.data.reduce(
          (acumulador, objeto) => acumulador + objeto.vaDiferneca,
          0
        )
      );
    }
  }, [respostaBaseDeCalculo]);

  const onSubmit: SubmitHandler<SubmitCalculo> = (data) => {};

  const inputColor = () => {
    if (somaVaDiferenca! > 0) {
      return "blue";
    } else if (somaVaDiferenca! == 0) {
      return "black";
    } else {
      return "red";
    }
  };

  const formatarNumero = (numero: any) => {
    return (Number(numero) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const handleValorDevido = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setValorDevido(valorNumerico);
  };

  const handleValorRecebido = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setValorRecebido(valorNumerico);
  };

  const handleDataBase = (event: any) => {
    const data = event.target.value;
    setDtBase(data);
  };

  const handleDataAte = (event: any) => {
    const data = event.target.value;
    setDtAte(data);
  };

  const handleErgonRubrica = (data: any) => {
    setErgonRubrica(data);
  };

  const handleSipRubricaSelected = (data: any) => {
    setSipRubricaSelected(data);
  };

  const handleNuIncidencia = (data: any) => {
    setNuIncidencia(data);
  };

  const handleJaneiro = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setJaneiro(valorNumerico);
  };

  const handleFevereiro = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setFevereiro(valorNumerico);
  };

  const handleMarco = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setMarco(valorNumerico);
  };

  const handleAbril = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setAbril(valorNumerico);
  };

  const handleMaio = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setMaio(valorNumerico);
  };

  const handleJunho = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setJunho(valorNumerico);
  };

  const handleJulho = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setJulho(valorNumerico);
  };

  const handleAgosto = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setAgosto(valorNumerico);
  };

  const handleSetembro = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setSetembro(valorNumerico);
  };

  const handleOutubro = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setOutubro(valorNumerico);
  };

  const handleNovembro = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setNovembro(valorNumerico);
  };

  const handleDezembro = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setDezembro(valorNumerico);
  };

  const handleErgonCargoFuncao = (data) => {
    setSelectedCargoFuncao(data);
  };

  const handleDataInicio = (event: any) => {
    const data = event.target.value;
    setDtInicio(data);
  };

  const handleDataFim = (event: any) => {
    const data = event.target.value;
    setDtFim(data);
  };

  const handleDataInicioErgon = (event: any) => {
    const data = event.target.value;
    setDtInicioErgon(data);
  };

  const handleDataFimErgon = (event: any) => {
    const data = event.target.value;
    setDtFimErgon(data);
  };

  const handleErgonRubricaEnq = (data: any) => {
    setErgonRubricaEnq(data);
  };

  const handleErgonRubricaErgEnq = (data: any) => {
    setErgonRubricaErgEnq(data);
  };

  const handleErgonRubricaErgon = (data: any) => {
    setErgonRubricaErgon(data);
  };

  const handleValorFixo = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setValorFixo(valorNumerico);
  };

  const handlePercentual = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setPercentual(valorNumerico);
  };

  const handleJornada = (event) => {
    const jorn = event.target.value.replace(/\D/g, "");
    setJornada(jorn);
  };

  const handleReferencia = (event) => {
    const refer = event.target.value;
    setReferencia(refer);
  };

  const handleAno = (event) => {
    const ano = event.target.value.replace(/\D/g, "");
    setAno(ano);
  };

  const refresh = () => {
    setDtBase("");
    setErgonRubrica(null);
    setValorDevido(null);
  };

  const refreshDif = () => {
    setDtBase("");
    setDtAte("");
    setErgonRubrica(null);
    setValorDevido(null);
    setValorRecebido(null);
  };

  const refreshErgonEnq = () => {
    setDtInicioErgon("");
    setDtFimErgon("");
    setErgonRubricaErgEnq(null);
  };

  const refreshSipFinanceiro = () => {
    setJaneiro("");
    setFevereiro("");
    setMarco("");
    setAbril("");
    setMaio("");
    setJunho("");
    setJulho("");
    setAgosto("");
    setSetembro("");
    setOutubro("");
    setNovembro("");
    setDezembro("");
    setAno("");
    setSipRubricaSelected(null);
    setNuIncidencia(null);
  };

  const refreshEnq = () => {
    setDtInicio("");
    setDtFim("");
    setErgonRubricaEnq(null);
    setSelectedCategSubcateg(null);
    setSelectedCargoFuncao(null);
    setValorFixo(null);
    setJornada(null);
    setReferencia("");
    setPercentual(null);
  };

  useEffect(() => {
    if (listaErgonRubrica && selectErgonRubrica) {
      const foundObject = listaErgonRubrica.find(
        (item) => item.value === selectErgonRubrica
      );
      setErgonRubrica(foundObject || null);
    }
  }, [editButton]);

  //Enquadramento
  useEffect(() => {
    if (listaErgonRubrica && selectErgonRubricaEnq) {
      const foundObject = listaErgonRubrica.find(
        (item) => item.value === selectErgonRubricaEnq
      );
      setErgonRubricaEnq(foundObject || null);
    }
    if (categSubcateg && selectAlterarCategEnq) {
      const foundObject = categSubcateg.find(
        (item) => item.dataId === selectAlterarCategEnq
      );
      setSelectedCategSubcateg(foundObject || null);
    }
  }, [editButtonEnq]);

  useEffect(() => {
    if (selectAlterarCargFuncEnq) {
      const foundObject = cargoFuncao?.find(
        (item) => item.value === selectAlterarCargFuncEnq
      );
      setSelectedCargoFuncao(foundObject || null);
    }
  }, [editButtonEnq, selectAlterarCategEnq]);

  //URV
  useEffect(() => {
    if (sipRubrica && selectErgonRubricaUrv) {
      const foundObject = sipRubrica.find(
        (item) => item.value === selectErgonRubricaUrv
      );
      setSipRubricaSelected(foundObject || null);
    }
  }, [editButtonUrv]);

  useEffect(() => {
    if (respostaBaseDeCalculo) {
      setErgonRubrica(null);
      setErgonRubricaEnq(null);
      setSelectedCategSubcateg(null);
      setSelectedCargoFuncao(null);
    }
  }, [respostaBaseDeCalculo]);

  useEffect(() => {
    if (updateData) {
      setAlterarButton(false);
    }
  }, [updateData]);

  const handleToast = (msg: string, error?: boolean) => {
    !error
      ? toast(msg, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
    if (error == false) {
      setUpdateData(!updateData);
      refreshDif();
      refreshErgonEnq();
    }
    if (respostaCalculosDcjeById?.data?.txTipoCalculo == "URV") {
      refreshSipFinanceiro();
    }
  };

  const handleToast2 = (msg: string, error: boolean) => {
    !error
      ? toast(msg, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
    setUpdateData(!updateData);
  };

  const handleToast3 = (msg: string, error?: boolean) => {
    !error
      ? toast(msg, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
  };

  const handleToastEnq = (msg: string, error: boolean) => {
    !error
      ? toast(msg, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        }) &&
        setUpdateData(!updateData) &&
        mutateCalculoEnquadramento(idCalculoContext)
      : toast.error(msg, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
    refreshEnq();
    setAlterarButtonEnq(false);
  };

  const postCalcFinanceiro = (id?: number) => {
    postCalculoFinanceiro({
      id: id,
      idCalculo: respostaCalculosDcjeById?.data.id,
      idUsuarioCadastro: +user["Jvris.User.Id"],
      dtBase: dtBase,
      idErgonRubrica: ergonRubrica.value,
      vaRecebido: 0,
      vaDevido: valorDevido / 100,
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToast("Cálculo financeiro cadastrado com sucesso", false);
          setAlterarButton(false);
        } else {
          handleToast("Erro ao Cadastrar Cálculo Financeiro", true);
        }
      })
      .catch((err) => {
        handleToast("Erro ao Cadastrar Cálculo Financeiro", true);
      });
  };

  // Converter as strings para objetos Date
  let baseDate = new Date(dtBase);
  let endDate = new Date(dtAte);

  console.log("ergonRubricaErgon:", ergonRubricaErgon);

  //Diferenças diversas
  const postCalcFinanceiro2 = async (id?: number) => {
    let count = 0;
    if (endDate && endDate >= baseDate) {
      while (baseDate <= endDate) {
        try {
          const response = await postCalculoFinanceiro({
            id: id,
            idCalculo: respostaCalculosDcjeById?.data.id,
            idUsuarioCadastro: +user["Jvris.User.Id"],
            dtBase: baseDate.toISOString().split("T")[0],
            idErgonRubrica: ergonRubrica.value,
            vaRecebido: valorRecebido / 100,
            vaDevido: valorDevido / 100,
          });

          if (response.status == "Created") {
            count++;
          } else {
            handleToast("Erro ao Cadastrar Cálculo Financeiro", true);
          }
        } catch (err) {
          handleToast("Erro ao Cadastrar Cálculo Financeiro", true);
        }

        baseDate.setMonth(baseDate.getMonth() + 1);
      }

      handleToast(
        `Cálculo financeiro cadastrado com sucesso. ${count} meses incluídos`,
        false
      );
    } else if (endDate && endDate < baseDate) {
      handleToast3("A data final deve ser superior à data inicial", true);
    } else {
      try {
        const response = await postCalculoFinanceiro({
          id: id,
          idCalculo: respostaCalculosDcjeById?.data.id,
          idUsuarioCadastro: +user["Jvris.User.Id"],
          dtBase: baseDate.toISOString().split("T")[0],
          idErgonRubrica: ergonRubrica.value,
          vaRecebido: valorRecebido / 100,
          vaDevido: valorDevido / 100,
        });

        if (response.status == "Created") {
          handleToast(`Cálculo financeiro cadastrado com sucesso`, false);
        } else {
          handleToast("Erro ao Cadastrar Cálculo Financeiro", true);
        }
      } catch (err) {
        handleToast("Erro ao Cadastrar Cálculo Financeiro", true);
      }
    }

    setAlterarButton(false);
  };

  const postCalculoFinanceiroPlanilha = (id?: number) => {
    postCalculoPlanilha({
      id: 0,
      idCalculo: respostaCalculosDcjeById?.data.id,
      idUsuarioCadastro: +user["Jvris.User.Id"],
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToast2("Planilha calculada com sucesso", false);
          props.setPageName("PLANILHACALC");
        } else {
          handleToast2("Erro ao calcular planilha", true);
        }
      })
      .catch((err) => {
        handleToast2("Erro ao calcular planilha", true);
      });
  };

  //Importar do Ergon - ATR e DIF

  const getErgonServidorFinanceiroFunc = () => {
    if (respostaCalculosDcjeById?.data?.txTipoCalculo == "IND") {
      mutateErgonServidorFinanceiro({
        idCalculo: respostaCalculosDcjeById?.data.id,
        dtInicio: dtInicioErgon,
        dtFim: "",
        idUsuario: +user["Jvris.User.Id"],
      });
    } else {
      mutateErgonServidorFinanceiro({
        idCalculo: respostaCalculosDcjeById?.data.id,
        dtInicio: dtInicioErgon,
        dtFim: dtFimErgon,
        idUsuario: +user["Jvris.User.Id"],
      });
    }
  };

  useEffect(() => {
    if (responseErgonServidorFinanceiro) {
      if (
        responseErgonServidorFinanceiro?.status == "OK" &&
        respostaCalculosDcjeById?.data?.txTipoCalculo !== "ENQ"
      ) {
        mutateErgonServidorFinanceiroFilt({
          idCalculo: respostaCalculosDcjeById?.data.id,
          dtInicio: dtInicioErgon,
          dtFim: dtFimErgon,
          idUsuario: +user["Jvris.User.Id"],
        });
      } else if (
        responseErgonServidorFinanceiro?.status == "OK" &&
        respostaCalculosDcjeById?.data?.txTipoCalculo == "ENQ"
      ) {
        mutateErgonServidorFinanceiroPorCalc(idCalculoContext);
        handleToast("Financeiro do(s) Servidor(es) importado(s)", false);
      } else {
        handleToast("Erro ao importar Ergon", true);
      }
    }
  }, [responseErgonServidorFinanceiro]);

  useEffect(() => {
    if (responseErgonServidorFinanceiroFilt?.status == "OK") {
      handleToast("Financeiro do(s) Servidor(es) importado(s)", false);
    }
  }, [responseErgonServidorFinanceiroFilt]);

  // Importar enquadramento

  const importarEnq = () => {
    mutateErgonServidorHistorico({
      idCalculo: respostaCalculosDcjeById?.data.id,
      dtInicio: dtInicioErgon,
      dtFim: dtFimErgon,
      idUsuario: +user["Jvris.User.Id"],
    });
  };

  useEffect(() => {
    if (responseErgonServidorHistorico) {
      if (responseErgonServidorHistorico?.status == "OK") {
        handleToast("Histórico(s) Servidor(es) importado(s)", false);
      } else {
        handleToast("Erro ao importar Histórico", true);
      }
    }
  }, [responseErgonServidorHistorico]);

  const getErgonServidorFinanceiroFuncComRub = () => {
    mutateErgonServidorFinanceiroFiltComRub({
      idCalculo: respostaCalculosDcjeById?.data.id,
      dtInicio: dtInicioErgon,
      dtFim: dtFimErgon,
      idRubrica: ergonRubricaErgon?.value,
      idUsuario: +user["Jvris.User.Id"],
    });
  };

  const getErgonServidorFinanceiroFuncComRubEnq = () => {
    mutateErgonServidorFinanceiroFiltComRub({
      idCalculo: respostaCalculosDcjeById?.data.id,
      dtInicio: dtInicioErgon,
      dtFim: dtFimErgon,
      idRubrica: ergonRubricaErgEnq?.value,
      idUsuario: +user["Jvris.User.Id"],
    });
  };

  useEffect(() => {
    if (responseErgonServidorFinanceiroFiltComRub) {
      if (responseErgonServidorFinanceiroFiltComRub?.status == "OK") {
        mutateErgonCalcEnq(idCalculoContext);
        handleToast("Financeiro do(s) Servidor(es) importado(s)", false);
      } else {
        handleToast("Erro ao importar Ergon", true);
      }
    }
  }, [responseErgonServidorFinanceiroFiltComRub]);

  //Enquadramento
  const postCalculoEnq = (id?: number) => {
    postCalculoEnquadramento({
      id: id ? id : 0,
      idCalculo: respostaCalculosDcjeById?.data.id,
      idUsuarioCadastro: +user["Jvris.User.Id"],
      dtInicio: dtInicio,
      dtFim: dtFim,
      idErgonRubrica: ergonRubricaEnq?.value,
      nuJornada: jornada,
      vaFixo: valorFixo / 100,
      idErgonCategoria: selectedCategSubcateg?.dataId,
      idErgonCargoFuncao: selectedCargoFuncao?.value,
      txReferencia: referencia,
      vaPercentual: percentual / 100,
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToastEnq("Enquadramento incluído com sucesso", false);
        } else {
          handleToastEnq("Erro ao incluir enquadrameno", true);
        }
      })
      .catch((err) => {
        handleToastEnq("Erro ao incluir enquadrameno", true);
      });
  };

  //Enquadramento
  const putCalcularEnqDev = () => {
    putCalcularEnquadramentoDevido({
      idCalculo: respostaCalculosDcjeById?.data.id,
      idUsuario: +user["Jvris.User.Id"],
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToastEnq("Valor devido foi calculado", false);
        } else {
          handleToastEnq("Erro ao calcular valor devido", true);
        }
      })
      .catch((err) => {
        handleToastEnq("Erro ao calcular valor devido", true);
      });
  };

  //Enquadramento
  const putCalcularEnqDevGratifNat = () => {
    putCalcularEnquadramentoGratifNat({
      idCalculo: respostaCalculosDcjeById?.data.id,
      idUsuario: +user["Jvris.User.Id"],
    })
      .then((response) => {
        if (response.status == "OK") {
          handleToastEnq("Valor da gratificação natalina foi calculado", false);
        } else {
          handleToastEnq("Erro ao calcular gratificação natalina", true);
        }
      })
      .catch((err) => {
        handleToastEnq("Erro ao calcular gratificação natalina", true);
      });
  };

  //Enquadramento
  const putCalcularEnqFerias = () => {
    putCalcularEnquadramentoFerias({
      idCalculo: respostaCalculosDcjeById?.data.id,
      idUsuario: +user["Jvris.User.Id"],
    })
      .then((response) => {
        if (response.status == "OK") {
          handleToastEnq("Valor de férias foi calculado", false);
        } else {
          handleToastEnq("Erro ao calcular valor de férias", true);
        }
      })
      .catch((err) => {
        handleToastEnq("Erro ao calcular valor de férias", true);
      });
  };

  //URV - SIP Financeiro
  const postCalcUrv = (id?: number) => {
    postCalculoUrv({
      id: null,
      idCalculo: respostaCalculosDcjeById?.data.id,
      nuAno: +ano,
      idSipRubrica: sipRubricaSelected?.value,
      nuIncidencia: nuIncidencia?.value,
      vaJaneiro: janeiro / 100,
      vaFevereiro: fevereiro / 100,
      vaMarco: marco / 100,
      vaAbril: abril / 100,
      vaMaio: maio / 100,
      vaJunho: junho / 100,
      vaJulho: julho / 100,
      vaAgosto: agosto / 100,
      vaSetembro: setembro / 100,
      vaOutubro: outubro / 100,
      vaNovembro: novembro / 100,
      vaDezembro: dezembro / 100,
      idUsuarioCadastro: +user["Jvris.User.Id"],
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToast("Financeiro SIP cadastrado com sucesso", false);
        } else {
          handleToast("Erro ao cadastrar financeiro SIP", true);
        }
      })
      .catch((err) => {
        handleToast("Erro ao cadastrar financeiro SIP", true);
      });
  };

  const putCalcUrv = (id?: number) => {
    putCalculoUrv({
      id: alterarIdUrv,
      idCalculo: respostaCalculosDcjeById?.data.id,
      nuAno: +ano,
      idSipRubrica: sipRubricaSelected?.value,
      nuIncidencia: nuIncidencia?.value,
      vaJaneiro: janeiro / 100,
      vaFevereiro: fevereiro / 100,
      vaMarco: marco / 100,
      vaAbril: abril / 100,
      vaMaio: maio / 100,
      vaJunho: junho / 100,
      vaJulho: julho / 100,
      vaAgosto: agosto / 100,
      vaSetembro: setembro / 100,
      vaOutubro: outubro / 100,
      vaNovembro: novembro / 100,
      vaDezembro: dezembro / 100,
      idUsuarioCadastro: +user["Jvris.User.Id"],
    })
      .then((response) => {
        if (response.status == "OK") {
          handleToast("Financeiro SIP atualizado com sucesso", false);
        } else {
          handleToast("Erro ao atualizar financeiro SIP", true);
        }
      })
      .catch((err) => {
        handleToast("Erro ao atualizar financeiro SIP", true);
      });
  };

  return (
    <>
      <PageTitle
        pageTitle="BASE DE CÁLCULO - DCJE"
        pageIcon={<S.PageIcon />}
        button={
          <RedirectPage
            onClick={() => (
              props.setPageName("LISTACALCrespostaFichaDCJE"),
              setUpdateData(!updateData),
              setCadastrarCalculo(false),
              setTipoCalculoContext(null)
            )}
          >
            <HomePageIcon alt="Início do cálculo" />
          </RedirectPage>
        }
      />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.ContainerButtons>
          <S.VoltarButton
            onClick={() => {
              props.setPageName("DADOSCALC");
            }}
          >
            <CaretLeft
              size={16}
              color="white"
              style={{ marginLeft: "-1rem" }}
            />
            <span
              style={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                color: "white",
              }}
            >
              Voltar
            </span>
          </S.VoltarButton>
          <S.AbaButton
            isCurrent={false}
            onClick={() => {
              props.setPageName("DADOSCALC");
            }}
          >
            Dados
          </S.AbaButton>
          <S.AbaButton
            isCurrent={true}
            onClick={() => {
              props.setPageName("BASECALC");
            }}
          >
            Financeiro
          </S.AbaButton>
          {respostaPlanilhaDeCalculo?.data && (
            <>
              <S.AbaButton
                isCurrent={false}
                onClick={() => {
                  props.setPageName("PLANILHACALC");
                }}
              >
                Ver Cálculo
              </S.AbaButton>

              {respostaResultadoDoCalculo?.data && (
                <>
                  <S.AbaButton
                    isCurrent={false}
                    onClick={() => {
                      props.setPageName("RESULTADOCALC");
                    }}
                  >
                    Ver Resultado
                  </S.AbaButton>

                  <S.AbaButton
                    isCurrent={false}
                    onClick={() => {
                      setIsRespostaInicial(false);
                      props.setPageName("RESPOSTACALC");
                    }}
                  >
                    Resposta
                  </S.AbaButton>
                </>
              )}
            </>
          )}
        </S.ContainerButtons>
        <S.Wrapper>
          {respostaFichaDCJE?.data ? (
            <S.Section
              style={{
                marginTop: "3rem",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>Solicitação:</S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>
                    {respostaFichaDCJE.data.id}
                  </S.SectionDataInfo>
                  <MagnifyingGlass
                    size={16}
                    alt="Ficha Processual"
                    style={{
                      cursor: "pointer",
                      marginTop: "-1.2rem",
                      marginLeft: "1rem",
                    }}
                    onClick={() =>
                      navigate(
                        `/dashboard/dcje/ficha-processual/${respostaFichaDCJE?.data.idAto}`
                      )
                    }
                  />
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>

              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>Processo:</S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>
                    {respostaFichaDCJE.data.txNumeroFormatado}
                  </S.SectionDataInfo>
                  <MagnifyingGlass
                    size={16}
                    alt="Espelho do Processo"
                    style={{
                      cursor: "pointer",
                      marginTop: "-1.2rem",
                      marginLeft: "1rem",
                    }}
                    onClick={() =>
                      navigate(
                        `/dashboard/detalhes-processo/espelho-processos/${respostaFichaDCJE?.data.idProcesso}`
                      )
                    }
                  />
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>

              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>Data Citação:</S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>
                    {formatToBrazilianDate(respostaFichaDCJE.data.dtCitacao)}
                  </S.SectionDataInfo>
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>

              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>Correção/Juros:</S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>
                    {respostaFichaDCJE.data.txIndiceCorrecao} /{" "}
                    {respostaFichaDCJE.data.txIndiceJuros}
                  </S.SectionDataInfo>
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>
            </S.Section>
          ) : (
            ""
          )}

          {/* Importar dados do ergon - indenização */}
          {respostaCalculosDcjeById?.data?.txTipoCalculo == "IND" &&
            respostaCalculosDcjeById?.data?.isComPlanilha != 1 &&
            isErgon && (
              <div style={{ marginBottom: "4rem" }}>
                <S.SectionFinanceiroEnq style={{ paddingBottom: "0rem" }}>
                  <h3 style={{ marginBottom: "2rem" }}>
                    Importar dados do Ergon
                  </h3>
                  <S.ContainerFieldRow style={{ maxWidth: "160rem" }}>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Data da Folha:</S.SectionInfoTitle>
                      <S.SectionImportarDadosErgon>
                        <S.InputDate
                          {...register("dtInicio", {
                            required: false,
                          })}
                          value={dtInicioErgon}
                          onChange={(value: any) =>
                            handleDataInicioErgon(value)
                          }
                          type="date"
                        />
                        <S.IncluirButton2
                          onClick={() => {
                            getErgonServidorFinanceiroFunc();
                          }}
                        >
                          Importar do Ergon
                        </S.IncluirButton2>
                        {isLoadingErgonServidorFinanceiro && (
                          <S.LoadingSpinner />
                        )}
                      </S.SectionImportarDadosErgon>
                    </S.SectionDataCapsule>
                  </S.ContainerFieldRow>
                </S.SectionFinanceiroEnq>
              </div>
            )}

          {/* ------------------ */}

          {/* Importar dados do ergon - diferencas diversas ou remuneracao em atraso */}
          {(respostaCalculosDcjeById?.data?.txTipoCalculo == "DIF" ||
            respostaCalculosDcjeById?.data?.txTipoCalculo == "ATR") &&
            respostaCalculosDcjeById?.data?.isComPlanilha != 1 &&
            isErgon && (
              <div style={{ marginBottom: "4rem" }}>
                <S.SectionFinanceiroEnq style={{ paddingBottom: "0rem" }}>
                  <h3 style={{ marginBottom: "2rem" }}>
                    Importar dados do Ergon
                  </h3>
                  <S.ContainerFieldRow style={{ maxWidth: "160rem" }}>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Data Início:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.InputDate
                          {...register("dtInicio", {
                            required: false,
                          })}
                          value={dtInicioErgon}
                          onChange={(value: any) =>
                            handleDataInicioErgon(value)
                          }
                          type="date"
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Data Fim:</S.SectionInfoTitle>
                      <S.SectionImportarDadosErgon>
                        <S.InputDate
                          {...register("dtFim", {
                            required: false,
                          })}
                          value={dtFimErgon}
                          onChange={(value: any) => handleDataFimErgon(value)}
                          type="date"
                        />
                        <S.IncluirButton2
                          onClick={() => {
                            // postCalculoEnq(alterarIdEnq);
                            getErgonServidorFinanceiroFunc();
                            // handleToast("Ergon Importado com sucesso", false); // alterar futuramente
                          }}
                        >
                          Importar do Ergon
                        </S.IncluirButton2>
                        {isLoadingErgonServidorFinanceiro && (
                          <S.LoadingSpinner />
                        )}
                      </S.SectionImportarDadosErgon>
                    </S.SectionDataCapsule>
                  </S.ContainerFieldRow>

                  <S.ContainerFieldRow style={{ maxWidth: "160rem" }}>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Rubrica:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <Controller
                          name="idErgonRubrica"
                          control={control}
                          render={({ field }) => (
                            <S.CustomSelect
                              placeholder="Selecione o tipo de ergon rubrica"
                              {...field}
                              options={listaErgonRubricaByCalculo}
                              isClearable={false}
                              value={
                                ergonRubricaErgon?.value
                                  ? ergonRubricaErgon
                                  : null
                              }
                              onChange={(data) => handleErgonRubricaErgon(data)}
                            />
                          )}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule style={{ marginTop: "6px" }}>
                      <S.IncluirButton
                        onClick={() => {
                          getErgonServidorFinanceiroFuncComRub();
                        }}
                      >
                        Salvar Valores
                      </S.IncluirButton>
                    </S.SectionDataCapsule>
                  </S.ContainerFieldRow>
                </S.SectionFinanceiroEnq>
              </div>
            )}

          {/* ------------------ */}

          {/* Importar dados do ergon - enquadramento */}
          {respostaCalculosDcjeById?.data?.txTipoCalculo == "ENQ" &&
            respostaCalculosDcjeById?.data?.isComPlanilha != 1 &&
            isErgon && (
              <div style={{ marginBottom: "4rem" }}>
                <S.SectionFinanceiroEnq style={{ paddingBottom: "0rem" }}>
                  <h3 style={{ marginBottom: "2rem" }}>
                    Importar dados do Ergon
                  </h3>
                  <S.ContainerFieldRow style={{ maxWidth: "160rem" }}>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Data Início:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.InputDate
                          {...register("dtInicioErgonEnq", {
                            required: false,
                          })}
                          value={dtInicioErgon}
                          onChange={(value: any) =>
                            handleDataInicioErgon(value)
                          }
                          type="date"
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Data Fim:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.InputDate
                          {...register("dtFimErgonEnq", {
                            required: false,
                          })}
                          value={dtFimErgon}
                          onChange={(value: any) => handleDataFimErgon(value)}
                          type="date"
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule style={{ marginTop: "6px" }}>
                      <S.IncluirButton
                        onClick={() => {
                          getErgonServidorFinanceiroFunc();
                        }}
                      >
                        Importar rubricas
                      </S.IncluirButton>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule style={{ marginTop: "6px" }}>
                      <S.IncluirButton
                        onClick={() => {
                          importarEnq();
                        }}
                      >
                        Importar Enquadramento
                      </S.IncluirButton>
                    </S.SectionDataCapsule>
                  </S.ContainerFieldRow>

                  <S.ContainerFieldRow style={{ maxWidth: "160rem" }}>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Rubrica:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <Controller
                          name="idErgonRubrica"
                          control={control}
                          render={({ field }) => (
                            <S.CustomSelect
                              placeholder="Selecione o tipo de ergon rubrica"
                              {...field}
                              options={listaErgonRubricaTodos}
                              isClearable={false}
                              value={ergonRubricaErgEnq}
                              onChange={(data) =>
                                handleErgonRubricaErgEnq(data)
                              }
                            />
                          )}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule style={{ marginTop: "6px" }}>
                      <S.IncluirButton
                        onClick={() => {
                          getErgonServidorFinanceiroFuncComRubEnq();
                        }}
                      >
                        Salvar Valores
                      </S.IncluirButton>
                    </S.SectionDataCapsule>
                  </S.ContainerFieldRow>
                </S.SectionFinanceiroEnq>
              </div>
            )}

          {/* ------------------ */}

          {/* Enquadramento  */}
          {respostaCalculosDcjeById?.data?.txTipoCalculo == "ENQ" &&
            respostaCalculosDcjeById?.data?.isComPlanilha != 1 && (
              <div style={{ marginBottom: "4rem" }}>
                <S.SectionFinanceiroEnq>
                  <h3 style={{ marginBottom: "2rem" }}>Enquadramento</h3>
                  <S.ContainerFieldRow style={{ maxWidth: "200rem" }}>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Data Início:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.InputDate
                          {...register("dtInicio", {
                            required: false,
                          })}
                          value={dtInicio}
                          onChange={(value: any) => handleDataInicio(value)}
                          type="date"
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Data Fim:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.InputDate
                          {...register("dtFim", {
                            required: false,
                          })}
                          value={dtFim}
                          onChange={(value: any) => handleDataFim(value)}
                          type="date"
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>

                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Rubrica:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <Controller
                          name="idErgonRubrica"
                          control={control}
                          render={({ field }) => (
                            <S.CustomSelect
                              placeholder="Selecione o tipo de ergon rubrica"
                              {...field}
                              options={listaErgonRubricaTodos}
                              isClearable={false}
                              value={ergonRubricaEnq}
                              onChange={(data) => handleErgonRubricaEnq(data)}
                            />
                          )}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>

                    <S.SectionDataCapsule style={{ marginRight: "2rem" }}>
                      <S.SectionInfoTitle>Jornada:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          style={{ width: "5rem" }}
                          placeholder="0"
                          value={jornada}
                          defaultValue={jornada}
                          maxLength={2}
                          onChange={(value) => handleJornada(value)}
                          // {...register("jornada", {
                          //   onChange: (value: any) => handleJornada(value),
                          // })}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>

                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Valor fixo em R$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          style={{ fontWeight: "bold" }}
                          value={formatarNumero(valorFixo)}
                          defaultValue={valorFixo}
                          onChange={(data) => handleValorFixo(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                  </S.ContainerFieldRow>

                  <S.ContainerFieldRow style={{ maxWidth: "160rem" }}>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>
                        Categoria / Subcategoria:
                      </S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <Controller
                          name="tipoErgonRubrica"
                          control={control}
                          render={({ field }) => (
                            <S.CustomSelect
                              placeholder="Selecione a categoria/subcategoria"
                              {...field}
                              options={categSubcateg}
                              isClearable={false}
                              value={selectedCategSubcateg}
                              onChange={
                                (data) => handleErgonCategSubcateg(data)
                                // handleErgonCategSubcateg(data)
                              }
                            />
                          )}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>

                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Cargo / Função:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <Controller
                          name="tipoErgonRubrica"
                          control={control}
                          render={({ field }) => (
                            <S.CustomSelect
                              placeholder="Selecione o cargo/função"
                              {...field}
                              options={cargoFuncao}
                              isClearable={false}
                              value={selectedCargoFuncao}
                              onChange={(data) => handleErgonCargoFuncao(data)}
                            />
                          )}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>

                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Referência:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          style={{ width: "5rem" }}
                          value={referencia}
                          maxLength={2}
                          onChange={(value: any) => handleReferencia(value)}
                          {...register("txReferencia", {
                            onChange: (value: any) => handleReferencia(value),
                          })}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>

                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>
                        Percentual do salário:
                      </S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          style={{ fontWeight: "bold" }}
                          value={formatarNumero(percentual)}
                          defaultValue={percentual}
                          onChange={(data) => handlePercentual(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                  </S.ContainerFieldRow>
                  {alterarButtonEnq ? (
                    <div>
                      <S.IncluirButton
                        onClick={() => {
                          postCalculoEnq(alterarIdEnq);
                        }}
                      >
                        Alterar Enquadramento
                      </S.IncluirButton>
                      <S.LimparButton
                        onClick={() => {
                          // setUpdateData(!updateData);
                          setAlterarButtonEnq(false);
                          refreshEnq();
                        }}
                      >
                        Limpar
                      </S.LimparButton>
                    </div>
                  ) : (
                    <S.IncluirButton
                      // disabled={!dtBase || !ergonRubrica || !valorDevido}
                      onClick={() => {
                        postCalculoEnq(null);
                        setAlterarId(null);
                      }}
                    >
                      Incluir Enquadramento
                    </S.IncluirButton>
                  )}
                </S.SectionFinanceiroEnq>

                {responseCalculoEnquadramento?.data && (
                  <>
                    <CustomTable
                      columns={[
                        {
                          name: "Data Início",
                          isSortable: true,
                          keyData: "dtInicio",
                          formatToDate: true,
                        },
                        {
                          name: "Data Fim",
                          isSortable: true,
                          keyData: "dtFim",
                          formatToDate: true,
                        },
                        {
                          name: "Cód",
                          isSortable: true,
                          keyData: "nuRubrica",
                        },
                        {
                          name: "Rubrica",
                          isSortable: true,
                          keyData: "txRubrica",
                        },
                        {
                          name: "Categoria",
                          isSortable: true,
                          keyData: "txCategoria",
                        },
                        {
                          name: "Subcategoria",
                          isSortable: true,
                          keyData: "txSubcategoria",
                        },
                        {
                          name: "Cargo/Função",
                          isSortable: true,
                          keyData: "txCargoFuncao",
                        },
                        {
                          name: "Ref",
                          isSortable: true,
                          keyData: "txReferencia",
                        },
                        {
                          name: "Jornada",
                          isSortable: true,
                          keyData: "nuJornada",
                        },
                        {
                          name: "Percentual",
                          isSortable: true,
                          keyData: "vaPercentual",
                        },
                        {
                          name: "Fixo em R$",
                          isSortable: true,
                          keyData: "vaFixo",
                          formatToCurrency: true,
                        },
                        {
                          name: "",
                          isSortable: false,
                          keyData: "editar",
                          component: {
                            element: (data) => (
                              <LinkEdit
                                onClick={() => {
                                  setAlterarButtonEnq(true);
                                  setAlterarIdEnq(data?.id);
                                  setDtInicio(data?.dtInicio);
                                  setDtFim(data?.dtFim);
                                  setSelectErgonRubricaEnq(
                                    data?.idErgonRubrica
                                  );
                                  setJornada(data?.nuJornada);
                                  setValorFixo(data?.vaFixo * 100);
                                  setSelectAlterarCategEnq(
                                    data?.idErgonCategoria
                                  );
                                  setSelectAlterarCargFuncEnq(
                                    data?.idErgonCargoFuncao
                                  );
                                  setReferencia(data?.txReferencia);
                                  setPercentual(data?.vaPercentual * 100);
                                  setEditButtonEnq(editButtonEnq + 1);
                                }}
                                dataTable={data}
                              />
                            ),

                            isButton: true,
                          },
                        },
                        {
                          name: "",
                          isSortable: false,
                          keyData: "excluir",
                          component: {
                            element: (data) => (
                              <ExcluirCalculoEnquadramento
                                dataTable={data}
                                onClick={() => (
                                  setAlterarButtonEnq(false), refreshEnq()
                                )}
                              />
                            ),

                            isButton: true,
                          },
                        },
                      ]}
                      data={
                        responseCalculoEnquadramento?.data
                          ? responseCalculoEnquadramento?.data
                          : []
                      }
                      showSelectNumberOfRows={true}
                      isLoading={isLoadingCalculoEnquadramento}
                      tableFontSize="1.2rem"
                      showPagination={
                        responseCalculoEnquadramento?.data?.length > 10
                          ? true
                          : false
                      }
                      showSearchField={true}
                      tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
                      pdfButton={{
                        nameFile: "base-de-calculo-dcje",
                      }}
                      csvButton={{
                        nameFile: "base-de-calculo-dcje",
                      }}
                    />
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <S.IncluirButton
                        onClick={() => {
                          putCalcularEnqDev();
                        }}
                      >
                        Calcular Valor Devido
                      </S.IncluirButton>
                      <S.IncluirButton
                        onClick={() => {
                          putCalcularEnqDevGratifNat();
                        }}
                      >
                        Calcular Gratif Natalina
                      </S.IncluirButton>
                      <S.IncluirButton
                        onClick={() => {
                          putCalcularEnqFerias();
                        }}
                      >
                        Calcular Férias
                      </S.IncluirButton>
                    </div>
                  </>
                )}
              </div>
            )}

          {/* Tipo de cálculo: URV */}
          {respostaCalculosDcjeById?.data?.isComPlanilha != 1 &&
            respostaCalculosDcjeById?.data?.txTipoCalculo == "URV" && (
              <>
                <S.SectionFinanceiro>
                  <h3 style={{ marginBottom: "2rem" }}>Financeiro SIP</h3>
                  <S.ContainerFieldRow
                    style={{
                      justifyContent: "space-between",
                      maxWidth: "110rem",
                    }}
                  >
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Ano:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          placeholder="Ex.: 1994"
                          value={ano}
                          maxLength={4}
                          onChange={(value: number) => handleAno(value)}
                          {...register("ano", {
                            onChange: (value: number) => handleAno(value),
                          })}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule style={{ minWidth: "35rem" }}>
                      <S.SectionInfoTitle>Rubrica:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <Controller
                          name="tipoErgonRubrica"
                          control={control}
                          render={({ field }) => (
                            <S.CustomSelect
                              placeholder="Selecione o tipo de ergon rubrica"
                              {...field}
                              options={sipRubrica}
                              isClearable={false}
                              value={sipRubricaSelected}
                              onChange={(data) =>
                                handleSipRubricaSelected(data)
                              }
                            />
                          )}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule style={{ minWidth: "35rem" }}>
                      <S.SectionInfoTitle>Incidência:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <Controller
                          name="tipoErgonRubrica"
                          control={control}
                          render={({ field }) => (
                            <S.CustomSelect
                              placeholder="Selecione o tipo de incidência"
                              {...field}
                              options={incidenciaOptions}
                              isClearable={false}
                              value={nuIncidencia}
                              onChange={(data) => handleNuIncidencia(data)}
                            />
                          )}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                  </S.ContainerFieldRow>

                  <S.ContainerFieldRow
                    style={{
                      justifyContent: "space-between",
                      maxWidth: "110rem",
                    }}
                  >
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Janeiro CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(janeiro)}
                          defaultValue={janeiro}
                          onChange={(data) => handleJaneiro(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Fevereiro CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(fevereiro)}
                          defaultValue={fevereiro}
                          onChange={(data) => handleFevereiro(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Março CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(marco)}
                          defaultValue={marco}
                          onChange={(data) => handleMarco(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Abril CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(abril)}
                          defaultValue={abril}
                          onChange={(data) => handleAbril(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Maio CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(maio)}
                          defaultValue={maio}
                          onChange={(data) => handleMaio(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Junho CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(junho)}
                          defaultValue={junho}
                          onChange={(data) => handleJunho(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                  </S.ContainerFieldRow>

                  <S.ContainerFieldRow
                    style={{
                      justifyContent: "space-between",
                      maxWidth: "110rem",
                    }}
                  >
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Julho CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(julho)}
                          defaultValue={julho}
                          onChange={(data) => handleJulho(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Agosto CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(agosto)}
                          defaultValue={agosto}
                          onChange={(data) => handleAgosto(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Setembro CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(setembro)}
                          defaultValue={setembro}
                          onChange={(data) => handleSetembro(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Outubro CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(outubro)}
                          defaultValue={outubro}
                          onChange={(data) => handleOutubro(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Novembro CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(novembro)}
                          defaultValue={novembro}
                          onChange={(data) => handleNovembro(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Dezembro CRZR$:</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          value={formatarNumero(dezembro)}
                          defaultValue={dezembro}
                          onChange={(data) => handleDezembro(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                  </S.ContainerFieldRow>

                  {alterarButtonUrv ? (
                    <div>
                      <S.IncluirButton
                        onClick={() => {
                          putCalcUrv(alterarIdUrv);
                        }}
                      >
                        Alterar
                      </S.IncluirButton>
                      <S.LimparButton
                        onClick={() => {
                          // setUpdateData(!updateData);
                          setAlterarButtonUrv(false);
                          refreshSipFinanceiro();
                        }}
                      >
                        Limpar
                      </S.LimparButton>
                    </div>
                  ) : (
                    <S.IncluirButton
                      // disabled={!dtBase || !ergonRubrica || !valorDevido}
                      onClick={() => {
                        postCalcUrv();

                        setAlterarId(null);
                      }}
                    >
                      Incluir
                    </S.IncluirButton>
                  )}
                </S.SectionFinanceiro>
                {responseCalcFinanUrvById?.data && (
                  <div style={{ width: "100%" }}>
                    <CustomTable
                      columns={[
                        {
                          name: "Ano",
                          isSortable: true,
                          keyData: "nuAno",
                          formatToDate: false,
                          // switchContentToRight: true,
                        },
                        {
                          name: "Rubrica",
                          isSortable: true,
                          keyData: "txSipRubrica",
                        },
                        {
                          name: "Jan",
                          isSortable: true,
                          keyData: "vaJaneiro",
                          formatToCurrency: true,
                        },
                        {
                          name: "Fev",
                          isSortable: true,
                          keyData: "vaFevereiro",
                          formatToCurrency: true,
                        },
                        {
                          name: "Mar",
                          isSortable: true,
                          keyData: "vaMarco",
                          formatToCurrency: true,
                        },
                        {
                          name: "Abr",
                          isSortable: true,
                          keyData: "vaAbril",
                          formatToCurrency: true,
                        },
                        {
                          name: "Mai",
                          isSortable: true,
                          keyData: "vaMaio",
                          formatToCurrency: true,
                        },
                        {
                          name: "Jun",
                          isSortable: true,
                          keyData: "vaJunho",
                          formatToCurrency: true,
                        },
                        {
                          name: "Jul",
                          isSortable: true,
                          keyData: "vaJulho",
                          formatToCurrency: true,
                        },
                        {
                          name: "Ago",
                          isSortable: true,
                          keyData: "vaAgosto",
                          formatToCurrency: true,
                        },
                        {
                          name: "Set",
                          isSortable: true,
                          keyData: "vaSetembro",
                          formatToCurrency: true,
                        },
                        {
                          name: "Out",
                          isSortable: true,
                          keyData: "vaOutubro",
                          formatToCurrency: true,
                        },
                        {
                          name: "Nov",
                          isSortable: true,
                          keyData: "vaNovembro",
                          formatToCurrency: true,
                        },
                        {
                          name: "Dez",
                          isSortable: true,
                          keyData: "vaDezembro",
                          formatToCurrency: true,
                        },
                        // {
                        //   name: "Incidência",
                        //   isSortable: true,
                        //   keyData: "nuIncidencia",
                        // },
                        {
                          name: "",
                          isSortable: false,
                          keyData: "editar",
                          component: {
                            element: (data) => (
                              <LinkEdit
                                // ALTERAR ESSE BOTAO
                                onClick={() => {
                                  setAlterarButtonUrv(true);
                                  setAlterarIdUrv(data?.id);
                                  setEditButtonUrv(editButtonUrv + 1);
                                  setJaneiro(data?.vaJaneiro * 100);
                                  setFevereiro(data?.vaFevereiro * 100);
                                  setMarco(data?.vaMarco * 100);
                                  setAbril(data?.vaAbril * 100);
                                  setMaio(data?.vaMaio * 100);
                                  setJunho(data?.vaJunho * 100);
                                  setJulho(data?.vaJulho * 100);
                                  setAgosto(data?.vaAgosto * 100);
                                  setSetembro(data?.vaSetembro * 100);
                                  setOutubro(data?.vaOutubro * 100);
                                  setNovembro(data?.vaNovembro * 100);
                                  setDezembro(data?.vaDezembro * 100);
                                  setAno(data?.nuAno);
                                  setSelectErgonRubricaUrv(data?.idSipRubrica);
                                  setNuIncidencia(data?.nuIncidencia);
                                }}
                                dataTable={data}
                              />
                            ),

                            isButton: true,
                          },
                        },
                        {
                          name: "",
                          isSortable: false,
                          keyData: "excluir",
                          component: {
                            element: (data) => (
                              <ExcluirCalculoUrv dataTable={data} />
                            ),

                            isButton: true,
                          },
                        },
                      ]}
                      data={
                        responseCalcFinanUrvById?.data
                          ? responseCalcFinanUrvById?.data
                          : []
                      }
                      showSelectNumberOfRows={true}
                      isLoading={isLoadingBaseDeCalculo}
                      showPagination={true}
                      tableFontSize="1rem"
                      showSearchField={true}
                      tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
                      pdfButton={{
                        nameFile: "base-de-calculo-dcje",
                      }}
                      csvButton={{
                        nameFile: "base-de-calculo-dcje",
                      }}
                    />
                  </div>
                )}
              </>
            )}

          {/* Tipo de cálculo: indenização */}
          {respostaCalculosDcjeById?.data?.isComPlanilha != 1 &&
            (respostaCalculosDcjeById?.data?.txTipoCalculo == "IND" ||
              respostaCalculosDcjeById?.data?.txTipoCalculo == "URV") && (
              <>
                <S.SectionFinanceiro>
                  <h3 style={{ marginBottom: "2rem" }}>Financeiro</h3>
                  <S.ContainerFieldRow style={{ maxWidth: "90rem" }}>
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Data Base: *</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.InputDate
                          {...register("dtBase", {
                            required: false,
                          })}
                          // defaultValue={dtJurosMoraDados}
                          value={dtBase}
                          onChange={(value: any) => handleDataBase(value)}
                          type="date"
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>

                    <S.SectionDataCapsule style={{ minWidth: "35rem" }}>
                      <S.SectionInfoTitle>Rubrica: *</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <Controller
                          name="tipoErgonRubrica"
                          control={control}
                          render={({ field }) => (
                            <S.CustomSelect
                              placeholder="Selecione o tipo de ergon rubrica"
                              {...field}
                              options={listaErgonRubrica}
                              isClearable={false}
                              value={ergonRubrica}
                              // value={assuntosDados}
                              onChange={(data) => handleErgonRubrica(data)}
                            />
                          )}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>

                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Valor em R$: *</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          style={{ fontWeight: "bold" }}
                          value={formatarNumero(valorDevido)}
                          defaultValue={valorDevido}
                          // value={
                          //   alterarButton
                          //     ? valorDevido
                          //     : formatarNumero(valorDevido)
                          // }
                          onChange={(data) => handleValorDevido(data)}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                  </S.ContainerFieldRow>
                  {alterarButton ? (
                    <S.IncluirButton
                      disabled={!dtBase || !ergonRubrica || !valorDevido}
                      onClick={() => {
                        postCalcFinanceiro(alterarId);
                      }}
                    >
                      Alterar
                    </S.IncluirButton>
                  ) : (
                    <S.IncluirButton
                      disabled={!dtBase || !ergonRubrica || !valorDevido}
                      onClick={() => {
                        postCalcFinanceiro(null);
                        setAlterarId(null);
                      }}
                    >
                      Incluir
                    </S.IncluirButton>
                  )}
                </S.SectionFinanceiro>
              </>
            )}

          {/* Tipo de cálculo: Diferenças diversas */}
          {respostaCalculosDcjeById?.data?.isComPlanilha != 1 &&
            (respostaCalculosDcjeById?.data?.txTipoCalculo == "DIF" ||
              respostaCalculosDcjeById?.data?.txTipoCalculo == "ENQ" ||
              respostaCalculosDcjeById?.data?.txTipoCalculo == "ATR") && (
              <S.SectionFinanceiro>
                <h3 style={{ marginBottom: "2rem" }}>Financeiro</h3>
                <S.ContainerFieldRow style={{ maxWidth: "120rem" }}>
                  <S.SectionDataCapsule>
                    <S.SectionInfoTitle>Data Base: *</S.SectionInfoTitle>
                    <S.SectionDataInfoSum>
                      <S.InputDate
                        {...register("dtBase", {
                          required: false,
                        })}
                        // defaultValue={dtJurosMoraDados}
                        value={dtBase}
                        onChange={(value: any) => handleDataBase(value)}
                        type="date"
                      />
                    </S.SectionDataInfoSum>
                  </S.SectionDataCapsule>
                  {!alterarButton && (
                    <S.SectionDataCapsule>
                      <S.SectionInfoTitle>Até: *</S.SectionInfoTitle>
                      <S.SectionDataInfoSum>
                        <S.InputDate
                          {...register("dtAte", {
                            required: false,
                          })}
                          // defaultValue={dtJurosMoraDados}
                          value={dtAte}
                          onChange={(value: any) => handleDataAte(value)}
                          type="date"
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                  )}

                  <S.SectionDataCapsule style={{ minWidth: "35rem" }}>
                    <S.SectionInfoTitle>Rubrica: *</S.SectionInfoTitle>
                    <S.SectionDataInfoSum>
                      <Controller
                        name="tipoErgonRubrica"
                        control={control}
                        render={({ field }) => (
                          <S.CustomSelect
                            placeholder="Selecione o tipo de ergon rubrica"
                            {...field}
                            options={listaErgonRubrica}
                            isClearable={false}
                            value={ergonRubrica}
                            onChange={(data) => handleErgonRubrica(data)}
                          />
                        )}
                      />
                    </S.SectionDataInfoSum>
                  </S.SectionDataCapsule>

                  <S.SectionDataCapsule>
                    <S.SectionInfoTitle>Devido em R$: *</S.SectionInfoTitle>
                    <S.SectionDataInfoSum>
                      <S.TextInput
                        style={{ fontWeight: "bold" }}
                        value={formatarNumero(valorDevido)}
                        defaultValue={valorDevido}
                        onChange={(data) => handleValorDevido(data)}
                      />
                    </S.SectionDataInfoSum>
                  </S.SectionDataCapsule>

                  <S.SectionDataCapsule>
                    <S.SectionInfoTitle>Recebido em R$: *</S.SectionInfoTitle>
                    <S.SectionDataInfoSum>
                      <S.TextInput
                        style={{ fontWeight: "bold" }}
                        value={formatarNumero(valorRecebido)}
                        defaultValue={valorRecebido}
                        onChange={(data) => handleValorRecebido(data)}
                      />
                    </S.SectionDataInfoSum>
                  </S.SectionDataCapsule>
                </S.ContainerFieldRow>
                {alterarButton ? (
                  <div>
                    <S.IncluirButton
                      disabled={!dtBase || !ergonRubrica || !valorDevido}
                      onClick={() => {
                        postCalcFinanceiro2(alterarId);
                      }}
                    >
                      Alterar
                    </S.IncluirButton>
                    <S.LimparButton
                      onClick={() => {
                        // setUpdateData(!updateData);
                        setAlterarButton(false);
                        refresh();
                      }}
                    >
                      Limpar
                    </S.LimparButton>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <S.IncluirButton
                      disabled={!dtBase || !ergonRubrica || !valorDevido}
                      onClick={() => {
                        postCalcFinanceiro2(null);
                        setAlterarId(null);
                      }}
                    >
                      Incluir
                    </S.IncluirButton>
                    <ExcluirPeriodo
                      idCalculoText={"?idCalculo="}
                      idCalculo={idCalculoContext}
                      idRubricaText={
                        ergonRubrica?.value != null ? "&idRubrica=" : ""
                      }
                      dtIniText={dtBase ? "&dtIni=" : ""}
                      dtFimText={
                        dtBase == ""
                          ? ""
                          : dtBase != "" && dtAte != ""
                          ? "&dtFim="
                          : ""
                      }
                      dtInicio={dtBase}
                      dtFim={dtAte}
                      idRubrica={
                        ergonRubrica?.value != null ? ergonRubrica?.value : ""
                      }
                    />
                  </div>
                )}
              </S.SectionFinanceiro>
            )}

          {/* Tabela editável - cadastro de cálculo */}

          {respostaCalculosDcjeById?.data?.isComPlanilha != 1 &&
          respostaBaseDeCalculo?.data &&
          respostaCalculosDcjeById?.data?.txTipoCalculo == "IND" ? (
            <>
              <CustomTable
                columns={[
                  {
                    name: "Data Base",
                    isSortable: true,
                    keyData: "dtBase",
                    formatToDate: true,
                  },
                  {
                    name: "Código",
                    isSortable: true,
                    keyData: "nuRubrica",
                  },
                  {
                    name: "Rubrica",
                    isSortable: true,
                    keyData: "txRubrica",
                    formatToDate: true,
                  },
                  {
                    name: "Devido em R$",
                    isSortable: true,
                    keyData: "vaDevido",
                    formatToCurrency: true,
                  },
                  {
                    name: "",
                    isSortable: false,
                    keyData: "editar",
                    component: {
                      element: (data) => (
                        <LinkEdit
                          onClick={() => {
                            setAlterarButton(true);
                            setAlterarId(data?.id);
                            setDtBase(data?.dtBase);
                            setValorDevido(data?.vaDevido * 100);
                            setValorRecebido(data?.vaRecebido * 100);
                            setSelectErgonRubrica(data?.idErgonRubrica);
                            setEditButton(editButton + 1);
                          }}
                          dataTable={data}
                        />
                      ),

                      isButton: true,
                    },
                  },
                  {
                    name: "",
                    isSortable: false,
                    keyData: "excluir",
                    component: {
                      element: (data) => (
                        <ExcluirCalculoFinanceiro
                          dataTable={data}
                          // onClick={() => setAlterarButton(false)}
                        />
                      ),

                      isButton: true,
                    },
                  },
                ]}
                data={
                  respostaBaseDeCalculo?.data ? respostaBaseDeCalculo?.data : []
                }
                showSelectNumberOfRows={true}
                isLoading={isLoadingBaseDeCalculo}
                showPagination={true}
                showSearchField={true}
                tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
                pdfButton={{
                  nameFile: "base-de-calculo-dcje",
                }}
                csvButton={{
                  nameFile: "base-de-calculo-dcje",
                }}
              />

              <S.SectionSum>
                <S.SectionDataRow>
                  <S.SectionDataCapsule>
                    <S.SectionDataTitle>VALOR DEVIDO TOTAL</S.SectionDataTitle>
                    <S.SectionDataInfoSum>
                      <S.TextInput
                        disabled={true}
                        style={{ fontWeight: "bold" }}
                        value={somaVaExecucao?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      />
                    </S.SectionDataInfoSum>
                  </S.SectionDataCapsule>
                </S.SectionDataRow>
              </S.SectionSum>
            </>
          ) : respostaCalculosDcjeById?.data?.isComPlanilha != 1 &&
            respostaBaseDeCalculo?.data &&
            (respostaCalculosDcjeById?.data?.txTipoCalculo == "DIF" ||
              "ENQ" ||
              "ATR") ? (
            <>
              <CustomTable
                columns={[
                  {
                    name: "Data Base",
                    isSortable: true,
                    keyData: "dtBase",
                    formatToDate: true,
                  },
                  {
                    name: "Código",
                    isSortable: true,
                    keyData: "nuRubrica",
                  },
                  {
                    name: "Rubrica",
                    isSortable: true,
                    keyData: "txRubrica",
                    formatToDate: true,
                  },
                  {
                    name: "Devido em R$",
                    isSortable: true,
                    keyData: "vaDevido",
                    formatToCurrency: true,
                  },
                  {
                    name: "Recebido em R$",
                    isSortable: true,
                    keyData: "vaRecebido",
                    formatToCurrency: true,
                  },
                  {
                    name: "Diferença em R$",
                    isSortable: true,
                    keyData: "vaDiferneca",
                    formatToCurrency: true,
                  },
                  {
                    name: "",
                    isSortable: false,
                    keyData: "editar",
                    component: {
                      element: (data) => (
                        <LinkEdit
                          onClick={() => {
                            setAlterarButton(true);
                            setAlterarId(data?.id);
                            setDtBase(data?.dtBase);
                            setValorDevido(data?.vaDevido * 100);
                            setValorRecebido(data?.vaRecebido * 100);
                            setSelectErgonRubrica(data?.idErgonRubrica);
                            setEditButton(editButton + 1);
                          }}
                          dataTable={data}
                        />
                      ),

                      isButton: true,
                    },
                  },
                  {
                    name: "",
                    isSortable: false,
                    keyData: "excluir",
                    component: {
                      element: (data) => (
                        <ExcluirCalculoFinanceiro
                          dataTable={data}
                          // onClick={() => setAlterarButton(false)}
                        />
                      ),

                      isButton: true,
                    },
                  },
                ]}
                data={
                  respostaBaseDeCalculo?.data ? respostaBaseDeCalculo?.data : []
                }
                showSelectNumberOfRows={true}
                isLoading={isLoadingBaseDeCalculo}
                showPagination={
                  respostaBaseDeCalculo?.data?.length > 10 ? true : false
                }
                showSearchField={true}
                tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
                pdfButton={{
                  nameFile: "base-de-calculo-dcje",
                }}
                csvButton={{
                  nameFile: "base-de-calculo-dcje",
                }}
              />

              <S.SectionSum>
                <S.SectionDataRow>
                  <S.SectionDataCapsule>
                    <S.SectionDataTitle>VALOR DEVIDO TOTAL</S.SectionDataTitle>
                    <S.SectionDataInfoSum>
                      <S.TextInput
                        disabled={true}
                        style={{ fontWeight: "bold" }}
                        value={somaVaExecucao?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      />
                    </S.SectionDataInfoSum>
                  </S.SectionDataCapsule>
                  <S.SectionDataCapsule>
                    <S.SectionDataTitle>
                      VALOR RECEBIDO TOTAL
                    </S.SectionDataTitle>
                    <S.SectionDataInfoSum>
                      <S.TextInput
                        disabled={true}
                        style={{ fontWeight: "bold" }}
                        value={somaVaResultadoTotal?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      />
                    </S.SectionDataInfoSum>
                  </S.SectionDataCapsule>
                  <S.SectionDataCapsule>
                    <S.SectionDataTitle>DIFERENÇA TOTAL</S.SectionDataTitle>
                    <S.SectionDataInfoSum>
                      <S.TextInput
                        disabled={true}
                        style={{ color: inputColor(), fontWeight: "bold" }}
                        value={somaVaDiferenca?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      />
                    </S.SectionDataInfoSum>
                  </S.SectionDataCapsule>
                </S.SectionDataRow>
              </S.SectionSum>
            </>
          ) : (
            <></>
          )}

          {/* Tabela de visualização de cálculo */}

          {respostaCalculosDcjeById?.data?.isComPlanilha == 1 &&
            respostaBaseDeCalculo?.data && (
              <>
                <CustomTable
                  columns={[
                    {
                      name: "Data Base",
                      isSortable: true,
                      keyData: "dtBase",
                      formatToDate: true,
                    },
                    {
                      name: "Código",
                      isSortable: true,
                      keyData: "nuRubrica",
                    },
                    {
                      name: "Rubrica",
                      isSortable: true,
                      keyData: "txRubrica",
                      formatToDate: true,
                    },
                    {
                      name: "Devido em R$",
                      isSortable: true,
                      keyData: "vaDevido",
                      formatToCurrency: true,
                    },
                    {
                      name: "Recebido em R$",
                      isSortable: true,
                      keyData: "vaRecebido",
                      formatToCurrency: true,
                    },
                    {
                      name: "Diferença em R$",
                      isSortable: true,
                      keyData: "vaDiferneca",
                      formatToCurrency: true,
                    },
                  ]}
                  data={
                    respostaBaseDeCalculo?.data
                      ? respostaBaseDeCalculo?.data
                      : []
                  }
                  showSelectNumberOfRows={true}
                  isLoading={isLoadingBaseDeCalculo}
                  showPagination={true}
                  showSearchField={true}
                  tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
                  pdfButton={{
                    nameFile: "base-de-calculo-dcje",
                  }}
                  csvButton={{
                    nameFile: "base-de-calculo-dcje",
                  }}
                />

                <S.SectionSum>
                  <S.SectionDataRow>
                    <S.SectionDataCapsule>
                      <S.SectionDataTitle>
                        VALOR DEVIDO TOTAL
                      </S.SectionDataTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          disabled={true}
                          style={{ fontWeight: "bold" }}
                          value={somaVaExecucao?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionDataTitle>
                        VALOR RECEBIDO TOTAL
                      </S.SectionDataTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          disabled={true}
                          style={{ fontWeight: "bold" }}
                          value={somaVaResultadoTotal?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                    <S.SectionDataCapsule>
                      <S.SectionDataTitle>DIFERENÇA TOTAL</S.SectionDataTitle>
                      <S.SectionDataInfoSum>
                        <S.TextInput
                          disabled={true}
                          style={{ color: inputColor(), fontWeight: "bold" }}
                          value={somaVaDiferenca?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        />
                      </S.SectionDataInfoSum>
                    </S.SectionDataCapsule>
                  </S.SectionDataRow>
                </S.SectionSum>
              </>
            )}
        </S.Wrapper>

        {respostaCalculosDcjeById?.data?.idResposta == 0 &&
          respostaBaseDeCalculo?.data && (
            <S.ContainerButtons style={{ marginTop: "-1rem" }}>
              {/* regra para botão excluir */}
              {respostaCalculosDcjeById?.data?.isComPlanilha == 1 &&
              respostaCalculosDcjeById?.data?.idResposta == 0 ? (
                <ExcluirDadosCalculo
                  isOpenModal={isOpenExcluirModal}
                  setOpenModal={setOpenExcluirModal}
                />
              ) : (
                <S.SalvarButton
                  title={
                    !respostaBaseDeCalculo?.data
                      ? "Não é possivel calcular sem incluir cálculos antes"
                      : "Calcular"
                  }
                  disabled={!respostaBaseDeCalculo?.data}
                  onClick={() => postCalculoFinanceiroPlanilha()}
                >
                  Calcular
                </S.SalvarButton>
              )}
            </S.ContainerButtons>
          )}
      </S.Form>
    </>
  );
};

export default BaseDeCalculo;

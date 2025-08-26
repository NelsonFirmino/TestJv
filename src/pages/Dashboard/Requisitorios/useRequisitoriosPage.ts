import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useDespachosService from "../../../api/services/Despachos";
import useDistribuicoesService from "../../../api/services/Distribuições";
import usePartesService from "../../../api/services/Processos/Partes";
import useAtosService from "../../../api/services/atos/atos";
import useRequisitorioService from "../../../api/services/rpv/Requisitorio";
import useNaturezaService from "../../../api/services/rpv/natureza";
import useOrigemService from "../../../api/services/rpv/origem";
import {
  HotToastError,
  HotToastSucess,
} from "../../../components/HotToastFuncs";
import { SharedState } from "../../../context/SharedContext";
import { ErrorsTriggerI, SelectI } from "./interfaces";

const useRequisitoriosPage = ({ idURL }: { idURL: string }) => {
  const { get: getAto, ato } = useAtosService();
  const { get: getPartes, partes } = usePartesService();
  const { distribuicao, get: getDist } = useDistribuicoesService();
  const { get: getNaturezas, naturezas } = useNaturezaService();
  const { get: getOrigens, origens } = useOrigemService();

  const {
    salvar,
    getRequisitoriosById,
    requisitorios,
    deleteRequisitorio,
    get: getRequisitorio,
  } = useRequisitorioService();

  const { concluir } = useDespachosService();
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

  const [numProcess, setNumProcess] = useState<string>("");

  const [selectedData, setSelectedData] = useState<{
    devedor: number | undefined;
    requisitor: number | undefined;
    naturezaDespesa: number | undefined;
    origemDespesa: number | undefined;
    tipo: string | undefined;
    idProc: number | undefined;
  }>({
    devedor: undefined,
    requisitor: undefined,
    naturezaDespesa: undefined,
    origemDespesa: undefined,
    tipo: undefined,
    idProc: undefined,
  });

  const [requisitores, setRequisitores] = useState<SelectI[]>();
  const [devedores, setDevedores] = useState<SelectI[]>();
  const [advogados, setAdvogados] = useState<SelectI[]>();
  const [nats, setNats] = useState<SelectI[]>();
  const [desps, setDesps] = useState<SelectI[]>();

  const [limitePag, setLimitePag] = useState<string>();
  const [valor, setValor] = useState<number>();
  const [honorarios, setHonorarios] = useState<boolean>(false);

  const [errorTrigger, setErrorTrigger] = useState<ErrorsTriggerI>({
    requisitor: false,
    devedor: false,
    naturezaDespesa: false,
    origemDespesa: false,
    tipo: false,
    limitePag: false,
    valor: false,
  });

  useEffect(() => {
    if (distribuicao) {
      setSelectedData((prev) => ({
        ...prev,
        idProc: distribuicao.idProcurador,
      }));
    }
  }, [distribuicao]);

  useEffect(() => {
    if (ato) {
      getDist(ato.idTriagem);
      getPartes(ato.idProcesso);
      setValor(parseFloat(ato.txValor));
      getRequisitoresCadastrados();
    }
  }, [ato]);

  useEffect(() => {
    getAto(parseInt(idURL));
    getNaturezas();
    getOrigens();
  }, []);

  useEffect(() => {
    if (origens && origens.length) {
      origens.forEach((origem) => {
        const dat = {
          label: origem.txOrigem,
          value: origem,
        };
        setDesps((prev) => {
          if (prev) {
            return [...prev!, dat];
          }
          return [dat];
        });
      });
    }
  }, [origens]);

  useEffect(() => {
    if (partes && partes.length) {
      partes.forEach((parte) => {
        const dat = {
          label: `${parte.parte.txParte} (${parte.parte.txCpfCnpj})`,
          value: parte,
        };

        if (parte.txPolo == "A") {
          setRequisitores((prev) => {
            if (prev) {
              return [...prev!, dat];
            }
            return [dat];
          });
        } else if (parte.txPolo == "P") {
          setDevedores((prev) => {
            if (prev) {
              return [...prev!, dat];
            }
            return [dat];
          });
        } else if (parte.txPolo == "D") {
          setAdvogados((prev) => {
            if (prev) {
              return [...prev!, dat];
            }
            return [dat];
          });
        }
      });
    }
  }, [partes]);

  useEffect(() => {
    if (naturezas && naturezas.length) {
      naturezas.forEach((nat) => {
        const dat = {
          label: nat.txNatureza,
          value: nat,
        };
        setNats((prev) => {
          if (prev) {
            return [...prev!, dat];
          }
          return [dat];
        });
      });
    }
  }, [naturezas]);

  const handleToast = (msg: string, error: boolean) => {
    !error
      ? toast(msg, {
          icon: "👏",
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

  function concluirAto() {
    // if (!distribuicao || !ato) {
    //   toast("Preencha todos os campos", {
    //     icon: "👏",
    //     style: {
    //       borderRadius: "10px",
    //       background: "#e57373",
    //       color: "#fff",
    //       fontSize: "30px",
    //     },
    //   });
    //   return;
    // }

    const params = {
      idAto: ato.id,
      idProcurador: ato.idProcurador,
      idTipoDespacho: 5,
      idUsuarioCadastro: +user["Jvris.User.Id"],
      txNumeroProcesso: ato.txNumeroFormatado,
      txObservacao: "Atuação concluída com o cadastro do requisitório",
    };
    concluir(params)
      .then((response) => {
        if (response.status == "Created") {
          // queryClient.invalidateQueries(`assuntosSemPaginacao`);
          handleToast("Ato Concluído com Sucesso", false);
          getRequisitorio(+user["Jvris.User.Id"]);
        } else {
          handleToast("Erro Concluir Ato", true);
          // handleToast(response.message, true);
        }
      })
      .catch((err) => {
        handleToast("Erro Concluir Ato", true);
      });
  }

  function salvarAto() {
    const erros: ErrorsTriggerI = {
      requisitor: false,
      devedor: false,
      naturezaDespesa: false,
      origemDespesa: false,
      tipo: false,
      limitePag: false,
      valor: false,
    };
    if (
      !selectedData.devedor ||
      !selectedData.requisitor ||
      !selectedData.naturezaDespesa ||
      !selectedData.origemDespesa ||
      !selectedData.tipo ||
      !limitePag ||
      !valor //||
      //!requisitorios[0]
    ) {
      if (!selectedData.devedor) {
        erros.devedor = true;
      }
      if (!selectedData.requisitor) {
        erros.requisitor = true;
      }
      if (!selectedData.naturezaDespesa) {
        erros.naturezaDespesa = true;
      }
      if (!selectedData.origemDespesa) {
        erros.origemDespesa = true;
      }
      if (!limitePag) {
        erros.limitePag = true;
      }
      if (!selectedData.tipo) {
        erros.tipo = true;
      }
      if (!valor) {
        erros.valor = true;
      }
      setErrorTrigger(erros);

      toast("Preencha todos os campos", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#e57373",
          color: "#fff",
          fontSize: "30px",
        },
      });
      return;
    }

    getRequisitorio(+user["Jvris.User.Id"])
      .then((req) => {
        const params = {
          idAto: req.idAto,
          id: req.id,
          txTipo: selectedData.tipo,
          isHonorario: honorarios,
          idRequisitor: selectedData.requisitor, //selects[1].data[0].value.idParte,
          idDevedor: selectedData.devedor, //selects[0].data[0].value.idParte,
          idOrigem: selectedData.origemDespesa, //selects2[0].data[0].value.id,
          idNatureza: selectedData.naturezaDespesa, //selects[2].data[0].value.id,
          dtLimitePagamento: limitePag,
          vaPagamento: valor,
          idUsuarioCadastro: +user["Jvris.User.Id"],
        };
        salvar(params)
          .then((res) => {
            getRequisitoresCadastrados();
            HotToastSucess("Requisitório cadastrado com sucesso");
          })
          .catch((err) => {
            HotToastError(`Erro ao cadastrar o requisitório :${err}`);
          });
      })
      .catch((err) => {});
  }

  function getRequisitoresCadastrados() {
    getRequisitoriosById(parseInt(idURL));
  }

  function handleSelectDevedor(e: any) {
    setSelectedData((prev) => ({ ...prev, devedor: e.value.id }));
  }

  function handleSelectRequisitor(e: any) {
    setSelectedData((prev) => ({ ...prev, requisitor: e.value.id }));
  }

  function handleSelectNatureza(e: any) {
    setSelectedData((prev) => ({
      ...prev,
      naturezaDespesa: e.value.id,
    }));
  }

  function handleSelectOrigem(e: any) {
    setSelectedData((prev) => ({ ...prev, origemDespesa: e.value.id }));
  }

  function handleSelectTipo(e: any) {
    setSelectedData((prev) => ({ ...prev, tipo: e.value }));
  }

  function handleLimiteChange(e: any) {
    setLimitePag(e.target.value);
  }

  function handleValorChange(e: any) {
    const valorNumerico = e.replace(/\D/g, "");
    setValor(parseFloat(valorNumerico) / 100);
  }

  function toogleHonorarios() {
    setHonorarios(!honorarios);
  }

  return {
    ato,
    concluirAto,
    salvarAto,
    handleSelectDevedor,
    handleSelectRequisitor,
    handleSelectNatureza,
    handleSelectOrigem,
    handleSelectTipo,
    handleLimiteChange,
    handleValorChange,
    toogleHonorarios,
    deleteRequisitorio,
    requisitorios,
    requisitores,
    devedores,
    advogados,
    nats,
    desps,
    limitePag,
    valor,
    honorarios,
    errorTrigger,
  };
};

export default useRequisitoriosPage;

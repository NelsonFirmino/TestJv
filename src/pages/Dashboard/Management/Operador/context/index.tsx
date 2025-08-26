import { createContext, useContext, useState } from "react";
import { CadastrarProcesso } from "../../../Process/CadastroProcessos/interfaces/register-process.interface";
import { EditarTriagemI } from "../Modals/EditarTriagem";
import { ExcluirAtoI } from "../Modals/ExcluirAto";
import { TriagemPostI } from "../Modals/TriagemDistAtoManual";
import { OperadorContextI } from "./interfaces";
import useListarTabelas from "./useListarTabelas";

const OperadorContext = createContext<OperadorContextI>({} as any);

export const OperadorProvider = (props: any) => {
  const [openTriagem, setOpenTriagem] = useState(false);
  const [openExcluirAto, setOpenExcluirAto] = useState(false);
  const [openEditarTriagem, setOpenEditarTriagem] = useState(false);
  const [triagemData, setTriagemData] = useState({} as TriagemPostI);
  const [excluirAtoData, setExcluirAtoData] = useState({} as ExcluirAtoI);
  const [editarTriagemData, setEditarTriagemData] = useState(
    {} as EditarTriagemI
  );
  const [cadastrarProcesso, setCadastrarProcesso] = useState(
    {} as CadastrarProcesso
  );
  const [processoData, setProcessoData] = useState({} as any);
  const [processosData, setProcessosData] = useState([]);
  const [openTomarCienciaModal, setOpenTomarCienciaModal] = useState(false);
  const [tomarCienciaNoJVRIS, setTomarCienciaNoJVRIS] = useState(false);
  const [secretaria, setSecretaria] = useState<number>();
  const {
    AtosAguardandoCiencia,
    AtosAguardandoDistribuicao,
    AtosAguardandoTriagem,
    AtosDistribuidosHoje,
    secretarias,
    reload: rld,
    processosPendentes,
  } = useListarTabelas({ secretaria, setSecretaria });
  const [openDistribuirModal, setOpenDistribuirModal] = useState(false);
  const [openTriagemModal, setOpenTriagemModal] = useState(false);
  const [openEditarTriagemEmLoteModal, setOpenEditarTriagemEmLoteModal] =
    useState(false);
  const [openDistHjExluirModal, setOpenDistHjExluirModal] = useState(false);
  const [openOBSModal, setOpenOBSModal] = useState(false);
  const [openEditarProcessoModal, setOpenEditarProcessoModal] = useState(false);
  const [openExcluirTriagemAtoModal, setOpenExcluirTriagemAtoModal] =
    useState(false);

  return (
    <OperadorContext.Provider
      value={{
        openEditarProcessoModal,
        setOpenEditarProcessoModal,
        openOBSModal,
        setOpenOBSModal,
        openDistHjExluirModal,
        setOpenDistHjExluirModal,
        reload: () => {
          setProcessosData([]);
          setProcessoData({});
          rld();
        },
        reloadAguardandoCiencia: () => {
          setProcessosData([]);
          setProcessoData({});
          rld();
        },
        openDistribuirModal,
        AtosDistribuidosHoje,
        setOpenTriagemModal,
        openTriagemModal,
        setOpenEditarTriagemEmLoteModal,
        openEditarTriagemEmLoteModal,
        setOpenDistribuirModal,
        processosData,
        setProcessosData,
        tomarCienciaNoJVRIS,
        setTomarCienciaNoJVRIS,
        openTomarCienciaModal,
        setOpenTomarCienciaModal,
        AtosAguardandoCiencia,
        AtosAguardandoTriagem,
        processosPendentes,
        AtosAguardandoDistribuicao,
        secretarias,
        secretaria,
        excluirAtoData,
        cadastrarProcesso,
        editarTriagemData,
        openExcluirAto,
        openEditarTriagem,
        openTriagem,
        processoData,
        setExcluirAtoData,
        setOpenExcluirAto,
        setOpenTriagem,
        setOpenEditarTriagem,
        setCadastrarProcesso,
        setTriagemData,
        setEditarTriagemData,
        triagemData,
        setProcessoData,
        openExcluirTriagemAtoModal,
        setOpenExcluirTriagemAtoModal,
        setSecretaria,
      }}
    >
      {props.children}
    </OperadorContext.Provider>
  );
};

export const useOperadorContext = () => {
  const context = useContext(OperadorContext);
  if (!context) {
    throw new Error(
      "useSpecificContext must be used within a SpecificProvider"
    );
  }
  return context;
};

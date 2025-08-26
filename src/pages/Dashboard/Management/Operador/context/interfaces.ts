import { CadastrarProcesso } from "../../../Process/CadastroProcessos/interfaces/register-process.interface";
import { EditarTriagemI } from "../Modals/EditarTriagem";
import { ExcluirAtoI } from "../Modals/ExcluirAto";
import { TriagemPostI } from "../Modals/TriagemDistAtoManual";
import { AtosI } from "../Tables/AguardandoCiencia/interfaces";
import { AguarTriagI } from "../Tables/AguardandoTriagem/interfaces";
import {
  ProcesssosPendentesI,
  SecretariasI,
} from "../Tables/ProcessosPendentesCadastro/interfaces";

export interface AtosAguardandoDistI {
  id: number;
  idProcesso: number;
  txNumeroFormatado: string;
  txAssunto: string;
  txRelevancia: string;
  txValor: string;
  txClasse: string;
  txSistemaProcessual: string;
  nuCodigoAviso: number;
  txOrgaoJulgador: string;
  txTribunal: string;
  txSiglaTribunal: string;
  dtCiencia: string;
  dtPrazo: string;
  idTriagem: number;
  txSecretaria: string;
  dtCadastro: string;
  txUsuario: string;
  isImportado: boolean;
  idEspecializada: number;
  txEspecializada: string;
  idProcurador: number;
  idRedistribuicao: number;
  isUrgente: boolean;
  txStatusCadastroAto: string;
  txStatusRedistribuicaoAto: string;
}
export interface AtosDistHjI {
  id: number;
  idProcesso: number;
  txNumeroFormatado: string;
  txAssunto: string;
  txRelevancia: string;
  txValor: string;
  txClasse: string;
  txSistemaProcessual: string;
  nuCodigoAviso: number;
  txOrgaoJulgador: string;
  txTribunal: string;
  txSiglaTribunal: string;
  dtCiencia: string;
  dtPrazo: string;
  idTriagem: number;
  txSecretaria: string;
  dtCadastro: string;
  dtDistribuicao: string;
  txUsuario: string;
  isImportado: boolean;
  idEspecializada: number;
  txEspecializada: string;
  idProcurador: number;
  txProcurador: string;
  idRedistribuicao: number;
  isUrgente: boolean;
  txStatusCadastroAto: string;
  txStatusRedistribuicaoAto: string;
}

export interface PPdataI {
  rawData: ProcesssosPendentesI[];
  tableData: any;
}
export interface ATdataI {
  rawData: AguarTriagI[];
  tableData: any;
}
export interface ACdataI {
  rawData: AtosI[];
  tableData: any;
}
export interface ADdataI {
  rawData: AtosAguardandoDistI[];
  tableData: any;
}
export interface AHdataI {
  rawData: AtosDistHjI[];
  tableData: any;
}

/*
 const [openTriagem, setOpenTriagem] = useState(false);
    const [openExcluirAto, setOpenExcluirAto] = useState(false);
    const [triagemData, setTriagemData] = useState({} as TriagemPostI);
    const [excluirAtoData, setExcluirAtoData] = useState({} as ExcluirAtoI);
    const [processoData, setProcessoData] = useState({} as any);
*/

export interface OperadorContextI {
  setOpenEditarProcessoModal: React.Dispatch<React.SetStateAction<boolean>>;
  openEditarProcessoModal: boolean;
  processosPendentes: PPdataI;
  AtosAguardandoTriagem: ATdataI;
  AtosAguardandoCiencia: ACdataI;
  AtosDistribuidosHoje: AHdataI;
  AtosAguardandoDistribuicao: ADdataI;
  secretarias: SecretariasI[];
  secretaria: number;
  openTriagem: boolean;
  openExcluirAto: boolean;
  openEditarTriagem: boolean;
  triagemData: TriagemPostI;
  excluirAtoData: ExcluirAtoI;
  cadastrarProcesso: CadastrarProcesso;
  editarTriagemData: EditarTriagemI;
  processoData: any;
  openExcluirTriagemAtoModal: boolean;
  setOpenExcluirTriagemAtoModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDistHjExluirModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDistHjExluirModal: boolean;
  openOBSModal: boolean;
  setOpenOBSModal: React.Dispatch<React.SetStateAction<boolean>>;
  reload: () => void;
  reloadAguardandoCiencia: () => void;
  setOpenDistribuirModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDistribuirModal: boolean;
  setOpenTriagemModal: React.Dispatch<React.SetStateAction<boolean>>;
  openEditarTriagemEmLoteModal: boolean;
  setOpenEditarTriagemEmLoteModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  openTriagemModal: boolean;
  setProcessosData: React.Dispatch<React.SetStateAction<any[]>>;
  processosData: any[];
  setOpenTriagem: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenExcluirAto: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEditarTriagem: React.Dispatch<React.SetStateAction<boolean>>;
  setTriagemData: React.Dispatch<React.SetStateAction<any>>;
  setExcluirAtoData: React.Dispatch<React.SetStateAction<any>>;
  setCadastrarProcesso: React.Dispatch<React.SetStateAction<any>>;
  setEditarTriagemData: React.Dispatch<React.SetStateAction<any>>;
  setProcessoData: React.Dispatch<React.SetStateAction<any>>;
  setOpenTomarCienciaModal: React.Dispatch<React.SetStateAction<boolean>>;
  openTomarCienciaModal: boolean;
  tomarCienciaNoJVRIS: boolean;
  setTomarCienciaNoJVRIS: React.Dispatch<React.SetStateAction<boolean>>;
  setSecretaria: React.Dispatch<React.SetStateAction<number>>;
}

import { BookmarkSimple, Circle } from "phosphor-react";
import { AttorneyProcessesInOperationDataI } from "../../../../../../../api/services/attorneys/processesInOperation/attorneys.processesInOperation.interface";
import {
  PecaCadastrada,
  UrgenciesOptions,
} from "../../../../../../../components/JvrisTable/Helpers/consts";
import { line_attorney_dashnoard_table } from "../../../../../../../components/JvrisTable/Helpers/utils";
import { JvrisTableColumnNDataI } from "../../../../../../../components/JvrisTable/JvrisTable.interface";
import {
  CalcStatus,
  convertDateFormat2,
} from "../../../../../../../utils/Date.utils";
import { convertNumberToCurrency } from "../../../../../../../utils/convertNumberToCurrency.util";

export const processosEmOperacaoColumns: JvrisTableColumnNDataI[] = [
  { text: "Número do Processo" },
  {
    customComponent: <BookmarkSimple alt="Peça Cadastrada" size={14} weight="fill" />,
    text: "Peça Cadastrada",
  },
  { text: "Assunto(s)" },
  { text: "Especializada" },
  { text: "Distribuído" },
  { text: "Prazo" },
  { text: "Valor" },
  {
    customComponent: <Circle alt="Relevância do ato" size={14} weight="fill" />,
    text: "Relevância do ato",
  },
  {
    text: "Assessores",
  },
  {
    text: "Status",
  },
  {
    text: "Expediente",
  },
];

export interface createProcessosOperacaoSubOptionsI {
  clickDespacho: () => void;
  clickSolicitacaoInformacao: () => void;
  clickAlterarPrazo: () => void;
  clickRegistrarObservacao: () => void;
  clickAtribuirAssessor: () => void;
  clickAlterarRelevancia: () => void;
  clickRegistrarAudiencia: () => void;
  clickPedidoRestribuicao: () => void;
  clickAcatarPedido: () => void;
}

export function ParseToJvrisTableProcessosOperacao(
  data: AttorneyProcessesInOperationDataI[] | undefined
) {
  if (!data) return [] as JvrisTableColumnNDataI[][];

  const JvrisTableData = data.map((ObjData: any) => {
    return line_attorney_dashnoard_table({
      Head: {
        numero: {
          value: ObjData.txNumero,
          onClick: (index) => {
            if (index != undefined)
              window.location.href = `/dashboard/detalhes-processo/espelho-processos/${ObjData.idProcesso}`;
          },
        },
        cadastro: {
          value:
            ObjData.txStatusCadastroAto == "A"
              ? "automaticamente"
              : "manualmente",
        },
        sigilo: {
          value:
            ObjData.nuSigilo == 0
              ? 0
              : ObjData.nuSigilo == 1
              ? 1
              : ObjData.nuSigilo == 2
              ? 2
              : ObjData.nuSigilo == 3
              ? 3
              : ObjData.nuSigilo == 4
              ? 4
              : 5,
        },
        grau: {
          value:
            ObjData.nuInstancia == 1
              ? 1
              : ObjData.nuInstancia == 2
              ? 2
              : ObjData.nuInstancia == 3
              ? 3
              : null,
        },
        tipo: {
          value: ObjData.txRelevancia,
        },
        copy: {
          value: true,
        },
        inacao:
          ObjData.idDespacho > 0
            ? {
                value: ObjData.isDespachoRecusado,
              }
            : undefined,
        informacao:
          ObjData.idSolicitacaoInformacao > 0
            ? {
                value: ObjData.idSolicitacaoInformacaoResposta > 0,
              }
            : undefined,
        observacao: ObjData.txUltimaObservacao
          ? {
              value: ObjData.txUltimaObservacao,
            }
          : undefined,
        redistribuicao:
          ObjData.idRedistribuicao > 0
            ? {
                value: ObjData.isRedistribuicaoRecusada,
              }
            : undefined,
        // peca:
        //   ObjData.idPeca > 0
        //     ? {
        //         value: true,
        //       }
        //     : undefined,
        ficha:
          ObjData.idFichaProcessual > 0
            ? {
                value: ObjData.isFichaProcessualDevolvida
                  ? "Ficha Processual: Devolvida"
                  : ObjData.idRespostaFichaProcessual > 0
                  ? "Ficha Processual: Resposta Disponível"
                  : "Ficha Processual: Aguardando resposta da DCJE",
              }
            : undefined,
      },
      Body: [
        {
          value:
            ObjData.idPeca > 0
              ? PecaCadastrada.cadastrada
              : PecaCadastrada.naoCadastrada,
          design: { name: "PecaCadastrada" },
        },
        { value: ObjData.txAssunto },
        { value: ObjData.txEspecializada },
        { value: convertDateFormat2(ObjData?.dtDistribuicao) },
        {
          value: ObjData?.dtPrazo
            ? convertDateFormat2(ObjData?.dtPrazo)
            : "Sem Prazo",
        },
        { value: convertNumberToCurrency(ObjData?.vaProcesso) },
        {
          value: ObjData.isUrgente
            ? UrgenciesOptions.Urgente
            : UrgenciesOptions.Normal,
          design: {
            name: "RelevanciaAto",
          },
        },
        {
          value: ObjData.txAssessor ? ObjData.txAssessor : "Nenhum",
          /* design: {
                        name: "userIcon"
                    } */
        },
        {
          value: CalcStatus(ObjData.dtPrazo),
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

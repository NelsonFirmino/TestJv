import { saveAs } from "file-saver";

interface GenerateDOEReportInDocxProps {
  userId: number;
  id: number;
  status: string;
  message: string;
  data: Process[];
  dtInicio: string;
  dtFim: string;
}

interface Process {
  txEspecializada: string;
  txProcurador: string;
  txNumeroFormatado: string;
}

export const generateDOEReportInDocx = ({
  data: items,
  dtFim,
  dtInicio,
}: GenerateDOEReportInDocxProps) => {
  const FONTSIZEHEADER = "12px";
  const FONTSIZEHEAD = "12px";
  const FONTSIZEBODY = "10px";

  let htmlContent = "";

  htmlContent += `<p style="font-size:${FONTSIZEHEADER}; font-weight:bold; text-align:center; margin-bottom:0;">PGE/RN<br/>SECRETARIA GERAL<br/>RELAÇÃO DE DISTRIBUIÇÃO POR PROCURADOR NO PERÍODO DE ${dtInicio} ATÉ ${dtFim}<br/>CITAÇÕES, INTIMAÇÕES E NOTIFICAÇÕES<hr/></p>`;

  let sector = "_begin_",
    procurador = "_begin_";
  let subtotalProcurador = 0;

  for (let i = 0; i < items.length; i++) {
    if (sector !== items[i].txEspecializada) {
      htmlContent += `<p style="font-size:${FONTSIZEHEADER}; font-weight:bold; text-align:left; margin-bottom:0;">Setor: ${items[i].txEspecializada}</p>`;
      htmlContent += `<table cellpadding="0" cellspacing="0" width="100%" border="1" bordercolor="#cccccc">
                            <thead>
                                <tr>
                                    <th style="text-align:center; font-size:${FONTSIZEHEAD}; font-weight:bold; width:250px;">Procurador</th>
                                    <th style="text-align:center; font-size:${FONTSIZEHEAD}; font-weight:bold;">Processo</th>
                                </tr>
                            </thead>
                            <tbody>`;
      sector = items[i].txEspecializada;
    }

    if (procurador !== items[i].txProcurador) {
      htmlContent += `<tr>
                            <td style="text-align:left; font-size:${FONTSIZEBODY}; font-weight:normal; width:250px;">${items[
        i
      ].txProcurador.toUpperCase()}</td>
                            <td style="text-align:left; font-size:${FONTSIZEBODY}; font-weight:normal;">`;
      procurador = items[i].txProcurador;
    }

    htmlContent += `<b>[</b>${items[i].txNumeroFormatado}<b>]</b> `;
    subtotalProcurador++;

    if (i + 1 < items.length && items[i + 1].txProcurador !== procurador) {
      htmlContent += `<b>Total de Processos (${subtotalProcurador})</b></td></tr>`;
      subtotalProcurador = 0;
    }

    if (i + 1 === items.length || items[i + 1].txEspecializada !== sector) {
      htmlContent += `</tbody></table>`;
    }
  }

  const blob = new Blob([htmlContent], { type: "application/vnd.ms-word" });
  saveAs(blob, "RelatorioDistribuicaoDOE.doc");
};

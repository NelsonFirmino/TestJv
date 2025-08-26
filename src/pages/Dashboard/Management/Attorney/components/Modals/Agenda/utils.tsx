import { VideoCamera } from "phosphor-react";
import { line_attorney_dashnoard_table2 } from "../../../../../../../components/JvrisTable/Helpers/utils";
import {
  AudienciaHeadIconsWrapper,
  AudienciaHeadWrapper,
  GravacaoAudienciaWrapper,
  TipoAudienciaWrapper,
} from "./styled";
import { AudienciaI } from "../../../../../../../api/services/Procuradores/audiencias/interface";

export const AudienciasColumns = [
  {
    text: "Processo",
  },
  {
    text: "Vara",
  },
  {
    text: "Data",
  },
];

export function AudienciasCustomTable(audiencias: AudienciaI[]) {
  return audiencias.map((audiencia) => {
    return line_attorney_dashnoard_table2({
      Head: {
        component: (
          <AudienciaHeadWrapper>
            {audiencia.txNumero}
            <AudienciaHeadIconsWrapper>
              <TipoAudienciaWrapper>
                {audiencia.txTipoAudiencia}
              </TipoAudienciaWrapper>

              {audiencia.txLink && (
                <GravacaoAudienciaWrapper>
                  <VideoCamera
                    width={14}
                    height={14}
                    weight="fill"
                    onClick={() => {
                      window.open(audiencia.txLink, "_blank");
                    }}
                  />
                </GravacaoAudienciaWrapper>
              )}
            </AudienciaHeadIconsWrapper>
          </AudienciaHeadWrapper>
        ),
        text: audiencia.txNumero,
      },
      Body: [
        {
          value: audiencia.txVara,
        },
        {
          value: audiencia.dtDataHoraInicio,
        },
      ],
    });
  });
}

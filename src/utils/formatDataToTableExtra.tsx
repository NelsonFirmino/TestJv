import { JvrisTableColumnNDataI } from "../components/JvrisTable/JvrisTable.interface";
import CustomRelevanciaAto from "../components/JvrisTable/components/CustomRelevanciaAto";
import NumProcessOptions from "../components/JvrisTable/components/ProcessoOptions";
import { formatToBrazilianDate } from "./formatToBrazilianDate.util";
import { removeHTMLFormat } from "./removeHTMLFormat";

interface FormatTableInterface {
  content: any[];
  keysToInclude: string[];
  keysToFormatAsMoney?: string[];
  keysToFormatAsDate?: string[];
  keysToOnclick?: {
    key: string;
    onClick: (dataOnIndex: any) => void;
  }[];
  idProcessoDestaque?: boolean;
  relevanciaKey?: string;
  keysToFormatAsType?: string[];
  keysToFormatAsParte?: string[];
}

export const formatDataToTableExtra = ({
  content,
  keysToInclude,
  keysToFormatAsMoney,
  keysToFormatAsDate,
  keysToOnclick,
  idProcessoDestaque,
  relevanciaKey,
  keysToFormatAsType,
  keysToFormatAsParte,

}: FormatTableInterface) => {

  const returnData: JvrisTableColumnNDataI[][] = content.map((item: any) => {
    return keysToInclude
      .map((key: string, index) => {
        let value = item.hasOwnProperty(key) ? item[key] : "-";

        if (keysToFormatAsMoney) {
          if (item.hasOwnProperty(key) && keysToFormatAsMoney.includes(key)) {
            value = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(value);
          }
        }

        if (keysToFormatAsDate) {
          if (item.hasOwnProperty(key) && keysToFormatAsDate.includes(key)) {
            value = formatToBrazilianDate(value);
          }
        }

        if (keysToFormatAsType) {
          if (item.hasOwnProperty(key) && keysToFormatAsType.includes(key)) {
            switch (value) {
              case "R":
                value = "RPV";
                break;
              case "P":
                value = "Precatório";
                break;
              default:
                value = "-";
                break;
            }
          }
        }

        if (keysToFormatAsParte) {
          if (item.hasOwnProperty(key) && keysToFormatAsParte.includes(key)) {
            switch (value) {
              case "F":
                value = "Física";
                break;
              case "J":
                value = "Jurídica";
                break;
              case "E":
                value = "Estado do RN";
                break;
              case "A":
                value = "Associação";
                break;
              case "S":
                value = "Sindicato";
                break;
              default:
                value = "-";
            }
          }
        }

        const numProcess = (
          <NumProcessOptions
            copy={{
              value: true,
            }}
            numero={{
              value: value,
              title: value,
              onClick: () => {
                keysToOnclick
                  .find((keysToOnclick) => keysToOnclick.key === key)
                  .onClick(item);
              },
            }}
            observacao={
              item.txUltimaObservacao
                ? {
                  value: item.txUltimaObservacao,
                  title: item.txUltimaObservacao,
                }
                : undefined
            }
          />
        );

        return {
          text: removeHTMLFormat(value),
          onClick: keysToOnclick && keysToOnclick.find((keysToOnclick) => keysToOnclick.key === key) ? () => {
            keysToOnclick
              .find((keysToOnclick) => keysToOnclick.key === key)
              .onClick(item);
          }
            :
            undefined,
          customComponent:
            relevanciaKey === key ? (
              <CustomRelevanciaAto text={item.txRelevancia} />
            ) : (
              idProcessoDestaque && index == 0 && numProcess
            ),
        } as JvrisTableColumnNDataI;
      })
      .filter(Boolean);
  });

  return returnData;
};

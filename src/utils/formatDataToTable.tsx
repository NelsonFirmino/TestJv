import { line_attorney_dashnoard_table } from "../components/JvrisTable/Helpers/utils";
import { JvrisTableColumnNDataI } from "../components/JvrisTable/JvrisTable.interface";
import CustomRelevanciaAto from "../components/JvrisTable/components/CustomRelevanciaAto";
import NumProcessOptions from "../components/JvrisTable/components/ProcessoOptions";
import { formatToBrazilianDate } from "./formatToBrazilianDate.util";
import { removeHTMLFormat } from "./removeHTMLFormat";

export const formatDataToTable = (
  content: any[],
  keysToInclude: string[],
  keysToFormatAsMoney: string[] = [],
  keysToFormatAsDate: string[] = [],
  keysToOnclick: {
    key: string;
    onClick: (dataOnIndex: any) => void;
  }[] = [],
  idProcessoDestaque?: boolean,
  relevanciaKey?: string
) => {
  const returnData: JvrisTableColumnNDataI[][] = content.map((item: any) => {
    return keysToInclude
      .map((key: string, index) => {
        let value = item.hasOwnProperty(key) ? item[key] : "-";
        if (item.hasOwnProperty(key) && keysToFormatAsMoney.includes(key)) {
          value = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value);
        }
        if (item.hasOwnProperty(key) && keysToFormatAsDate.includes(key)) {
          value = formatToBrazilianDate(value);
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
                  .find((keyToOnclick) => keyToOnclick.key === key)
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

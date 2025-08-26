import {
  Menu,
  MenuResponse,
} from "../../../../../api/services/menu/menu.interface";
import { line_attorney_dashnoard_table } from "../../../../../components/JvrisTable/Helpers/utils";
import { JvrisTableColumnNDataI } from "../../../../../components/JvrisTable/JvrisTable.interface";
import {
  CalcStatus,
  convertDateFormat2,
} from "../../../../../utils/Date.utils";

export function ParseToJvrisTableProcessosOperacao(data: Menu[] | undefined) {
  if (!data) return [] as JvrisTableColumnNDataI[][];
  const JvrisTableData = data.map((ObjData) => {
    return line_attorney_dashnoard_table({
      Head: {
        numero: {
          value: ObjData.txMenu,
        },
      },
      Body: [{ value: ObjData.txPagina }, { value: ObjData.txPagina }, { value: ObjData.nuOrdem }],
    });
  });
  return JvrisTableData;
}

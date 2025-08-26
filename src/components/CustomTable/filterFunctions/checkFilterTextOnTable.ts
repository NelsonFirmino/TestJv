import { formatDateToCustomTable } from "../../../utils/formatDateToCustomTable.util";
import { Column } from "../interfaces/custom-table.interface";
import unorm from "unorm";

export const checkFilterTextOnTable = (
  filterText: string,
  sortableData: any[],
  columns: Column[]
) => {
  if (filterText) {
    const normalizedFilterText = unorm
      .nfd(filterText)
      .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos
      .toLowerCase();

    sortableData = sortableData.filter((item) =>
      columns.some((column) => {
        const itemData = item[column.keyData];
        if (itemData !== undefined && itemData !== null) {
          const normalizedItemData = unorm
            .nfd(itemData.toString().toLowerCase())
            .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos
            .replace(/[^\w\s]/g, ""); // Substitui caracteres especiais por espaços em branco

          // Filtragem de data
          if (/[-\/]/.test(filterText)) {
            const normalizedFilterDate = formatDateToCustomTable(filterText);
            const normalizedItemDate = formatDateToCustomTable(
              itemData.toString()
            );
            return normalizedItemDate.includes(normalizedFilterDate);
          }

          // Filtragem de texto, código ou valor monetário
          else {
            const normalizedFilterTextWithoutPunctuation = normalizedFilterText.replace(/[.,]/g, "");
            const normalizedItemDataWithoutPunctuation = normalizedItemData.replace(/[.,]/g, "");
            return normalizedItemDataWithoutPunctuation.includes(normalizedFilterTextWithoutPunctuation);
          }
        }
        return false;
      })
    );
  }

  return sortableData;
};

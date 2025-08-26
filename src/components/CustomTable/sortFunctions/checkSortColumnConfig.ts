import { Column, SortStateProps } from "../interfaces/custom-table.interface";
import { sortByCurrency,  } from "./sortByCurrency";
import { sortByDate } from "./sortByDate";
import { sortByDateAndTime } from "./sortByDateAndTime";
import { sortByDefault } from "./sortByDefault";

export const checkSortColumnConfig = (sortConfig: SortStateProps, sortableData, columns: Column[]) => {
    if (sortConfig !== null && sortConfig !== undefined) {
      sortableData.sort((a, b) => {

        if (columns.some((col) => col.keyData === sortConfig.key && col?.formatToDate && col.includeDateTimeKey)) {
          return sortByDateAndTime(a, b, sortConfig.key, sortConfig?.keyTime, sortConfig.direction); // Ordena por data e hora
        } 

        if (columns.some((col) => col.keyData === sortConfig.key && col?.formatToDate)) {
          return sortByDate(a, b, sortConfig.key, sortConfig.direction); // Ordena por data
        } 

        else if (columns.some((col) => col.keyData === sortConfig.key && col?.formatToCurrency)) {
          return sortByCurrency(a, b, sortConfig.key, sortConfig.direction); // Ordena por moeda
        } 

        else {
          return sortByDefault(a, b, sortConfig.key, sortConfig.direction); // Ordenação padrão
        }
      });
    }
};
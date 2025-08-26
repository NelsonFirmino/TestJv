export const filterByColumn = (
  data: any,
  filterDataBySelectValueColumn: any
) => {
  return data.filter((d) => {
    return filterDataBySelectValueColumn.every((f) => {
      if (f.type === "VALUE_RANGE") {
        switch (f.label) {
          case 1: {
            return +d[f.keyData] >= 0 && +d[f.keyData] <= 100;
          }
          case 2: {
            return +d[f.keyData] >= 100.01 && +d[f.keyData] <= 1000;
          }
          case 3: {
            return +d[f.keyData] >= 1000.01 && +d[f.keyData] <= 5000;
          }
          case 4: {
            return +d[f.keyData] >= 5000.01 && +d[f.keyData] <= 10000;
          }
          case 5: {
            return +d[f.keyData] >= 10000.01 && +d[f.keyData] <= 100000;
          }
          case 6: {
            return +d[f.keyData] >= 100000.01 && +d[f.keyData] <= 500000;
          }
          case 7: {
            return +d[f.keyData] > 500000;
          }
        }
      } else {
        return f.label === d[f.keyData];
      }
    });
  });
};

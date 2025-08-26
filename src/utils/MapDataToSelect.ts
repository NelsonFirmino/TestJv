export function mapToSelect(data: any, keys: string[]) {
  return data.map((item: any) => {
    return {
      value: item[keys[0]],
      label: item[keys[1]],
    };
  });
}

export function mapEspecializadasDoSelect(data: any) {
  return data.map((item: any) => {
    return {
      label:
        repeatStringNumTimes("→", item.nuNivel) +
        (item.nuNivel == 0 ? "" : " ") +
        item.txEspecializada,
      value: item.id,
    };
  });
}

function repeatStringNumTimes(str: string, times: number) {
  var repeatedString = "";
  while (times > 0) {
    repeatedString += str;
    times--;
  }
  return repeatedString;
}

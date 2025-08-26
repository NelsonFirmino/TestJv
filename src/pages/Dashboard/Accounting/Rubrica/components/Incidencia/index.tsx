import * as S from "./styled";

export const Incidencia = (dataTable: any) => {
  let result = "";

  switch (dataTable.dataTable.nuIncidencia) {
    case 1:
      result = `<font style="color: #120a8f">Permanente</font>`;
      break;
    case 2:
      result = `<font style="color: #d43f3a">Percentual sobre vencimento</font>`;
      break;
    case 3:
      result = `<font style="color: #d43f3a">Natureza não habitual</font>`;
      break;
    default:
      result = `<font style="color: #d43f3a">---</font>`;
      break;
  }

  return (
    <S.Wrapper
      dangerouslySetInnerHTML={{
        __html: result,
      }}
    />
  );
};

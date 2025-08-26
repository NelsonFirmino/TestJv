interface stdProccessOptI {
  value: string | number | boolean;
  title?: string;
  onClick?: (index?: number) => void;
}

export interface ProcessOptionsI {
  numero: stdProccessOptI;
  cadastro?: stdProccessOptI & { value: "automaticamente" | "manualmente" };
  tipo?: stdProccessOptI & {
    value:
      | "Normal"
      | "Urgente"
      | "Importante"
      | "Valor Expressivo"
      | "Sustentação Oral"
      | string;
  };
  sigilo?: stdProccessOptI & {
    value: 0 | 1 | 2 | 3 | 4 | 5 | number;
  };
  grau?: stdProccessOptI & {
    value: 1 | 2 | 3 | number;
  };
  copy?: stdProccessOptI & { value: boolean };
  inacao?: stdProccessOptI & { value: boolean };
  observacao?: stdProccessOptI & { value: string };
  redistribuicao?: stdProccessOptI & { value: boolean };
  informacao?: stdProccessOptI & { value: boolean };
  peca?: stdProccessOptI & { value: boolean };
  ficha?: stdProccessOptI & { value: string };
}

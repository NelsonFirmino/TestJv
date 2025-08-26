export interface RegisterProcessTable {
  title: string;
  data: RegisterProcessDatatable[];
}

interface RegisterProcessDatatable {
  id?: string;
  name: string;
  cpfCnpj: string;
}

export interface PutPostParams {
  id?: number;
  txMotorista?: string;
}

export interface GetResponse {
  status: string;
  message: string;
  data: Motorista[];
}

interface Motorista {
  id: number;
  txMotorista: string;
}

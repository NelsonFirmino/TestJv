export interface GetAdvisorsResponse {
  status: string;
  message: string;
  data: Advisor[];
}

interface Advisor {
  id: number;
  txAssessor: string;
  isBloqueado: boolean;
}

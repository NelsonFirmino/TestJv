export interface GetAdvisorsByAttorneyIdResponse {
  status: string
  message: string
  data: Advisors[]
}

export interface Advisors {
  id: number
  txAssessor: string
  isBloqueado: boolean
}
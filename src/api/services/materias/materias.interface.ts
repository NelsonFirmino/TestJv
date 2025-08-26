export interface GetMateriasResponse {
  status: string
  message: string
  firstPage: number
  lastPage: number
  nextPage: number
  totalItens: number
  data: Materias[]
}

export interface Materias {
  id: number
  txMateria: string
}

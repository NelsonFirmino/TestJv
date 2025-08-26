export interface ProcessoI {
    id: number
    txNumeroFormatado: string
    txNumero: string
    txTipo: string
    idSistemaProcessual: number
    idTribunal: number
    nuInstancia: number
    vaProcesso: number
    txRelevancia: string
    isFisico: boolean
    dtCadastro: string
    hrCadastro: string
    idUsuarioCadastro: number
    txUsuario: string
    idPeca: number
    idDespacho: number
    txAssunto: string
    txTribunal: string
    txSigla: string
    relevancias: any[]
  }
  
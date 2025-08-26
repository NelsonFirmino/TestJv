import { Partes } from "../../../../../../api/services/partes/partes.interface"
import * as S from './styled';

interface DocumentProps {
    data: Partes
}

export const Document = ({ data }: DocumentProps) => {
    return (
        <S.LinkDocument to={`/dashboard/detalhes-processo/extrato-de-processos-por-parte/${encodeURIComponent(data.txCpfCnpj)}`}>{data.txCpfCnpj}</S.LinkDocument>
    )
}
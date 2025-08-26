import { useState } from 'react';
import * as S from './styled';
import { ModalAddActObservation } from '../ModalAddActObservation';
import { ActionColumnProps } from './action-column.interface';
import { ModalSeeProcedure } from '../ModalSeeProcedure';

export const ActionsColumn = ({dataTable, processIdKeyCacheRevalidate}: ActionColumnProps) => {
    const [openModalObservation, setOpenModalObservation] = useState(false);
    const [openModalTramitacoes, setOpenModalTramitacoes] = useState(false);

    return (
        <S.Wrapper>
            <ModalAddActObservation showModalAddActObservation={openModalObservation} setShowModalAddActObservation={setOpenModalObservation} 
            actId={+dataTable.id} processIdKeyCacheRevalidate={processIdKeyCacheRevalidate} txFormatedProcessNumber={dataTable.txNumeroFormatado} />
            <ModalSeeProcedure showModalSeeProcedure={openModalTramitacoes} setShowModalSeeProcedure={setOpenModalTramitacoes}
            actId={+dataTable.id} />
            <S.SeeActDetails to={`/dashboard/detalhes-processo/visualizar-ato/${dataTable.id}`} >
                <S.SeeActDetailsIcon weight='bold' alt='Ver cadastro do ato' />
            </S.SeeActDetails>
            <S.ActionButton onClick={() => setOpenModalObservation(true)}>
                <S.AddObservationIcon alt='Ver observações do ato' />
            </S.ActionButton>
            <S.ActionButton onClick={() => setOpenModalTramitacoes(true)}>
                <S.InfoObservationIcon alt='Ver tramitações'/>
            </S.ActionButton>
        </S.Wrapper>
    )
}
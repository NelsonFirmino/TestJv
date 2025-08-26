import * as S from './styled'
import { useState } from "react";
import { ActionColumnAttachmentsProps } from "./action-column-attachments.interface"
import { ModalRemoveAttachment } from './components/ModalRemoveAttachment';
import { openPDFInNewTab } from '../../../../../../utils/openPDFInNewTab.util';

export const ActionColumnAttachments = ({dataTable, processIdKeyCacheRevalidate}: ActionColumnAttachmentsProps) => {
    const [isOpenModalRemoveAttachment, setOpenModalRemoveAttachment] = useState(false);

    return (
        <S.Wrapper>
            <ModalRemoveAttachment showModalRemoveAttachment={isOpenModalRemoveAttachment} setShowModalRemoveAttachment={setOpenModalRemoveAttachment} 
            processIdKeyCacheRevalidate={processIdKeyCacheRevalidate} attachmentId={dataTable.id} />
            <S.ActionButton onClick={() => openPDFInNewTab(dataTable.file_stream)}>
                <S.DownloadIcon alt="Ver anexo" />
            </S.ActionButton>
            <S.ActionButton onClick={() => setOpenModalRemoveAttachment(true)}>
                <S.InfoObservationIcon alt='Remover anexo'/>
            </S.ActionButton>
        </S.Wrapper>
    )
}
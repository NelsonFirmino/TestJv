import { useState } from "react";
import { AcoesProps } from "./acoes.interface"
import * as S from './styled'
import { openOctetStreamInNewTab } from "../../../../../../../../../../../utils/openOctetStreamInNewTab.util";
import { ModalRemoveAttachment } from "./components/ModalRemoveAttachment";

export const Acoes = ({ dataTable, attachmentIdKeyCacheRevalidate }: AcoesProps) => {
    const [isOpenModalRemoveAttachment, setOpenModalRemoveAttachment] = useState(false);

    return (
        <S.Wrapper>
            <ModalRemoveAttachment attachmentId={dataTable.id} processIdKeyCacheRevalidate={attachmentIdKeyCacheRevalidate}
                setShowModalRemoveAttachment={setOpenModalRemoveAttachment} showModalRemoveAttachment={isOpenModalRemoveAttachment} />
            <S.ActionButton onClick={() => openOctetStreamInNewTab(dataTable.file_stream, dataTable.name)}>
                <S.DownloadIcon alt="Ver anexo" />
            </S.ActionButton>
            <S.ActionButton onClick={() => setOpenModalRemoveAttachment(true)}>
                <S.InfoObservationIcon alt='Remover anexo' />
            </S.ActionButton>
        </S.Wrapper>
    )
}
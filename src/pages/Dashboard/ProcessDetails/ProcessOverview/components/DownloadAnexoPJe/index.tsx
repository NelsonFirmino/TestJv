import { useMutation } from 'react-query';
import * as S from './styled'
import { openPDFInNewTab } from '../../../../../../utils/openPDFInNewTab.util';
import { GetAnexoPJe } from '../../../../../../api/services/process/process';
import { openOctetStreamInNewTab } from '../../../../../../utils/openOctetStreamInNewTab.util';

export const DownloadAnexoPJe = ({ dataTable }: any) => {
    const {
        mutate: mutateAbrirAnexoDCJE,
        isLoading,
    } = useMutation(GetAnexoPJe, {
        onSuccess: ({ data }) => {
            if (data.txTipoArquivo === "application/pdf") {
                openPDFInNewTab(data.file_stream)
            } else {
                openOctetStreamInNewTab(data.file_stream, data.name, data.txTipoArquivo)
            }

        },
    });

    return (
        <S.Wrapper>
            <S.ActionButton disabled={isLoading} onClick={() => mutateAbrirAnexoDCJE({ idProcessoPJe: dataTable.idProcessoPJe, nuCodigoDocumento: dataTable.nuCodigoDocumento })}>
                <S.DownloadIcon alt='Baixar anexo PJe' />
            </S.ActionButton>
        </S.Wrapper>
    )
}
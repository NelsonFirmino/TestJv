import { useMutation } from 'react-query';
import * as S from './styled'
import { GetPeca } from '../../../../../../api/services/process/process';
import { openPDFInNewTab } from '../../../../../../utils/openPDFInNewTab.util';

export const DownloadPeca = ({dataTable}: any) => {
    const {
        mutate: mutateAbriPeca,
        isLoading,
      } = useMutation(GetPeca, {
        onSuccess: ({ data }) => {
            openPDFInNewTab(data.file_stream)  
        },
      });

    return (
        <S.Wrapper>
            <S.ActionButton disabled={isLoading} onClick={() => mutateAbriPeca(dataTable.id)}>
                <S.DownloadIcon />
            </S.ActionButton>
        </S.Wrapper>
    )
}
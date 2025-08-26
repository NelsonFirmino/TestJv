import { useMutation } from 'react-query';
import * as S from './styled';
import { GetProcessInActionPrint } from '../../../../../../../../../api/services/process/process';
import toast from 'react-hot-toast';
import { SharedState } from '../../../../../../../../../context/SharedContext';
import { openPDFInNewTab } from '../../../../../../../../../utils/openPDFInNewTab.util';

export const ImprimirProcessosEmLote = () => {
    const { selectedProcessoInActionDataTable, setSelectedProcessoInActionDataTable, setSelectedRowHashes } = SharedState();
    const { mutate: mutateProcessInActionPrint, isLoading: isLoadingProcessInActionPrint } = useMutation(GetProcessInActionPrint, {
        onSuccess: (res) => {
            openPDFInNewTab(res.data.file_stream);
            setSelectedProcessoInActionDataTable([])
            setSelectedRowHashes([])
        },
        onError: (error: Error) => {
            toast.error(error?.message, {
                icon: "❌",
                style: {
                    borderRadius: "10px",
                    background: "#e57373",
                    color: "#fff",
                    fontSize: "30px",
                },
            })
        }
    })

    return (
        <S.Button onClick={() => mutateProcessInActionPrint(selectedProcessoInActionDataTable)}>Imprimir processos</S.Button>
    )
}
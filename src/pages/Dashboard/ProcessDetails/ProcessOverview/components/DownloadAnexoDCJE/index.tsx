import { useMutation } from 'react-query';
import * as S from './styled'
import { openPDFInNewTab } from '../../../../../../utils/openPDFInNewTab.util';
import { getDCJECalcFile } from '../../../../../../api/services/processAttachments/processAttachments';

export const DownloadAnexoDCJE = ({ dataTable }: any) => {
    const {
        mutate: mutateAbrirAnexoDCJE,
        isLoading,
    } = useMutation(getDCJECalcFile, {
        onSuccess: ({ data }) => {
            openPDFInNewTab(data.file_stream)
        },
    });

    const handleDownloadFile = async () => {
        if (dataTable.txTipo === "Resposta" || dataTable.txTipo === "Ficha Processual") {
            let endpoint;
            switch (dataTable.txTipo) {
                case "Resposta":
                    endpoint = "respostas-anexos";
                    break;
                case "Ficha Processual":
                    endpoint = "ficha-dcje-anexos";
                    break;
                default:
                    alert("Arquivo não identificado!");
            }

            window.open(
                process.env.REACT_APP_BASE_API_URL +
                `/api/v1.0/${endpoint}/${dataTable.idAnexo}/arquivo`,
                "_blank"
            );
        } else {
            mutateAbrirAnexoDCJE(dataTable.idAnexo);
        }
    };

    return (
        <S.Wrapper>
            <S.ActionButton disabled={isLoading} onClick={() => handleDownloadFile()}>
                <S.DownloadIcon alt='Baixar anexo DCJE' />
            </S.ActionButton>
        </S.Wrapper>
    )
}
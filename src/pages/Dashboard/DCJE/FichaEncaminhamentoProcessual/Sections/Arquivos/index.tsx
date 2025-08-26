import { ChangeEvent, useEffect, useState } from "react";
import { getActDCJEAttachments } from "../../../../../../api/services/dcje/actsDCJE/actsDCJEAttachments/actsDCJEAttachments";
import { ActDCJEAttachmentsResponse } from "../../../../../../api/services/dcje/actsDCJE/actsDCJEAttachments/actsDCJEAttachments.interface";
import { openPDFInNewTab } from "../../../../../../utils/openPDFInNewTab.util";
import { ModalConfirmRemoveAttachment } from "../../components/ModalConfirmRemoveAttachment";
import * as S from "../../styled";
import useFEPContext from "../../useFEPContext";

const Arquivos = () => {
    const {
      
        fichaDCJE,
        inputs: {
           
            updateInputs
        }
    } = useFEPContext();
    const [
        showModalConfirmRemoveAttachment,
        setShowModalConfirmRemoveAttachment
    ] = useState<{
        open?: boolean;
        actAttachmentId: number;
    }>({
        open: false,
        actAttachmentId: 0
    });
    const [acatt, setAcatt] = useState<ActDCJEAttachmentsResponse>();

    async function getAttachments() {
        if (fichaDCJE) {
            const atts = await getActDCJEAttachments(fichaDCJE.id);
            setAcatt(atts);
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (
            e.target.files &&
            e.target.files.length > 0 &&
            e.target.files[0].size <= 15 * 1024 * 1024
        ) {
            const arquivos = e.target.files;
            const lsArquivos = {}
            

         /* const lsArquivos = {
            [`test ${time}`]: "data:application/pdf;base64,JVBERi0xLjQKJ"
        } */
            
            Array.from(arquivos).forEach((file, index) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const name = `${file.name.split('.')[0].split(' ').join('-')}`;
                    lsArquivos[name] = reader.result.toString().split(',')[1];
                };
                
            });
            /* console.log('arquivosBase64', arquivosBase64);
            //convert to format {filename: fileBase64, filename2: file2Base64}
            const lsArquivos = Array.from(arquivos).map((file) => {
                return {
                    name: file.name,
                    file: arquivosBase64[file.name]
                };
            });
            console.log('lsArquivos', lsArquivos); */
            updateInputs({
                arquivos: {
                    lsArquivos
                }
            });
            return;
        } else if (e.target.files && e.target.files.length > 0) {
            alert(
                "O arquivo é muito grande! Por favor, selecione um arquivo de até 15MB."
            );
            e.target.value = "";
            updateInputs({
                arquivos: {
                    lsArquivos: null
                }
            });
            return;
        } else {
            updateInputs({
                arquivos: {
                    lsArquivos: null
                }
            });
            return;
        }
    };

    useEffect(() => {
        console.log(
            "showModalConfirmRemoveAttachment",
            showModalConfirmRemoveAttachment
        );
        if (
            showModalConfirmRemoveAttachment.actAttachmentId == 0 &&
            !showModalConfirmRemoveAttachment.open
        ) {
            getAttachments();
        } else {
            setAcatt(undefined);
        }
    }, [showModalConfirmRemoveAttachment, fichaDCJE]);

    return (
        <S.Section>
            {showModalConfirmRemoveAttachment.open && (
                <ModalConfirmRemoveAttachment
                    setShowModalConfirmRemoveAttachment={
                        setShowModalConfirmRemoveAttachment
                    }
                    showModalConfirmRemoveAttachment={
                        showModalConfirmRemoveAttachment
                    }
                    proceduralRecordId={fichaDCJE?.id}
                />
            )}
            <S.TitleSectionContainer>
                <S.TitleSection> Arquivos (PDF | EXCEL)</S.TitleSection>
            </S.TitleSectionContainer>
            <S.ContentSection>
                <S.ContainerField>
                    <S.WarningFileMessage>
                        * Arquivo baixado diretamente do PJe pode causar
                        problema:
                        <S.LinkOpenFile
                            href="/AnexarArquivoDoPJE_v1.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            clique aqui para solução
                        </S.LinkOpenFile>
                    </S.WarningFileMessage>
                    <S.WarningTiteFileMessage>
                        Recomenda-se anexar os seguintes documentos essenciais:
                    </S.WarningTiteFileMessage>
                    <S.WarningFileMessage>
                        - Cálculo de Cumprimento de Sentença;
                    </S.WarningFileMessage>
                    <S.WarningFileMessage>
                        - Petição de Cumprimento de Sentença;
                    </S.WarningFileMessage>
                    <S.WarningFileMessage>
                        - Sentença e/ou Acórdão;
                    </S.WarningFileMessage>
                    <S.WarningFileMessage>
                        - Planlhas, Laudos e outros documentos orientadores para
                        os cálculos
                    </S.WarningFileMessage>
                    <S.FileInput
                        required={true}
                        type="file"
                        accept=".pdf, .xlsx, .xls"
                        onChange={(e) => handleFileChange(e)}
                    />
                    <S.WarningFileSize>
                        Escolha um arquivo de até 15MB
                    </S.WarningFileSize>
                </S.ContainerField>
            </S.ContentSection>

            <S.ContentSection>
                {acatt ? (
                    acatt.data ? (
                        <S.ContainerTable>
                            <S.Table>
                                <thead>
                                    <S.RowTable>
                                        <S.Th>Identificados</S.Th>
                                        <S.Th>Nome do anexo</S.Th>
                                        <S.ButtonTh>Ações</S.ButtonTh>
                                    </S.RowTable>
                                </thead>
                                <tbody>
                                    {acatt.data.map((at) => (
                                        <S.RowTableObservation key={at.id}>
                                            <td>{at.id}</td>
                                            <td>{at.name}</td>
                                            <S.ButtonTD>
                                                <S.SeeButtonTable
                                                    onClick={() =>
                                                        openPDFInNewTab(
                                                            at.file_stream
                                                        )
                                                    }
                                                >
                                                    <S.SeeIcon alt="Ver anexo" />
                                                </S.SeeButtonTable>
                                                <S.RemoveButtonTable
                                                    onClick={() =>
                                                        setShowModalConfirmRemoveAttachment(
                                                            {
                                                                open: true,
                                                                actAttachmentId:
                                                                    at.id
                                                            }
                                                        )
                                                    }
                                                >
                                                    <S.RemoveIcon alt="Remover anexo" />
                                                </S.RemoveButtonTable>
                                            </S.ButtonTD>
                                        </S.RowTableObservation>
                                    ))}
                                </tbody>
                            </S.Table>
                        </S.ContainerTable>
                    ) : (
                        <S.ContainerTable>
                            <S.WarningNotFound>
                                Nenhum anexo encontrado.
                            </S.WarningNotFound>
                        </S.ContainerTable>
                    )
                ) : (
                    <S.LoadingSpinner />
                )}
            </S.ContentSection>
        </S.Section>
    );
};

export default Arquivos;

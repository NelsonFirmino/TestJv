import { useState } from "react";
import toast from "react-hot-toast";
import { getActAttachmentsById } from "../../../../../../../api/services/acts/acts";
import { Attachment } from "../../../../../../../api/services/acts/acts.interface";
import { getActsAndProcedure } from "../../../../../../../api/services/actsAndProcedure/actsAndProcedure";
import { ProcessoInAction } from "../../../../../../../api/services/attorneys/attorneys.interface";
import { BaseModal } from "../../../../../../../components/BaseModal";
import { CustomTable } from "../../../../../../../components/CustomTable";
import { openOctetStreamInNewTab2 } from "../../../../../../../utils/openOctetStreamInNewTab.util";
import { DownloadButton } from "./DownloadButton";
import * as S from "./styled";

interface ExpedienteProps {
  dataTable: ProcessoInAction;
}

export const Expediente = ({ dataTable }: ExpedienteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState<Attachment[]>();
  const [isModalOpen, setModalIsOpen] = useState(false);

  const handleGetDocuments = async (processId: number) => {
    setIsLoading(true);
    try {
      const { data, message } = await getActsAndProcedure(processId.toString());
      //   const lastActId = data[data.length - 1]?.id.toString(); // último id do ato
      const lastActId = dataTable?.id.toString();

      if (!lastActId) {
        throw new Error(message);
      }

      const { data: attachmentsData, status } = await getActAttachmentsById(
        lastActId
      );

      if (status !== "OK" || attachmentsData.length === 0) {
        throw new Error("Ato não possui anexo");
      }

      if (attachmentsData.length === 1) {
        openOctetStreamInNewTab2(
          attachmentsData[0].file_stream,
          attachmentsData[0].name
        );
      } else {
        // abri modal com tabela de anexos
        // caso de teste: 0815008-83.2022.8.20.0000 de rosa maria
        setModalData(attachmentsData);
        setModalIsOpen(true);
      }
    } catch (error) {
      toast(error.message, {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#F0AD4E",
          color: "#fff",
          fontSize: "30px",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BaseModal
        title={`Expediente (${modalData?.length})`}
        isOpenModal={isModalOpen}
        setOpenModal={setModalIsOpen}
      >
        <CustomTable
          isLoading={isLoading && !Boolean(modalData?.length)}
          showPagination={true}
          showSelectNumberOfRows={false}
          showSearchField={false}
          selectRows={false}
          data={modalData ? modalData : []}
          columns={[
            {
              keyData: "txDescricao",
              name: "Descrição",
              isSortable: false,
            },
            {
              keyData: "dtCadastro",
              name: "Data de cadastro",
              isSortable: true,
              formatToDate: true,
            },
            {
              keyData: "file_stream",
              name: "",
              isSortable: false,
              component: {
                isButton: true,
                element: (data) => <DownloadButton data={data} />,
              },
            },
          ]}
        />
      </BaseModal>
      <S.DocumentButton
        disabled={isLoading}
        onClick={() => handleGetDocuments(dataTable.idProcesso)}
      >
        <S.DocumentIcon />
      </S.DocumentButton>
    </>
  );
};

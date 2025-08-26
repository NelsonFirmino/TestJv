import { Download, X } from "phosphor-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  getAnexosAto,
  postAnexo,
} from "../../../../../../../api/services/anexosAto/anexosAto";
import { JvrisModal } from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import JvrisTable from "../../../../../../../components/JvrisTable";
import { SharedState } from "../../../../../../../context/SharedContext";
import theme from "../../../../../../../globalStyle/theme";
import { getBase64 } from "../../../../../../../utils/getBase64.util";
import { openOctetStreamInNewTab } from "../../../../../../../utils/openOctetStreamInNewTab.util";
import { formatDataToTable } from "../../../../../Accounting/RedistributionOfCaseFiles/utils";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { useTablesContext } from "../../../context/TablesContext";
import { ModalAddEdit } from "./ModalAdd";
import { ModalRemove } from "./ModalRemover";
import { AnexosAto } from "./interfaces/anexosAto.interface";
import * as MockData from "./mockData";
import * as S from "./styled";

const AnexosAtoModal = () => {
  const { user } = SharedState();
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal, setShouldReset } = useModalsContext();
  const [showModalRemove, setShowModalRemove] = useState(false);

  const [id, setId] = useState<number>(null);
  const [idProcesso, setIdProcesso] = useState<number>(null);
  const [idParte, setIdParte] = useState<number>(null);
  const [txParte, setTxParte] = useState<string>("");
  const [txTipoPessoa, setTxTipoPessoa] = useState<string>("");
  const [txCpfCnpj, setTxCpfCnpj] = useState<string>("");
  const [showModalAddEdit, setShowModalAddEdit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [added, setIsAdded] = useState(false);

  const ToggleElement = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  const {
    register,
    reset,
    handleSubmit,
    setValue: setAnexo,
    formState: { isValid, errors },
    watch,
    control: controlAnexo,
  } = useForm<AnexosAto>({
    mode: "onChange",
  });

  const {
    mutate: mutateAnexoAto,
    data: response,
    isLoading,
  } = useMutation(getAnexosAto);

  function getAnexosAtoFunct(id: number) {
    mutateAnexoAto(id);
  }

  const resetOnSubmit = () => {
    getAnexosAtoFunct(managing.singularSelectedData.id);

    closeModal();
  };

  const onSubmit: SubmitHandler<AnexosAto> = async (params) => {
    let file_stream_attachment: any;
    let file_name: any;
    if (params.file_stream) {
      for (let file of params.file_stream) {
        file_stream_attachment = await getBase64(file);
        file_name = file.name;
      }
    }
    postAnexo({
      idAto:
        managing.selectedData && managing.selectedData.length
          ? Number(managing.selectedData![0].id)
          : Number(managing.singularSelectedData.id),
      txDescricao: file_name,
      idUsuarioCadastro: +user["Jvris.User.Id"],
      file_stream: file_stream_attachment,
    })
      .then((response) => {
        if (response.status == "Created") {
          setIsAdded(!added);
          setIsVisible(!isVisible);
          // queryClient.invalidateQueries(`assuntosSemPaginacao`);
          // handleToast("Assunto Adicionado com Sucesso");
        } else {
          // handleToast(response.message, true);
        }
      })
      .catch((err) => {
        // handleToast("Erro ao Adicionar Assunto");
      });
  };

  useEffect(() => {
    if (managing?.singularSelectedData) {
      getAnexosAtoFunct(managing.singularSelectedData.id);
    }
  }, [managing.singularSelectedData]);

  useEffect(() => {
    if (managing?.singularSelectedData) {
      getAnexosAtoFunct(managing.singularSelectedData.id);
    }
  }, [showModalRemove]);

  useEffect(() => {
    if (managing?.singularSelectedData) {
      getAnexosAtoFunct(managing.singularSelectedData.id);
    }
  }, [added]);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (files: FileList) => void
  ) => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].size <= 15 * 1024 * 1024
    ) {
      onChange(e.target.files);
      setAnexo("file_stream", e.target.files);
      return;
    } else if (e.target.files && e.target.files.length > 0) {
      alert(
        "O arquivo é muito grande! Por favor, selecione um arquivo de até 15MB."
      );
      e.target.value = "";
      setAnexo("file_stream", null);
      return;
    } else {
      setAnexo("file_stream", null);
      return;
    }
  };

  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.anexosAto)}
      closeModal={resetOnSubmit}
    >
      {showModalAddEdit && (
        <ModalAddEdit
          id={idParte}
          txParte={txParte}
          txTipoPessoa={txTipoPessoa}
          txCpfCnpj={txCpfCnpj}
          setShowModalAddEdit={setShowModalAddEdit}
        />
      )}
      {showModalRemove && (
        <ModalRemove
          id={id}
          idProcesso={idProcesso}
          setShowModalRemove={setShowModalRemove}
        />
      )}
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <SM.Wrapper>
          <SM.TitleContainer>
            <SM.TitleLabel>Anexos do Ato</SM.TitleLabel>
            <SM.TitleButtonWrapper>
              <SM.AddButton onClick={(e) => ToggleElement(e)}>
                Adicionar
              </SM.AddButton>
              <SM.TitleButton onClick={resetOnSubmit}>Fechar</SM.TitleButton>
            </SM.TitleButtonWrapper>
          </SM.TitleContainer>
          <SM.ContentWrapper>
            <SM.ContentTitle>
              <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                PROCESSO SELECIONADO:
              </SM.ContentTitleLabel>
              <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                {managing.singularSelectedData?.txNumero}
              </SM.ContentTitleLabel>
            </SM.ContentTitle>
            <SM.ContentSeparator />

            <SM.TableWrapper>
              {isVisible ? (
                <SM.ToggleContainer>
                  <Controller
                    name="file_stream"
                    control={controlAnexo}
                    defaultValue={null}
                    render={({ field: { onChange, value, ...field } }) => (
                      <SM.FileInput
                        required={true}
                        {...field}
                        type="file"
                        accept=".pdf, .xlsx, .xls"
                        onChange={(e) => handleFileChange(e, onChange)}
                      />
                    )}
                  />
                  <SM.AddButton type="submit">Enviar</SM.AddButton>
                </SM.ToggleContainer>
              ) : (
                ""
              )}
              {response?.data ? (
                <SM.TableContainer>
                  <JvrisTable
                    columnFilter={false}
                    Searchable={false}
                    maxRows={false}
                    autoPrimaryColumn={false}
                    columns={MockData.TableDataTitle()}
                    data={formatDataToTable(response?.data ?? [], [
                      "txDescricao",
                    ])}
                    GenericButton={[
                      {
                        icon: <Download weight="fill" size={20} />,
                        hoverColor: theme.colors.jvrisAqua,
                        onClick: (index) => {
                          if (index != undefined) {
                            openOctetStreamInNewTab(
                              response.data[index].file_stream,
                              response.data[index].name
                            );
                          }
                        },
                      },
                      {
                        hoverColor: theme.colors.softRed,
                        alt: "Excluir",
                        icon: <X weight="bold" size={20} />,
                        onClick: (index) => {
                          if (index !== undefined) {
                            setId(response?.data[index].id);
                            setIdProcesso(managing.singularSelectedData.id);
                            setShowModalRemove(!showModalRemove);
                          }
                        },
                      },
                    ]}
                  />
                </SM.TableContainer>
              ) : (
                <SM.WarningMessage>Nenhum arquivo encontrado</SM.WarningMessage>
              )}
            </SM.TableWrapper>
          </SM.ContentWrapper>
        </SM.Wrapper>
      </S.Form>
    </JvrisModal>
  );
};

export default AnexosAtoModal;

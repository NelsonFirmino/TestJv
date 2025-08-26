import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import {
  deleteDispatch,
  getDispatch,
  postDispatch,
} from "../../../../../../../api/services/dispatch/dispatchModal/dispatch";
import { JvrisModal } from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import JvrisTable from "../../../../../../../components/JvrisTable";
import { SharedState } from "../../../../../../../context/SharedContext";
import { useTypeOfDispatch } from "../../../../../../../hooks/useTypeOfDispatch";
import { formatDataToTable } from "../../../../../../../utils/formatDataToTable";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { useTablesContext } from "../../../context/TablesContext";
import { SubmitDespachos } from "./interfaces/despacho.inteface";
import * as MockData from "./mockData";
import * as S from "./styled";

const DespachoModal = () => {
  const { user } = SharedState();
  const { dispatchList, loadingTypeOfDispatchList } = useTypeOfDispatch();
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal } = useModalsContext();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitDespachos>({
    mode: "onChange",
  });

  const {
    mutate: mutateExtractByParty,
    data: response,
    isLoading,
  } = useMutation(getDispatch);

  function getDispatchFunct(id: number) {
    mutateExtractByParty(id);
  }

  const resetOnSubmit = () => {
    managing.resetSingularSelectedData();
    reset({
      txObservacao: "",
      idTipoDespacho: null,
    });
    closeModal();
  };

  const onSubmit: SubmitHandler<SubmitDespachos> = async (params) => {
    postDispatch({
      idAto: managing.singularSelectedData.id,
      idTipoDespacho: params.idTipoDespacho!.value,
      txObservacao: params.txObservacao,
      idUsuarioCadastrado: user["Jvris.User.Id"],
    } as any).then((response) => {
      if (response.status == "Created") {
        toast("Despacho Realizado com Sucesso", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        reset({
          txObservacao: "",
          idTipoDespacho: null,
        });
        getDispatchFunct(managing.singularSelectedData.id);
      } else {
        toast.error("Erro ao Solicitar Despacho", {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      }
    });
  };

  const handleDelete = () => {
    deleteDispatch(response?.data?.id).then((data) => {
      if (data.status == "OK") {
        toast("Despacho Removido com Sucesso", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        reset({
          txObservacao: "",
          idTipoDespacho: null,
        });
        getDispatchFunct(managing.singularSelectedData.id);
      }
    });
  };

  const [sent, setSent] = useState(false);

  const handleSent = () => {
    setSent(!sent);
  };

  useEffect(() => {
    response?.data
      ? (setValue(
          "idTipoDespacho",
          dispatchList[response.data.idTipoDespacho - 1]
        ),
        setSent(true))
      : setSent(false);
  }, [response?.data]);

  useEffect(() => {
    if (managing.singularSelectedData) {
      getDispatchFunct(managing.singularSelectedData.id);
    }
  }, [managing.singularSelectedData]);

  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.despacho)}
      closeModal={resetOnSubmit}
    >
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <SM.Wrapper>
          <SM.TitleContainer>
            <SM.TitleLabel>Despacho</SM.TitleLabel>
            <SM.TitleButtonWrapper>
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
            <SM.ContentTitle>
              <SM.ContentTitleLabel>Tipo de Despacho</SM.ContentTitleLabel>
            </SM.ContentTitle>
            <SM.ContentSelectWrapper>
              <Controller
                name="idTipoDespacho"
                control={control}
                render={({ field }) => (
                  <SM.ContentSelect
                    isDisabled={sent}
                    placeholder="Selecione o tipo de despacho"
                    isLoading={loadingTypeOfDispatchList}
                    options={dispatchList}
                    {...field}
                  />
                )}
              />
            </SM.ContentSelectWrapper>
            <S.TableWrapper>
              {response?.data &&
              (response.data.dtCadastro = response.data.dtCadastro
                .split("-")
                .reverse()
                .join("/")) ? (
                <SM.Wrapper>
                  <JvrisTable
                    autoPrimaryColumn={false}
                    columns={MockData.TableDataTitle()}
                    data={formatDataToTable(
                      [response?.data],
                      ["dtCadastro", "hrCadastro", "txObservacao"]
                    )}
                  />
                  <SM.ContentButton>
                    <SM.ContentButtonLabel
                      type="button"
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      Excluir
                    </SM.ContentButtonLabel>
                  </SM.ContentButton>
                </SM.Wrapper>
              ) : (
                <SM.Wrapper>
                  <SM.ContentTitle>
                    <SM.ContentTitleLabel>Despacho</SM.ContentTitleLabel>
                  </SM.ContentTitle>
                  <SM.ContentTextArea {...register("txObservacao")} />
                  <S.WarningMessage>
                    Nenhum registro encontrado
                  </S.WarningMessage>
                  <SM.ContentButton>
                    <SM.ContentButtonLabel type="submit" onClick={handleSent}>
                      Salvar
                    </SM.ContentButtonLabel>
                  </SM.ContentButton>
                </SM.Wrapper>
              )}
            </S.TableWrapper>
          </SM.ContentWrapper>
        </SM.Wrapper>
      </S.Form>
    </JvrisModal>
  );
};

export default DespachoModal;

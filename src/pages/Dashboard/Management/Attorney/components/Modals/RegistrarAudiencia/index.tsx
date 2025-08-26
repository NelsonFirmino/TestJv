import { useState } from "react";
import {JvrisModal} from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import { useAudiences } from "../../../../../../../hooks/useAudiences";
import { SubmitRegistrarAudiencia } from "./interfaces/registraraudiencia.interface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { postAudiences } from "../../../../../../../api/services/audiencies/audiences";
import toast from "react-hot-toast";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { SharedState } from "../../../../../../../context/SharedContext";
import { HotToastError, HotToastSucess } from "../../../../../../../components/HotToastFuncs";

const RegistrarAudienciaModal = () => {
  const { user } = SharedState();
  const defaultDate = new Date().toISOString().substring(0, 10);
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal,setShouldReset } = useModalsContext();
  const { audiencesList, loadingAudiencesList } = useAudiences();
  const [virtual, setVirtual] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitRegistrarAudiencia>({
    mode: "onChange",
  });

  const resetOnSubmit = () => {
    managing.resetSingularSelectedData();
    reset({
      tipoAudiencia: null,
      dataAudiencia: defaultDate,
      horaAudiencia: "",
      txVirtual: "",
    });
    setVirtual(false);
    closeModal();
  };

  const onSubmit: SubmitHandler<SubmitRegistrarAudiencia> = (params) => {
    const dateHour: string =
      params.dataAudiencia + "T" + params.horaAudiencia + ":00.000Z";

    postAudiences({
      idAto: managing.selectedData && managing.selectedData.length?  Number(managing.selectedData![0].id): Number(managing.singularSelectedData.id),
      idTipoAudiencia: params.tipoAudiencia?.value!,
      isVirtual: params.virtual,
      txlink: params.txVirtual ?? "",
      dtAudiencia: dateHour, //"2023-06-21T11:27:51.438Z"
      hrAudiencia: params.horaAudiencia,
      idUsuarioCadastro: user["Jvris.User.Id"],
    }).then((response) => {
      if (response.status == "Created") {
        HotToastSucess("Registro de Audiência Realizado com Sucesso");
        setShouldReset(true);
        resetOnSubmit();
      } else {
        HotToastError("Erro ao Registrar Audiência");
      }
    });
  };

  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.registrarAudiencia)}
      closeModal={() => resetOnSubmit()}
    >
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel>Registrar Audiência</SM.TitleLabel>
          <SM.TitleButtonWrapper>
            <SM.TitleButton onClick={() => resetOnSubmit()}>
              Fechar
            </SM.TitleButton>
          </SM.TitleButtonWrapper>
        </SM.TitleContainer>
        <SM.Form onSubmit={handleSubmit(onSubmit)}>
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
              <SM.ContentTitleLabel>Tipo de Audiência *</SM.ContentTitleLabel>
            </SM.ContentTitle>
            <Controller
              control={control}
              {...register("tipoAudiencia", {
                required: "Tipo de Audiência é obrigatória.",
              })}
              render={({ field }) => (
                <SM.ContentSelect
                  placeholder="Selecione um Tipo de Audiência"
                  options={audiencesList}
                  isClearable={false}
                  isLoading={loadingAudiencesList}
                  {...field}
                />
              )}
            />
            <SM.ContentWrapperRow>
              <SM.ContentWrapperRowData>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel>
                    Data da Audiência *
                  </SM.ContentTitleLabel>
                </SM.ContentTitle>
                <SM.ContentInputDate
                  defaultValue={defaultDate}
                  {...register("dataAudiencia", {
                    required: "Data da Audiência é obrigatória.",
                  })}
                />
              </SM.ContentWrapperRowData>
              <SM.ContentWrapperRowData>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel>
                    Hora da Audiência *
                  </SM.ContentTitleLabel>
                </SM.ContentTitle>
                <SM.ContentInputTime
                  {...register("horaAudiencia", {
                    required: "Hora da Audiência é obrigatória.",
                  })}
                />
              </SM.ContentWrapperRowData>
            </SM.ContentWrapperRow>
            <SM.ContentTitle>
              <SM.ContentTitleLabel>Virtual:</SM.ContentTitleLabel>
              <SM.ContentInputCheckbox
                {...register("virtual")}
                defaultChecked={virtual}
                checked={virtual}
                onChange={() => setVirtual(!virtual)}
              />
            </SM.ContentTitle>
            {virtual && (
              <SM.ContentInput
                placeholder="ex: https://meet.google.com/"
                {...register("txVirtual")}
              />
            )}
            <SM.ContentButton>
              <SM.ContentButtonLabel disabled={!isValid} type="submit">
                Salvar
              </SM.ContentButtonLabel>
            </SM.ContentButton>
          </SM.ContentWrapper>
        </SM.Form>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default RegistrarAudienciaModal;

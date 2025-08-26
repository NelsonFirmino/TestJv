import { useEffect, useState } from "react";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as S from "./styled";
import {JvrisModal} from "../../../../../../../components/JvrisModal";
import { useTypeOfDispatch } from "../../../../../../../hooks/useTypeOfDispatch";
import { SubmitDespachos } from "./interfaces/despacho.inteface";
import {
  getDispatch,
  postDispatch,
} from "../../../../../../../api/services/dispatch/dispatchModal/dispatch";
import toast from "react-hot-toast";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { OptionsType } from "../../../interfaces";
import { SharedState } from "../../../../../../../context/SharedContext";

const DespachoEmLoteModal = () => {
  const { user } = SharedState();
  const { dispatchList, loadingTypeOfDispatchList } = useTypeOfDispatch();
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal } = useModalsContext();
  const [processosOptions, setProcessosOptions] = useState<OptionsType[]>([]);
  const [processosSelecionados, setProcessosSelecionados] = useState<
    OptionsType[]
  >([]);

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

  const resetOnSubmit = () => {
    managing.resetSingularSelectedData();
    reset({
      txObservacao: "",
      idTipoDespacho: null,
    });
    closeModal();
  };

  const [despachos, setDespachos] = useState<
    {
      enviar: boolean;
      dados: any;
    }[]
  >([]);

  function mapToOptionsType(
    data: any[],
    valueKey: string,
    labelKey: string
  ): OptionsType[] {
    return data.map((item: any) => {
      return {
        value: item[valueKey],
        label: item[labelKey],
        isFixed: true,
        isSelected: true,
      };
    });
  }

  useEffect(() => {
    if (managing.selectedData) {
      const mappedData = mapToOptionsType(
        managing.selectedData,
        "id",
        "txNumero"
      );
      setProcessosOptions(mappedData);
      setProcessosSelecionados(mappedData);

      setDespachos([]);
      managing.selectedData.forEach((data) => {
        getDispatch(data.id).then((res) => {
          setDespachos((prev) => {
            const desp = {
              enviar: !res.data ? true : false,
              dados: !res.data ? data : { txNumero: data.txNumero },
            };
            if (prev.length) {
              return [...prev, desp];
            } else {
              return [desp];
            }
          });
        });
      });
    }
  }, [managing.selectedData]);

  const onSubmit: SubmitHandler<SubmitDespachos> = async (params) => {
    despachos.forEach((despacho) => {
      if (despacho.enviar) {
        postDispatch({
          idAto: despacho.dados.id,
          idTipoDespacho: params.idTipoDespacho!.value,
          txObservacao: params.txObservacao,
          idUsuarioCadastrado: user["Jvris.User.Id"],
        } as any)
          .then((res) => {
            toast(
              `Despacho do Processo N° ${despacho.dados.txNumero} realizado com sucesso`,
              {
                icon: "👏",
                style: {
                  borderRadius: "10px",
                  background: "#81c784",
                  color: "#fff",
                  fontSize: "30px",
                },
              }
            );
            reset({
              txObservacao: "",
              idTipoDespacho: null,
            });
          })
          .catch((err) =>
            toast.error(`Erro ao Solicitar Despacho ${err}`, {
              icon: "😥",
              style: {
                borderRadius: "10px",
                background: "#e57373",
                color: "#fff",
                fontSize: "30px",
              },
            })
          );
      } else {
        toast(`Erro ao despachar Processo N° ${despacho.dados.txNumero}`, {
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
    closeModal();
  };

  const [sent, setSent] = useState(false);

  const handleSent = () => {
    setSent(!sent);
  };

  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.despachoEmLote)}
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
                PROCESSO(S) SELECIONADO(S)
              </SM.ContentTitleLabel>
            </SM.ContentTitle>
            <SM.ProcessosSelect
              isSearchable={false}
              placeholder="Clique aqui para ver os processos"
              value={processosSelecionados.filter(
                (item) => item.isSelected || item.isFixed
              )}
              options={processosOptions}
              isClearable={!processosSelecionados.some((item) => item.isFixed)}
              isMulti
              isDisabled
            />
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
                    // isDisabled={sent}
                    placeholder="Selecione o tipo de despacho"
                    isLoading={loadingTypeOfDispatchList}
                    options={dispatchList}
                    {...field}
                  />
                )}
              />
            </SM.ContentSelectWrapper>

            <SM.ContentTitle>
              <SM.ContentTitleLabel>Despacho</SM.ContentTitleLabel>
            </SM.ContentTitle>
            <SM.ContentTextArea {...register("txObservacao")} />
            <S.WarningMessage>Nenhum registro encontrado</S.WarningMessage>
            <SM.ContentButton>
              <SM.ContentButtonLabel type="submit" onClick={handleSent}>
                Salvar
              </SM.ContentButtonLabel>
            </SM.ContentButton>
          </SM.ContentWrapper>
        </SM.Wrapper>
      </S.Form>
    </JvrisModal>
  );
};

export default DespachoEmLoteModal;

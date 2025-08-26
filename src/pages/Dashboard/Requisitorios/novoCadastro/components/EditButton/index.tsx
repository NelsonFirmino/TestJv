import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BaseModal } from "../../../../../../components/BaseModal";
import { SubmitCadastro } from "../../interfaces/cadastro.interface";

import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import useRequisitorioService from "../../../../../../api/services/rpv/Requisitorio";
import { SharedState } from "../../../../../../context/SharedContext";
import { useOrigem } from "../../../../../../hooks/useOrigem";
import * as MockData from "../../mockData";
import * as S from "./styled";

export const EditCadastroRequesitorios = ({ dataTable }: any) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    reset,
    control,
  } = useForm<SubmitCadastro>({
    mode: "onChange",
  });
  const {
    salvar,
    getRequisitoriosById,
    requisitorios,
    deleteRequisitorio,
    get: getRequisitorio,
  } = useRequisitorioService();
  const queryClient = useQueryClient();
  const { user } = SharedState();
  const { idAto } = useParams();
  const { origem, isLoadingOrigem } = useOrigem();
  const [isOpenModal, setOpenModal] = useState(false);
  const [valorCalculado, setValorCalculado] = useState(null);
  const [origemSelectedOption, setOrigemSelectedOption] = useState({
    label: "",
    value: 0,
  });
  const [tipoSelectedOption, setTipoSelectedOption] = useState({
    label: "",
    value: "",
  });

  const resetStates = () => {
    reset();
    // setOrigemSelectedOption(dataTable.idOrigem);
    // setTipoSelectedOption(dataTable.idTipo);
  };

  useEffect(() => {
    if (origem) {
      if (dataTable.idOrigem) {
        setOrigemSelectedOption(
          origem?.find((data) => data.value == dataTable.idOrigem)
        );
      } else {
        setOrigemSelectedOption(null);
      }
    }
  }, [!isLoadingOrigem]);

  useEffect(() => {
    if (dataTable) {
      setTipoSelectedOption(
        MockData.tipoOptions?.find((data) => data.value == dataTable.txTipo)
      );
      setValorCalculado(dataTable.vaPagamento);
    } else {
      setTipoSelectedOption(null);
      setValorCalculado(null);
    }
  }, [isOpenModal]);

  useEffect(() => {
    resetStates();
    if (dataTable) {
      setTipoSelectedOption(
        MockData.tipoOptions?.find((data) => data.value == dataTable.txTipo)
      );
    } else {
      setTipoSelectedOption(null);
    }
    if (origem) {
      if (dataTable.idOrigem) {
        setOrigemSelectedOption(
          origem?.find((data) => data.value == dataTable.idOrigem)
        );
      } else {
        setOrigemSelectedOption(null);
      }
    }
  }, [isOpenModal == false]);

  const formatarNumero = (numero: any) => {
    return (Number(numero) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const handleValorCalculado = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setValorCalculado(valorNumerico);
    setValue("vaPagamento", Number(valorNumerico) / 100);
  };

  useEffect(() => {
    setValorCalculado(dataTable.vaPagamento * 100);
  }, [isOpenModal]);

  function formatarVaPagamento(numero) {
    // Remover caracteres não numéricos
    let numeroLimpo = numero.replace(/[^0-9,.]/g, "");

    // Substituir vírgula por ponto
    numeroLimpo = numeroLimpo.replace(",", ".");

    // Se houver mais de um ponto, remover os extras
    numeroLimpo = numeroLimpo.replace(/\.(?=.*\.)/g, "");

    // Converter para número
    let numeroFormatado = parseFloat(numeroLimpo).toFixed(2);

    return numeroFormatado;
  }

  const handleToast = (msg: string, error: boolean) => {
    !error
      ? toast(msg, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
    // setShowModalAdd(false);
  };

  const onSubmit: SubmitHandler<SubmitCadastro> = async (data) => {
    const params = {
      idAto: +idAto,
      id: dataTable.id,
      txTipo: tipoSelectedOption.value,
      isHonorario: dataTable.isHonorario,
      idRequisitor: dataTable.idRequisitor,
      idDevedor: dataTable.idDevedor,
      idOrigem: origemSelectedOption.value,
      idNatureza: dataTable.idNatureza,
      dtLimitePagamento: data.dtLimitePagamento,
      vaPagamento: +formatarVaPagamento(data.vaPagamento),
      idUsuarioCadastro: +user["Jvris.User.Id"],
    };
    salvar(params)
      .then((response) => {
        if (response.status == "OK") {
          handleToast("Requisitório Atualizado com Sucesso", false);
          queryClient.invalidateQueries(`getRequisitoriosPorIdAto-${idAto}`);
        } else {
          handleToast("Erro ao Atualizar Requisitório", true);
          // handleToast(response.message, true);
        }
      })
      .catch((err) => {
        handleToast("Erro ao Atualizar Requisitório", false);
      });
    setOpenModal(false);
    resetStates();
  };
  return (
    <>
      <BaseModal
        title="Edição de Cadastro de Requisitórios"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Tipo: *</S.FieldTitle>
              <S.SectionDataContainer>
                <Controller
                  name="tipo"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      required={true}
                      isClearable={false}
                      options={MockData.tipoOptions}
                      value={tipoSelectedOption}
                      placeholder="Selecione o tipo"
                      onChange={(value: any) => {
                        setTipoSelectedOption(value);
                      }}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>Origem da Despesa: *</S.FieldTitle>
              <S.SectionDataContainer>
                <Controller
                  name="origem"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      required={true}
                      isClearable={false}
                      options={origem && origem}
                      isLoading={isLoadingOrigem}
                      value={origemSelectedOption}
                      placeholder="Selecione a origem da despesa"
                      onChange={(value: any) => {
                        setOrigemSelectedOption(value);
                      }}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Limite de Pagamento: *</S.FieldTitle>
              <S.SectionDataContainer>
                <Controller
                  name="dtLimitePagamento"
                  control={control}
                  render={({ field }) => (
                    <S.Input
                      defaultValue={dataTable.dtLimitePagamento}
                      value={dataTable.dtLimitePagamento}
                      required={true}
                      {...field}
                      type="date"
                      {...register("dtLimitePagamento")}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>Valor (R$): *</S.FieldTitle>
              <S.SectionDataContainer>
                <S.TextInput
                  required={true}
                  type="text"
                  disabled={false}
                  // defaultValue={formatarNumero(dataTable.vaPagamento)}
                  value={formatarNumero(valorCalculado)}
                  {...register("vaPagamento")}
                  onChange={handleValorCalculado}
                />
              </S.SectionDataContainer>
            </S.ContainerField>
          </S.ContentSection>

          <S.OptionsContainer>
            <S.OptionCancel onClick={() => setOpenModal(false)}>
              Cancelar
            </S.OptionCancel>
            <S.OptionSave disabled={!isValid} onClick={() => {}}>
              Salvar
            </S.OptionSave>
          </S.OptionsContainer>
        </S.FormContainer>
      </BaseModal>
      <S.Wrapper onClick={() => setOpenModal(true)}>Editar</S.Wrapper>
    </>
  );
};

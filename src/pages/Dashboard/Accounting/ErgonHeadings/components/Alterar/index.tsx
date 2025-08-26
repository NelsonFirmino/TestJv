import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { putErgonRubricasByID } from "../../../../../../api/services/ergonrubricas/ergonRubricas";
import { BaseModal } from "../../../../../../components/BaseModal";
import { SharedState } from "../../../../../../context/SharedContext";
import * as MockData from "../../mockData";
import { SubmitAlterarTipoCalculoRubricas } from "./alterarTipoCalculoRubricas.interface";
import * as S from "./styled";

export const AlterarTipoCalculoRubrica = ({ dataTable }: any) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    reset,
    control,
  } = useForm<SubmitAlterarTipoCalculoRubricas>({
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;
  const { idAto } = useParams();
  const [isOpenModal, setOpenModal] = useState(false);
  const [valorCalculado, setValorCalculado] = useState(null);
  const [origemSelectedOption, setOrigemSelectedOption] = useState({
    label: "",
    value: 0,
  });
  const [tipoSelectedOption, setTipoSelectedOption] = useState({
    label: "",
    value: null,
  });

  const resetStates = () => {
    reset();
  };

  useEffect(() => {
    if (dataTable) {
      setTipoSelectedOption(
        MockData.tipoOptions?.find(
          (data) => data.value == dataTable.nuTipoCalculo
        )
      );
    } else {
      setTipoSelectedOption(null);
    }
  }, [isOpenModal]);

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
  };

  const onSubmit: SubmitHandler<SubmitAlterarTipoCalculoRubricas> = async (
    data
  ) => {
    const params = {
      id: dataTable.id,
      nuRubrica: dataTable.nuRubrica,
      isIrrf: dataTable.isIrrf,
      isPrevidencia: dataTable.isPrevidencia,
      nuTipoCalculo: tipoSelectedOption.value,
      txRubrica: dataTable.txRubrica,
      txAbreviatura: dataTable.txAbreviatura,
      txTipoRubrica: dataTable.txTipoRubrica,
      dtCadastro: dataTable.dtCadastro,
      hrCadastro: dataTable.hrCadastro,
      idUsuarioCadastro: +user["Jvris.User.Id"],
    };
    putErgonRubricasByID(params)
      .then((response) => {
        if (response.status == "OK") {
          handleToast("Tipo de Cálculo Rubrica Atualizado com Sucesso", false);
          queryClient.invalidateQueries(`ergonRubricas`);
        } else {
          handleToast("Erro ao Atualizar Tipo de Cálculo Rubrica", true);
          // handleToast(response.message, true);
        }
      })
      .catch((err) => {
        handleToast("Erro ao Atualizar Tipo de Cálculo Rubrica", false);
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
        isSelect={true}
      >
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Tipo: *</S.FieldTitle>
              <S.SectionDataContainer>
                <Controller
                  name="nuTipoCalculo"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      required={true}
                      isClearable={false}
                      options={MockData.tipoOptions}
                      value={tipoSelectedOption}
                      placeholder="Selecione o tipo de cálculo"
                      onChange={(value: any) => {
                        setTipoSelectedOption(value);
                      }}
                    />
                  )}
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
      <S.Wrapper onClick={() => setOpenModal(true)}>Alterar</S.Wrapper>
    </>
  );
};

import { useQueryClient } from "react-query";
import * as S from "./styled";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladd.interface";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useMaterias } from "../../../../../../hooks/useMaterias";
import { useAutoCompleteAssuntos } from "../../../../../../hooks/useAutoCompleteAssuntos";
import {
  autoCompleteAssuntos,
  postAssunto,
  updateAssunto,
} from "../../../../../../api/services/assuntos/assuntos";

export const ModalAdd = ({
  setShowModalAdd,
  id,
  txAssunto,
  txPai,
  idAssunto_Pai,
  idMateria,
}: ModalAddProps) => {
  const queryClient = useQueryClient();
  const { materiasList, isLoadingMateriasList } = useMaterias();
  const { autocompleteAssuntos, isLoadingAutocompleteAssuntos } =
    useAutoCompleteAssuntos(txPai);

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<ModalAddProps>({
    mode: "onChange",
  });

  const handleToast = (msg: string, error: boolean = false) => {
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
    setShowModalAdd(false);
  };

  const [materiaSelectedOption, setMateriaSelectedOption] = useState({
    label: "",
    value: 0,
  });
  const [vinculadoSelectedOption, setVinculadoSelectedOption] = useState({
    label: "",
    value: 0,
  });

  useEffect(() => {
    if (materiasList) {
      if (idMateria) {
        setMateriaSelectedOption(
          materiasList?.find((data) => data.value == idMateria)
        );
      } else {
        setMateriaSelectedOption(materiasList[0]);
      }
    }
  }, [!isLoadingMateriasList]);

  useEffect(() => {
    if (autocompleteAssuntos) {
      if (idAssunto_Pai) {
        setVinculadoSelectedOption(
          autocompleteAssuntos?.find((data) => data.value == idAssunto_Pai)
        );
      } else {
        setVinculadoSelectedOption(autocompleteAssuntos[0]);
      }
    }
  }, [!isLoadingAutocompleteAssuntos]);

  const loadOptions = (inputValue: string, callback: any) => {
    if (!inputValue || inputValue.length < 3) {
      callback(null);
    } else {
      autoCompleteAssuntos(inputValue).then((response) => {
        const autocompleteList = response?.data
          ? response.data.map((atc) => ({
              label: atc.txAssunto,
              value: atc.id,
            }))
          : [];
        callback(autocompleteList);
      });
    }
  };

  const onSubmit: SubmitHandler<ModalAddProps> = async (data) => {
    data.id
      ? updateAssunto({
          id: data.id,
          txAssunto: data.txAssunto,
          idAssunto_Pai: vinculadoSelectedOption.value,
          idMateria: materiaSelectedOption.value,
        })
          .then((response) => {
            if (response.status == "OK") {
              queryClient.invalidateQueries(`assuntosSemPaginacao`);
              handleToast("Assunto Alterado com Sucesso");
            } else {
              handleToast(response.message, true);
            }
          })
          .catch((err) => {
            handleToast("Erro ao Alterar Assunto");
          })
      : postAssunto(
          data.txAssunto,
          vinculadoSelectedOption.value,
          materiaSelectedOption.value
        )
          .then((response) => {
            if (response.status == "Created") {
              queryClient.invalidateQueries(`assuntosSemPaginacao`);
              handleToast("Assunto Adicionado com Sucesso");
            } else {
              handleToast(response.message, true);
            }
          })
          .catch((err) => {
            handleToast("Erro ao Adicionar Assunto");
          });
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>
            {id ? "Editar Órgão Julgador" : "Adicionar Novo Órgão Julgador"}
          </S.TitleModal>
          <S.CloseModal
            onClick={() => {
              setShowModalAdd(false);
            }}
          >
            Fechar
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.TextAreaInput hidden defaultValue={id} {...register("id")} />
            <S.ContainerField>
              <S.FieldTitle>Nome: *</S.FieldTitle>
              <S.TextInput
                defaultValue={txAssunto}
                maxLength={56}
                minLength={1}
                required={true}
                autoFocus
                placeholder="Digite o nome"
                {...register("txAssunto", {
                  maxLength: 56,
                  minLength: 1,
                  required: true,
                })}
              />
            </S.ContainerField>
            {autocompleteAssuntos && (
              <S.ContainerField>
                <S.FieldTitle>Vinculado:</S.FieldTitle>
                <Controller
                  name="idAssunto_Pai"
                  control={control}
                  render={({ field }) => (
                    <S.CustomAutocomplete
                      menuPosition="fixed"
                      placeholder="Digite no mínimo 3 digitos iniciais"
                      cacheOptions={true}
                      loadOptions={loadOptions}
                      defaultOptions
                      noOptionsMessage={() => "Vínculo não encontrado"}
                      isClearable={true}
                      {...field}
                      value={
                        id && idAssunto_Pai
                          ? vinculadoSelectedOption
                          : !idAssunto_Pai
                          ? undefined
                          : vinculadoSelectedOption
                      }
                      onChange={(value: any) => {
                        setVinculadoSelectedOption(value);
                      }}
                    />
                  )}
                />
              </S.ContainerField>
            )}
            {materiasList && (
              <S.ContainerField>
                <S.FieldTitle>Matéria:</S.FieldTitle>
                <Controller
                  name="idMateria"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      isClearable={false}
                      options={materiasList}
                      isLoading={isLoadingMateriasList}
                      value={
                        id && idMateria
                          ? materiaSelectedOption
                          : !idMateria
                          ? undefined
                          : materiaSelectedOption
                      }
                      onChange={(value: any) => {
                        setMateriaSelectedOption(value);
                      }}
                    />
                  )}
                />
              </S.ContainerField>
            )}
            <S.ContainerSubmitButton>
              <S.SubmitButton disabled={!isValid}>Salvar</S.SubmitButton>
            </S.ContainerSubmitButton>
          </S.Form>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import {
  postOrgaoJulgador,
  putOrgaoJulgadorByID,
} from "../../../../../../api/services/OrgaosJulgadores/orgaojulgador";
import { useComarcasSelect } from "../../../../../../hooks/useComarcas";
import { useTribunais } from "../../../../../../hooks/useTribunais";
import * as MockData from "./mockData";
import { ModalAddProps } from "./modaladd.interface";
import * as S from "./styled";

export const ModalAdd = ({
  setShowModalAdd,
  id,
  txOrgaoJulgador,
  txSigla,
  nuInstancia,
  idTribunal,
  idComarca,
  isAtivo,
}: ModalAddProps) => {
  const queryClient = useQueryClient();
  const { tribunais, isLoadingTribunais } = useTribunais();
  const { comarcas, isLoadingComarcas } = useComarcasSelect();

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

  const [instanciaSelectedOption, setInstanciaSelectedOption] = useState(
    nuInstancia
      ? MockData.instanciaOptions[nuInstancia - 1]
      : MockData.instanciaOptions[0]
  );
  const [tribunalSelectedOption, setTribunalSelectedOption] = useState({
    label: "",
    value: 0,
  });
  const [comarcaSelectedOption, setComarcaSelectedOption] = useState({
    label: "",
    value: 0,
  });

  useEffect(() => {
    if (tribunais) {
      if (idTribunal) {
        setTribunalSelectedOption(
          tribunais?.find((data) => data.value == idTribunal)
        );
      } else {
        setTribunalSelectedOption(tribunais[0]);
      }
    }
  }, [!isLoadingTribunais]);

  useEffect(() => {
    if (comarcas)
      if (idComarca) {
        setComarcaSelectedOption(
          comarcas?.find((data) => data.value == idComarca)
        );
      } else {
        setComarcaSelectedOption(comarcas[0]);
      }
  }, [!isLoadingComarcas]);

  const onSubmit: SubmitHandler<ModalAddProps> = async (data) => {
    data.id
      ? putOrgaoJulgadorByID({
          id: data.id,
          txOrgaoJulgador: data.txOrgaoJulgador,
          txSigla: data.txSigla,
          nuInstancia: instanciaSelectedOption.value,
          idTribunal: tribunalSelectedOption.value,
          idComarca: comarcaSelectedOption.value,
          isAtivo,
        }).then((response) => {
          if (response.status == "OK") {
            queryClient.invalidateQueries(`orgaosJulgadores`);
            handleToast("Órgão Julgador Alterado com Sucesso");
          } else {
            handleToast(
              "Erro ao Tentar Alterar Órgão Julgador, tente novamente!",
              true
            );
          }
        })
      : postOrgaoJulgador({
          txOrgaoJulgador: data.txOrgaoJulgador,
          txSigla: data.txSigla,
          nuInstancia: instanciaSelectedOption.value,
          idTribunal: tribunalSelectedOption.value,
          idComarca: comarcaSelectedOption.value,
          isAtivo,
        }).then((response) => {
          if (response.status == "Created") {
            queryClient.invalidateQueries(`orgaosJulgadores`);
            handleToast("Órgão Julgador Adicionado com Sucesso");
          } else {
            handleToast(
              "Erro ao Tentar Adicionar Órgão Julgador, tente novamente!",
              true
            );
          }
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
              <S.FieldTitle>Nome *</S.FieldTitle>
              <S.TextInput
                defaultValue={txOrgaoJulgador}
                maxLength={56}
                minLength={1}
                required={true}
                autoFocus
                placeholder="Digite o Órgão Julgador"
                {...register("txOrgaoJulgador", {
                  maxLength: 56,
                  minLength: 1,
                  required: true,
                })}
              />
            </S.ContainerField>
            <S.Row>
              <S.ContainerField>
                <S.FieldTitle>Sigla</S.FieldTitle>
                <S.TextInput
                  defaultValue={txSigla}
                  placeholder="Digite a Sigla"
                  {...register("txSigla")}
                />
              </S.ContainerField>
              <S.ContainerField>
                <S.FieldTitle>Instância *</S.FieldTitle>
                <Controller
                  name="nuInstancia"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      isClearable={false}
                      options={MockData.instanciaOptions}
                      value={
                        instanciaSelectedOption ?? instanciaSelectedOption[0]
                      }
                      onChange={(value: any) => {
                        setInstanciaSelectedOption(value);
                      }}
                    />
                  )}
                />
              </S.ContainerField>
            </S.Row>
            {tribunais && (
              <S.ContainerField>
                <S.FieldTitle>Tribunal *</S.FieldTitle>
                <Controller
                  name="idTribunal"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      isClearable={false}
                      options={tribunais}
                      isLoading={isLoadingTribunais}
                      value={tribunalSelectedOption}
                      onChange={(value: any) => {
                        setTribunalSelectedOption(value);
                      }}
                    />
                  )}
                />
              </S.ContainerField>
            )}
            {comarcas && (
              <S.ContainerField>
                <S.FieldTitle>Comarca</S.FieldTitle>
                <Controller
                  name="idComarca"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      isClearable={false}
                      options={comarcas}
                      isLoading={isLoadingComarcas}
                      value={comarcaSelectedOption}
                      onChange={(value: any) => {
                        setComarcaSelectedOption(value);
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

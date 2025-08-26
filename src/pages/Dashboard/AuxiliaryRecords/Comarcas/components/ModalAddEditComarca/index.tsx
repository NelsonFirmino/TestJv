import { useQueryClient } from "react-query";
import * as S from "./styled";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ModalAddEditComarcaProps,
  SubmitModalAddEditComarca,
} from "./modaladdcomarca.interface";

import toast from "react-hot-toast";
import {
  postComarca,
  updateComarca,
} from "../../../../../../api/services/comarcas/comarcas";
import { useRegionais } from "../../../../../../hooks/useRegionais";
import { useEffect, useState } from "react";
import { SharedState } from "../../../../../../context/SharedContext";

export const ModalAddEditComarca = ({
  setShowModalAddEditComarca,
  txComarca,
  idRegional,
  id,
}: ModalAddEditComarcaProps) => {
  const { user } = SharedState();
  const queryClient = useQueryClient();
  const { regionaisList, loadingRegionaisList } = useRegionais();
  const [regional, setRegional] = useState({
    label: "",
    value: 0,
  });

  useEffect(() => {
    if (regionaisList) {
      if (idRegional) {
        setRegional(regionaisList?.find((data) => data.value == idRegional));
      } else {
        setRegional(regionaisList[0]);
      }
    }
  }, [!loadingRegionaisList]);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    control,
  } = useForm<SubmitModalAddEditComarca>({
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
    setShowModalAddEditComarca(false);
  };

  const onSubmit: SubmitHandler<SubmitModalAddEditComarca> = async (data) => {
    data.id
      ? updateComarca(
          data.id,
          data.txComarca,
          regional.value,
          user["Jvris.User.Id"]
        ).then((response) => {
          if (response.status == "OK") {
            queryClient.invalidateQueries(`comarcas`);
            handleToast("Comarca Alterada com Sucesso");
          } else {
            handleToast(
              "Erro ao Tentar Alterar Comarca, tente novamente!",
              true
            );
          }
        })
      : postComarca(data.txComarca, regional.value, user["Jvris.User.Id"]).then(
          (response) => {
            if (response.status == "Created") {
              queryClient.invalidateQueries(`comarcas`);
              handleToast("Comarca Adicionada com Sucesso");
            } else {
              handleToast(
                "Erro ao Tentar Adicionar Comarca, tente novamente!",
                true
              );
            }
          }
        );
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>
            {txComarca ? "Editar Comarca" : "Adicionar Nova Comarca"}
          </S.TitleModal>
          <S.CloseModal
            onClick={() => {
              setShowModalAddEditComarca(false);
            }}
          >
            Fechar
          </S.CloseModal>
        </S.TitleContainer>

        <S.ContainerForm>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.ContainerField>
              <S.SectionTitle>Nome da Comarca: *</S.SectionTitle>
              <S.TextInput
                defaultValue={txComarca}
                maxLength={56}
                minLength={3}
                required={true}
                placeholder="Digite aqui o nome da comarca"
                {...register("txComarca", {
                  maxLength: 56,
                  minLength: 3,
                  required: true,
                })}
              />
              <S.TextAreaInput hidden defaultValue={id} {...register("id")} />
            </S.ContainerField>

            {regionaisList && (
              <S.Section>
                <S.SectionTitle>Regional: *</S.SectionTitle>
                <S.FieldContainer>
                  <Controller
                    name="idRegional"
                    control={control}
                    render={({ field }) => (
                      <S.CustomSelect
                        placeholder="Selecione a especializa desejada"
                        {...field}
                        isLoading={loadingRegionaisList}
                        options={regionaisList}
                        value={regional}
                        onChange={(value: any) => {
                          setRegional(value);
                        }}
                      />
                    )}
                  />
                </S.FieldContainer>
              </S.Section>
            )}

            <S.ContainerSubmitButton>
              <S.SubmitButton type="submit" disabled={!isValid}>
                Salvar
              </S.SubmitButton>
            </S.ContainerSubmitButton>
          </S.Form>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

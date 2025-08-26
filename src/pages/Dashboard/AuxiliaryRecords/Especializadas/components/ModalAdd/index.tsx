import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import {
  postSetores,
  putSetoresByID,
} from "../../../../../../api/services/setores/setores";
import {
  getEspecializadaByID,
  getEspecializadaByParams,
  postEspecializada,
  putEspecializadaByID,
} from "../../../../../../api/services/specials/specials";
import { SharedState } from "../../../../../../context/SharedContext";
import { useSecretaries } from "../../../../../../hooks/useSecretaries";
import { ModalAddProps } from "./modaladd.interface";
import * as S from "./styled";

export const ModalAdd = ({
  setShowModalAdd: setShowModalAdd,
  id,
  txEspecializada,
  isRpv,
  idSecretaria,
  isBloqueado,
}: ModalAddProps) => {
  const { user } = SharedState();
  const queryClient = useQueryClient();
  const { secretariesList, loadingSecretariesist } = useSecretaries();
  const [idSecretariaState, setIdSecretariaState] =
    useState<number>(idSecretaria);
  const [idEspecializadaState, setIdEspecializadaState] = useState<number>(0);
  const [isRpvState, setIsRpvState] = useState<boolean>(isRpv);
  const [isBloqueadoState, setIsBloqueadoState] =
    useState<boolean>(isBloqueado);

  const [especializadas, setEspecializadas] = useState<
    {
      label: string;
      value: number;
    }[]
  >();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ModalAddProps>({
    mode: "onChange",
  });

  function repeatStringNumTimes(str: string, times: number) {
    var repeatedString = "";
    while (times > 0) {
      repeatedString += str;
      times--;
    }
    return repeatedString;
  }

  useEffect(() => {
    getEspecializadaByParams({ idSecretaria: idSecretariaState }).then(
      (response) => {
        const specialsList = response?.data.map((at) => ({
          label:
            repeatStringNumTimes("→", at.nuNivel) +
            (at.nuNivel == 0 ? "" : " ") +
            at.txEspecializada,
          value: at.id,
        }));
        setEspecializadas(specialsList);
      }
    );
  }, [idSecretariaState]);

  useEffect(() => {
    if (id) {
      if (especializadas)
        getEspecializadaByID(id).then((response: any) => {
          setIdEspecializadaState(response?.data?.idSetorPai);
        });
    }
  }, [especializadas]);

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

  const onSubmit: SubmitHandler<ModalAddProps> = async (data) => {
    if (!id) {
      postSetores({
        txSetor: data.txEspecializada,
        idSetor_Pai: idEspecializadaState,
        idUsuarioCadastro: +user["Jvris.User.Id"],
        isBloqueado: data.isBloqueado,
      })
        .then((responseSetor: any) => {
          if (responseSetor.status == "Created") {
            postEspecializada({
              id: responseSetor.data.id,
              txEspecializada: data.txEspecializada,
              idSecretaria: idSecretariaState,
              isRpv: isRpvState,
              isBloqueado: isBloqueadoState,
            })
              .then((responseEspecializada: any) => {
                if (responseEspecializada.status == "Created") {
                  handleToast("Especializada Adicionada com Sucesso");
                  queryClient.invalidateQueries(`allSpecialsList`);
                }
              })
              .catch((e) => {
                handleToast(
                  "Erro ao Tentar Adicionar Especializada, tente novamente!",
                  true
                );
              });
          }
        })
        .catch((e) => {
          handleToast("Erro ao Tentar Adicionar Setor, tente novamente!", true);
        });
    } else if (id > 0) {
      if (id == idEspecializadaState) {
        handleToast(
          "Erro - A especializada vinculada não pode ser a mesma que a editada!",
          true
        );
      } else {
        putSetoresByID({
          id: id,
          txSetor: data.txEspecializada,
          idSetor_Pai: idEspecializadaState,
          isBloqueado: data.isBloqueado,
        })
          .then((responseSetor: any) => {
            if (responseSetor.status == "OK") {
              putEspecializadaByID({
                id: responseSetor.data.id,
                txEspecializada: data.txEspecializada,
                idSecretaria: idSecretariaState,
                isRpv: isRpvState,
                isBloqueado: isBloqueadoState,
              })
                .then((responseEspecializada: any) => {
                  if (responseEspecializada.status == "OK") {
                    handleToast("Especializada Atualizada com Sucesso");
                    queryClient.invalidateQueries(`allSpecialsList`);
                  }
                })
                .catch((e) => {
                  handleToast(
                    "Erro ao Tentar Adicionar Especializada, tente novamente!",
                    true
                  );
                });
            }
          })
          .catch((e) => {
            handleToast(
              "Erro ao Tentar Adicionar Setor, tente novamente!",
              true
            );
          });
      }
    }
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>
            {id ? "Editar Especializada" : "Adicionar Nova Especializada"}
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
            <S.ContainerField>
              <S.FieldTitle>Especializada</S.FieldTitle>
              <S.TextInput
                defaultValue={txEspecializada}
                autoFocus
                placeholder="Digite aqui o nome da Especializada"
                {...register("txEspecializada", {
                  maxLength: 56,
                  minLength: 3,
                  required: true,
                })}
              />
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>Secretaria Responsável</S.FieldTitle>
              {secretariesList && (
                <S.CustomSelect
                  isLoading={loadingSecretariesist}
                  placeholder="Selecione a secretaria responsável"
                  options={secretariesList}
                  menuPosition="fixed"
                  defaultValue={secretariesList.find(
                    (item) => item.value == idSecretaria
                  )}
                  onChange={(item: any) => {
                    setIdSecretariaState(item.value);
                  }}
                />
              )}
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>Vincular na Especializada</S.FieldTitle>
              {especializadas && idEspecializadaState > 0 && (
                <S.CustomSelect
                  placeholder="Selecione a especializada"
                  options={especializadas}
                  menuPosition="fixed"
                  defaultValue={especializadas.find(
                    (item) => item.value == idEspecializadaState
                  )}
                  onChange={(item: any) => {
                    setIdEspecializadaState(item.value);
                  }}
                />
              )}
              {especializadas && idEspecializadaState == 0 && (
                <S.CustomSelect
                  placeholder="Selecione a especializada"
                  options={especializadas}
                  menuPosition="fixed"
                  onChange={(item: any) => {
                    setIdEspecializadaState(item.value);
                  }}
                />
              )}
            </S.ContainerField>
            <S.ContainerField style={{ marginTop: "2rem" }}>
              <S.Row>
                <S.RowSection>
                  <S.FieldTitle>
                    RPV
                    <S.ContentInputCheckbox
                      defaultChecked={isRpvState}
                      checked={isRpvState}
                      onChange={(item: any) => {
                        setIsRpvState(!isRpvState);
                      }}
                    />
                  </S.FieldTitle>
                </S.RowSection>
                <S.RowSection>
                  <S.FieldTitle>
                    Bloqueado
                    <S.ContentInputCheckbox
                      defaultChecked={isBloqueadoState}
                      checked={isBloqueadoState}
                      onChange={(item: any) => {
                        setIsBloqueadoState(!isBloqueadoState);
                      }}
                    />
                  </S.FieldTitle>
                </S.RowSection>
              </S.Row>
            </S.ContainerField>
            <S.ContainerSubmitButton>
              <S.SubmitButton disabled={!isValid}>Salvar</S.SubmitButton>
            </S.ContainerSubmitButton>
          </S.Form>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

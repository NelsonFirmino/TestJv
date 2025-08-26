import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  deleteAct,
  deleteAtoConcluidoDespacho,
  getAtosConclusoesEnvOrgOrigem,
  getDespachoAcatoChefia,
  getDespachoAto,
} from "../../../../../../api/services/acts/acts";
import { BaseModal } from "../../../../../../components/BaseModal";
import { DeleteAct } from "./delete-act.interface";
import * as S from "./styled";

interface Excluir {
  dataTable?: any;
  onClick?: () => void;
  onDeleteSuccess?: () => void;
}

export const RemoveCompletedActButton = (props: Excluir) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<DeleteAct>({
    mode: "onChange",
  });

  // useEffect(() => {
  //     mutateErgonCategSubcateg();
  // }, []);

  // const deleteCalculoMutation = useMutation(deleteAct, {
  //   onSettled: ({ status, message }) => {
  //     if (status === "OK") {
  //       toast(message, {
  //         icon: "✔",
  //         style: {
  //           borderRadius: "10px",
  //           background: "#81c784",
  //           color: "#fff",
  //           fontSize: "30px",
  //         },
  //       });

  //       setOpenModal(false);

  //       // Disparar atualização na página principal
  //       props.onDeleteSuccess?.();
  //     } else {
  //       toast.error(message, {
  //         icon: "❌",
  //         style: {
  //           borderRadius: "10px",
  //           background: "#e57373",
  //           color: "#fff",
  //           fontSize: "30px",
  //         },
  //       });
  //     }
  //   },
  // });

  const handleToast = (msg: string, error?: boolean) => {
    !error
      ? toast(msg, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
  };

  const onSubmit: SubmitHandler<DeleteAct> = async (params) => {
    try {
      //Verificar se id existe em tbAtos_Conclusoes_EnvioOrgaoOrigem
      //Se existir, não excluir --> Exibir MSG
      const responseAtoConcEnvOrgOri = await getAtosConclusoesEnvOrgOrigem(
        props.dataTable.id
      );

      if (responseAtoConcEnvOrgOri?.status === "OK") {
        handleToast(
          "O Ato concluído foi registrado como enviado ao órgão de origem, por isso o Ato Concluído não pode ser excluído",
          true
        );
        setOpenModal(false);
        return; // Para evitar que a execução continue
      }

      if (props.dataTable.txTipo === "Despacho") {
        const responseDespachoAto = await getDespachoAto(props.dataTable.id);
        // - Verificar em tbDespachos_AcatoChefia se isRecusado é true --> Não excluir
        if (responseDespachoAto?.status === "OK") {
          if (responseDespachoAto?.data?.id != 0) {
            const responseDespachoAcatoChefia = await getDespachoAcatoChefia(
              responseDespachoAto?.data?.id
            );

            if (responseDespachoAcatoChefia?.status === "OK") {
              if (responseDespachoAcatoChefia?.data?.isRecusado) {
                handleToast(
                  "O Acato da chefia para o despacho foi recusado, por isso o Ato Concluído não pode ser excluido",
                  true
                );
                setOpenModal(false);
                return; // Para evitar que a execução continue
              }
            }

            //Deleta o ato concluído por despacho

            deleteAtoConcluidoDespacho(props.dataTable.id)
              .then((response) => {
                if (response.status == "OK") {
                  handleToast(response?.message, false);
                  setOpenModal(false);
                  props.onDeleteSuccess?.();
                } else {
                  handleToast(response?.message, true);
                }
              })
              .catch((err) => {
                handleToast("Erro ao excluir", true);
              });
          }
        }
      } else {
        //Deleta o ato concluído por peça

        deleteAct(props.dataTable.id)
          .then((response) => {
            if (response.status == "OK") {
              handleToast(response?.message, false);
              setOpenModal(false);
              props.onDeleteSuccess?.();
            } else {
              handleToast(response?.message, true);
            }
          })
          .catch((err) => {
            handleToast("Erro ao excluir", true);
          });
      }
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
      handleToast("Erro ao processar a solicitação", true);
    }
  };

  return (
    <>
      <BaseModal
        title="Excluir Cálculo Financeiro"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.ContainerForm onSubmit={handleSubmit(onSubmit)}>
          <S.WarningMessage>
            Tem certeza que deseja excluir o ato concluído?
          </S.WarningMessage>

          <S.OptionsContainer>
            <S.OptionCancel onClick={() => setOpenModal(false)}>
              Cancelar
            </S.OptionCancel>
            <S.OptionRemove
              type="submit"
              // onClick={() => deleteCalculoMutation.mutate(props.dataTable.id)}
            >
              Excluir
            </S.OptionRemove>
          </S.OptionsContainer>
        </S.ContainerForm>
      </BaseModal>
      <S.Wrapper
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Excluir
      </S.Wrapper>
    </>
  );
};

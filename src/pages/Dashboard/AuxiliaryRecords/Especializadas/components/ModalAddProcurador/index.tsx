import * as MockData from "./mockData";
import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladd.interface";
import toast from "react-hot-toast";
import { useState } from "react";
import { postEspecializadaByIDAndProcurador } from "../../../../../../api/services/specials/specials";
import { removeHTMLFormat } from "../../../../../../utils/removeHTMLFormat";
import theme from "../../../../../../globalStyle/theme";
import { SharedState } from "../../../../../../context/SharedContext";

export const ModalAddProcurador = ({
  setShowModalAdd: setShowModalAdd,
  txProcurador,
  idEspecializada,
  idProcurador,
}: ModalAddProps) => {
  const { user } = SharedState();
  const [isChefe, setIsChefe] = useState<boolean>(false);
  const [isDistribuicaoAutomatica, setIsDistribuicaoAutomatica] =
    useState<boolean>(false);
  const [nuPercentualDistribuicao, setNuPercentualDistribuicao] = useState<{
    label: string;
    value: string;
  }>();

  const {
    register,
    handleSubmit,
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
      : toast.error(removeHTMLFormat(msg).toString(), {
          icon: "😥",
          duration: 10000,
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
    postEspecializadaByIDAndProcurador({
      idEspecializada,
      idProcurador,
      isChefe,
      isDistribuicaoAutomatica,
      nuPercentualDistribuicao: nuPercentualDistribuicao?.value,
      idUsuarioCadastro: +user["Jvris.User.Id"],
    })
      .then((response: any) => {
        if (response?.status == "Created") {
          handleToast("Procurador Adicionado com Sucesso");
        } else {
          handleToast(response.message, true);
        }
      })
      .catch((e: any) => {
        handleToast(
          "Erro ao Tentar Adicionar Procurador, tente novamente!",
          true
        );
      });
  };

  const handleCancel = () => {
    setShowModalAdd(false);
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>{"Adicionar Procurador à Especializada"}</S.TitleModal>
          <S.CloseModal onClick={handleCancel}>Fechar</S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.ContainerField>
              <S.FieldTitle style={{ fontSize: "14px" }}>
                Procurador: {txProcurador}
              </S.FieldTitle>
            </S.ContainerField>
            <S.ContainerField
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              <S.Row>
                <S.RowSection>
                  <S.FieldTitle>
                    <S.ContentInputCheckbox
                      style={{ marginRight: "0.6rem" }}
                      checked={isChefe}
                      onChange={(item: any) => {
                        setIsChefe(!isChefe);
                      }}
                    />
                    CHEFE DO SETOR
                  </S.FieldTitle>
                </S.RowSection>
              </S.Row>
            </S.ContainerField>
            <S.ContainerField style={{ marginBottom: "1rem" }}>
              <S.Row>
                <S.RowSection>
                  <S.FieldTitle>
                    <S.ContentInputCheckbox
                      style={{ marginRight: "0.6rem" }}
                      checked={isDistribuicaoAutomatica}
                      onChange={(item: any) => {
                        setIsDistribuicaoAutomatica(!isDistribuicaoAutomatica);
                      }}
                    />
                    Receber Distribuição Automática
                  </S.FieldTitle>
                </S.RowSection>
              </S.Row>
            </S.ContainerField>
            {isDistribuicaoAutomatica && (
              <S.ContainerField>
                <S.FieldTitle>
                  (Opcional) Percentual de Distribuição:
                </S.FieldTitle>

                <S.CustomSelect
                  placeholder="Selecione"
                  options={MockData.percentualDistribuicaoOptions}
                  menuPosition="fixed"
                  onChange={(item: any) => {
                    setNuPercentualDistribuicao(item);
                  }}
                />
              </S.ContainerField>
            )}
            <S.ContainerSubmitButton>
              <S.SubmitButton disabled={!isValid}>Salvar</S.SubmitButton>
              <S.SubmitButton
                style={{
                  marginLeft: "1rem",
                  backgroundColor: theme.colors.softRed,
                }}
                onClick={handleCancel}
              >
                Cancelar
              </S.SubmitButton>
            </S.ContainerSubmitButton>
          </S.Form>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

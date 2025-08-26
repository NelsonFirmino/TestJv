import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { PostComplyChief } from "../../../../../../../../../api/services/redistributions";
import { BaseModal } from "../../../../../../../../../components/BaseModal";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { useAttorneyBySpecialId } from "../../../../../../../../../hooks/useAttorneyBySpecialId";
import { useSpecials } from "../../../../../../../../../hooks/useSpecials";
import { SubmitAvaliarPedidoEmLote } from "./avaliar-pedido-em-lote.interface";
import * as S from "./styled";

export const AvaliarPedidoEmLote = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedSpecial, setSelectedSpecial] = useState<any>();
  const [showSelectedProcess, setShowSelectedProcess] = useState(false);
  const [isRecusado, setIsRecusado] = useState(false);
  const {
    user,
    selectedUser,
    selectedRedistributionDataTable,
    setSelectedRedistributionDataTable,
    setSelectedRowHashes,
  } = SharedState();
  const { specialsList, loadingSpecialsList } = useSpecials();
  const { attorneysBySpecial, isLoadingAttorneysBySpecial } =
    useAttorneyBySpecialId(selectedSpecial?.value);
  let countAVPediS = 0;
  let countAVPediF = 0;
  const queryClient = useQueryClient();
  const {
    reset,
    control,
    handleSubmit,
    register,
    setValue,
    formState: { isValid },
  } = useForm<SubmitAvaliarPedidoEmLote>({
    mode: "onChange",
  });

  const { mutate: mutateComplyChief, isLoading: isLoadingComplyChief } =
    useMutation(PostComplyChief, {
      onSuccess: () => {
        countAVPediS++;
      },
      onError: () => {
        countAVPediF++;
      },
      onSettled: () => {
        if (
          countAVPediS + countAVPediF ===
          selectedRedistributionDataTable.length
        ) {
          toast(
            `Total selecionado: ${selectedRedistributionDataTable.length}
                    Pedidos com sucesso: ${countAVPediS}
                    Falha no Pedido: ${countAVPediF}
                `,
            {
              style: {
                borderRadius: "10px",
                background: "#c2b32d",
                color: "#fff",
                fontSize: "30px",
              },
            }
          );
          queryClient.invalidateQueries(
            `redistributions-attorney-${
              selectedUser?.id || +user["Jvris.User.Id"]
            }`
          );
          queryClient.invalidateQueries(
            `distributions-attorney-${
              selectedUser?.id || +user["Jvris.User.Id"]
            }`
          );
          reset({
            idEspecializada: null,
            idProcurador: null,
            txObservacao: "",
          });
          setSelectedRedistributionDataTable([]);
          setSelectedRowHashes([]);
          countAVPediS = 0;
          countAVPediF = 0;
          setOpenModal(false);
        }
      },
    });

  const onSubmit: SubmitHandler<SubmitAvaliarPedidoEmLote> = async (params) => {
    selectedRedistributionDataTable.forEach((p) => {
      mutateComplyChief({
        id: p.id,
        idEspecializada: params.idEspecializada.value,
        idProcurador: params.idProcurador.value,
        idUsuarioCadastro: +user["Jvris.User.Id"],
        isRecusado,
        txObservacao: params.txObservacao,
      });
    });
  };

  return (
    <>
      <BaseModal
        title="Avaliar pedido de redistribuição"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Section>
            <S.SectionTitle>
              Número dos processos ({selectedRedistributionDataTable.length})
              <S.ContainerShowProcessNumber
                onClick={() => setShowSelectedProcess(!showSelectedProcess)}
              >
                {showSelectedProcess ? (
                  <Eye size={20} />
                ) : (
                  <EyeSlash size={20} />
                )}
              </S.ContainerShowProcessNumber>
            </S.SectionTitle>

            <S.SelectedProcessNumberContainer isOpen={showSelectedProcess}>
              {selectedRedistributionDataTable.map((p) => (
                <S.SelectedProcessNumber>
                  {p.txNumeroFormatado}
                </S.SelectedProcessNumber>
              ))}
            </S.SelectedProcessNumberContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Especializada</S.SectionTitle>
            <Controller
              name="idEspecializada"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { name, ref, value, onBlur } }) => (
                <S.CustomSelect
                  placeholder="Selecione uma especializada"
                  isLoading={loadingSpecialsList}
                  options={specialsList}
                  name={name}
                  ref={ref}
                  value={value}
                  onBlur={onBlur}
                  onChange={(data) => {
                    setValue("idProcurador", null);
                    setSelectedSpecial(data);
                    setValue("idEspecializada", data as any);
                  }}
                />
              )}
            />
          </S.Section>

          <S.Section>
            <S.SectionTitle>Procurador</S.SectionTitle>
            <Controller
              name="idProcurador"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <S.CustomSelect
                  placeholder="Selecione uma especializada"
                  isLoading={isLoadingAttorneysBySpecial}
                  options={attorneysBySpecial}
                  {...field}
                  isDisabled={!Boolean(attorneysBySpecial?.length)}
                  onChange={(data) => {
                    setValue("idProcurador", data as any);
                  }}
                />
              )}
            />
          </S.Section>

          <S.Section>
            <S.SectionTitle>Observações</S.SectionTitle>

            <S.TextArea
              {...register("txObservacao", {
                required: true,
              })}
              placeholder="Escreva aqui..."
            />
          </S.Section>

          <S.Section>
            <S.SectionTitle>Acatar pedido?</S.SectionTitle>
            <S.ButtonContainer>
              <S.ConfirmButton
                type="submit"
                disabled={isLoadingComplyChief || !isValid}
                onClick={() => setIsRecusado(false)}
              >
                Sim
              </S.ConfirmButton>

              {isLoadingComplyChief && <S.LoadingSpinner />}

              <S.CancelButton
                type="submit"
                disabled={isLoadingComplyChief || !isValid}
                onClick={() => setIsRecusado(true)}
              >
                Não
              </S.CancelButton>
            </S.ButtonContainer>
          </S.Section>
        </S.Form>
      </BaseModal>
      <S.Button onClick={() => setOpenModal(true)}>Avaliar pedido(s)</S.Button>
    </>
  );
};

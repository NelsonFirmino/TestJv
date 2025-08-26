import { Eye, EyeSlash } from "phosphor-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { patchDistributionsAdvisorV2 } from "../../../../../../../../../api/services/distributions/distributions";
import { BaseModal } from "../../../../../../../../../components/BaseModal";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { useAdvisorsByAttorney } from "../../../../../../../../../hooks/useAdvisorsByAttorney";
import { SubmitAtribuirAssessorEmLote } from "./atribuir-assessor-em-lote.interface";
import * as S from "./styled";

export const AtribuirAssessorEmLote = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [showSelectedProcess, setShowSelectedProcess] = useState(false);
  const [advisorsOptions, setAdvisorsOptions] = useState([
    { label: "", value: null },
  ]);
  const {
    user,
    selectedUser,
    selectedProcessoInActionDataTable,
    setSelectedProcessoInActionDataTable,
    setSelectedRowHashes,
  } = SharedState();
  const { advisorsByAttorney, isLoadingAdvisorsByAttorney } =
    useAdvisorsByAttorney(selectedUser?.id || +user["Jvris.User.Id"]);
  const queryClient = useQueryClient();
  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SubmitAtribuirAssessorEmLote>({
    mode: "onChange",
  });

  useEffect(() => {
    if (advisorsByAttorney) {
      setAdvisorsOptions([
        { label: "Sem Assessor", value: 0 },
        ...advisorsByAttorney,
      ]);
    }
  }, [isOpenModal]);

  useEffect(() => {
    if (isOpenModal) {
      reset({ idAssessor: null });
    }
  }, [isOpenModal]);

  const {
    mutate: mutateDistributionsAdvisorV2,
    isLoading: isLoadingDistributionsAdvisorV2,
  } = useMutation(patchDistributionsAdvisorV2, {
    onSuccess: (res) => {
      toast(res.message, {
        icon: "✔",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
      queryClient.invalidateQueries(
        `distributions-attorney-${selectedUser?.id || +user["Jvris.User.Id"]}`
      );
      reset({ idAssessor: null });
      setSelectedProcessoInActionDataTable([]);
      setSelectedRowHashes([]);
      setOpenModal(false);
    },
    onError: (res: Error) => {
      toast.error(res.message, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#e57373",
          color: "#fff",
          fontSize: "30px",
        },
      });
    },
  });

  const onSubmit: SubmitHandler<SubmitAtribuirAssessorEmLote> = async (
    params
  ) => {
    const idDistribuicoes = selectedProcessoInActionDataTable.map(
      (p) => p.idDistribuicao
    );
    mutateDistributionsAdvisorV2({
      idAssessor: params.idAssessor.value,
      idsDistribuicao: idDistribuicoes,
      idUsuarioCadastro: +user["Jvris.User.Id"],
    });
  };

  return (
    <>
      <BaseModal
        title="Atribuir para assessor"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
        isSelect={true}
      >
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Section>
            <S.SectionTitle>
              Número dos processos ({selectedProcessoInActionDataTable.length})
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
              {selectedProcessoInActionDataTable.map((p) => (
                <S.SelectedProcessNumber>{p.txNumero}</S.SelectedProcessNumber>
              ))}
            </S.SelectedProcessNumberContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Assessores</S.SectionTitle>
            <Controller
              name="idAssessor"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <S.CustomSelect
                  placeholder="Selecione o assessor"
                  isLoading={isLoadingAdvisorsByAttorney}
                  options={advisorsOptions}
                  {...field}
                />
              )}
            />
          </S.Section>

          <S.ButtonContainer>
            <S.ConfirmButton
              type="submit"
              disabled={isLoadingDistributionsAdvisorV2 || !isValid}
            >
              Salvar
            </S.ConfirmButton>

            {isLoadingDistributionsAdvisorV2 && <S.LoadingSpinner />}
          </S.ButtonContainer>
        </S.Form>
      </BaseModal>
      <S.Button onClick={() => setOpenModal(true)}>Atribuir assessor</S.Button>
    </>
  );
};

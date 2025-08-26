import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { putRubrica } from "../../../../../../api/services/rubrica/rubrica";
import { BaseModal } from "../../../../../../components/BaseModal";
import {
  ModalChangeTypeProps,
  SubmitChangeType,
} from "./interfaces/modal-change-type.interface";
import * as S from "./styled";

export const ModalChangeType = ({
  showModal,
  setShowModal,
  id,
  txSipRubrica,
}: ModalChangeTypeProps) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<SubmitChangeType>({
    mode: "onChange",
  });

  const chageTypeMutate = useMutation(putRubrica, {
    onSuccess: () => {
      toast("Incidência atualizada!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
      setShowModal(false);
      queryClient.invalidateQueries("listRubricas");
    },
    onError: (error) => {
      toast("Erro ao atualizar incidência!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
    },
  });

  const options = [
    { label: "Verba de caráter permanente", value: 1 },
    {
      label:
        "Rubrica não entra na média porque é paga em percentual sobre o vencimento básico (art. 19, §1º, “d”, e art. 22, §3º, da Lei 8.880/94)",
      value: 2,
    },
    {
      label:
        "Não entra na média porque é uma verba de natureza não habitual (art. 19, §1º, “b”, da Lei 8.880/94)",
      value: 3,
    },
  ];

  const onSubmit: SubmitHandler<SubmitChangeType> = (data) => {
    if (data?.incidencia?.value) {
      chageTypeMutate.mutate({
        id,
        nuIncidencia: data.incidencia.value,
        txSipRubrica,
      });
    }
  };

  return (
    <BaseModal
      title="Alterar tipo de cálculo rúbrica"
      isOpenModal={showModal}
      setOpenModal={setShowModal}
      isSelect={true}
    >
      <S.ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <S.SectionTitle>Incidência:</S.SectionTitle>
        <Controller
          name="incidencia"
          control={control}
          render={({ field }) => (
            <S.CustomSelect
              placeholder="Selecione o cálculo"
              {...field}
              options={options}
              isClearable={false}
            />
          )}
        />
        <S.OptionsContainer>
          <S.OptionCancel onClick={() => setShowModal(false)}>
            Cancelar
          </S.OptionCancel>
          <S.OptionSave type="submit">Salvar</S.OptionSave>
        </S.OptionsContainer>
      </S.ContainerForm>
    </BaseModal>
  );
};

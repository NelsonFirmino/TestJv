import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { putCredenciaisPje } from "../../../../../../api/services/credenciais-pje/credenciaisPje-Service";
import { BaseModal } from "../../../../../../components/BaseModal";
import { SharedState } from "../../../../../../context/SharedContext";
import { useTribunaisPje } from "../../../../../../hooks/useTribunaisPje";
import { SubmitEditCredentials } from "./edit-indice.interface";
import * as S from "./styled";

interface Edit {
  dataTable?: any;
  onClick?: () => void;
}
export const EditCredencialButton = ({ dataTable, onClick }: Edit) => {
  // TODO: incluir toast
  const [isOpenModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const { user, selectedUser } = SharedState();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitEditCredentials>({
    mode: "onChange",
  });

  interface Options {
    value: number;
    label: string;
  }

  const instanciasOptions = [
    { value: 0, label: "= Selecione =" },
    { value: 1, label: "1ª Instância" },
    { value: 2, label: "2ª Instância" },
  ];
  const { tribunaisPje, isLoadingTribunaisPje } = useTribunaisPje();

  const [tribunaisPjeOptions, setTribunaisPjeOptions] = useState<Options[]>([]);
  const [tribunaisPjeData, setTribunaisPjeData] = useState(null);
  const [instanciaData, setInstanciaData] = useState(null);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    if (tribunaisPje?.data) {
      const formattedOptions = [
        { value: 0, label: "= Selecione =" }, // Adiciona a opção "Selecione" no início
        ...tribunaisPje.data
          .sort((a, b) => a.id - b.id) // Ordena por id
          .map((item) => ({
            value: item.id,
            label: `${item.id} - ${item.txTribunal}`,
          })),
      ];
      setTribunaisPjeOptions(formattedOptions);
    }
  }, [tribunaisPje]);

  useEffect(() => {
    if (tribunaisPjeOptions && dataTable) {
      const foundTribunal = tribunaisPjeOptions.find(
        (data) => data.value == dataTable.idTribunal
      );
      setTribunaisPjeData(foundTribunal);

      const foundInstancia = instanciasOptions.find(
        (data) => data.value == dataTable.nuInstancia
      );
      setTribunaisPjeData(foundTribunal);
      setInstanciaData(foundInstancia);
    }
  }, [tribunaisPjeOptions, isOpenModal]);

  const clearFields = () => {
    setTribunaisPjeData(null);
    setInstanciaData(null);
    setValue("txUsuario", "");
    setValue("txSenha", "");
  };

  const handleTribunaisPje = (data: any) => {
    setTribunaisPjeData(data);
  };

  const handleInstancia = (data: any) => {
    setInstanciaData(data);
  };

  const handleToast = (msg: string, error: boolean) => {
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
    setUpdateData(!updateData);
  };

  const onSubmit: SubmitHandler<SubmitEditCredentials> = (params) => {
    const dtAtualizacao = new Date().toISOString().split("T")[0];
    putCredenciaisPje({
      id: dataTable?.id,
      txUsuario: params.txUsuario,
      txSenha: params.txSenha,
      idTribunal: tribunaisPjeData?.value,
      nuInstancia: instanciaData?.value,
      idUsuario: +user["Jvris.User.Id"],
      idUsuarioCadastro: dataTable.idUsuario,
      dtAtualizacao: dtAtualizacao,
    })
      .then((response) => {
        if (response.status == "OK") {
          handleToast(response.message, false);
          setOpenModal(false);
          clearFields();
          queryClient.invalidateQueries(`credenciaisPje`);
        } else {
          handleToast(response.message, true);
        }
      })
      .catch((err) => {
        handleToast("Erro ao editar credenciais", true);
      });
  };

  return (
    <>
      <BaseModal
        title="Editar Credencial"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
        isSelect={true}
        onClose={() => {
          clearFields();
        }}
      >
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Usuário Credencial:</S.FieldTitle>

              <S.FieldContainer>
                <Controller
                  name="txUsuario"
                  control={control}
                  render={({ field }) => (
                    <S.Input
                      {...field}
                      required
                      type="text"
                      placeholder="Digite o nome do usuário"
                      onChange={(e) => setValue("txUsuario", e.target.value)}
                    />
                  )}
                />
              </S.FieldContainer>
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Senha Credencial:</S.FieldTitle>

              <S.FieldContainer>
                <Controller
                  name="txSenha"
                  control={control}
                  render={({ field }) => (
                    <S.Input
                      {...field}
                      required
                      type="password"
                      placeholder="Digite a senha"
                      onChange={(e) => setValue("txSenha", e.target.value)}
                    />
                  )}
                />
              </S.FieldContainer>
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Tribunal:</S.FieldTitle>

              <S.FieldContainer>
                <Controller
                  name="idTribunal"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      required={true}
                      placeholder="Selecione o exequente"
                      {...field}
                      options={tribunaisPjeOptions}
                      isClearable={false}
                      value={tribunaisPjeData}
                      onChange={(data) => handleTribunaisPje(data)}
                    />
                  )}
                />
              </S.FieldContainer>
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Instância:</S.FieldTitle>

              <S.FieldContainer>
                <Controller
                  name="nuInstancia"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      required={true}
                      placeholder="Selecione a instância"
                      {...field}
                      options={instanciasOptions}
                      isClearable={false}
                      value={instanciaData}
                      onChange={(data) => handleInstancia(data)}
                    />
                  )}
                />
              </S.FieldContainer>
            </S.ContainerField>
          </S.ContentSection>

          <S.OptionsContainer>
            <S.OptionCancel onClick={() => setOpenModal(false)}>
              Cancelar
            </S.OptionCancel>
            <S.OptionSave type="submit">Salvar</S.OptionSave>
          </S.OptionsContainer>
        </S.FormContainer>
      </BaseModal>
      <S.Wrapper onClick={() => setOpenModal(true)}>Editar</S.Wrapper>
    </>
  );
};

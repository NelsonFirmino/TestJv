import {
  SearchPart,
  SubmitAppPart,
} from "./interfaces/modal-add-part.interface";
import * as S from "./styled";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useAutoCompleteParts } from "../../../../../../hooks/useAutoCompleteParts";
import { postProcessPart } from "../../../../../../api/services/processParts/processParts";
import { useQueryClient } from "react-query";
import { SharedState } from "../../../../../../context/SharedContext";
interface ModalAddPartProps {
  setShowModalAddPart: (showModal: boolean) => void;
  processId?: string;
}

export const ModalAddPart = ({
  setShowModalAddPart,
  processId,
}: ModalAddPartProps) => {
  const { user } = SharedState();
  const queryClient = useQueryClient();
  const [hideTypeField, setHideTypeField] = useState(false);
  const [txCpf, setTxCpf] = useState<string>("");
  const [txParte, setTxParte] = useState<string>("");
  const [txPolo, setTxPolo] = useState<string>("A");
  const [fieldSearch, setFieldSearch] = useState<string>("0");
  const [typeSearch, setTypeSearch] = useState<string>("0");
  const { autocompleteParts, isLoadingAutocompleteParts } =
    useAutoCompleteParts({
      txCpf,
      txParte,
      fieldSearch,
      typeSearch,
      page: "1",
      pageSize: "8",
    });

  const {
    register: registerSubmitPart,
    handleSubmit: handleSubmitRegisterSubmitPart,
    formState: { isValid: isValidRegisterSubmitPart, errors: errorsSubmitPart },
    watch: watchSubmitPart,
    control: controlSubmitPart,
    getValues: getValuesSubmitPart,
    setValue: setValuesSubmitPart,
  } = useForm<SubmitAppPart>({
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
    getValues,
    setValue,
  } = useForm<SearchPart>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitAppPart> = (data) => {};

  const addProcessPart = async (idParte: number, txParte: string) => {
    await postProcessPart({
      idProcesso: +processId!,
      idParte,
      txParte,
      txPolo,
      idUsuarioCadastro: user["Jvris.User.Id"],
    });
    queryClient.invalidateQueries(`processParts-${processId}`);
  };

  let tableContent: any;

  if (autocompleteParts?.data && autocompleteParts.data.length > 0) {
    tableContent = (
      <S.ContainerTable>
        <S.Table>
          <thead>
            <S.RowTable>
              <th>NOME</th>
              <th>CPF/CNPJ</th>
              <th>TIPO POLO</th>
            </S.RowTable>
          </thead>
          <tbody>
            {autocompleteParts.data.map((part) => (
              <S.RowTable key={part.id}>
                <td>{part.txParte}</td>
                <td>{part.txCpfCnpj}</td>
                <td>
                  <S.ContainerField>
                    <S.CustomSelect
                      defaultValue={{
                        label: "Ativo",
                        value: "A",
                      }}
                      options={[
                        {
                          label: "Ativo",
                          value: "A",
                        },
                        {
                          label: "Passivo",
                          value: "P",
                        },
                        {
                          label: "Interessado",
                          value: "I",
                        },
                        {
                          label: "Advogado",
                          value: "D",
                        },
                      ]}
                      isSearchable={false}
                      onChange={(e: any) => setTxPolo(e.value)}
                      isClearable={false}
                    />
                  </S.ContainerField>
                </td>
                <td style={{ display: "flex" }}>
                  <S.AddPartButton
                    onClick={() => addProcessPart(part.id, part.txParte)}
                  >
                    <S.AddIcon weight="fill" />
                  </S.AddPartButton>
                </td>
              </S.RowTable>
            ))}
          </tbody>
        </S.Table>
      </S.ContainerTable>
    );
  }

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Buscar Parte</S.TitleModal>
          <S.CloseModal onClick={() => setShowModalAddPart(false)}>
            <S.CloseIcon weight="fill" />
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.Form>
            <S.ContentSection>
              <S.ContainerField>
                <S.FieldTitle>Buscar por:</S.FieldTitle>
                <Controller
                  name="fieldSearch"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Digite mais de 5 caracteres"
                      {...field}
                      defaultValue={{ label: "Nome", value: "0" }}
                      options={[
                        { label: "Nome", value: "0" },
                        { label: "CPF", value: "1" },
                        { label: "CNPJ", value: "2" },
                      ]}
                      onChange={(e: any) => {
                        setFieldSearch(e.value);
                        if (!(e.value === "0")) {
                          setHideTypeField(true);
                        } else {
                          setHideTypeField(false);
                        }
                      }}
                      isClearable={false}
                    />
                  )}
                />
              </S.ContainerField>

              {!hideTypeField && (
                <S.ContainerField>
                  <S.FieldTitle>Tipo da busca:</S.FieldTitle>
                  <Controller
                    name="typeSearch"
                    control={control}
                    render={({ field }) => (
                      <S.CustomSelect
                        placeholder="Digite mais de 5 caracteres"
                        {...field}
                        defaultValue={{ label: "Iniciar com", value: "0" }}
                        options={[
                          { label: "Iniciar com", value: "0" },
                          { label: "Contém", value: "1" },
                        ]}
                        onChange={(e: any) => {
                          setTypeSearch(e.value);
                        }}
                        isClearable={false}
                      />
                    )}
                  />
                </S.ContainerField>
              )}

              <S.ContainerField>
                <S.FieldTitle>Informação da parte:</S.FieldTitle>
                <S.TextInput
                  type="text"
                  placeholder="Digite informação da parte"
                  {...register("busca", {
                    onChange: (e) => {
                      if (fieldSearch === "0") {
                        setTxParte(e.target.value);
                      } else {
                        setTxCpf(e.target.value);
                      }
                    },
                  })}
                />
              </S.ContainerField>
            </S.ContentSection>
          </S.Form>
          {!isLoadingAutocompleteParts ? tableContent : <S.LoadingSpinner />}
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

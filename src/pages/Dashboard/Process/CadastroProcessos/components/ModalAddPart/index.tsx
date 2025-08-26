import { SearchPart } from "./interfaces/modal-add-part.interface";
import * as S from "./styled";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useAutoCompleteParts } from "../../../../../../hooks/useAutoCompleteParts";
import { SharedState } from "../../../../../../context/SharedContext";
interface ModalAddPartProps {
  setShowModalAddPart: (showModal: boolean) => void;
  setPartesLS: (partes: any) => void;
}

export const ModalAddPart = ({
  setShowModalAddPart,
  setPartesLS,
}: ModalAddPartProps) => {
  const { user } = SharedState();
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
      pageSize: "1000",
    });

  const {
    register,
    formState: { isValid, errors },
    control,
  } = useForm<SearchPart>({
    mode: "onChange",
  });

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
                    onClick={() => {
                      //add to LS
                      /* 
                        processoParteNova.idParte = idParte;
                        processoParteNova.idProcesso = idProcesso;
                        processoParteNova.txPolo = Parte.txPolo ;
                        processoParteNova.isPrincipal = (!lsPartes.Where(p => p.txPolo == txPolo).Any(p => p.isPrincipal));
                        processoParteNova.idUsuarioCadastro = UsuarioLogado.id;
                        processoParteNova.isExcluido = false;

                        ParteViewModel parteNova = new ParteViewModel
                        {
                            id = idParte,
                            txParte = Parte.txParte,
                            txCpfCnpj = Parte.txCpfCnpj,
                            txTipoPessoa = Parte.txTipoPessoa
                        };

                        processoParteNova.parte = parteNova;
                      */
                      const parte = {
                        id: part.id,
                        txParte: part.txParte,
                        txCpfCnpj: part.txCpfCnpj,
                        /*  txPolo: txPolo, */
                        txTipoPessoa: part.txTipoPessoa,
                      };
                      const processoParteNova = {
                        idParte: part.id,
                        idProcesso: null,
                        txPolo: txPolo,
                        isPrincipal: false,
                        idUsuarioCadastro: user["Jvris.User.Id"],
                        isExcluido: false,
                        parte: parte,
                      };

                      setPartesLS((prev) => [...prev, processoParteNova]);
                      setShowModalAddPart(false);
                    }}
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

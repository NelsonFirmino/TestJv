import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { SelectI, SubmitCadastro } from "./interfaces/cadastro.interface";
// import * as MockData from "./mockData";
import { Gavel } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import usePartesService from "../../../../api/services/Processos/Partes";
import useAtosService from "../../../../api/services/atos/atos";
import useRequisitorioService from "../../../../api/services/rpv/Requisitorio";
import { BaseModal } from "../../../../components/BaseModal";
import { CustomTable } from "../../../../components/CustomTable";
import { useNatureza } from "../../../../hooks/useNatureza";
import { useOrigem } from "../../../../hooks/useOrigem";
import { useRequisitoriosPorIdAto } from "../../../../hooks/useRequisitoriosPorIdAto";
import useRequisitoriosPage from "../useRequisitoriosPage";
import { EditCadastroRequesitorios } from "./components/EditButton";
import { RemoveButton } from "./components/RemoveButton";
import TipoRpv from "./components/tipoRpv";
import * as MockData from "./mockData";
import * as S from "./styled";

const CadastroRequisitorios = () => {
  const { user } = SharedState();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    control,
  } = useForm<SubmitCadastro>({
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const { idAto } = useParams();
  const { get: getAto, ato } = useAtosService();
  const { get: getPartes, partes } = usePartesService();
  const { natureza, isLoadingNatureza } = useNatureza();
  const { origem, isLoadingOrigem } = useOrigem();
  const {
    salvar,
    getRequisitoriosById,
    requisitorios,
    requisitorio,
    get: getRequisitorio,
  } = useRequisitorioService();
  const { requisitoriosPorIdAto, isLoadingRequisitoriosPorIdAto } =
    useRequisitoriosPorIdAto(+idAto);
  const { concluirAto } = useRequisitoriosPage({
    idURL: idAto,
  });
  const [requisitores, setRequisitores] = useState<SelectI[]>([]);
  const [devedores, setDevedores] = useState<SelectI[]>([]);
  const [advogados, setAdvogados] = useState<SelectI[]>();
  const [valorCalculado, setValorCalculado] = useState(null);
  const [honorarios, setHonorarios] = useState<boolean>(false);
  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    getAto(parseInt(idAto));
  }, []);

  useEffect(() => {
    if (ato) {
      getPartes(ato.idProcesso);
      getRequisitoresCadastrados();
    }
  }, [ato]);

  useEffect(() => {
    if (partes && partes.length) {
      partes.forEach((parte) => {
        const dat = {
          label: `${parte.parte.txParte} (${parte.parte.txCpfCnpj})`,
          value: parte.idParte,
        };

        if (parte.txPolo == "A") {
          setRequisitores((prev) => {
            const isDuplicated =
              prev && prev.some((item) => item.value === dat.value);
            if (prev && !isDuplicated) {
              return [...prev!, dat];
            }
            return [dat];
          });
        } else if (parte.txPolo == "P") {
          setDevedores((prev) => {
            const isDuplicated =
              prev && prev.some((item) => item.value === dat.value);
            if (prev && !isDuplicated) {
              return [...prev!, dat];
            }
            return [dat];
          });
        } else if (parte.txPolo == "D") {
          setAdvogados((prev) => {
            const isDuplicated =
              prev && prev.some((item) => item.value === dat.value);
            if (prev && !isDuplicated) {
              return [...prev!, dat];
            }
            return [dat];
          });
        }
      });
    }
  }, [partes]);

  function getRequisitoresCadastrados() {
    getRequisitoriosById(parseInt(idAto));
  }

  const handleValorCalculado = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setValorCalculado(valorNumerico);
    setValue("vaPagamento", Number(valorNumerico) / 100);
  };

  function toogleHonorarios() {
    setHonorarios(!honorarios);
  }

  const formatarNumero = (numero: any) => {
    return (Number(numero) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const handleToast = (msg: string, error: boolean) => {
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
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
  };

  function formatarVaPagamento(numero) {
    let numeroLimpo = numero.replace(/[^0-9,.]/g, "");

    numeroLimpo = numeroLimpo.replace(",", ".");

    numeroLimpo = numeroLimpo.replace(/\.(?=.*\.)/g, "");

    let numeroFormatado = parseFloat(numeroLimpo).toFixed(2);

    return numeroFormatado;
  }

  const handleConcluirAto = () => {
    concluirAto();
    setOpenModal(false);
  };

  const onSubmit: SubmitHandler<SubmitCadastro> = async (data) => {
    const params = {
      idAto: +idAto,
      id: 0,
      txTipo: data.tipo.value,
      isHonorario: honorarios,
      idRequisitor: data.requisitor.value,
      idDevedor: data.devedor.value,
      idOrigem: data.origem.value,
      idNatureza: data.natureza.value,
      dtLimitePagamento: data.dtLimitePagamento,
      vaPagamento: +formatarVaPagamento(data.vaPagamento),
      idUsuarioCadastro: +user["Jvris.User.Id"],
    };
    salvar(params)
      .then((response) => {
        if (response.status == "Created") {
          handleToast("Requisitório Cadastrado com Sucesso", false);
          queryClient.invalidateQueries(`getRequisitoriosPorIdAto-${idAto}`);
        } else {
          handleToast("Erro ao Cadastrar Requisitório", true);
          // handleToast(response.message, true);
        }
      })
      .catch((err) => {
        handleToast("Erro ao Cadastrar Requisitório", false);
      });
  };

  return (
    <>
      <PageTitle
        pageTitle="CADASTRO DE REQUISITÓRIOS"
        pageIcon={<S.PageIcon />}
      />
      <BaseModal
        title="Tem certeza que deseja concluir o ato?"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.ContainerForm>
          <S.ButtonContainer>
            <S.CancelButton onClick={() => setOpenModal(false)}>
              Cancelar
            </S.CancelButton>
            <S.ConfirmButton
              onClick={async (event) => {
                handleConcluirAto();
                event.preventDefault();
              }}
            >
              Sim
            </S.ConfirmButton>
          </S.ButtonContainer>
        </S.ContainerForm>
      </BaseModal>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionDataRow style={{ flexWrap: "wrap" }}>
            <S.SectionDataPartiesCapsule>
              <S.SectionTitle>Processo:</S.SectionTitle>
              <S.SectionDataContainer>
                <S.SectionDataInfo>
                  {ato ? ato.txNumeroFormatado : ""}
                </S.SectionDataInfo>
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>
            <S.SectionDataPartiesCapsule>
              <S.SectionTitle>Vara:</S.SectionTitle>
              <S.SectionDataContainer>
                <S.SectionDataInfo>
                  {ato ? ato.txOrgaoJulgador : ""}
                </S.SectionDataInfo>
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>
            <S.SectionDataPartiesCapsule>
              <S.SectionTitle>Tribunal:</S.SectionTitle>
              <S.SectionDataContainer>
                <S.SectionDataInfo>
                  {ato ? ato.txTribunal : ""} - {ato ? ato.txSiglaTribunal : ""}
                </S.SectionDataInfo>
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>
          </S.SectionDataRow>
          <S.SectionLine></S.SectionLine>

          <S.SectionSelectDataRow>
            <S.SectionDataPartiesCapsule>
              <S.SectionTitle>Devedor: *</S.SectionTitle>
              <S.SectionDataContainer>
                <Controller
                  name="devedor"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      required={true}
                      isClearable={false}
                      options={devedores && devedores}
                      placeholder="Selecione o devedor"
                      isSearchable={false}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>

            <S.SectionDataPartiesCapsule>
              <S.SectionTitle>Requisitor: *</S.SectionTitle>
              <S.SectionDataContainer>
                <Controller
                  name="requisitor"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      required={true}
                      isClearable={false}
                      options={requisitores && requisitores}
                      placeholder="Selecione o requisitor"
                      isSearchable={false}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>

            <S.SectionDataPartiesCapsule>
              <S.SectionTitle>Natureza da Despesa: *</S.SectionTitle>
              <S.SectionDataContainer>
                <Controller
                  name="natureza"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      required={true}
                      isClearable={false}
                      options={natureza && natureza}
                      isLoading={isLoadingNatureza}
                      placeholder="Selecione a natureza da despesa"
                      isSearchable={false}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>
          </S.SectionSelectDataRow>
          <S.SectionLine></S.SectionLine>

          <S.SectionSelectDataRow>
            <S.SectionDataPartiesCapsule>
              <S.SectionTitle></S.SectionTitle>
              <S.SectionDataContainer style={{ justifyContent: "center" }}>
                <Gavel
                  weight="bold"
                  size={20}
                  color="black"
                  alt="Honorários Sucumbenciais"
                  style={{ transform: "scaleX(-1)", marginTop: "8px" }}
                />
                <input
                  type="checkbox"
                  style={{ marginLeft: "1rem", marginTop: "8px" }}
                  checked={honorarios}
                  onChange={toogleHonorarios}
                />
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>

            <S.SectionDataPartiesCapsule>
              <S.SectionTitle>Tipo: *</S.SectionTitle>
              <S.SectionDataContainer style={{ width: "20rem" }}>
                <Controller
                  name="tipo"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      required={true}
                      isClearable={false}
                      options={MockData.tipoOptions}
                      placeholder="Selecione o tipo"
                      isSearchable={false}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>

            <S.SectionDataPartiesCapsule>
              <S.SectionTitle>Origem da Despesa: *</S.SectionTitle>
              <S.SectionDataContainer>
                <Controller
                  name="origem"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      required={true}
                      isClearable={false}
                      options={origem && origem}
                      isLoading={isLoadingOrigem}
                      placeholder="Selecione a origem da despesa"
                      isSearchable={false}
                    />
                  )}
                />
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>

            <S.SectionDataPartiesCapsule>
              <S.SectionTitle>Limite de Pagamento: *</S.SectionTitle>
              <S.SectionDataContainer>
                <Controller
                  name="dtLimitePagamento"
                  control={control}
                  render={({ field }) => (
                    <S.Input required={true} {...field} type="date" />
                  )}
                />
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>

            <S.SectionDataPartiesCapsule>
              <S.SectionTitle>Valor (R$): *</S.SectionTitle>
              <S.SectionDataContainer>
                <S.TextInput
                  required={true}
                  type="text"
                  disabled={false}
                  value={formatarNumero(valorCalculado)}
                  {...register("vaPagamento")}
                  onChange={handleValorCalculado}
                />
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>
          </S.SectionSelectDataRow>
        </S.Section>

        <S.ButtonsWrapper>
          {requisitoriosPorIdAto && (
            <S.SubmitButton
              onClick={(event) => {
                setOpenModal(true);
                event.preventDefault();
              }}
            >
              Concluir Ato
            </S.SubmitButton>
          )}
          <S.SubmitButton disabled={!isValid} type="submit">
            Salvar
          </S.SubmitButton>
        </S.ButtonsWrapper>
      </S.Form>
      <S.SectionLine></S.SectionLine>

      <S.TableWrapper>
        <S.SectionTitle
          style={{
            fontWeight: "bold",
            marginBottom: "3rem",
            letterSpacing: "0",
          }}
        >
          REQUISITORES CADASTRADOS
        </S.SectionTitle>
        <CustomTable
          columns={[
            {
              name: "Requisitor",
              isSortable: false,
              keyData: "txRequisitor",
            },
            {
              name: "Documento Requisitor",
              isSortable: true,
              keyData: "txCpfCnpjRequisitor",
            },
            {
              name: "Devedor",
              isSortable: true,
              keyData: "txDevedor",
            },
            {
              name: "Natureza Despesa",
              isSortable: true,
              keyData: "txNatureza",
            },
            {
              name: "Tipo",
              isSortable: true,
              keyData: "txTipo",
              component: {
                element: (data) => <TipoRpv dataTable={data} />,
                isButton: false,
              },
            },
            {
              name: "Limite Pagamento",
              isSortable: true,
              keyData: "dtLimitePagamento",
              formatToDate: true,
            },
            {
              name: "Valor (R$)",
              isSortable: true,
              keyData: "vaPagamento",
              formatToCurrency: true,
            },
            {
              name: "",
              isSortable: false,
              keyData: "editar",
              component: {
                element: (data) => (
                  <EditCadastroRequesitorios dataTable={data} />
                ),
                isButton: true,
              },
            },
            {
              name: "",
              isSortable: false,
              keyData: "excluir",
              component: {
                element: (data) => <RemoveButton dataTable={data} />,
                isButton: true,
              },
            },
          ]}
          data={requisitoriosPorIdAto?.data ? requisitoriosPorIdAto.data : []}
          showSelectNumberOfRows={false}
          isLoading={isLoadingRequisitoriosPorIdAto}
          showPagination={false}
          showSearchField={true}
          selectRows={true}
          tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
          pdfButton={{
            nameFile: "requisitores-cadastrados",
          }}
          csvButton={{
            nameFile: "requisitores-cadastrados",
          }}
        />
      </S.TableWrapper>
    </>
  );
};

export default CadastroRequisitorios;

import { useEffect } from "react";
import toast from "react-hot-toast";
import useEspecializadasService from "../../../../../../api/services/Especializada";
import { deleteAto } from "../../../../../../api/services/atos/atos";
import { BaseModal } from "../../../../../../components/BaseModal";
import * as SM from "../../../../../../components/JvrisModal/styled";
import { formatToBrazilianDate } from "../../../../../../utils/formatToBrazilianDate.util";
import { useOperadorContext } from "../../context";
import * as S from "../styled";

export interface ExcluirAtoI {
  idAto: number;
  idEspecializada: number;
  idSecretaria: number;
  isPublicar: boolean;
  idUsuarioCadastro: number;
  observacao: string;
  txNumeroFormatado: string;
  txSistemaProcessual: string;
  txClasse: string;
  txSecretaria: string;
  dtCiencia: string;
  dtPrazo: string;
}

const ExcluirAto = () => {
  const { get } = useEspecializadasService();

  const {
    setOpenExcluirAto,
    excluirAtoData,
    processoData,
    openExcluirAto,
    secretaria,
  } = useOperadorContext();

  useEffect(() => {
    get(secretaria);
  }, []);
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
    setOpenExcluirAto(false);
  };

  const handleDelete = () => {
    deleteAto(processoData.id)
      .then((response) => {
        if (response.status == "OK") {
          // queryClient.invalidateQueries(`caixas`);
          handleToast("Ato Removido com Sucesso");
        } else if (response.status == "NotFound") {
          handleToast(response.message, true);
        }
      })
      .catch((err) => {
        handleToast(err.message);
      });
  };

  return (
    <BaseModal
      isOpenModal={openExcluirAto}
      setOpenModal={setOpenExcluirAto}
      title="Excluir Ato"
    >
      <div>
        <SM.ContentWrapper
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "20px",
          }}
        >
          <S.ContainerField>
            <S.FieldTitle>Número do Processo</S.FieldTitle>
            <S.TextInput
              defaultValue={processoData.txNumeroFormatado}
              disabled={true}
              autoFocus
            />
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Sistema Processual</S.FieldTitle>
            <S.TextInput
              defaultValue={processoData.txSistemaProcessual}
              disabled={true}
              autoFocus
            />
          </S.ContainerField>
          <S.ContainerField>
            <S.FieldTitle>Classe Processual</S.FieldTitle>
            <S.TextInput
              defaultValue={processoData.txClasse}
              disabled={true}
              autoFocus
            />
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Secretaria</S.FieldTitle>
            <S.TextInput
              defaultValue={processoData.txSecretaria}
              disabled={true}
              autoFocus
            />
          </S.ContainerField>

          {processoData.dtCiencia && (
            <S.ContainerField>
              <S.FieldTitle>Data da Ciência</S.FieldTitle>
              <S.TextInput
                value={formatToBrazilianDate(processoData.dtCiencia)}
                disabled={true}
                autoFocus
              />
            </S.ContainerField>
          )}

          {processoData.dtPrazo && (
            <S.ContainerField>
              <S.FieldTitle>Data de Prazo</S.FieldTitle>
              <S.TextInput
                defaultValue={formatToBrazilianDate(processoData.dtPrazo)}
                disabled={true}
                autoFocus
              />
            </S.ContainerField>
          )}
        </SM.ContentWrapper>
        <S.ContainerSubmitButton>
          <S.SubmitButton onClick={handleDelete}>Excluir</S.SubmitButton>
        </S.ContainerSubmitButton>
      </div>
    </BaseModal>
  );
};

export default ExcluirAto;

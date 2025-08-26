import * as S from "../styled";
import { Asterisk } from "phosphor-react";
import useRequisitoriosPage from "../useRequisitoriosPage";
import { Gavel } from "@phosphor-icons/react";
import { formatNumberText } from "../../../../utils/formatNumber.util";
import * as MockData from "./mockData";

const CadastroRequisitorios = ({ process_id }: { process_id: string }) => {
  const {
    ato,
    handleSelectDevedor,
    handleLimiteChange,
    handleSelectNatureza,
    handleSelectOrigem,
    handleSelectRequisitor,
    handleValorChange,
    handleSelectTipo,
    toogleHonorarios,
    requisitores,
    devedores,
    nats,
    desps,
    limitePag,
    valor,
    honorarios,
    concluirAto,
    salvarAto,
    errorTrigger,
    requisitorios,
  } = useRequisitoriosPage({
    idURL: process_id,
  });

  return (
    <S.Wrapper>
      <S.ContainerHeader>
        <S.TitleHeader>Cadastro de Requisitórios</S.TitleHeader>
      </S.ContainerHeader>
      <S.DatasWrapper>
        <S.DataWrapper>
          <S.DataLabel>Processo</S.DataLabel>
          <S.Data>{ato && ato.txNumeroFormatado}</S.Data>
        </S.DataWrapper>
        <S.DataWrapper>
          <S.DataLabel>Vara</S.DataLabel>
          <S.Data>{ato && ato.txOrgaoJulgador}</S.Data>
        </S.DataWrapper>
        <S.DataWrapper>
          <S.DataLabel>Tribunal</S.DataLabel>
          <S.Data>{ato && ato.txTribunal}</S.Data>
        </S.DataWrapper>
      </S.DatasWrapper>
      <S.DatasWrapper>
        <S.DataWrapper>
          <S.DataLabelWrapper>
            <S.DataLabel isError={errorTrigger.devedor}>Devedor</S.DataLabel>
          </S.DataLabelWrapper>
          {devedores && (
            <S.SelectData
              defaultValue={[
                { label: devedores[0].label, value: devedores[0].value },
              ]}
              isDisabled
              onChange={handleSelectDevedor}
              options={devedores}
            />
          )}
        </S.DataWrapper>

        <S.DataWrapper>
          <S.DataLabelWrapper>
            <S.DataLabel isError={errorTrigger.requisitor}>
              Requisitor
            </S.DataLabel>
            <Asterisk weight="bold" size={12} color="#FF0000" />
          </S.DataLabelWrapper>
          {requisitores && (
            <S.SelectData
              defaultValue={[
                { label: requisitores[0].label, value: requisitores[0].value },
              ]}
              isDisabled
              onChange={handleSelectRequisitor}
              options={requisitores}
            />
          )}
        </S.DataWrapper>

        <S.DataWrapper>
          <S.DataLabelWrapper>
            <S.DataLabel isError={errorTrigger.naturezaDespesa}>
              Natureza da Despesa
            </S.DataLabel>
            <Asterisk weight="bold" size={12} color="#FF0000" />
          </S.DataLabelWrapper>
          {requisitorios && (
            <S.SelectData
              isDisabled
              onChange={handleSelectNatureza}
              options={nats}
              defaultValue={[
                {
                  label: requisitorios[0].txNatureza,
                  value: requisitorios[0].idNatureza,
                },
              ]}
              placeholder="Selecione a Natureza da Despesa"
            />
          )}
        </S.DataWrapper>
      </S.DatasWrapper>

      <S.DatasWrapper>
        <S.DataWrapper
          style={{
            marginTop: "3rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <S.DataLabelWrapper>
            <Gavel
              weight="bold"
              size={24}
              color="black"
              alt="Honorários Sucumbenciais"
            />
            <input
              type="checkbox"
              checked={honorarios}
              onChange={toogleHonorarios}
            />
          </S.DataLabelWrapper>
        </S.DataWrapper>

        <S.DataWrapper style={{ flex: 3 }}>
          <S.DataLabelWrapper>
            <S.DataLabel isError={errorTrigger.tipo}>Tipo</S.DataLabel>
            <Asterisk weight="bold" size={12} color="#FF0000" />
          </S.DataLabelWrapper>
          {requisitorios && (
            <S.SelectData
              defaultValue={
                requisitorios[0].txTipo == "R"
                  ? MockData.specialOptions[0]
                  : MockData.specialOptions[1]
              }
              placeholder="Selecione o Tipo"
              onChange={handleSelectTipo}
              options={MockData.specialOptions}
            />
          )}
        </S.DataWrapper>

        <S.DataWrapper style={{ flex: 3 }}>
          <S.DataLabelWrapper>
            <S.DataLabel isError={errorTrigger.origemDespesa}>
              Origem da Despesa
            </S.DataLabel>
            <Asterisk weight="bold" size={12} color="#FF0000" />
          </S.DataLabelWrapper>
          {requisitorios && (
            <S.SelectData
              onChange={handleSelectOrigem}
              defaultValue={[
                {
                  label: requisitorios[0].txOrigem,
                  value: requisitorios[0].idOrigem,
                },
              ]}
              options={desps}
              placeholder="Selecione a Origem da Despesa"
            />
          )}
        </S.DataWrapper>

        <S.DataWrapper style={{ flex: 3 }}>
          <S.DataLabelWrapper>
            <S.DataLabel isError={errorTrigger.limitePag}>
              Limite de Pagamento
            </S.DataLabel>
            <Asterisk weight="bold" size={12} color="#FF0000" />
          </S.DataLabelWrapper>
          {requisitorios && (
            <S.Input
              defaultValue={requisitorios[0].dtLimitePagamento}
              onChange={handleLimiteChange}
              type="date"
            />
          )}
        </S.DataWrapper>

        <S.DataWrapper style={{ flex: 3 }}>
          <S.DataLabelWrapper>
            <S.DataLabel isError={errorTrigger.valor}>Valor (R$)</S.DataLabel>
            <Asterisk weight="bold" size={12} color="#FF0000" />
          </S.DataLabelWrapper>
          {requisitorios && (
            <S.Input
              type="text"
              defaultValue={formatNumberText(requisitorios[0].vaPagamento)}
              onChange={(value) => handleValorChange(value.target.value)}
            />
          )}
        </S.DataWrapper>
      </S.DatasWrapper>

      <S.ButtonsWrapper>
        {requisitorios && (
          <S.Button onClick={concluirAto}>Concluir Ato</S.Button>
        )}
        <S.Button onClick={salvarAto} isSave>
          Salvar
        </S.Button>
      </S.ButtonsWrapper>
    </S.Wrapper>
  );
};

export default CadastroRequisitorios;

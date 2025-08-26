import { useEffect, useState, useContext } from "react";
import { GenericCard } from "../../../../../../components/AttorneyGenericCard";
import * as S from "../../styled";
import { getUser } from "../../../../../../api/services/users/users";
import jwtDecode from "jwt-decode";
import { getPiecesQuantitative } from "../../../../../../api/services/piecesQuantitative/piecesQuantitative";
import { getAccountingQuantitative } from "../../../../../../api/services/accountingQuantitative/accountingQuantitative";
import { useModalsContext } from "../../context/ModalsContext";
import { modalsID } from "../../context/ModalsContext/modalsID";
import { usePrazosContext } from "../../context/PrazosContext";
import useQuantitativoService from "../../../../../../api/services/Distribuições/quantitativo";
import { SharedState } from "../../../../../../context/SharedContext";

const Cards = () => {
  const {user, selectedUser} = SharedState();
  const user_id = selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id; 
  const [userName, setUserName] = useState<string>();
  const [userPerfil, setUserPerfil] = useState<string>();
  const {
    processosVencendoAmanha,
    processosVencendoHoje,
    processosVencendoNessaSemana,
  } = usePrazosContext();
  const { openModal } = useModalsContext();

  const [distQuantitative, setDistQuantitative] = useState<number[]>();
  const [piecesQuantitative, setPiecesQuantitative] = useState<number[]>();
  const [accountingQuantitative, setAccountingQuantitative] =
    useState<number[]>();

  const { getDistributionsQuantitative, quantitative } =
    useQuantitativoService();

  const data = new Date();
  const diaSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  const mes = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dia = data.getDate();
  const diaSemanaFormatado = diaSemana[data.getDay()];
  const mesFormatado = mes[data.getMonth()];
  const dataFormatada = `${diaSemanaFormatado}, ${dia} de ${mesFormatado}`;
  const primeiroDiaMes = new Date(
    data.getFullYear(),
    data.getMonth(),
    1
  ).toLocaleDateString();
  const ultimoDiaMes = new Date(
    data.getFullYear(),
    data.getMonth() + 1,
    0
  ).toLocaleDateString();

  useEffect(() => {
    getUser(+user["Jvris.User.Id"]).then((result) => {
      setUserName(result.data?.txUsuario);
      setUserPerfil(result.data?.txPerfil);
    });

    getDistributionsQuantitative({
      idProcurador: +user_id,
      dtInicio: primeiroDiaMes,
      dtFim: ultimoDiaMes,
    }).then((result) => {
      setDistQuantitative([result?.nuRecebidos, result?.nuFinalizados]);
    });

    getPiecesQuantitative({
      idProcurador: +user_id,
      dtInicio: primeiroDiaMes,
      dtFim: ultimoDiaMes,
    }).then((result) => {
      setPiecesQuantitative([
        result.data?.nuNaoFinalizadas,
        result.data?.nuFinalizadas,
      ]);
    });

    getAccountingQuantitative({
      idProcurador: +user_id,
      dtInicio: primeiroDiaMes,
      dtFim: ultimoDiaMes,
    }).then((result) => {
      setAccountingQuantitative([
        result.data?.nuRespondidas,
        result.data?.nuAguardandoResposta,
      ]);
    });
  }, [user_id]);

  return (
    <S.CardsGrid>
      <GenericCard title={dataFormatada}>
        <S.ContentParagraph className="name">{userName}</S.ContentParagraph>
        <S.ContentParagraph className="job-role">
          {userPerfil}
        </S.ContentParagraph>
        <S.LinkButton to={"/dashboard/gerenciamento/assessores"}>
          Assessores
        </S.LinkButton>
      </GenericCard>

      <GenericCard
        title={"Agenda Semanal"}
        style={{
          gap: "0.5rem",
          width: "max-content",
        }}
      >
        <p
          style={{
            fontSize: "1.4rem",
          }}
        >
          {`${processosVencendoHoje.length} Processos Vencendo Hoje`}
        </p>
        <p
          style={{
            fontSize: "1.4rem",
          }}
        >
          {`${processosVencendoAmanha.length} Processos Vencendo Amanhã`}
        </p>
        <p
          style={{
            fontSize: "1.4rem",
          }}
        >
          {`${processosVencendoNessaSemana.length} Processos Vencendo Nessa Semana`}
        </p>
        <S.Button onClick={() => openModal(modalsID.agenda)}>
          Abrir agenda
        </S.Button>
      </GenericCard>

      <GenericCard title="Atuações do Mês">
        <S.ContentParagraph>
          Distribuições Recebidas: {distQuantitative ? distQuantitative[0] : 0}
        </S.ContentParagraph>
        <S.ContentParagraph>
          Distribuições Concluidas: {distQuantitative ? distQuantitative[1] : 0}
        </S.ContentParagraph>
      </GenericCard>

      <GenericCard title="Peças">
        <S.ContentParagraph>
          Não Finalizada(s): {piecesQuantitative ? piecesQuantitative[0] : 0}
        </S.ContentParagraph>
        <S.ContentParagraph>
          Finalizada(s) No Mês: {piecesQuantitative ? piecesQuantitative[1] : 0}
        </S.ContentParagraph>
      </GenericCard>

      <GenericCard title="Contadoria">
        <S.ContentParagraph>
          Respondida(s) No Mês:{" "}
          {accountingQuantitative ? accountingQuantitative[0] : 0}
        </S.ContentParagraph>
        <S.ContentParagraph>
          Aguardando Resposta(s):{" "}
          {accountingQuantitative ? accountingQuantitative[1] : 0}
        </S.ContentParagraph>
      </GenericCard>
    </S.CardsGrid>
  );
};

export default Cards;

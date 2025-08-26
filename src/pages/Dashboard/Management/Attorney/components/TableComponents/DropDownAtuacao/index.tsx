import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { ProcessoInAction } from "../../../../../../../api/services/attorneys/attorneys.interface";
import { SharedState } from "../../../../../../../context/SharedContext";
import { AlterarRelevancia } from "./components/AlterarRelevancia";
import { AnexosAto } from "./components/AnexosAto";
import { AtribuirAssessor } from "./components/Atribuir Assessor";
import { Despacho } from "./components/Despacho";
import { AlterarPrazo } from "./components/Prazo";
import { Redistribuicao } from "./components/Redistribuicao";
import { RegistrarAudiencia } from "./components/RegistrarAudiencia";
import { RegistrarObservacao } from "./components/RegistroObservacao";
import * as S from "./styled";

interface DropDownAtuacaoProps {
  data: ProcessoInAction;
}

type KeyStringOpenModal =
  | "DESPACHO"
  | "REDISTRIBUICAO"
  | "ATRIBUIR-ASSESSOR"
  | "ALTERAR-PRAZO"
  | "ALTERAR-RELEVANCIA"
  | "REGISTRAR-AUDIENCIA"
  | "REGISTRAR-OBSEVACAO"
  | "ANEXOS-ATO"
  | false;

export const DropDownAtuacao = ({ data }: DropDownAtuacaoProps) => {
  const [keyString, setKeyString] = useState<KeyStringOpenModal>(false);
  const navigate = useNavigate();
  const { user, selectedUser } = SharedState();

  const handleMainButtonClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    //
    //if middle button is clicked
    console.log(event.button);
    if (event.button === 1) {
      /*  window.open(
                `/dashboard/procurador/cadastro-peca/${data.id}`,
                "_blank"
            ); */
    } else {
      navigate(`/dashboard/procurador/cadastro-peca/${data.id}`);
    }
  };

  return (
    <>
      {keyString === "DESPACHO" && (
        <Despacho
          idAto={data.id}
          txNumeroProcesso={data.txNumero}
          keyStateOpenModal={keyString}
          keyString={"DESPACHO"}
          setKeyStateOpenModal={setKeyString}
        />
      )}
      {keyString === "REDISTRIBUICAO" && (
        <Redistribuicao
          idAto={data.id}
          txNumeroProcesso={data.txNumero}
          keyStateOpenModal={keyString}
          keyString={"REDISTRIBUICAO"}
          setKeyStateOpenModal={setKeyString}
        />
      )}

      {keyString === "ATRIBUIR-ASSESSOR" ? (
        <AtribuirAssessor
          idAto={data.id}
          txNumeroProcesso={data.txNumero}
          idDistribuicao={data.idDistribuicao}
          keyStateOpenModal={keyString}
          keyString={"ATRIBUIR-ASSESSOR"}
          setKeyStateOpenModal={setKeyString}
        />
      ) : (
        ""
      )}

      {keyString === "ALTERAR-PRAZO" && (
        <AlterarPrazo
          idAto={data.id}
          dtPrazo={data.dtPrazo}
          txNumeroProcesso={data.txNumero}
          keyStateOpenModal={keyString}
          keyString={"ALTERAR-PRAZO"}
          setKeyStateOpenModal={setKeyString}
        />
      )}
      {keyString === "ALTERAR-RELEVANCIA" && (
        <AlterarRelevancia
          idAto={data.id}
          idProcesso={data.idProcesso}
          txRelevancia={data.txRelevancia}
          txNumeroProcesso={data.txNumero}
          keyStateOpenModal={keyString}
          keyString={"ALTERAR-RELEVANCIA"}
          setKeyStateOpenModal={setKeyString}
        />
      )}
      {keyString === "REGISTRAR-AUDIENCIA" && (
        <RegistrarAudiencia
          idAto={data.id}
          txNumeroProcesso={data.txNumero}
          keyStateOpenModal={keyString}
          keyString={"REGISTRAR-AUDIENCIA"}
          setKeyStateOpenModal={setKeyString}
        />
      )}
      {keyString === "REGISTRAR-OBSEVACAO" && (
        <RegistrarObservacao
          idAto={data.id}
          txNumeroProcesso={data.txNumero}
          keyStateOpenModal={keyString}
          keyString={"REGISTRAR-OBSEVACAO"}
          setKeyStateOpenModal={setKeyString}
        />
      )}
      {keyString === "ANEXOS-ATO" && (
        <AnexosAto
          idAto={data.id}
          txNumeroProcesso={data.txNumero}
          keyStateOpenModal={keyString}
          keyString={"ANEXOS-ATO"}
          setKeyStateOpenModal={setKeyString}
        />
      )}

      <Dropdown
        style={{ height: "4rem", borderRadius: "0.5rem" }}
        autoClose="outside"
        as={ButtonGroup}
      >
        <S.MainDropDownButton
          to={`/dashboard/procurador/cadastro-peca/${data.id}`}
          style={{ whiteSpace: "nowrap" }}
        >
          <p
            style={{
              fontSize: "1.3rem",
              margin: "0",
              padding: "10px",
            }}
          >
            Peça
          </p>
        </S.MainDropDownButton>

        <S.DropdownToggle split id="dropdown-split-basic" />

        <Dropdown.Menu>
          <S.DropDownItem onClick={() => setKeyString("DESPACHO")}>
            Despacho
          </S.DropDownItem>
          <Dropdown.Divider />
          <S.DropDownItem>
            <S.ContainerLink to={`/dashboard/dcje/ficha-processual/${data.id}`}>
              Ficha DCJE
            </S.ContainerLink>
          </S.DropDownItem>
          <S.DropDownItem onClick={() => setKeyString("REDISTRIBUICAO")}>
            Pedido de redistribuição
          </S.DropDownItem>

          <S.DropDownItem
            onClick={() => {
              setKeyString("ATRIBUIR-ASSESSOR");
            }}
          >
            Atribuir assessor
          </S.DropDownItem>

          <Dropdown.Divider />
          <S.DropDownItem onClick={() => setKeyString("ALTERAR-PRAZO")}>
            Alterar prazo
          </S.DropDownItem>
          <S.DropDownItem onClick={() => setKeyString("ALTERAR-RELEVANCIA")}>
            Alterar relevância
          </S.DropDownItem>
          <S.DropDownItem onClick={() => setKeyString("REGISTRAR-AUDIENCIA")}>
            Registrar audiência
          </S.DropDownItem>
          <S.DropDownItem onClick={() => setKeyString("REGISTRAR-OBSEVACAO")}>
            Registrar observação
          </S.DropDownItem>
          <S.DropDownItem onClick={() => setKeyString("ANEXOS-ATO")}>
            Anexos ato
          </S.DropDownItem>
          {/* <Dropdown.Divider />
          <S.DropDownItem>Alterar nível de sigilo</S.DropDownItem>
          <S.DropDownItem>
            <S.ContainerLink
              to={`/dashboard/processo/adicionar-usuario-ao-processo-sigiloso/${data.id}`}
            >
              Permissão de sigilo
            </S.ContainerLink>
          </S.DropDownItem> */}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

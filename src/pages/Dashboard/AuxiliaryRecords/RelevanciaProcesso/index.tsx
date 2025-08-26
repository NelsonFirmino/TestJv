import { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { PageTitle } from "../../../../components/TitlePage";
import {
    ContainerSwitchCards,
    SwitchCard
} from "../../Management/Attorney/styled";
import Assuntos from "./Assuntos";
import Classes from "./Classes";
import NomePartes from "./NomePartes";
import * as S from "./styled";
import Valores from "./Valores";

export interface RelevanciaI {
    idRelevancia: string;
    txRelevancia: string;
    nuNivel: number;
}

export interface JustificativaI {
    id: number;
    txRelevancia: string;
    idUsuarioCadastro: number;
}

const RelevanciaProcesso = () => {
    const [selectedSection, setSelectedSection] = useState(0);
    const [relevancias, setRelevancias] = useState<RelevanciaI[]>([]);
    const [justificativas, setJustificativas] = useState<JustificativaI[]>([]);

    const fillRelevancias = () =>
        new Promise(async (resolve, reject) => {
            // string url = string.Format("{0}/v1.0/Processos/relevancias", URL);
            try {
                const res = await axiosInstance.get(
                    "/api/v1.0/Processos/relevancias"
                );

                if (res.data.message === "NotFound") {
                } else setRelevancias(res.data.data);
            } catch (error) {}
        });

    const fillJustificativas = () =>
        new Promise(async (resolve, reject) => {
            try {
                const res = await axiosInstance.get(
                    "/api/v1.0/Relevancias?page=1&pageSize=100"
                );

                if (res.data.message === "NotFound") {
                } else setJustificativas(res.data.data);
            } catch (error) {
                console.error(error);
            }
        });

    useEffect(() => {
        fillRelevancias();
        fillJustificativas();
    }, []);

    return (
        <div>
            <PageTitle pageTitle="REGRAS PARA RELEVANCIA DOS PROCESSOS" />
            <S.Container>
                <ContainerSwitchCards
                    style={{
                        margin: 0
                    }}
                >
                    <SwitchCard
                        isSelected={selectedSection === 0}
                        onClick={() => {
                            setSelectedSection(0);
                        }}
                    >
                        Nome das Partes
                    </SwitchCard>
                    <SwitchCard
                        isSelected={selectedSection === 1}
                        onClick={() => {
                            setSelectedSection(1);
                        }}
                    >
                        Classes
                    </SwitchCard>
                    <SwitchCard
                        isSelected={selectedSection === 2}
                        onClick={() => {
                            setSelectedSection(2);
                        }}
                    >
                        Assuntos
                    </SwitchCard>
                    <SwitchCard
                        isSelected={selectedSection === 3}
                        onClick={() => {
                            setSelectedSection(3);
                        }}
                    >
                        Valores
                    </SwitchCard>
                </ContainerSwitchCards>

                {/*      <S.ButtonsContainer>
          <S.ButtonContainer
            isSelected={selectedSection === 0}
            onClick={() => setSelectedSection(0)}
          >
            <S.ButtonLabel>Nome das Partes</S.ButtonLabel>
          </S.ButtonContainer>
          <S.ButtonContainer
            isSelected={selectedSection === 1}
            onClick={() => setSelectedSection(1)}
          >
            <S.ButtonLabel>Classes</S.ButtonLabel>
          </S.ButtonContainer>
          <S.ButtonContainer
            isSelected={selectedSection === 2}
            onClick={() => setSelectedSection(2)}
          >
            <S.ButtonLabel>Assuntos </S.ButtonLabel>
          </S.ButtonContainer>
          <S.ButtonContainer
            isSelected={selectedSection === 3}
            onClick={() => setSelectedSection(3)}
          >
            <S.ButtonLabel>Valores</S.ButtonLabel>
          </S.ButtonContainer>
        </S.ButtonsContainer> */}

                {selectedSection === 0 ? (
                    <NomePartes
                        relevancias={relevancias}
                        justificativas={justificativas}
                    />
                ) : selectedSection === 1 ? (
                    <Classes
                        justificativas={justificativas}
                        relevancias={relevancias}
                    />
                ) : selectedSection === 2 ? (
                    <Assuntos
                        justificativas={justificativas}
                        relevancias={relevancias}
                    />
                ) : selectedSection === 3 ? (
                    <Valores
                        justificativas={justificativas}
                        relevancias={relevancias}
                    />
                ) : null}
            </S.Container>
        </div>
    );
};

export default RelevanciaProcesso;

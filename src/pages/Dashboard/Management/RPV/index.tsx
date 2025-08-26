import { useState } from "react";
import { RPVProcess } from "../../../../api/services/dashboardRPV/dashboardRPV.interface";
import BuscarReq from "./components/BuscarReq";
import Modals from "./Modals";
import * as S from "./styled";
import RPVTables from "./Tables";

const RPV = () => {
    const [assunto, setAssunto] = useState<string>();
    const [numeroFormatado, setTxNumeroFormatado] = useState<string>();
    const [dtDistribuicao, setDtDistribuicao] = useState<string>();
    const [modalOpen, setModalOpen] = useState(false);
    const [solicitarRedisModal, setSolicitarRedisModal] = useState(false);
    const [solicitarDespachoModal, setSolicitarDespachoModal] = useState(false);
    const [currentSelected, setCurrentSelected] = useState<RPVProcess>();
    const [showingTable, setShowingTable] = useState(0);

    return (
        <S.Wrapper>
            <S.Row>
                <S.Section>
                    <S.FlagContainer>
                        <S.Flag>Dashboard RPV</S.Flag>
                    </S.FlagContainer>
                </S.Section>
            </S.Row>

            <Modals
                setSolicitarRedisModal={setSolicitarRedisModal}
                currentSelected={currentSelected}
                modalOpen={modalOpen}
                solicitarRedisModal={solicitarRedisModal}
                setModalOpen={setModalOpen}
                solicitarDespachoModal={solicitarDespachoModal}
                setSolicitarDespachoModal={setSolicitarDespachoModal}
            />

            {showingTable === 0 && (
                <BuscarReq
                    setAssunto={setAssunto}
                    setDtDistribuicao={setDtDistribuicao}
                    setTxNumeroFormatado={setTxNumeroFormatado}
                />
            )}

            <RPVTables
                setSolicitarRedisModal={setSolicitarRedisModal}
                setShowingTable={setShowingTable}
                setModalOpen={setModalOpen}
                setCurrentSelected={setCurrentSelected}
                showingTable={showingTable}
                assunto={assunto}
                numeroFormatado={numeroFormatado}
                dtDistribuicao={dtDistribuicao}
                solicitarDespachoModal={solicitarDespachoModal}
                setSolicitarDespachoModal={setSolicitarDespachoModal}
            />
        </S.Wrapper>
    );
};

export default RPV;

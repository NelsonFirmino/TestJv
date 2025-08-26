import { useEffect, useState } from "react";
import { BaseModal } from "../../../../../../components/BaseModal";
import JvrisLoading from "../../../../../../components/JvrisLoading";
import { openOctetStreamInNewTab } from "../../../../../../utils/openOctetStreamInNewTab.util";
import { getPatriAnexos } from "../../apiHooks/usePatrimonios";
import { PatrimonioI } from "../../interfaces";
import * as S from "../../styled";
import { EPProvider } from "./context";
import EPApoio from "./Sections/Apoio";
import EPCartoriais from "./Sections/Cartoriais";
import EPEndereco from "./Sections/Endereco";
import EPImoveis from "./Sections/Imovel";

interface ModalProps {
    isOpenModal: boolean;
    setOpenModal: (value: boolean) => void;
    clikedData?: PatrimonioI;
}
const VisuPatrimonios = ({
    clikedData,
    isOpenModal,
    setOpenModal
}: ModalProps) => {
    const [anexos, setAnexos] = useState<any[]>([]);
    const [loadPatrimonioAnexos, setLoadPatrimonioAnexos] = useState(true);
    useEffect(() => {
        if (!isOpenModal) return;
        getPatriAnexos(clikedData.id)
            .then((data) => {
                setAnexos(data.data);
                setLoadPatrimonioAnexos(false);
            })
            .catch((error) => {
                setLoadPatrimonioAnexos(false);
            });
    }, [isOpenModal]);
    return (
        <BaseModal
            title={"Visualizar Patrimônio"}
            isOpenModal={isOpenModal}
            setOpenModal={setOpenModal}
            containerStyle={{
                minWidth: "90vw",
                minHeight: "90vh"
            }}
            onClose={() => {
                setLoadPatrimonioAnexos(true);
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}
            >
                <S.AnexoSectionWrapper>
                    <S.TitleSectionWrapper>
                        <S.TitleSection>Anexos</S.TitleSection>
                        <JvrisLoading
                            loading={loadPatrimonioAnexos}
                            size="very-small"
                        />
                    </S.TitleSectionWrapper>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px"
                        }}
                    >
                        {anexos?.map((anexo, index) => (
                            <S.AnexoWrapper
                                key={index}
                                onClick={() => {
                                    openOctetStreamInNewTab(
                                        anexo.file_stream,
                                        anexo.name
                                    );
                                }}
                            >
                                <S.Label style={{ cursor: "pointer" }}>
                                    {anexo.name}
                                </S.Label>
                            </S.AnexoWrapper>
                        ))}
                    </div>
                </S.AnexoSectionWrapper>

                <EPProvider idPatrimonio={clikedData?.id.toString()}>
                    <EPImoveis />
                    <EPEndereco />
                    <EPApoio />
                    <EPCartoriais />
                </EPProvider>
            </div>
        </BaseModal>
    );
};

export default VisuPatrimonios;

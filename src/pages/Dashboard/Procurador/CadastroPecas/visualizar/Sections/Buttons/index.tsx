import { useParams } from "react-router";
import { HotToastSucess } from "../../../../../../../components/HotToastFuncs";
import { InputLoader } from "../../../../../../../components/InputLoader";
import { useEditorContext } from "../../../context/EditorContext";
import { usePecasContext } from "../../../context/PecasContext";
import * as S from "../../../styled";

const ButtonsSection = () => {
    const { updateModelo, modelo } = usePecasContext();
    const { text, loadDocx } = useEditorContext();
    const { idModelo } = useParams();
    return (
        <S.ButtonsWrapper>
            <S.ButtonLabel htmlFor="LoadDocxInput" isSave>
                Carregar Arquivo de Texto
            </S.ButtonLabel>

            <S.Button
                onClick={() => {
                    if (idModelo) {
                        updateModelo({
                            ...modelo,
                            id: parseInt(idModelo),
                            txModeloPeca: text
                        })
                            .then(() => {
                                HotToastSucess(
                                    "Modelo atualizado com sucesso!"
                                );
                            })
                            .catch(() => {
                                HotToastSucess("Erro ao atualizar modelo!");
                            });
                    }
                }}
                isSave
            >
                Salvar como modelo
            </S.Button>

            <InputLoader id="LoadDocxInput" OnExecute={loadDocx} />
        </S.ButtonsWrapper>
    );
};

export default ButtonsSection;

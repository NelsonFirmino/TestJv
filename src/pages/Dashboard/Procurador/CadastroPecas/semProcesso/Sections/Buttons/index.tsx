import { InputLoader } from "../../../../../../../components/InputLoader";
import { useEditorContext } from "../../../context/EditorContext";
import { usePecasContext } from "../../../context/PecasContext";
import * as S from "../../../styled";

const ButtonsSection = () => {
    const { SalvarComoModelo } = usePecasContext();
    const { text, loadDocx } = useEditorContext();

    return (
        <S.ButtonsWrapper>
            <S.ButtonLabel htmlFor="LoadDocxInput" isSave>
                Carregar Arquivo de Texto
            </S.ButtonLabel>

            <S.Button onClick={() => SalvarComoModelo(text)} isSave>
                Salvar modelo
            </S.Button>

            <InputLoader id="LoadDocxInput" OnExecute={loadDocx} />
        </S.ButtonsWrapper>
    );
};

export default ButtonsSection;

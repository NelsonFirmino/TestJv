import { useEditorContext } from "../../../context/EditorContext";
import * as S from "../../../styled";

const DocEditor = () => {
    const { updateText, text } = useEditorContext();

    return (
        <S.DataWrapper>
            <S.TextEditor
                loadingDocx={text == undefined}
                onChange={(content) => updateText(content)}
                value={text}
            />
        </S.DataWrapper>
    );
};

export default DocEditor;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import JvrisLoading from "../../../../../../../components/JvrisLoading";
import { useEditorContext } from "../../../context/EditorContext";
import { usePecasContext } from "../../../context/PecasContext";
import * as S from "../../../styled";

const InputsSection = () => {
    const {
        modelos,
        updateCurrModel,
        prepareModelList,
        prepareModelListUser,
        updateModelTypeFilterValue,
        modelTypeFilter,
        prepareModelTypeList,
        getModeloById,
        modelTitle,
        tiposProcessoPJE,
        updateTitle,
        currModel,
        loadingModelosPecas,
        loadingTiposProcessoPJE
    } = usePecasContext();
    const { updateText } = useEditorContext();

    useEffect(() => {
        if (currModel) updateText(currModel?.txModeloPeca);
    }, [currModel]);

    const { idModelo } = useParams();

    useEffect(() => {
        if (idModelo) {
            getModeloById({ id: parseInt(idModelo) }).then((m) => {
                updateText(m?.txModeloPeca);
                updateCurrModel(m);
            });
        }
    }, [idModelo]);

    return (
        <S.DatasWrapper>
            <S.DataWrapper>
                <S.DataLabel>Todos os Modelos</S.DataLabel>
                <S.SelectData
                    isDisabled={modelos?.length == 0}
                    onChange={async (e: any) => {
                        let model = undefined;
                        if (e.value == -1) {
                            updateCurrModel(undefined);
                            updateText("");
                        } else {
                            if (modelos)
                                model = modelos.find(
                                    (model) => model.id === e.value
                                );

                            if (model) {
                                console.log(model.id);
                                updateText(undefined);
                                const m = await getModeloById({
                                    id: model.id
                                });
                                updateText(m?.txModeloPeca);
                                updateCurrModel(m);
                            }
                        }
                    }}
                    options={prepareModelList(modelos)}
                />
                {loadingModelosPecas && (
                    <JvrisLoading size="small" loading={loadingModelosPecas} />
                )}
            </S.DataWrapper>
            <S.DataWrapper>
                <S.DataLabel>Meus Modelos</S.DataLabel>
                <S.SelectData
                    isDisabled={modelos?.length == 0}
                    onChange={async (e: any) => {
                        let model = undefined;
                        if (e.value == -1) {
                            updateCurrModel(undefined);
                            updateText("");
                        } else {
                            if (modelos)
                                model = modelos.find(
                                    (model) => model.id === e.value
                                );

                            if (model) {
                                console.log(model.id);
                                updateText(undefined);
                                const m = await getModeloById({
                                    id: model.id
                                });
                                updateText(m?.txModeloPeca);
                                updateCurrModel(m);
                            }
                        }
                    }}
                    options={prepareModelListUser(modelos)}
                />
                {loadingModelosPecas && (
                    <JvrisLoading size="small" loading={loadingModelosPecas} />
                )}
            </S.DataWrapper>
            <S.DataWrapper>
                <S.DataLabel>Tipo de documento</S.DataLabel>
                <S.InputWrapper>
                    <S.SelectData
                        value={
                            modelTypeFilter.value != -1
                                ? modelTypeFilter
                                : undefined
                        }
                        onInputChange={(e) => {
                            if (e.length) {
                                updateModelTypeFilterValue({
                                    value: 0,
                                    label: e
                                });
                            }
                        }}
                        onChange={(e) => {
                            if (e) {
                                updateModelTypeFilterValue(e);
                                if (e.value != -1) updateTitle(e.label);
                            }
                        }}
                        options={prepareModelTypeList(tiposProcessoPJE)}
                    />
                    {loadingTiposProcessoPJE && (
                        <JvrisLoading
                            size="small"
                            loading={loadingTiposProcessoPJE}
                        />
                    )}
                </S.InputWrapper>
            </S.DataWrapper>

            <S.DataWrapper>
                <S.DataLabel>Titulo do documento</S.DataLabel>
                <S.TitleInput
                    value={modelTitle}
                    onChange={(e) => {
                        updateTitle(e.target.value);
                    }}
                />
            </S.DataWrapper>
        </S.DatasWrapper>
    );
};

export default InputsSection;

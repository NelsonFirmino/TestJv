import * as S from "../../../styled";
import { usePecasContext } from "../../../context/PecasContext";
import JvrisLoading from "../../../../../../../components/JvrisLoading";

const InputsSection = () => {
    const {
        updateModelTypeFilterValue,
        modelTypeFilter,
        prepareModelTypeList,
        modelTitle,
        tiposProcessoPJE,
        updateTitle,
        loadingTiposProcessoPJE
    } = usePecasContext();

    return (
        <S.DatasWrapper>
            <S.DataWrapper>
                <S.DataLabel>Titulo do documento</S.DataLabel>
                <S.TitleInput
                    value={modelTitle}
                    onChange={(e) => {
                        updateTitle(e.target.value);
                    }}
                />
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
        </S.DatasWrapper>
    );
};

export default InputsSection;

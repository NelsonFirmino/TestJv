import { Controller } from "react-hook-form";
import * as S from "../../../../styled";
import useEPContext from "../../../context";

const Outorgantes = () => {
    const {
        form,
        patrimonio: { data: patrimonio, isLoading: isLoadingPatrimonio }
    } = useEPContext();
    /* const [multiValue, setMultiValue] = useState([]);
    const filterOptions = [
        { value: "foo", label: "Foo" },
        { value: "bar", label: "Bar" },
        { value: "bat", label: "Bat" }
    ]; */
    return (
        <S.ContainerField>
            <S.FieldTitle>
                Outorgante(s): *
                <S.InfoContainerField>
                    <S.InfoIcon />
                    <S.InfoText>Outorgante(s).</S.InfoText>
                </S.InfoContainerField>
            </S.FieldTitle>
            <Controller
                name="dadosImovel.outorgante"
                control={form.control}
                render={({ field }) => {
                    const options = patrimonio?.outorgas.map((data) => ({
                        value: data.id,
                        label: data.txNome
                    }));
                    const outorga = patrimonio?.outorgas
                        .filter((data) => data.isOutorgante)
                        .map((data) => ({
                            value: data.id,
                            label: data.txNome
                        }));

                    return (
                        <S.CustomSelect
                            {...field}
                            required={true}
                            placeholder="Selecione o outorgante"
                            options={options}
                            isMulti
                            value={outorga}
                            isClearable={false}
                            isDisabled={isLoadingPatrimonio}
                            isLoading={isLoadingPatrimonio}
                        />
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Outorgantes;

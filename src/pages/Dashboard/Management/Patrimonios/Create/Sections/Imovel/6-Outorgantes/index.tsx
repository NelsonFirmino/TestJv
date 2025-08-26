import { Minus, Plus } from "phosphor-react";
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
            <Controller
                name="dadosImovel.outorgante"
                control={form.control}
                render={({ field }) => {
                    console.log("field", field);
                    return (
                        <>
                            <S.FieldTitle>
                                Outorgante(s): *
                                <S.InfoContainerField>
                                    <S.InfoIcon />
                                    <S.InfoText>Outorgante(s).</S.InfoText>
                                </S.InfoContainerField>
                                <S.IconWrapper2>
                                    <Plus
                                        size={14}
                                        onClick={() => {
                                            field.onChange([
                                                ...(field.value || []),
                                                ""
                                            ]);
                                        }}
                                    />
                                </S.IconWrapper2>
                            </S.FieldTitle>
                            <div
                                style={{
                                    //3 columns
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gap: "10px"
                                }}
                            >
                                {field.value?.map((item, index) => (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            border: "1px solid #ccc",
                                            padding: "10px",
                                            borderRadius: "10px"
                                        }}
                                    >
                                        <S.TextInput
                                            key={index}
                                            error={
                                                !!form.errors.dadosImovel
                                                    ?.outorgante
                                            }
                                            id={`dadosImovel.outorgante[${index}]`}
                                            placeholder="Outorgante"
                                            type="text"
                                            value={item}
                                            onChange={(event) => {
                                                const values = [...field.value];
                                                values[index] =
                                                    event.target.value;
                                                field.onChange(values);
                                            }}
                                        />
                                        <Minus
                                            size={14}
                                            onClick={() => {
                                                const values = [...field.value];
                                                values.splice(index, 1);
                                                console.log("values", values);
                                                console.log("field", field);
                                                console.log("index", index);
                                                field.onChange(values);
                                            }}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    );
                }}
            />
        </S.ContainerField>
    );
};

export default Outorgantes;

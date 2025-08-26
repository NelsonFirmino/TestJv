import { Circle } from "phosphor-react";
import { CircleColorI } from "./interface";
import { useEffect, useState } from "react";
import { UrgenciesColors, UrgenciesOptions } from "../../Helpers/consts";

const CustomRelevanciaAto = (props: CircleColorI) => {
    const [backColor, setBackColor] = useState<string>("white");

    useEffect(() => {
        switch (props.text) {
            case UrgenciesOptions.Normal:
                setBackColor(UrgenciesColors.Normal);
                break;
            case UrgenciesOptions.Urgente:
                setBackColor(UrgenciesColors.Urgente);
                break;
            case UrgenciesOptions.Importante:
                setBackColor(UrgenciesColors.Importante);
                break;
            case UrgenciesOptions.Valor_expressivo1:
                setBackColor(UrgenciesColors.Valor_expressivo);
                break;
            case UrgenciesOptions.Valor_expressivo2:
                setBackColor(UrgenciesColors.Valor_expressivo);
                break;
            case UrgenciesOptions.Sustentacao_oral:
                setBackColor(UrgenciesColors.Sustentacao_oral);
                break;
        }
    }, [props.text]);

    return (
        props.text == UrgenciesOptions.Importante ?
            <img
                src={require('./icons/ponto-de-exclamacao-em-um-circulo.png')}
                title="Importante"
                style={{ width: "1.1rem", height: "1.1rem", marginRight: "0.4rem" }}
            />
            : props.text == UrgenciesOptions.Valor_expressivo1 || props.text == UrgenciesOptions.Valor_expressivo2 ?
                <img
                    src={require('./icons/cifrao.png')}
                    title="Valor Expressivo"
                    style={{ width: "1.4rem", height: "1.4rem", }}
                />
                : props.text == UrgenciesOptions.Sustentacao_oral ?
                    <img
                        src={require('./icons/sustentacao_oral_fundo_transparente_1.png')}
                        title="Sustentacao oral"
                        style={{ width: "1.4rem", height: "1.4rem", }}
                    />
                    : <Circle
                        alt={props.text}
                        size={14}
                        weight={props.text === "Normal" ? "bold" : "fill"}
                        color={backColor}
                    />
    );
};

export default CustomRelevanciaAto;

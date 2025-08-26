import toast from "react-hot-toast";
import theme from "../../globalStyle/theme";

export function HotToastSucess(msg?: string) {
    toast(msg ?? "Sucesso", {
        //icon: "👏",
        style: {
            borderRadius: "2px",
            background: theme.colors.jvrisAqua,
            color: "#fff",
            fontSize: "30px"
        }
    });
}

export function HotToastError(msg?: string) {
    toast(msg ?? "Erro", {
        //icon: "👏",
        style: {
            borderRadius: "2px",
            background: theme.colors.softRed,
            color: "#fff",
            fontSize: "30px"
        }
    });
}

export function HotToastWarning(msg?: string) {
    toast(msg ?? "Aviso", {
        //icon: "👏",
        style: {
            borderRadius: "2px",
            background: theme.colors.softYellow,
            color: "#fff",
            fontSize: "30px"
        }
    });
}

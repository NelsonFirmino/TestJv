import { StyleSheet } from "@react-pdf/renderer";
import theme from "../../../../globalStyle/theme";

export const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10
    },
    section: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        border: 0.5,
        borderColor: "black"
    },
    container: {
        flex: 1
        //fontSize: 4
        /* textAlign: "center",
        border: 0.5,
        borderColor: "black" */
    },
    tableHeader: {
        backgroundColor: theme.colors.jvrisAqua,
        color: "white",
        fontWeight: "bold",
        padding: 5
    },
    Row: {
        borderColor: "black",
        fontWeight: "bold",
        padding: 5
        //borderBottom: 0.5
    },
    RowContainer: {
        display: "flex",
        flexDirection: "row",
        borderBottom: 0.5
    }
});

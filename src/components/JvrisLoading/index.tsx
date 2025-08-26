import ReactLoading from "react-loading";
import theme from "../../globalStyle/theme";

interface TableLoadingI {
    loading: boolean;
    size?: "very-small" | "small" | "medium" | "large";
}

const JvrisLoading = (props: TableLoadingI) => {
    const { loading } = props;
    const height =
        props.size == "very-small"
            ? "2rem"
            : props.size == "small"
            ? "4rem"
            : props.size == "medium"
            ? "8rem"
            : "12rem";
    const width =
        props.size == "very-small"
            ? "2rem"
            : props.size == "small"
            ? "4rem"
            : props.size == "medium"
            ? "8rem"
            : "12rem";
    return (
        loading && (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ReactLoading
                    type="bars"
                    color={theme.colors.jvrisAqua}
                    height={height}
                    width={width}
                />
            </div>
        )
    );
};

export default JvrisLoading;

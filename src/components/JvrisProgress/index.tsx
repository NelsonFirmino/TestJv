import theme from "../../globalStyle/theme";
import { useEffect, useState } from "react";

const JvrisProgress = ({ progress }: { progress: number }) => {
  useEffect(() => {}, [progress]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${progress}%`,
        height: "10px",
        backgroundColor: theme.colors.jvrisAqua,
        borderRadius: "100px",
      }}
    ></div>
  );
};

export default JvrisProgress;

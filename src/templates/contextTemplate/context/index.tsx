import React from "react";
import { SpecificProvider } from "./SpecificContext";

interface PropsI {
    children: React.ReactNode;
}

const GeneralContext = (props: PropsI) => {
    const { children } = props;
    return <SpecificProvider>{children}</SpecificProvider>;
};

export default GeneralContext;

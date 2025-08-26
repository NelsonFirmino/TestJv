import React, { useState, createContext, useEffect, useContext } from "react";

const SpecificContext = createContext<any>({} as any);

export const SpecificProvider = (props: any) => {
    return (
        <SpecificContext.Provider value={{} as any}>
            {props.children}
        </SpecificContext.Provider>
    );
};

export const useSpecificContext = () => {
    const context = useContext(SpecificContext);
    if (!context) {
        throw new Error(
            "useSpecificContext must be used within a SpecificProvider"
        );
    }
    return context;
};

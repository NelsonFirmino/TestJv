import { useState, createContext, useContext } from "react";
import { modalsID } from "./modalsID";
import { ModalsContextI } from "./interface";
import { useTablesContext } from "../TablesContext";

const ModalsContext = createContext<ModalsContextI>({} as any);

export const ModalsProvider = (props: any) => {
  const [currModal, setCurrModal] = useState<string>(modalsID.none);
  const { managing } = useTablesContext();
  const [shouldReset, setShouldReset] = useState<boolean>(false);

  function closeModal(reset?: boolean) {
    // if (currModal === modalsID.none) throw new Error("currModal is none");
    (shouldReset || reset) && managing.reSeed();
    setCurrModal(modalsID.none);
    setShouldReset(false);
  }

  function openModal(modalID: string) {
    setShouldReset(false);
    setCurrModal(modalID);
  }

  function resetModal() {
    setShouldReset(false);
    setCurrModal(modalsID.none);
  }

  function isModalOpen(modalID: string) {
    return currModal === modalID;
  }

  return (
    <ModalsContext.Provider
      value={{
        openModal,
        closeModal,
        resetModal,
        currModal,
        isModalOpen,
        shouldReset,
        setShouldReset
      }}
    >
      {props.children}
    </ModalsContext.Provider>
  );
};

export const useModalsContext = () => {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error("useModalsContext must be used within a ModalsProvider");
  }
  return context;
};

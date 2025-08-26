import { useEffect, useState } from "react";
import { SecretariasI, createSubOptI } from "./interfaces";
import {
  JvrisClicableButtonI,
  subOptionsI,
} from "../../../../../../components/JvrisTable/components/ClicableButton/ClicableButton.interface";
import { useOperadorContext } from "../../context";
import axiosInstance from "../../../../../../api/axiosInstance";
import jwtDecode from "jwt-decode";
import { createSubOptions } from "../utils";

const usePPC = () => {
  const {
    reload,
    reloadAguardandoCiencia,
    AtosAguardandoCiencia,
    setOpenEditarTriagem,
    setEditarTriagemData,
    setProcessoData,
    setOpenTomarCienciaModal,
    setTomarCienciaNoJVRIS,
    openEditarTriagem
  } = useOperadorContext();

  const tableClicable: JvrisClicableButtonI = {
    text: "! Tomar Ciência",
    onClick: async (index) => {
      setProcessoData(AtosAguardandoCiencia.rawData[index]);
      setOpenTomarCienciaModal(true);
      setTomarCienciaNoJVRIS(false);
    },
    subOptions: createSubOptions([
      [
        {
          onClick: (index) => {
            setOpenEditarTriagem(true);
            setEditarTriagemData({
              id: AtosAguardandoCiencia.rawData[index].id,
              idAto: AtosAguardandoCiencia.rawData[index].idAto,
              txNumeroFormatado:
                AtosAguardandoCiencia.rawData[index].txNumeroFormatado,
              nuCodigoAviso: AtosAguardandoCiencia.rawData[index].nuCodigoAviso,
              txClasse: AtosAguardandoCiencia.rawData[index].txClasse,
              dtCiencia: AtosAguardandoCiencia.rawData[index].dtCiencia,
              idEspecializada:
                AtosAguardandoCiencia.rawData[index].idEspecializada,
            } as any);
            setProcessoData(AtosAguardandoCiencia.rawData[index]);
          },
          option: "Editar Triagem",
        },
        {
          onClick: (index) => {
            setProcessoData(AtosAguardandoCiencia.rawData[index]);
            setOpenTomarCienciaModal(true);
            setTomarCienciaNoJVRIS(true);
          },
          option: "Tomar Ciencia no JVRIS",
        },
      ],
    ]),
  };

  return {
    tableClicable,
  };
};

export default usePPC;

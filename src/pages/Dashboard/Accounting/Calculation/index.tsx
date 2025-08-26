import { useState } from "react";
import DadosCalculo from "../DadosCalculo";
import BaseDeCalculo from "./BaseDeCalculo";
import { Calculos } from "./Calculos";
import PlanilhaDeCalculo from "./PlanilhaDeCalculo";
import RespostaContador from "./RespostaContador";
import ResultadoDoCalculo from "./ResultadoDoCalculo";
import { CalculosProvider } from "./context/CalculosContext";

function Calculation() {
  const [page, setPage] = useState<
    | "LISTACALC"
    | "DADOSCALC"
    | "BASECALC"
    | "PLANILHACALC"
    | "RESULTADOCALC"
    | "RESPOSTACALC"
  >("LISTACALC");

  const handlePage = (pageName: string) => {
    switch (pageName) {
      case "LISTACALC":
        return <Calculos pageName="LISTACALC" setPageName={setPage} />;
        break;
      case "DADOSCALC":
        return <DadosCalculo pageName="DADOSCALC" setPageName={setPage} />;
        break;
      case "BASECALC":
        return <BaseDeCalculo pageName="BASECALC" setPageName={setPage} />;
        break;
      case "PLANILHACALC":
        return (
          <PlanilhaDeCalculo pageName="PLANILHACALC" setPageName={setPage} />
        );
        break;
      case "RESULTADOCALC":
        return (
          <ResultadoDoCalculo pageName="RESULTADOCALC" setPageName={setPage} />
        );
        break;
      case "RESPOSTACALC":
        return (
          <RespostaContador pageName="RESPOSTACALC" setPageName={setPage} />
        );
      default:
        return <Calculos pageName="LISTACALC" setPageName={setPage} />;
        break;
    }
  };

  return <CalculosProvider>{handlePage(page)}</CalculosProvider>;
}

export default Calculation;

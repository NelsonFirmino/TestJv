import { JvrisTableColumnNDataI } from "../JvrisTable.interface";
import CustomCadastro from "../components/CustomCadastro";
import CustomPecaCadastrada from "../components/CustomPecaCadastrada";
import CustomRelevanciaAto from "../components/CustomRelevanciaAto";
import CustomSigilo from "../components/CustomSigilo";
import CustomStatus from "../components/CustomStatus";
import NumProcessOptions from "../components/ProcessoOptions";
import UserIcon from "../components/UserIcon";
import {
  DesignedComponentsI,
  line_attorney_dashnoard_table2I,
  line_attorney_dashnoard_tableI,
} from "./interfaces";

function DesignHandler(design: DesignedComponentsI, value: string) {
  switch (design.name) {
    case "PecaCadastrada":
      return <CustomPecaCadastrada text={value} />;

    case "RelevanciaAto":
      return <CustomRelevanciaAto text={value} color={design?.color} />;

    case "userIcon":
      return <UserIcon text={value} color={design?.color} />;

    case "CustomStatus":
      return <CustomStatus value={parseInt(value)} />;

    case "CustomCadastro":
      return <CustomCadastro cadastro={value} />;

    case "CustomSigilo":
      return <CustomSigilo sigilo={value} />;
  }
}

export function line_attorney_dashnoard_table(
  props: line_attorney_dashnoard_tableI
) {
  const { Body: Cbody, Head: Chead } = props;

  const Line: JvrisTableColumnNDataI[] = [
    Chead && {
      customComponent: (
        <NumProcessOptions
          cadastro={Chead.cadastro}
          numero={Chead.numero}
          tipo={Chead.tipo}
          sigilo={Chead.sigilo}
          grau={Chead.grau}
          copy={Chead.copy}
          inacao={Chead.inacao}
          informacao={Chead.informacao}
          observacao={Chead.observacao}
          redistribuicao={Chead.redistribuicao}
          peca={Chead.peca}
          ficha={Chead.ficha}
        />
      ),
      text: Chead.numero.value.toString(),
    },

    ...Cbody.map((item) => {
      const value = item.value.toString();

      const comp: JvrisTableColumnNDataI = {
        text: value,
        customComponent: item.design ? DesignHandler(item.design, value) : null,
        dataName: item.dataName,
      };
      return comp;
    }),
  ];

  return Line;
}

export function line_attorney_dashnoard_table2(
  props: line_attorney_dashnoard_table2I
) {
  const { Body: Cbody, Head: Chead } = props;

  const Line: JvrisTableColumnNDataI[] = [
    {
      customComponent: Chead.component,
      text: Chead.text,
    },

    ...Cbody.map((item) => {
      const value = item.value.toString();

      const comp: JvrisTableColumnNDataI = {
        text: value,
        customComponent: item.design ? DesignHandler(item.design, value) : null,
        dataName: item.dataName,
      };
      return comp;
    }),
  ];

  return Line;
}

export function line_keys_table(
  data: any[],
  filters?: {
    key: string;
    design?: DesignedComponentsI;
  }[]
) {
  //returns a object of type JvrisTableColumnNDataI[][]
  const keys = filters?.map((filter) => filter.key) ?? Object.keys(data);
  const Lines: JvrisTableColumnNDataI[][] = [];

  data.forEach((item) => {
    const Line: JvrisTableColumnNDataI[] = [];
    keys.forEach((key) => {
      const design = filters?.find((filter) => filter.key == key)?.design;
      const comp: JvrisTableColumnNDataI = {
        text: item[key].toString(),
        customComponent: design
          ? DesignHandler(design, item[key].toString())
          : null,
        dataName: key,
      };
      Line.push(comp);
    });
    Lines.push(Line);
  });

  return Lines;
}

export function adjustFontSize(columns: number) {
  return parseInt(((10 / columns) * 4).toString());
}

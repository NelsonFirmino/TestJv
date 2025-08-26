import { BookmarkSimple } from "phosphor-react";
import theme from "../../../../globalStyle/theme";
import { PecaCadastrada } from "../../Helpers/consts";
import { CustomPecaCadastradaInterface } from "./interface";

const CustomPecaCadastrada = (props: CustomPecaCadastradaInterface) => {
  return props.text == PecaCadastrada.cadastrada ? (
    <BookmarkSimple
      alt="Peça cadastrada para este Ato"
      size={16}
      weight="fill"
      color={theme.colors.softPurple}
    />
  ) : (
    <BookmarkSimple
      alt="Não existe peça cadastrada para este Ato"
      size={16}
      weight="fill"
      color={theme.colors["gray/300"]}
    />
  );
};

export default CustomPecaCadastrada;

import { InputLoader } from "../../../../../../../components/InputLoader";
import theme from "../../../../../../../globalStyle/theme";
import { useEditorContext } from "../../../context/EditorContext";
import { usePecasContext } from "../../../context/PecasContext";
import { useProcessoContext } from "../../../context/ProcessoContext";
import * as S from "../../../styled";
const apiContext = {
  argument: {
    REQUEST_TIMEOUT: 600000, //Opcional: se não informado será considerado PJEOFFICE_DEFAULT_ARGUMENTS.REQUEST_TIMEOUT
    PAGINA_LOGIN: "/fakeBackend", //Opcional: se não informado será considerado PJEOFFICE_DEFAULT_ARGUMENTS.PAGINA_LOGIN
    ALGORITMO: "MD5withRSA", //Opcional: se não informado será considerado PJEOFFICE_DEFAULT_ARGUMENTS.ALGORITMO_AUTENTICACAO
  },
  onSuccess: function (data) {
    console.log("onSuccess", data);
  }, //Opcional: se não informada a notificação é ignorada
  onFailed: function (statusText) {
    console.log("onFailed", statusText);
  }, //Opcional: se não informada a notificação é ignorada
  onUnavailable: function (statusText) {
    console.log("onUnavailable", statusText);
  }, //Opcional: se não informada a notificação é ignorada
};

const ButtonsSection = () => {
  const {
    SalvarComoModelo,
    recPeca,
    SalvarPeca,
    EnviarParaPJE,
    FinalizarPeca,
    pecasFinalizadas,
    ConcluirAtuacao,
  } = usePecasContext();
  const { text, loadDocx } = useEditorContext();
  const { updateProcesso } = useProcessoContext();
  const { processo } = useProcessoContext();

  /*   useEffect(() => {
        console.log("recPeca", recPeca);
    }, [recPeca]); */

  return (
    <S.ButtonsWrapper>
      <S.ButtonLabel htmlFor="LoadDocxInput" isSave>
        Carregar Arquivo de Texto
      </S.ButtonLabel>
      {/* <S.Button
                color="#da19d0"
                onClick={() => {
                    PjeOffice.login("your challenge phrase here", apiContext);
                }}
                isSave
            >
                Login Office
            </S.Button>
            <S.Button
                color="#da19d0"
                onClick={() => {
                    PjeOffice.checkMininum(apiContext);
                }}
                isSave
            >
                Testar Minimum Office
            </S.Button> */}
      <S.Button
        onClick={() => {
          SalvarPeca(text, () => {
            updateProcesso();
          });
        }}
        isSave
      >
        Salvar
      </S.Button>

      <S.Button
        onClick={() => {
          SalvarComoModelo(text);
        }}
        isSave
      >
        Salvar como modelo
      </S.Button>
      {processo && processo.idSistemaProcessual == 1 && (
        <S.Button
          color={theme.colors.softGreen}
          colorHover={theme.colors.softGreenDark}
          onClick={() => {
            EnviarParaPJE(text, false);
          }}
        >
          Enviar para o Pje
        </S.Button>
      )}

      {processo && processo.idSistemaProcessual != 1 && (
        <S.Button
          color={theme.colors.softRed}
          colorHover={theme.colors.softGreenDark}
          onClick={() => {
            EnviarParaPJE(text, true);
          }}
        >
          Gerar PDF
        </S.Button>
      )}

      {pecasFinalizadas && pecasFinalizadas.length && (
        <S.Button
          onClick={() => {
            ConcluirAtuacao(() => {
              // navigate(
              //     "/dashboard/gerenciamento/procurador",
              //     {
              //         replace: true
              //     }
              // );
              window.location.href = `/dashboard/gerenciamento/procurador`;
            });
          }}
        >
          Concluir Atuação
        </S.Button>
      )}
      {recPeca != "NotFound" && recPeca != undefined && (
        <S.Button
          onClick={() => {
            FinalizarPeca(() => {
              updateProcesso();
            });
          }}
        >
          Finalizar Peça
        </S.Button>
      )}

      <InputLoader id="LoadDocxInput" OnExecute={loadDocx} />
    </S.ButtonsWrapper>
  );
};

export default ButtonsSection;

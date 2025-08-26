import jwtDecode from "jwt-decode";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../api/services/login/login";
import { SharedState } from "../../context/SharedContext";
import { PROFILES } from "../../enums/PROFILES.enum";
import BrasaoNovo from "./../../assets/brasao_novo.png";
import { SubmitLogin } from "./interfaces/login.interface";
import * as S from "./styled";

const Login = () => {
  const SIGUE_URL = process.env.REACT_APP_SIGUES;
  const navigate = useNavigate();
  const { setUser, setHomeLink, setUserPosition } = SharedState();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<SubmitLogin>();

  const loginMutation = useMutation(postLogin, {
    onSuccess: async (res) => {
      if (res.status === "OK") {
        const token: any = jwtDecode(res.data.token);
        /*  console.log("token", token); */
        const profileId: string = token["jvris.User.Perfil"];
        const accessInProduction = [
          PROFILES.ANALISTA,
          PROFILES.PROCURADOR,
          PROFILES.ASSESSOR_PROCURADOR,
          PROFILES.ASSESSOR_DE_PROCURADOR,
          PROFILES.CONTADOR_CHEFE,
          PROFILES.CONTADOR,
        ];
        /*  console.log("env", process.env.REACT_APP_ENV);
                console.log("profileId", profileId); */
        if (
          process.env.REACT_APP_ENV !== "DEV" &&
          !accessInProduction.includes(+profileId)
        ) {
          navigate("/");
          toast("Perfil temporariamente não autorizado.", {
            style: {
              borderRadius: "10px",
              background: "#e57373",
              color: "#fff",
              fontSize: "30px",
            },
          });
          return;
        }

        setUser(token);
        let homeLink: string;
        let position: string;

        switch (+profileId) {
          case PROFILES.ANALISTA:
            homeLink = "/dashboard/gerenciamento/procurador";
            position = "Analista";
            break;
          case PROFILES.PROCURADOR:
            homeLink = "/dashboard/gerenciamento/procurador";
            position = "Procurador(a)";
            break;
          case PROFILES.ASSESSOR_PROCURADOR:
            homeLink = "/dashboard/gerenciamento/procurador";
            position = "Assessor(a) de Procurador";
            break;
          case PROFILES.ASSESSOR_DE_PROCURADOR:
            homeLink = "/dashboard/gerenciamento/procurador";
            position = "Assessor(a) de Procurador I";
            break;
          case PROFILES.CONTADOR_CHEFE:
            homeLink = "/dashboard/gerenciamento/contador";
            position = "Contador(a) Chefe";
            break;
          case PROFILES.CONTADOR:
            homeLink = "/dashboard/gerenciamento/contador";
            position = "Contador(a)";
            break;
          case PROFILES.ASSESSOR_RPV:
            homeLink = "/dashboard/gerenciamento/rpv";
            position = "Assessor(a) de RPV";
            break;
          case PROFILES.OPERADOR:
          case PROFILES.OPERADOR_CONSULTA:
            homeLink = "/dashboard/gerenciamento/operador";
            position = "Operador(a)";
            break;
        }
        /*  console.log("homeLink", homeLink); */
        setUserPosition(position);
        localStorage.setItem("homePage", homeLink);
        localStorage.setItem("userPosition", position);
        setHomeLink(homeLink);
        navigate(homeLink);
      } else {
        setError("root", {
          message: res.message,
        });
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitLogin> = async ({ user, password }) => {
    loginMutation.mutate({ user, password });
  };
  const [seePassword, setSeePassword] = useState(false);

  return (
    <S.Wrapper>
      <S.BackgroundLogo>
        <S.LogoContainer>
          <img
            src={BrasaoNovo}
            style={{
              width: "5rem",
              height: "5rem",
              marginRight: "1rem",
            }}
          />
          <S.TextLogoContainer>
            <S.TextState>GOVERNO DO ESTADO DO RIO GRANDE DO NORTE</S.TextState>
            <S.TextPGE>Procuradoria Geral do Estado - PGE</S.TextPGE>
            <S.JvrisSubTitle />
          </S.TextLogoContainer>
        </S.LogoContainer>
      </S.BackgroundLogo>
      <S.LoginContainer>
        <S.FormContainer>
          <S.LogoMobile>
            <S.TextLogoContainerMobile>
              <S.TextStateMobile>
                GOVERNO DO ESTADO DO RIO GRANDE DO NORTE
              </S.TextStateMobile>
              <S.TextPGEMobile>
                Procuradoria Geral do Estado - PGE
              </S.TextPGEMobile>
              <S.JvrisSubTitleMobile />
            </S.TextLogoContainerMobile>
          </S.LogoMobile>
          <S.WelcomeText>Bem-vindo ao Jvris 4.0</S.WelcomeText>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.InputContainer>
              <S.LabelInput htmlFor="user">
                <S.UserIcon alt="Usuário" />
              </S.LabelInput>

              <S.TextInput
                type="text"
                {...register("user", { required: true })}
                placeholder="usuário"
                id="user"
              />
            </S.InputContainer>
            <S.InputPasswordContainer>
              <S.LabelInput htmlFor="password">
                <S.PasswordIcon alt="Senha" />
              </S.LabelInput>
              <S.TextInput
                type={!seePassword ? "password" : "text"}
                {...register("password", { required: true })}
                placeholder="senha"
                id="password"
              />

              <S.IconContainer onClick={() => setSeePassword(!seePassword)}>
                {seePassword ? (
                  <S.SeePasswordIcon />
                ) : (
                  <S.DontSeePasswordIcon />
                )}
              </S.IconContainer>
            </S.InputPasswordContainer>
            <S.ContainerText>
              <S.ErrorMessage>{loginMutation?.data?.message}</S.ErrorMessage>
              <S.ForgotPasswordLink to={SIGUE_URL} target="_blank">
                Esqueceu a senha?
              </S.ForgotPasswordLink>
            </S.ContainerText>

            <S.SubmitContainer>
              <S.SubmitButton
                disabled={!isValid || loginMutation.isLoading}
                type="submit"
              >
                Entrar
              </S.SubmitButton>
              {loginMutation.isLoading && <S.LoadingSpinner />}
            </S.SubmitContainer>
          </S.Form>
        </S.FormContainer>
      </S.LoginContainer>
    </S.Wrapper>
  );
};

export default Login;

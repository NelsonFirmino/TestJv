import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { useAct } from "../../../../hooks/useAct";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import {
  DeleteUserAccessProcess,
  GetSigiloLevelByProcess,
  GetUsersBySigiloAndLoggedUser,
  GetUsersWithPermission,
  PatchAddUsersAccessProcess,
} from "../../../../api/services/sigilo";
import { UsuariosDisponiveis } from "./components/UsuariosDisponiveis";
import { UsuariosComPermissao } from "./components/UsuariosComPermissao";
import { UsuarioSigilo } from "./adicionar-usuario-processo-sigiloso.interface";
import { SharedState } from "../../../../context/SharedContext";
import toast from "react-hot-toast";
import { NotFoundWarning } from "../../../../components/NotFoundWarning";

// tela com lógica complexa por conta de limitações na API. Checar swagger.

const AdicionarUsuarioProcessoSigiloso = () => {
  const navigate = useNavigate();
  const { user, selectedUser } = SharedState();
  const [usersToAddPermission, setUserPermission] = useState<UsuarioSigilo[]>(
    []
  );
  const [usersToRemovePermission, setRemoveUserPermission] = useState<
    UsuarioSigilo[]
  >([]);
  const { idAto } = useParams();
  const { act, isLoadingAct } = useAct(idAto);
  const reloadPage = () => {
    navigate(0);
  };

  const mutatePatchAddUsersAccessProcess = useMutation(
    PatchAddUsersAccessProcess,
    {
      onSettled: ({ status, message }) => {
        if (status === "OK") {
          toast(message, {
            icon: "✔",
            style: {
              borderRadius: "10px",
              background: "#81c784",
              color: "#fff",
              fontSize: "30px",
              width: "auto",
            },
          });
          setTimeout(() => {
            reloadPage();
          }, 2000);
        }
      },
    }
  );

  const {
    data: availableUser,
    isLoading: isLoadingAvailableUser,
    mutate: mutateAvailableUser,
  } = useMutation(GetUsersBySigiloAndLoggedUser);

  const {
    data: usersWithPermission,
    isLoading: isLoadingUsersWithPermission,
    mutate: mutateUsersWithPermission,
  } = useMutation(GetUsersWithPermission);

  const {
    isLoading: isLoadingDeleteUserFromPermission,
    mutate: mutateDeleteUserFromPermission,
  } = useMutation(DeleteUserAccessProcess, {
    onSuccess: ({ status, message }) => {
      if (status === "OK") {
        toast(message, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
            width: "auto",
          },
        });
        setTimeout(() => {
          reloadPage();
        }, 2000);
      }
    },
  });

  const {
    data: sigiloLevelByProcess,
    isLoading: isLoadingSigiloLevelProcess,
    mutate: mutateSigiloLevelByProcess,
  } = useMutation(GetSigiloLevelByProcess, {
    onSuccess: ({ data }) => {
      mutateAvailableUser({
        idUsuario: +selectedUser?.id || +user["Jvris.User.Id"],
        nuSigilo: data.nuSigilo,
      });
    },
  });

  useEffect(() => {
    if (act?.data?.idProcesso) {
      mutateUsersWithPermission({
        id_processo: +act.data.idProcesso,
      });
      mutateSigiloLevelByProcess({
        id_processo: +act.data.idProcesso,
      });
    }
  }, [act?.data?.idProcesso]);

  const handleUpdateSigilo = () => {
    const excludedUsers =
      usersWithPermission?.data?.filter(
        (u) => !usersToRemovePermission?.includes(u)
      ) || [];

    const formatedData = [...excludedUsers, ...usersToAddPermission].map(
      (u) => ({
        idProcesso: act.data.idProcesso,
        idUsuario: u.id,
        nuSigilo: sigiloLevelByProcess.data.nuSigilo,
        idAto: act.data.id,
        idTriagem: act.data.idTriagem,
      })
    );

    if (formatedData.length) {
      mutatePatchAddUsersAccessProcess.mutate({
        listaUsuariosProcessos: formatedData,
      });
    } else {
      if (usersWithPermission.data.length === 1) {
        mutateDeleteUserFromPermission({
          id: act.data.id,
          idProcesso: act.data.idProcesso,
          idUsuario: usersToRemovePermission[0].id,
        });
      } else {
        mutatePatchAddUsersAccessProcess.mutate({
          listaUsuariosProcessos: usersToRemovePermission
            .slice(
              usersToRemovePermission.length - 1,
              usersToRemovePermission.length
            )
            .map((u) => ({
              idProcesso: act.data.idProcesso,
              idUsuario: u.id,
              nuSigilo: sigiloLevelByProcess.data.nuSigilo,
              idAto: act.data.id,
              idTriagem: act.data.idTriagem,
            })),
        });
        mutateDeleteUserFromPermission({
          id: act.data.id,
          idProcesso: act.data.idProcesso,
          idUsuario: usersToRemovePermission.slice(
            usersToRemovePermission.length - 1,
            usersToRemovePermission.length
          )[0].id,
        });
      }
    }
  };

  if (!isLoadingAct && !act) {
    return (
      <NotFoundWarning
        title_page="ADICIONAR USUÁRIOS AO PROCESSO SIGILOSO"
        message="Ato não encontrado!"
      />
    );
  }

  return (
    <S.Wrapper>
      <PageTitle
        pageTitle="ADICIONAR USUÁRIOS AO PROCESSO SIGILOSO"
        pageIcon={<S.PageIcon />}
      />
      <S.ContentContainer>
        <S.ProcessSection>
          <S.InputContainer>
            <S.InputLabel>Número do Processo</S.InputLabel>
            <S.Input
              type="text"
              value={act?.data?.txNumeroFormatado}
              disabled={true}
            />
          </S.InputContainer>
        </S.ProcessSection>

        {isLoadingAct ||
        isLoadingUsersWithPermission ||
        isLoadingSigiloLevelProcess ||
        isLoadingAvailableUser ? (
          <S.LoadingContainer>
            <S.LoadingSpinner />
          </S.LoadingContainer>
        ) : (
          <S.Content>
            <S.UsuariosDisponiveisContainer>
              <UsuariosDisponiveis
                availableUser={availableUser?.data}
                setUserPermission={setUserPermission}
                usersToAddPermission={usersToAddPermission}
                usersToRemovePermission={usersToRemovePermission}
                setRemoveUserPermission={setRemoveUserPermission}
                usersWithPermission={usersWithPermission?.data}
              />
            </S.UsuariosDisponiveisContainer>

            <S.UsuariosComPermissaoContainer>
              <UsuariosComPermissao
                availableUser={availableUser?.data}
                usersWithPermission={usersWithPermission?.data}
                setUserPermission={setUserPermission}
                usersToAddPermission={usersToAddPermission}
                usersToRemovePermission={usersToRemovePermission}
                setRemoveUserPermission={setRemoveUserPermission}
              />
            </S.UsuariosComPermissaoContainer>
          </S.Content>
        )}
        <S.SaveButtonContainer>
          <S.SaveButton
            disabled={
              isLoadingAct ||
              isLoadingUsersWithPermission ||
              isLoadingSigiloLevelProcess ||
              isLoadingAvailableUser ||
              (usersToAddPermission.length === 0 &&
                usersToRemovePermission.length === 0) ||
              mutatePatchAddUsersAccessProcess.isLoading ||
              isLoadingDeleteUserFromPermission
            }
            onClick={handleUpdateSigilo}
          >
            Salvar
          </S.SaveButton>
        </S.SaveButtonContainer>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default AdicionarUsuarioProcessoSigiloso;

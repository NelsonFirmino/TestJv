import { Controller, useForm } from "react-hook-form";
import { SharedState } from "../../../../context/SharedContext";
import { PROFILES } from "../../../../enums/PROFILES.enum";
import { useSelectLayout } from "../../../../hooks/useSelectLayout";
import { encryptData } from "../../../../utils/token.util";
import { LoadingSpinner2 } from "../../../Loading/styled";
import { SelectedUserProps } from "./selected-user";
import * as S from "./styled";

export const SelectUser = () => {
  const { user, selectedUser, setSelectedUser } = SharedState();
  const { usersList, isLoadingUsersList } = useSelectLayout(
    +user["jvris.User.Perfil"],
    +user["Jvris.User.Id"]
  );
  let options = usersList;

  if (!isLoadingUsersList) {
    if (
      +user["jvris.User.Perfil"] === PROFILES.PROCURADOR ||
      usersList?.length === 0 ||
      usersList === undefined
    ) {
      options = [
        {
          label: user["Jvris.User.Name"],
          value: +user["Jvris.User.Id"],
          id: +user["Jvris.User.Id"],
        },
      ];
    }

    if (
      (+user["jvris.User.Perfil"] === PROFILES.ANALISTA && !selectedUser) ||
      (+user["jvris.User.Perfil"] === PROFILES.ASSESSOR_DE_PROCURADOR &&
        !selectedUser) ||
      (+user["jvris.User.Perfil"] === PROFILES.ASSESSOR_PROCURADOR &&
        !selectedUser)
    ) {
      setSelectedUser({
        name: options[0].label,
        id: options[0].id,
      });

      try {
        const token = encryptData(
          options[0].id,
          options[0].label,
          +user["Jvris.User.SessionCreation"]
        );
        localStorage.setItem("selectedUser", token);
      } catch (error) {
        //console.log(error);
      }
    }
  }

  const handleSelectionChange = (selectedUser: SelectedUserProps) => {
    setSelectedUser({
      name: selectedUser.label,
      id: selectedUser.id,
    });
    try {
      const token = encryptData(
        selectedUser.id,
        selectedUser.label,
        +user["Jvris.User.SessionCreation"]
      );
      localStorage.setItem("selectedUser", token);
    } catch (error) {
      //console.log(error);
    }
  };

  const { control } = useForm<any>({
    mode: "onChange",
  });

  return (
    <S.Container>
      {!isLoadingUsersList ? (
        <Controller
          name="usuario"
          control={control}
          render={({ field }) => (
            <S.CustomSelect
              {...field}
              isLoading={isLoadingUsersList}
              options={options}
              defaultValue={
                selectedUser
                  ? options.find((u) => u.id === selectedUser.id)
                  : options[0]
              }
              onChange={(option: SelectedUserProps) => {
                handleSelectionChange(option);
                field.onChange(option);
              }}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                  fontSize: "3.2rem",
                }),
              }}
            />
          )}
        />
      ) : (
        <LoadingSpinner2 />
      )}
    </S.Container>
  );
};

import { useQueryClient } from "react-query";
import * as S from "./styled";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladd.interface";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useMenuPai } from "../../../../../../hooks/useMenuPai";
import { postMenu, updateMenu } from "../../../../../../api/services/menu/menu";
import {
  Bell,
  Book,
  BookmarkSimple,
  Briefcase,
  CalendarCheck,
  Camera,
  ChartLine,
  ChatDots,
  CurrencyDollarSimple,
  Download,
  EnvelopeSimple,
  FileText,
  Gear,
  Info,
  ListDashes,
  Monitor,
  PresentationChart,
  SignOut,
  Wheelchair,
} from "phosphor-react";
import { Gavel } from "@phosphor-icons/react";
import theme from "../../../../../../globalStyle/theme";

export const ModalAdd = ({
  setShowModalAdd,
  id,
  txMenu,
  idMenu_Pai,
  txPagina,
  nuOrdem,
}: ModalAddProps) => {
  const queryClient = useQueryClient();
  const { menuPai, isLoadingMenuPai } = useMenuPai();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<ModalAddProps>({
    mode: "onChange",
  });

  const handleToast = (msg: string, error: boolean = false) => {
    !error
      ? toast(msg, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      })
      : toast.error(msg, {
        icon: "😥",
        style: {
          borderRadius: "10px",
          background: "#e57373",
          color: "#fff",
          fontSize: "30px",
        },
      });
    setShowModalAdd(false);
  };

  const [menuPaiSelect, setMenuPaiSelect] = useState({
    label: "",
    value: 0,
  });
  const [vinculadoSelectedOption, setVinculadoSelectedOption] = useState({
    label: "",
    value: 0,
  });

  const [txIconeName, setTxIconeName] = useState("");

  const [selectedButton, setSelectedButton] = useState(null);

  const buttonColor = theme.colors.softOrange;

  useEffect(() => {
    if (menuPai) {
      if (idMenu_Pai) {
        setMenuPaiSelect(menuPai?.find((data) => data.value == idMenu_Pai));
      } else {
        setMenuPaiSelect({ label: "", value: null });
      }
    }
  }, [!isLoadingMenuPai]);

  const onSubmit: SubmitHandler<ModalAddProps> = async (data) => {
    data.id
      ? updateMenu(
        id,
        data.txMenu,
        data.txPagina,
        data.nuOrdem,
        menuPaiSelect.label == "" ? null : menuPaiSelect.value,
        menuPaiSelect.label == "" ? txIconeName : ""
      )
        .then((response) => {
          if (response.status == "Created") {
            queryClient.invalidateQueries(`menus`);
            handleToast("Menu alterado com sucesso");
          } else {
            handleToast(response.message, true);
          }
        })
        .catch((err) => {
          handleToast("Erro ao alterar menu");
        })
      : postMenu(
        data.txMenu,
        data.txPagina,
        data.nuOrdem,
        menuPaiSelect.label == "" ? null : menuPaiSelect.value,
        menuPaiSelect.label == "" ? txIconeName : ""
      )
        .then((response) => {
          if (response.status == "Created") {
            queryClient.invalidateQueries(`menus`);
            handleToast("Menu Adicionado com Sucesso");
          } else {
            handleToast(response.message, true);
          }
        })
        .catch((err) => {
          handleToast("Erro ao Adicionar Menu");
        });
  };

  //console.log(selectedButton);

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>{id ? "Editar Menu" : "Adicionar Menu"}</S.TitleModal>
          <S.CloseModal
            onClick={() => {
              setShowModalAdd(false);
            }}
          >
            Fechar
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.TextAreaInput hidden defaultValue={id} {...register("id")} />
            <S.ContainerField>
              <S.FieldTitle>Nome: *</S.FieldTitle>
              <S.TextInput
                defaultValue={txMenu}
                maxLength={56}
                minLength={1}
                required={true}
                autoFocus
                placeholder="Digite o nome"
                {...register("txMenu", {
                  maxLength: 56,
                  minLength: 1,
                  required: true,
                })}
              />
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>Endereço: *</S.FieldTitle>
              <S.TextInput
                defaultValue={txPagina ? txPagina : "#"}
                maxLength={56}
                minLength={1}
                required={true}
                autoFocus
                placeholder="Digite o endereço"
                {...register("txPagina", {
                  maxLength: 56,
                  minLength: 1,
                  required: true,
                })}
              />
            </S.ContainerField>
            {menuPai && (
              <S.ContainerField>
                <S.FieldTitle>Menu Pai:</S.FieldTitle>
                <Controller
                  name="idMenu_Pai"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      isClearable={false}
                      options={menuPai}
                      isLoading={isLoadingMenuPai}
                      value={
                        id && idMenu_Pai
                          ? menuPaiSelect
                          : !idMenu_Pai
                            ? undefined
                            : menuPaiSelect
                      }
                      onChange={(value: any) => {
                        setMenuPaiSelect(value);
                      }}
                    />
                  )}
                />
              </S.ContainerField>
            )}
            <S.ContainerField>
              <S.FieldTitle>Ordem: *</S.FieldTitle>
              <S.TextInput
                id="ordem"
                defaultValue={nuOrdem}
                maxLength={56}
                minLength={1}
                required={true}
                autoFocus
                placeholder="Digite o número da ordem"
                {...register("nuOrdem", {
                  maxLength: 56,
                  minLength: 1,
                  required: true,
                })}
                onChange={(event) => {
                  event.target.value = event.target.value.replace(/\D/g, "");
                }}
              />
            </S.ContainerField>

            {menuPaiSelect.label == "" && (
              <S.ContainerField>
                <S.FieldTitle>Selecione o ícone:</S.FieldTitle>
                <S.MenuButtonsContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 1 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(1);
                      event.preventDefault();
                      setTxIconeName("fa-list-ul");
                    }}
                  >
                    <ListDashes size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 2 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(2);
                      event.preventDefault();
                      setTxIconeName("fa-file-text");
                    }}
                  >
                    <FileText size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 3 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(3);
                      event.preventDefault();
                      setTxIconeName("fa-gavel");
                    }}
                  >
                    <Gavel size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 4 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(4);
                      event.preventDefault();
                      setTxIconeName("fa-desktop");
                    }}
                  >
                    <Monitor size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 5 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(5);
                      event.preventDefault();
                      setTxIconeName("fa-sign-out");
                    }}
                  >
                    <SignOut size={26} />
                  </S.ButtonContainer>
                </S.MenuButtonsContainer>

                <S.MenuButtonsContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 6 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(6);
                      event.preventDefault();
                      setTxIconeName("fa-dollar");
                    }}
                  >
                    <CurrencyDollarSimple size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 7 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(7);
                      event.preventDefault();
                      setTxIconeName("fa-gear");
                    }}
                  >
                    <Gear size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 8 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(8);
                      event.preventDefault();
                      setTxIconeName("fa-bar-chart-o");
                    }}
                  >
                    <PresentationChart size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 9 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(9);
                      event.preventDefault();
                      setTxIconeName("fa-signal");
                    }}
                  >
                    <ChartLine size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 10 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(10);
                      event.preventDefault();
                      setTxIconeName("fa-download");
                    }}
                  >
                    <Download size={26} />
                  </S.ButtonContainer>
                </S.MenuButtonsContainer>

                <S.MenuButtonsContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 11 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(11);
                      event.preventDefault();
                      setTxIconeName("fa-envelope");
                    }}
                  >
                    <EnvelopeSimple size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 12 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(12);
                      event.preventDefault();
                      setTxIconeName("fa-wheelchair");
                    }}
                  >
                    <Wheelchair size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 13 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(13);
                      event.preventDefault();
                      setTxIconeName("fa fa-book");
                    }}
                  >
                    <Book size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 14 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(14);
                      event.preventDefault();
                      setTxIconeName("fa-briefcase");
                    }}
                  >
                    <Briefcase size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 15 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(15);
                      event.preventDefault();
                      setTxIconeName("fa-calendar");
                    }}
                  >
                    <CalendarCheck size={26} />
                  </S.ButtonContainer>
                </S.MenuButtonsContainer>

                <S.MenuButtonsContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 16 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(16);
                      event.preventDefault();
                      setTxIconeName("fa-camera");
                    }}
                  >
                    <Camera size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 17 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(17);
                      event.preventDefault();
                      setTxIconeName("fa-comment-o");
                    }}
                  >
                    <ChatDots size={26} />
                  </S.ButtonContainer>

                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 18 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(18);
                      event.preventDefault();
                      setTxIconeName("fa-bell-o");
                    }}
                  >
                    <Bell size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 19 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(19);
                      event.preventDefault();
                      setTxIconeName("fa-info-circle");
                    }}
                  >
                    <Info size={26} />
                  </S.ButtonContainer>
                  <S.ButtonContainer
                    style={{
                      backgroundColor:
                        selectedButton == 20 ? theme.colors.softOrange : "",
                    }}
                    onClick={(event) => {
                      setSelectedButton(20);
                      event.preventDefault();
                      setTxIconeName("fa-bookmark");
                    }}
                  >
                    <BookmarkSimple size={26} />
                  </S.ButtonContainer>
                </S.MenuButtonsContainer>
              </S.ContainerField>
            )}

            <S.ContainerSubmitButton>
              <S.SubmitButton
                disabled={
                  !isValid &&
                  (menuPaiSelect.label == "" && txIconeName == ""
                    ? true
                    : menuPaiSelect.label != ""
                      ? true
                      : false)
                }
              >
                Salvar
              </S.SubmitButton>
            </S.ContainerSubmitButton>
          </S.Form>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

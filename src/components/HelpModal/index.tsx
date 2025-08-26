import emailjs from "emailjs-com";
import jwtDecode from "jwt-decode";
import { Warning } from "phosphor-react";
import { useEffect, useState } from "react";
import { BaseModal } from "../BaseModal";
import { HotToastError, HotToastSucess } from "../HotToastFuncs";
import { InputLoader } from "../InputLoader";
import * as S from "./styled";

type Anexo = {
  name: string;
  file: string;
};

const HelpModal = ({ dataTable }: any) => {
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [text, setText] = useState("");
  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!isOpenModal) {
      setText("");
      setAnexos([]);
    }
  }, [isOpenModal]);

  return (
    <>
      <BaseModal
        title="Relate um Problema"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <InputLoader
          id="LoadInput"
          OnExecute={async (event) => {
            function file_to_base64(file: File) {
              return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                  if (event.target) {
                    resolve(event.target.result as string);
                  } else {
                    reject("Erro ao carregar arquivo");
                  }
                };
                reader.readAsDataURL(file);
              });
            }
            if (event.target.files) {
              const files = Array.from(event.target.files) as any[];
              const anx = [...anexos];
              for (const file of files) {
                const fName = file.name.split(".")[0];
                const base64 = await file_to_base64(file);
                anx.push({
                  name: fName,
                  file: base64,
                });
              }
              setAnexos(anx);
            } else {
              HotToastError("Erro ao carregar arquivo");
            }
          }}
        />
        <S.ContainerForm>
          <S.WarningMessage>
            Se você está enfrentando algum problema, por favor relate (de
            maneira detalhada) para que possamos consertar o mais rápido
            possível.
          </S.WarningMessage>

          <S.Section>
            <S.SectionTitle>Relato</S.SectionTitle>

            <S.TextArea
              // {...register("txObservacao", {
              //   required: true,
              // })}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Descreva o problema..."
            />
          </S.Section>
          <S.OptionsContainer>
            <S.OptionCancel onClick={() => setOpenModal(false)}>
              Cancelar
            </S.OptionCancel>
            <S.OptionRemove
              onClick={() => {
                const tokenString = localStorage.getItem("token")!;
                const token: any = jwtDecode(tokenString);
                //console.log(token);
                const templateParams = {
                  message: text,
                  user: token["Jvris.User.Name"],
                  id: token["Jvris.User.Id"],
                  imgs: "sem Serviço de Anexos",
                };
                emailjs
                  .send(
                    "service_k33a75i",
                    "template_o70vyh4",
                    templateParams,
                    "6nlRcbr6dhNi-t3Xa"
                  )
                  .then(
                    function (response) {
                      HotToastSucess("Mensagem Enviada com Sucesso");
                      setOpenModal(false);
                    },
                    function (error) {
                      HotToastError("Erro ao Enviar Mensagem");
                    }
                  );
              }}
            >
              Enviar
            </S.OptionRemove>
          </S.OptionsContainer>
        </S.ContainerForm>
      </BaseModal>
      <S.Wrapper onClick={() => setOpenModal(true)}>
        <Warning size={20} />
        Relate um Problema
      </S.Wrapper>
    </>
  );
};

export default HelpModal;

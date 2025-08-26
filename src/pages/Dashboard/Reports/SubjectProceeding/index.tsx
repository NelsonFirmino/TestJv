import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { HotToastWarning } from "../../../../components/HotToastFuncs";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { AssI } from "./interfaces/subjectproceeding.inteface";

const SubjectProceeding = () => {
  const [assuntos, setAssuntos] = useState<AssI[]>([]);
  const [selectedAssuntoID, setSelectedAssuntoID] = useState<number[]>([]);

  async function UpdateAssuntos(txt: string) {
    try {
      const assunto = await axiosInstance.get(
        `api/v1.0/Assuntos/autocomplete?txAssunto=${txt}`
      );
      if (assunto.data.status == "NotFound") {
        HotToastWarning("NotFound");
      } else setAssuntos(assunto.data.data);
    } catch (err) {}
  }

  async function onSubmit(selectedAssuntoID: number) {
    try {
      const res = await axiosInstance.get(
        `api/v1.0/relatorios/processos-assuntos?assuntos=${selectedAssuntoID}`
      );
      if (res.data.status == "NotFound") {
        HotToastWarning("NotFound");
      } else {
        openPDFInNewTab(res.data.data.file_stream);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE PROCESSOS POR ASSUNTO" />
      <div
        style={{
          padding: "1.5rem",
        }}
      >
        <S.Row>
          <S.Section>
            <S.SectionTitle>Assunto(s): *</S.SectionTitle>

            <S.FieldContainer>
              <S.CustomSelect
                placeholder="Digite mais de 3 caracteres"
                onChange={(e: any) => {
                  if (e) {
                    setSelectedAssuntoID(e.map((item) => item.value));
                  } else {
                    setSelectedAssuntoID([]);
                  }
                }}
                onInputChange={(assunto) => {
                  assunto && UpdateAssuntos(assunto);
                }}
                options={assuntos.map((assunto) => {
                  return {
                    value: assunto.id,
                    label: assunto.txAssunto,
                  };
                })}
                isMulti
                isClearable={false}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.ContainerButtons>
          <S.SubmitButton
            onClick={() => {
              selectedAssuntoID.forEach((assuntoID) => {
                onSubmit(assuntoID);
              });
            }}
          >
            Gerar Relatório
          </S.SubmitButton>
        </S.ContainerButtons>
      </div>
    </>
  );
};

export default SubjectProceeding;

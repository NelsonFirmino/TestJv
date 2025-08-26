import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SubmitAttAdvisors } from "./interfaces/attorneyadvisors.interface";
import * as MockData from "./mockData";
import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { X } from "phosphor-react";
import JvrisTable from "../../../../components/JvrisTable";
import theme from "../../../../globalStyle/theme";
import { formatDataToTable } from "../../../../utils/formatDataToTable";
import { useCurrentAttorneysAdvisors } from "../../../../hooks/useCurrentAttorneysAdvisors";
import { useAdvisors } from "../../../../hooks/useAdvisors";
import {
  deleteAdvisorAttorneys,
  postAdvisorAttorneys,
} from "../../../../api/services/advisorAttorneys/advisorAttorneys";
import { useQueryClient } from "react-query";
import { SharedState } from "../../../../context/SharedContext";

const AttorneyAdvisors = () => {
  const { user } = SharedState();
  const queryClient = useQueryClient();
  const { advisorsList, loadingAdvisorsList } = useAdvisors();
  const { attorneysAdvisorsList } = useCurrentAttorneysAdvisors();

  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<SubmitAttAdvisors>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitAttAdvisors> = async (params) => {
    // ver se idProcurador será sempre o usuário logado
    postAdvisorAttorneys({
      idAssessor: params.advisors.value,
      idProcurador: user["Jvris.User.Id"],
      idUsuarioCadastro: user["Jvris.User.Id"],
    }).then((response) => {
      if (response.status == "Created") {
        queryClient.invalidateQueries(
          `currentAttorneysAdvisors-${user["Jvris.User.Id"]}`
        );
      }
    });
  };

  const handleDelete = (index: number) => {
    deleteAdvisorAttorneys({
      idAssessor: parseInt(
        formatDataToTable(attorneysAdvisorsList, ["id"])[index][0]["text"]
      ),
      idProcurador: user["Jvris.User.Id"],
      idUsuarioCadastro: user["Jvris.User.Id"],
    }).then((response) => {
      if (response.status == "OK") {
        queryClient.invalidateQueries(
          `currentAttorneysAdvisors-${user["Jvris.User.Id"]}`
        );
      }
    });
  };

  return (
    <>
      <PageTitle pageTitle="Assessores" pageIcon={<S.PageIcon />} />

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Row>
          <S.Section>
            <S.SectionTitle>Assessor:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="advisors"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione o assessor"
                    {...field}
                    options={advisorsList}
                    isClearable={false}
                    isLoading={loadingAdvisorsList}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.ContainerButtons>
            <S.SubmitButton disabled={!isValid} type="submit">
              Adicionar
            </S.SubmitButton>
          </S.ContainerButtons>
        </S.Row>
      </S.Form>

      {attorneysAdvisorsList && (
        <S.TableWrapper>
          <JvrisTable
            Searchable={false}
            maxRows={false}
            autoPrimaryColumn={false}
            
            columns={MockData.TableDataTitle()}
            data={formatDataToTable(attorneysAdvisorsList, ["txAssessor"])}
            GenericButton={[
              {
                hoverColor: theme.colors.softRed,
                icon: <X weight="bold" size={20} />,
                onClick: (index) => {
                  handleDelete(index!);
                },
              },
            ]}
          />
        </S.TableWrapper>
      )}
    </>
  );
};

export default AttorneyAdvisors;

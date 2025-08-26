import { Controller, useForm } from "react-hook-form";
import * as S from "./styled";
import { useAttorneys } from "../../../../../../hooks/useAttorneys";
import { SharedState } from "../../../../../../context/SharedContext";

export const SelectAttorney = () => {
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { setSelectedAttorneyByGeneralAttorneyDashboard } = SharedState();
  const { control } = useForm<any>({
    mode: "onChange",
  });
  return (
    <S.Wrapper>
      <Controller
        name="usuario"
        control={control}
        render={({ field }) => (
          <S.CustomSelect
            {...field}
            isLoading={loadingAttorneysList}
            options={attorneysList}
            defaultValue={
              !loadingAttorneysList &&
              attorneysList !== undefined &&
              attorneysList[0]
            }
            onChange={(option: any) => {
              setSelectedAttorneyByGeneralAttorneyDashboard(option);
              field.onChange(option);
            }}
          />
        )}
      />
    </S.Wrapper>
  );
};

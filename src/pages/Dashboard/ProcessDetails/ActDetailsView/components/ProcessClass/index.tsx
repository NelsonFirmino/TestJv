import { useProcessClassById } from "../../../../../../hooks/useProcessClassById";
import { ProcessClassProps } from "./processClass.interface";
import * as S from "./styled";

export const ProcessClass = ({ class_id }: ProcessClassProps) => {
  const { isLoadingProcessClass, processClass } = useProcessClassById(class_id);

  return (
    <>
      {!isLoadingProcessClass ? (
        <S.TextInput
          type="text"
          placeholder="Número do processo"
          disabled={true}
          defaultValue={processClass?.data.txClasse}
        />
      ) : (
        <S.LoadingSpinner />
      )}
    </>
  );
};

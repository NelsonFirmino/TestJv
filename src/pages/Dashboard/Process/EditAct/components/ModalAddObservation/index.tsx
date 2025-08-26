import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { postActObservation } from "../../../../../../api/services/acts/acts";
import { SharedState } from "../../../../../../context/SharedContext";
import {
    ModalAddObservationProps,
    SubmitRegisterObservation
} from "./modal-add-observation";
import * as S from "./styled";

export const ModalAddObservation = ({
    setShowModalAddObservation,
    showModalAddObservation
}: ModalAddObservationProps) => {
    const { user } = SharedState();
    const queryClient = useQueryClient();
    const postNewObservation = useMutation(postActObservation, {
        onSuccess: () => {
            queryClient.invalidateQueries(
                `actObservation-${showModalAddObservation.idAto}`
            );
            setShowModalAddObservation({
                idAto: "0",
                open: false
            });
        },
        onError: (error) => {
            alert("Error ao cadastrar audiência...");
        }
    });

    const {
        handleSubmit,
        register,
        watch,
        formState: { isValid }
    } = useForm<SubmitRegisterObservation>({
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<SubmitRegisterObservation> = async (data) => {
        postNewObservation.mutate({
            idUsuarioCadastro: user["Jvris.User.Id"],
            idAto: +showModalAddObservation.idAto,
            txObservacao: data.txObservacao
        });
    };

    return (
        <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.Section>
                <S.ContentSection>
                    <S.ContainerFieldTextArea>
                        <S.FieldTitle>
                            Informações Complementares:
                            <S.LettersCounter>
                                {(watch("txObservacao") || "").length} / 1000
                            </S.LettersCounter>
                        </S.FieldTitle>

                        <S.TextAreaInput
                            minLength={2}
                            maxLength={1000}
                            required={true}
                            placeholder="Digite aqui uma observação de no máximo 1000 caracteres."
                            {...register("txObservacao", {
                                maxLength: 1000,
                                minLength: 2,
                                required: true
                            })}
                        />
                    </S.ContainerFieldTextArea>
                </S.ContentSection>
            </S.Section>

            <S.ContainerSubmitButton>
                <S.SubmitButton disabled={!isValid}>Salvar</S.SubmitButton>
                {postNewObservation.isLoading && <S.LoadingSpinner />}
            </S.ContainerSubmitButton>
        </S.Form>
    );
};

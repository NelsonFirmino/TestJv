import { useState } from "react";
import { Partes } from "../../../../../../api/services/partes/partes.interface"
import { BaseModal } from "../../../../../../components/BaseModal";
import * as S from './styled';

interface ActionsProps {
    data: Partes
}

export const Actions = ({ data }: ActionsProps) => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    return (<>
        <BaseModal title="Remover parte" isOpenModal={isDeleteModalOpen} setOpenModal={setDeleteModalOpen} >
            <S.ButtonContainer>
                <S.ConfirmButton type='button' >Sim</S.ConfirmButton>
                <S.CancelButton>Cancelar</S.CancelButton>

                {false && (
                    <S.LoadingSpinner />
                )}
            </S.ButtonContainer>
        </BaseModal>
        <S.Button onClick={() => setDeleteModalOpen(true)}>Excluir</S.Button>
    </>);
}
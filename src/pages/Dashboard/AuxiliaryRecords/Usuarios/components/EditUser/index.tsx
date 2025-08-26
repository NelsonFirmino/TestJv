import { useState } from 'react'
import * as S from './styled'
import { BaseModal } from '../../../../../../components/BaseModal';
import { Controller, useForm } from 'react-hook-form';

export const EditUser = ({dataTable}: any) => {
    const [isOpenModal, setOpenModal] = useState(false);
    const { control } = useForm<any>({
      mode: "onChange",
    });
    return (
      <S.Wrapper>
          <BaseModal
          title="Edição de usuário"
          isOpenModal={isOpenModal}
          setOpenModal={setOpenModal}
        >
          <S.FormContainer>
            <S.ContentSectionTitle>Dados do usuário</S.ContentSectionTitle>
            <S.ContentSection>
              <S.ContainerField>
                <S.FieldTitle>Perfil: *</S.FieldTitle>
                <Controller
                name="usuario"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    {...field}
                    isLoading={false}
                    options={[]}
                    defaultValue={1}
                    isDisabled={true}
                  />
                )}
                />
              </S.ContainerField>
              <S.ContainerField>
                <S.FieldTitle>Nome: *</S.FieldTitle>
                
              </S.ContainerField>
            </S.ContentSection>
            <S.ContentSection>
              <S.ContainerField>
                <S.FieldTitle>CPF: * (somente números)</S.FieldTitle>
              </S.ContainerField>
              <S.ContainerField>
                <S.FieldTitle>Login: *</S.FieldTitle>
                
              </S.ContainerField>
            </S.ContentSection>
            <S.ContentSection>
              <S.ContainerField>
                <S.FieldTitle>Matrícula:</S.FieldTitle>
              </S.ContainerField>
            </S.ContentSection>
            
          </S.FormContainer>
        </BaseModal>
        <S.Button onClick={() => setOpenModal(true)}>Editar</S.Button>
      </S.Wrapper> 
    )
}
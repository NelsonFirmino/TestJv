import { Download } from "phosphor-react";
import JvrisTable from "../../../../../../../../components/JvrisTable";
import theme from "../../../../../../../../globalStyle/theme";
import { openOctetStreamInNewTab } from "../../../../../../../../utils/openOctetStreamInNewTab.util";
import { formatDataToTable } from "../../../../../../Accounting/RedistributionOfCaseFiles/utils";
import * as MockData from "./mockData";
import { ModalAddProps } from "./modaladd.interface";
import * as S from "./styled";

export const UltimoAnexo = ({ setShowModalAdd, dados }: ModalAddProps) => {
  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Expediente</S.TitleModal>
          <S.CloseModal
            onClick={() => {
              setShowModalAdd(false);
            }}
          >
            Fechar
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          {dados && (
            <JvrisTable
              download
              Searchable={false}
              maxRows={false}
              autoPrimaryColumn={false}
              
              columns={MockData.TableDataTitle()}
              data={formatDataToTable(dados, ["txDescricao"])}
              GenericButton={[
                {
                  icon: <Download weight="fill" size={20} />,
                  hoverColor: theme.colors.jvrisAqua,
                  onClick: (index) => {
                    if (index != undefined) {
                      openOctetStreamInNewTab(
                        dados[index].file_stream,
                        dados[index].name
                      );
                    }
                  },
                },
              ]}
            />
          )}
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

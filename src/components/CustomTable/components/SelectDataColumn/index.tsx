import { useEffect, useState } from "react";
import { formatDateToCustomTable } from "../../../../utils/formatDateToCustomTable.util";
import { ContainerOptions } from "./components/ContainerOptions";
import { SelectDataColumnProps } from "./select-data-column.interface";
import * as S from "./styled";

export const SelectDataColumn = ({
  data,
  columns,
  filterDataBySelectValueColumn,
  setFilterDataBySelectValueColumn,
}: SelectDataColumnProps) => {
  const [openModal, setOpenModal] = useState(false);

  const sortByDateDescending = (dates) => {
    return dates.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const handleData = (newValue: any, index: number) => {
    
    if (newValue === null) {
      // removendo opção selecionada
      let removedDta = [
        ...filterDataBySelectValueColumn.filter((d) => 
          d.index != index
        ),
      ];
      setFilterDataBySelectValueColumn(removedDta);
    } else if (newValue !== null) {
      let newData = [
        ...filterDataBySelectValueColumn,
        {
          label: newValue.value,
          keyData: newValue.position,
          index,
          type: newValue.type,
        },
      ];
      setFilterDataBySelectValueColumn(newData);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  if (filterDataBySelectValueColumn.length > 0) {
    data = data.filter((d) => {
      return filterDataBySelectValueColumn.every((f) => {
        if (f.type === "VALUE_RANGE") {
          switch (f.label) {
            case 1: {
              return +d[f.keyData] >= 0 && +d[f.keyData] <= 100;
            }
            case 2: {
              return +d[f.keyData] >= 100.01 && +d[f.keyData] <= 1000;
            }
            case 3: {
              return +d[f.keyData] >= 1000.01 && +d[f.keyData] <= 5000;
            }
            case 4: {
              return +d[f.keyData] >= 5000.01 && +d[f.keyData] <= 10000;
            }
            case 5: {
              return +d[f.keyData] >= 10000.01 && +d[f.keyData] <= 100000;
            }
            case 6: {
              return +d[f.keyData] >= 100000.01 && +d[f.keyData] <= 500000;
            }
            case 7: {
              return +d[f.keyData] > 500000;
            }
          }
        } else {
          return f.label === d[f.keyData];
        }
      });
    });
  }

  const handleLabelFormat = (c: any, label: any): string => {
    if (c?.formatDate) {
      return formatDateToCustomTable(label);
    }

    if (c.rangePredefinedValues) {
      return label.label;
    }

    return label;
  };

  return (
    <S.Wrapper>
      <S.ContainerButton onClick={handleOpenModal}>
        <S.Icon alt="Filtrar por dado de coluna." />
      </S.ContainerButton>
      <ContainerOptions
        isOpen={openModal}
        data={data}
        columns={columns}
        setOpenModal={setOpenModal}
      >
        {columns.map((c, i) => {
          const [selectedValue,setSelectedValue] = useState(null);
          const labels = new Set(data.map((d) => d[c.key]));
          let sortedLabels = Array.from(labels);

          if (c?.orderByDate) {
            sortedLabels = sortByDateDescending(sortedLabels);
          }

          if (c?.rangePredefinedValues) {
            sortedLabels = [
              {
                label: "R$00,00 à R$100,00",
                value: 1,
              },
              {
                label: "R$100,01 à R$1000,00",
                value: 2,
              },
              {
                label: "R$1000,01 à R$5000,0",
                value: 3,
              },
              {
                label: "R$5000,01 à R$10000,00",
                value: 4,
              },
              {
                label: "R$10000,01 à R$100000,00",
                value: 5,
              },
              {
                label: "R$100000,01 à R$500000,00",
                value: 6,
              },
              {
                label: "Acima de R$500000,00",
                value: 7,
              },
            ];
          }

          useEffect(() => {
            if (filterDataBySelectValueColumn.length == 0) {
              setSelectedValue(null)
            }
          },[filterDataBySelectValueColumn])

          return (
            <S.ContainerSelect key={i}>
              <S.NameColum>{c.name}</S.NameColum>
              <S.CustomSelect
                isClearable={true}
                onChange={(e) => {
                  handleData(e, i)
                  setSelectedValue(e)
                }}
                value={selectedValue}
                placeholder={c.name}
                options={sortedLabels.map((label) => ({
                  label: handleLabelFormat(c, label),
                  value: c?.rangePredefinedValues ? label?.value : label,
                  position: c.key,
                  type: c?.rangePredefinedValues ? "VALUE_RANGE" : "DEFAULT",
                }))}
              />
            </S.ContainerSelect>
          );
        })}
      </ContainerOptions>
    </S.Wrapper>
  );
};

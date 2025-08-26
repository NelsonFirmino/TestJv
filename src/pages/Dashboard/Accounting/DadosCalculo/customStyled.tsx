import { useEffect, useState } from "react";
import * as S from "./styled";

import ReactLoading from "react-loading";
import theme from "../../../../globalStyle/theme";
import { CustomInputProps, CustomSelectProps } from "./interfaces";

interface DefaultTitleI {
  title: string;
  children: React.ReactNode;
  containerStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  search?: () => void;
}

const DefaultTitle = (props: DefaultTitleI) => {
  const { title, children, containerStyle, titleStyle, search } = props;

  return (
    <S.ContainerField style={containerStyle}>
      <S.FieldTitle
        style={{
          width: "max-content",
          ...titleStyle,
        }}
      >
        {title}
        {search && <S.SearchIcon onClick={search} weight="bold" />}
      </S.FieldTitle>

      {children}
    </S.ContainerField>
  );
};

export const CustomDate = (props: CustomInputProps) => {
  const { InputTitle, placeholder, disabled, value, search } = props;

  return (
    <DefaultTitle
      search={search}
      containerStyle={{
        flex: 0,
      }}
      title={InputTitle}
    >
      <S.DateInput
        type="date"
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={
          value != undefined ? value : new Date().toISOString().substring(0, 10)
        }
        {...props}
      />
    </DefaultTitle>
  );
};

export const CustomInput = (props: CustomInputProps) => {
  const { InputTitle, placeholder, disabled, value, search, updateVal } = props;

  return (
    <DefaultTitle title={InputTitle} search={search}>
      <S.TextInput
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          if (updateVal) {
            updateVal(e.target.value);
          }
        }}
        value={value != undefined ? value : "No data"}
        {...props}
      />
    </DefaultTitle>
  );
};

export const CustomLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading
        type="bars"
        color={theme.colors.jvrisAqua}
        height={"12rem"}
        width={"12rem"}
      />
    </div>
  );
};

export const CustomSelect = (props: CustomSelectProps) => {
  const [def, setDef] = useState<any>();
  const {
    InputTitle,
    disabled,
    values,
    defaultValue,
    defaultLabel,
    customB,
    search,
    updateVal,
  } = props;

  useEffect(() => {
    if (defaultValue) {
      const v = values.find((value) => value.value === defaultValue);
      setDef(v);
    } else if (defaultLabel) {
      const v = values.find((value) => value.label === defaultLabel);
      setDef(v);
    }
  }, [defaultLabel, values]);

  return (
    <DefaultTitle title={InputTitle} search={search}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {def && (
          <S.SelectInput
            defaultValue={def}
            onChange={(e: any) => {
              if (defaultValue) {
                const v = values.find((value) => value.value === e.value);
                setDef(v);
              } else if (defaultLabel) {
                const v = values.find((value) => value.label === e.label);
                setDef(v);
              }
              if (updateVal) {
                updateVal(e.value);
              }
            }}
            //placeholder={placeholder}
            options={values}
            isDisabled={disabled}

            //inputValue={defaultValue}
          />
        )}

        {customB && (
          <S.AddB onClick={customB.onClick} title="Adicionar outro exequente">
            {customB.B}
          </S.AddB>
        )}
      </div>
    </DefaultTitle>
  );
};

export const CustomSelect2 = (props: CustomSelectProps) => {
  const { InputTitle, disabled, values, customB, search, updateVal, value } =
    props;

  return (
    <DefaultTitle title={InputTitle} search={search}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <S.SelectInput
          value={{
            value: value,
            label: values.find((v) => v.value === value)?.label,
          }}
          onChange={(e: any) => {
            if (updateVal) {
              updateVal(e.value);
            }
          }}
          //placeholder={placeholder}
          options={values}
          isDisabled={disabled}

          //inputValue={defaultValue}
        />

        {customB && (
          <S.AddB onClick={customB.onClick} title="Adicionar outro exequente">
            {customB.B}
          </S.AddB>
        )}
      </div>
    </DefaultTitle>
  );
};

import { FunnelSimple, X } from "phosphor-react"
import theme from "../../../../globalStyle/theme"
import { useContext, useEffect, useState } from "react";
import { JvrisTableContext } from "../../context/JvrisTableContext";
import ReactSelect from "react-select";
import styled from "styled-components";

interface SelectI {
    options: Array<{
        label: string,
        value: string
    }>,
    onChange?: (value: any) => void
    value: string
    index: number
}

const Select = (props: SelectI) => {
    /* useEffect(() => {
        //console.log(props.value)
    }, [props.value]) */
    return (
        <ReactSelect
            //defaultValue={props.value as any}
            options={props.options}

            value={props.value ? {
                label: props.value,
                value: props.value
            } : null}
            onChange={(value) => {
                if (props.onChange) props.onChange(value)
            }}
            placeholder="Filtrar por coluna"
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    border: 'none',
                    boxShadow: 'none',
                    outline: `1px solid ${theme.colors.jvrisAqua}`,
                    fontSize: '2.8rem',
                }),
                indicatorSeparator(base, props) {
                    return {
                        ...base,
                        display: 'none',
                    };
                },
                container: (provided, state) => ({
                    ...provided,
                    border: 'none',
                    boxShadow: 'none',
                    //outline: `1px solid ${theme.colors.jvrisAqua}`,
                    fontSize: '1.4rem',
                    width: '200px'
                }),
                option: (provided, state) => ({
                    ...provided,
                    fontSize: '1.4rem',
                }),
                placeholder: (provided, state) => ({
                    ...provided,
                    fontSize: '1.4rem',
                }),
            }}
        />
    )
}

const ColumnFilter = () => {
    const {
        dataByColumn,
        setSelectedFilters,
        //selectedFilters,
        filterDataByMany,
        TableProps
    } = useContext(JvrisTableContext);
    const [openFilter, setOpenFilter] = useState(false);
    const [filters, setFilters] = useState<Array<string>>([]);

    const FunnelWrapper = styled.div`
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        //border: 1px solid ${(props) => props.theme.colors.jvrisAqua};
        background-color: ${(props) => props.theme.colors.jvrisAqua};
        border-radius: 0.5rem;
        width: 46px;
        height: 46px;
        cursor: pointer;
        //padding: 0.5rem;

        &:hover {
            background-color: ${(props) => props.theme.colors.jvrisAquaDark};
            //transition: 0.2s ease-in-out;
        }
    `;

    return (
        <div>
            <FunnelWrapper
                onClick={() => setOpenFilter(!openFilter)}>
                <FunnelSimple color="white" size={22} weight="bold" />
            </FunnelWrapper>
            {
                openFilter &&

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'absolute',
                        top: '50px',
                        right: '0px',
                        width: '420px',
                        //height: '200px',
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        //overflow: 'hidden',
                        border: `1px solid ${theme.colors.jvrisAqua}`,
                        zIndex: 9999,
                        padding: '1.5rem',
                        gap: '1rem',
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.4)',
                    }}>

                    {
                        dataByColumn.map((column, index) => {
                            //console.log(column)
                            return <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                //gap: '1rem',
                                justifyContent: 'space-between',

                            }}>
                                <p style={{ fontSize: '1.4rem' }}>{TableProps.columns[index].text}</p>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    justifyContent: 'center',
                                }}>
                                    <Select
                                        index={index}
                                        value={filters[index]}
                                        onChange={(value) => {
                                            const filts = filters
                                            filts[index] = value.value
                                            filterDataByMany(filts)
                                            //console.log(filts)
                                            setFilters(filts)
                                            //setSearchFilter(value.value)
                                        }}
                                        options={column.map((x) => {
                                            return {
                                                label: x,
                                                value: x
                                            }
                                        })} />
                                    <X
                                        color={theme.colors.jvrisAqua}
                                        size={22}
                                        weight="bold"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            const filts = filters
                                            filts[index] = undefined
                                            filterDataByMany(filts)
                                            //console.log(filts)
                                            setFilters(filts)
                                        }} />
                                </div>
                            </div>
                        })
                    }

                </div>

            }
        </div>

    )
}

export default ColumnFilter
import { StylesConfig } from "react-select";

const SelectStyle: StylesConfig = {
    option: (previous) => ({
        ...previous,
        color: "black",
    }),
    container: (previous) => ({
        ...previous,
        fontSize: "12px",
    }),
    input: (previous) => ({
        ...previous,
        minWidth: "60px",
    }),
    singleValue: (previous) => ({
        ...previous,
        margin: 5,
        padding: 0
    })
};

export default SelectStyle;
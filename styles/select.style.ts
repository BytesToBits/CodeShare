import { StylesConfig } from "react-select";

const SelectStyle: StylesConfig = {
    option: (previous, { isFocused }) => ({
        ...previous,
        color: "white",
        backgroundColor: isFocused ? "rgba(255,255,255,.4)" : "parent",
        ":active": {
            backgroundColor: "rgba(255,255,255,.4)"
        }
    }),
    menu: (previous) => ({
        ...previous,
        background: "rgba(0,0,0,.8)"
    }),
    container: (previous) => ({
        ...previous,
        fontSize: "12px",
    }),
    input: (previous) => ({
        ...previous,
        minWidth: "60px",
        color: "white"
    }),
    singleValue: (previous) => ({
        ...previous,
        margin: 5,
        padding: 0,
        color: "white"
    }),
    control: (previous) => ({
        ...previous,
        background: "transparent",
        border: "none",
        outline: "none"
    }),
    dropdownIndicator: (previous) => ({
        ...previous,
        color: "white",
        ":hover": {
            color: "gray"
        }
    }),
};

export default SelectStyle;
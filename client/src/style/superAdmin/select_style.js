export default function SelectStyle() {
  const customStyles = {
    menu: (provided) => ({
      // ...provided,
      borderBottom: "1px solid  rgba(255, 255, 255, 0)",
      padding: 5,
      color: "#043163",
      backgroundColor: "rgba(243, 243, 243, 1)",
      marginTop: "0.5vh"
    }),

    control: (_) => ({
      color: "#043163",
      background: "rgba(188, 188, 203, 0.2) 0% 0% no-repeat padding-box",
      borderRadius: "10px",
      display: "flex",
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition, color: "#043163" ,fontSize: '1.5vw'};
    },
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: "rgba(243, 243, 243, 1)",
        color: "#043163",
      };
    },
    placeholder: (styles) => {
      return {
        ...styles,
        color: "#043163",
        fontSize: '1.5vw'
      };
    },
    dropdownIndicator: (styles) => {
      return {
        ...styles,
        color: "#043163",
      };
    },
  };
  return customStyles;
}
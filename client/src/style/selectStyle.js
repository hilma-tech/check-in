export default function SelectStyle(){
    const customStyles = {
        menu: (provided, state) => ({
          ...provided,
          borderBottom: '1px solid  rgba(255, 255, 255, 0)',
          padding: 5,
          color: '#043163', 
          backgroundColor: 'rgba(188, 188, 203, 0.2)'
        }),
      
        control: (_, { selectProps: { width }}) => ({
          width: width,
          color: '#043163',
          background: 'rgba(188, 188, 203, 0.2) 0% 0% no-repeat padding-box',
          borderRadius: '10px',
          display: 'flex',  
        }),
      
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition, backgroundColor: 'rgba(188, 188, 203, 0.2)', color: '#043163'};
        },
        option: (styles) => {
            return {
              ...styles,
                backgroundColor: 'rgba(188, 188, 203, 0.2)',
                color: '#043163',
              }},
        placeholder: (styles) => {
            return {
                ...styles,
                backgroundColor: 'rgba(188, 188, 203, 0.2)',
                color: '#043163',
              }},
        dropdownIndicator: (styles) => {
            return {
                ...styles,
                color: '#043163',
              }},
      }
    return customStyles;
}



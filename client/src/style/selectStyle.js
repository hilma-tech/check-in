export default function SelectStyle(){
    const customStyles = {
        menu: (provided, state) => ({
          ...provided,
          borderBottom: '1px solid  rgba(255, 255, 255, 0)',
          padding: 5,
          color: '#043163', 
          backgroundColor: '#BCBCCB'
        }),
      
        control: (_, { selectProps: { width }}) => ({
          width: width,
          color: '#043163',
          background: '#BCBCCB 0% 0% no-repeat padding-box',
          borderRadius: '10px',
          display: 'flex',  
        }),
      
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition, backgroundColor: '#BCBCCB', color: '#043163'};
        },
        option: (styles) => {
            return {
              ...styles,
                backgroundColor: '#BCBCCB',
                color: '#043163',
              }},
        placeholder: (styles) => {
            return {
                ...styles,
                backgroundColor: '#BCBCCB',
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



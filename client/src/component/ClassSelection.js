import React, { Component } from "react";
import Select from "react-select";
import "../style/formStyle.css";
import SelectStyle from "../style/selectStyle";

class ClassSelection extends Component {
  constructor() {
    super();
  }

  sendValue = (props) => {
    this.props.saveValue(props.value, this.props.id);
  };

  render() {
    return (
      <>
        <Select
          options={this.props.options}
          styles={SelectStyle()}
          onChange={this.sendValue}
          defaultValue={{ value: "default", label: "בחר כיתה" }}
        />
      </>
    );
  }
}

export default ClassSelection;

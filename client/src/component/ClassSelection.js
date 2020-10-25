import React, { Component } from "react";
import Select from "react-select";
import SelectStyle from "../style/selectStyle";
import "../style/formStyle.css";

class ClassSelection extends Component {
  constructor() {
    super();
  }

  sendValue = (props) => {
    this.props.saveValue(props.value, this.props.id)
  };

  render() {
    return (
      <>
        <Select
          options={this.props.options}
          styles={SelectStyle()}
          onChange={this.sendValue}
          defaultValue={{ value: "default", label: "בחר..." }}
        />
      </>
    );
  }
}

export default ClassSelection;

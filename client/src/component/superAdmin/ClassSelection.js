import React, { Component } from "react";
import Select from "react-select";
import "../../style/form_style.css";
import "../../style/add_game_style.css"
import SelectStyle from "../../style/select_style";
import "../../style/class_selection_style.css"

class ClassSelection extends Component {
  constructor() {
    super();
  }

  sendValue = (props) => {
    this.props.saveValue(props.value, this.props.id);
  };

  removeField = () => {
    this.props.removal(this.props.id);
  };

  render() {
    return (
      <>
      <div className='  gameField classSelection'>
        <Select
        className='classSelectionInAddTecher'
          options={this.props.options}
          styles={SelectStyle()}
          onChange={this.sendValue}
          defaultValue={{ value: "default", label: "בחר כיתה" }}
        />
      <img
            onClick={this.removeField}
            className="removeFieldIcon"
            src="/icons/delete.svg"
          />
        </div>
      </>
    );
  }
}

export default ClassSelection;

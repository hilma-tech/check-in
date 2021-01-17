import React, { Component } from "react";
import Select from "react-select";
import "../../style/superAdmin/form_style.scss";
import "../../style/superAdmin/add_game_style.scss"
import SelectStyle from "../../style/superAdmin/select_style";
import "../../style/superAdmin/class_selection_style.css"

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
      <div className='classSelection'>
        {
          this.props.reading ? 
          <Select
        className='classSelectionInAddTecher'
          options={this.props.options}
          styles={SelectStyle()}
          onChange={this.sendValue}
          placeholder={this.props.defaultValue}
          isDisabled={true}
        /> :
        <Select
        className='classSelectionInAddTecher'
          options={this.props.options}
          styles={SelectStyle()}
          onChange={this.sendValue}
          defaultValue={{ value: "default", label: "בחר כיתה" }}
          isDisabled={false}
        />
        }
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

import React, { Component } from "react";
import WhiteBar from "../component/ArrowNavBar";
import "../style/add_game_style.css";
import "../style/form_style.css";
import GameFieldSelection from "../component/GameFieldSelection";

class AddGame extends Component {
  constructor() {
    super();

    this.state = {
      newKey: 1,
      // The first message is for gameName, after ther are gameDescription and gameRequirements
      errorMessages: [{ toShow: 'none', mess: '' }, { toShow: 'none', mess: '' }, { toShow: 'none', mess: '' }],
      fieldsData: [{ id: 0, name: null, selection: "text", value: [{id:0, value:""}], errorMessage: { toShow: 'none', mess: '' }}],
      gameName: "",
      gameDescription: "",
      gameRequirements: "",
      image: "",
    };
  }

  saveFieldName = (fieldName, fieldId) => {
    this.state.fieldsData.filter(
      (field) => field.id == fieldId
    )[0].name = fieldName;
  };

  saveSelection = (selection, fieldId) => {
    this.setState((prevState) => {
      prevState.fieldsData.filter(
        (field) => field.id == fieldId
      )[0].selection = selection;
      return { fieldsData: prevState.fieldsData };
    });
  };

  saveFieldValue = (fieldValue, fieldId, inputId, inputFiles) => {
    //only relevant to choice/multi-choice
    if (inputId) {
      this.setState((prevState) => {
        prevState.fieldsData[fieldId].value[inputId] = {
          id: inputId,
          value: fieldValue,
        };
        return { fieldsData: prevState.fieldsData };
      });
      //only relevant to image
    } else if (inputFiles) {
      this.setState((prevState) => {
        prevState.fieldsData[fieldId].value = [];
        prevState.fieldsData[fieldId].value[0] = {
          id: 0,
          value: inputFiles[0].name,
        };
        return { fieldsData: prevState.fieldsData };
      });
      //only relevant to text
    } else {
      this.setState((prevState) => {
        prevState.fieldsData[fieldId].value = [];
        prevState.fieldsData[fieldId].value[0] = {
          id: 0,
          value: fieldValue,
        };
        return { fieldsData: prevState.fieldsData };
      });
    }
  };

  addNewFieldData = () => {
    this.setState((prevState) => {
      let tempFieldsData = [...prevState.fieldsData];
      tempFieldsData.push({
        id: this.state.newKey,
        name: null,
        selection: "text",
        value: [{id:0, value: ''}],
        errorMessage: { toShow: 'none', mess: '' }
      });
      return { fieldsData: tempFieldsData };
    });
    this.setState((prevState) => {
      let nextKey = prevState.newKey;
      nextKey = nextKey + 1;
      return { newKey: nextKey };
    });
  };

  triggerRemoval = (fieldId) => {
    this.setState((prevState) => {
      let oldFieldArray = prevState.fieldsData;
      let newArray = oldFieldArray.filter((field) => field.id !== fieldId);
      console.log(newArray);
      return { fieldsData: newArray };
    });
  };

  updateBasicInfo = (props) => {
    switch (props.target.id) {
      case "gameName":
        this.setState({ gameName: props.target.value });
        break;
      case "gameDescription":
        this.setState({ gameDescription: props.target.value });
        break;
      case "gameRequirements":
        this.setState({ gameRequirements: props.target.value });
        break;
      case "image":
        this.setState({ image: props.target.value });
    }
  };

  saveData = () => {
    let dataArray = [
      this.state.gameName,
      this.state.gameDescription,
      this.state.gameRequirements,
    ];
    dataArray.map((value, index) => {
      if (value.length === 0) {
        console.log("empty");
        this.setState((prevState)=>{
          prevState.errorMessages[index].toShow = 'block'
          prevState.errorMessages[index].mess = '** שדה זה חייב להיות מלא **'
          return {errorMessages: prevState.errorMessages}
        })
      } else if (/[\u0590-\u09fe]/g.test(value) === false) {
        console.log("not hebrew");
        this.setState((prevState)=>{
          prevState.errorMessages[index].toShow = 'block'
          prevState.errorMessages[index].mess = '** שדה זה חייב להיות בעברית **'
          return {errorMessages: prevState.errorMessages}
        })
      } else {
        this.setState((prevState)=>{
          prevState.errorMessages[index].toShow = 'none'
          prevState.errorMessages[index].mess = ''
          return {errorMessages: prevState.errorMessages}
        })
      }
    });
    this.validateFields();
  };

  validateFields = () => {
    this.state.fieldsData.map((fields, index) => {
      if (fields.selection !== "image") {
        fields.value.map((field) => {
          console.log("bloop",field.value.length);
          // if(field !== true){
          if (field.value.length === 0) {
            console.log("empty");
            this.setState((prevState)=>{
              prevState.fieldsData[index].errorMessage.toShow ='block'
              prevState.fieldsData[index].errorMessage.mess ='** חייב למלא את כל השדות **'
              return {fieldsData: prevState.fieldsData}
            })
          } else if (/[\u0590-\u09fe]/g.test(field.value) === false) {
            console.log(field.value,"not hebrew");
            this.setState((prevState)=>{
              prevState.fieldsData[index].errorMessage.toShow ='block'
              prevState.fieldsData[index].errorMessage.mess ='** חייב למלא את השדות בעברית **'
              return {fieldsData: prevState.fieldsData}
            })
          } else {
            this.setState((prevState)=>{
              prevState.fieldsData[index].errorMessage.toShow ='none'
              prevState.fieldsData[index].errorMessage.mess =''
              return {fieldsData: prevState.fieldsData}
            })
          }
        });
      }
    });
  };
  

  render() {
    return (
      <>
        <div className="pageContainer">
          <WhiteBar />
          <div className="formContainer">
            <form className="formData">
              <label className="fieldTitle">
                שם המשחק:
                <p className='error' style={{display:this.state.errorMessages[0].toShow}}>{this.state.errorMessages[0].mess}</p>
                <input
                  id="gameName"
                  className="inputFields"
                  type="text"
                  placeholder="הכנס את שם המשחק..."
                  onBlur={this.updateBasicInfo}
                  onChange={this.saveData}
                />
              </label>
              <label className="fieldTitle">
                תיאור המשחק:
                <p className='error' style={{display:this.state.errorMessages[1].toShow}}>{this.state.errorMessages[1].mess}</p>
                <textarea
                  className="inputFields extendedField"
                  placeholder=""
                  id="gameDescription"
                  onBlur={this.updateBasicInfo}
                />
              </label>
              <label className="fieldTitle">
                דרישות המשחק:
                <p className='error' style={{display:this.state.errorMessages[2].toShow}}>{this.state.errorMessages[2].mess}</p>
                <textarea
                  className="inputFields extendedField"
                  placeholder=""
                  id="gameRequirements"
                  onBlur={this.updateBasicInfo}
                />
              </label>
              <label className="fieldTitle">
                תמונה:
                <input
                  type="file"
                  id="image"
                  className="hiddenInput"
                  onChange={this.updateBasicInfo}
                />
                <div className="borderCameraIcon">
                  <img className="cameraIcon" src="/icons/camera-icon.svg" />
                </div>
              </label>
              <br />
              <label className="fieldTitle">
                שדות:
                <br />
              </label>
            </form>
            {/* game fields */}
            {this.state.fieldsData.map((fieldObj) => {
              console.log("fieldObj",fieldObj)
              return (
                <div className="fieldSelectionWithClose">
                  <GameFieldSelection
                    key={fieldObj.id}
                    fieldId={fieldObj.id}
                    name={this.saveFieldName}
                    selection={this.saveSelection}
                    fieldValue={this.saveFieldValue}
                    removal={this.triggerRemoval}
                    originalName={fieldObj.name}
                    originalValue={fieldObj.value}
                    errorMessage={fieldObj.errorMessage}
                    changeInputType={
                      this.state.fieldsData.filter(
                        (field) => field.id == fieldObj.id
                      )[0].selection
                    }
                    imagePath={this.state.fieldsData[0].value[0].value}
                  />
                </div>
              );
            })}
            {/* add fields */}
            <div
              className="addSomethingNew"
              id="addNewField"
              onClick={this.addNewFieldData}
            >
              <img className="addIcon" src="/icons/addicon.svg"></img>
              <p className="addTitle">הוסף שדה</p>
            </div>
            <br />
            <button className="saveButton" onClick={this.saveData}>
              שמור
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default AddGame;

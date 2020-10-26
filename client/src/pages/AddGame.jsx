import React, { Component } from "react";
import WhiteBar from "../component/ArrowNavBar";
import "../style/AddGameStyle.css";
import "../style/formStyle.css";
import GameFieldSelection from "../component/GameFieldSelection";



class AddGame extends Component {
  constructor() {
    super();
   
    this.state = {
      newKey: 1,
      fieldsData: [{ id: 0, name: null, selection: "text", value: [false] }],
      gameName: "",
      gameDescription: "",
      gameRequirements: "",
      image: ""
    };
  }

  saveFieldName = (fieldName, fieldId) => {
    this.state.fieldsData.filter(field => field.id == fieldId)[0].name = fieldName;
  };

  saveSelection = (selection, fieldId) => {
    this.setState((prevState) => {
      prevState.fieldsData.filter(field => field.id == fieldId)[0].selection = selection;
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
    } else if(inputFiles){
      this.setState((prevState) => {
        prevState.fieldsData[fieldId].value = [];
        prevState.fieldsData[fieldId].value[0] = {
          id: 0,
          value: inputFiles[0].name,
        };
        return { fieldsData: prevState.fieldsData };
      });
      //only relevant to text
    } else{
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
        let tempFieldsData = [...prevState.fieldsData]
        tempFieldsData.push({
        id: this.state.newKey,
        name: null,
        selection: "text",
        value: [],
      })
      return({fieldsData: tempFieldsData})})
      this.setState((prevState)=>{
        console.log("key", prevState.newKey);
        let nextKey = prevState.newKey
        nextKey = nextKey+1
        return ({newKey: nextKey})
      })
    }

    triggerRemoval = (fieldId) => {
      this.setState(
        (prevState) => {
          let oldFieldArray = prevState.fieldsData
          let newArray = oldFieldArray.filter(field => field.id !== fieldId)
          console.log(newArray);
          return {fieldsData: newArray}
        }
      )
    }

    updateBasicInfo = (props) => {
      switch (props.target.id) {
        case "gameName": this.setState({gameName: props.target.value})
        break;
        case "gameDescription": this.setState({gameDescription: props.target.value})
        break;
        case "gameRequirements": this.setState({gameRequirements: props.target.value})
        break;
        case "image" : this.setState({image: props.target.value})
      }
     
    }

  render() {
    return (
      <>
    <div className="pageContainer">
          <WhiteBar />
          <div className="formContainer">
            <form className="formData">
              <label className="fieldTitle">
                שם המשחק:
                <input
                id="gameName"
                  className="inputFields"
                  type="text"
                  placeholder="הכנס את שם המשחק..."
                  onBlur={this.updateBasicInfo}
                />
              </label>
              <label className="fieldTitle">
                      תיאור המשחק:
                      <textarea
                        className="inputFields extendedField"
                        placeholder=""
                        id="gameDescription"
                        onBlur={this.updateBasicInfo}
                      />
              </label>
              <label className="fieldTitle">
                      דרישות המשחק:
                      <textarea
                        className="inputFields extendedField"
                        placeholder=""
                        id="gameRequirements"
                        onBlur={this.updateBasicInfo}
                      />
              </label>  
            <label className="fieldTitle">
              תמונה:
              <input type="file" id="image" className="hiddenInput" onChange={this.updateBasicInfo} />
              <div className='borderCameraIcon'>
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
            return (<div className='fieldSelectionWithClose'>
                    <GameFieldSelection
                     key={fieldObj.id}
                      fieldId={fieldObj.id}
                      name={this.saveFieldName}
                      selection={this.saveSelection}
                      fieldValue={this.saveFieldValue}
                      removal={this.triggerRemoval}
                      changeInputType={this.state.fieldsData.filter(field => field.id == fieldObj.id)[0].selection}
                      imagePath={this.state.fieldsData[0].value[0].value}
                    />
                   </div>);
          })}
          {/* add fields */}
          <div
            className="addSomethingNew"
            id='addNewField'
            onClick={this.addNewFieldData}
          >
            <img className="addIcon" src="/icons/addicon.svg"></img>
            <p className="addTitle">הוסף שדה</p>
            </div>
          <br />
          <button className="saveButton">שמור</button>
          </div>
        </div>
      </>
    );
  }
}

export default AddGame;

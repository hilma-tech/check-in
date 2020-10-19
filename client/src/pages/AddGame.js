import React, { Component } from "react";
import Select from 'react-select'

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

let insertion = [];

class AddGame extends Component {
  constructor() {
    super();
    this.state = {
      case: ""
    }
  }

  insertEls = () => {
    switch (this.state.case) {
      case "choc":
        console.log("hi");
        return <h1>day=4</h1>;
        break;
      case "":
        console.log("bye")
    }
  }

  handleChange = option => {
    if (option.value === "chocolate") {
      console.log("choc");
      this.setState = {case: "choc"}
    } else if (option.value === "vanilla") {
      console.log("vanil");
    } else {
      console.log("bewwy");
    }
  }

  render() {
    return (
      <>
        <form>
          <label>
            שם המשחק:
            <br />
            <input type="text" placeholder="" />
          </label>
          <br />
          <label>
            תיאור המשחק:
            <br />
            <input type="text" placeholder="" />
          </label>
          <br />
          <label>
            דרישות המשחק:
            <br />
            <input type="text" placeholder="" />
          </label>
          <br />
          <label>
            תמונה:
            <br />
            <input type="file" />
            <br />
            <img src="/icons/camera-icon.svg" />
          </label>
          <br />
          <label>
            שדות:
            <input type="text" placeholder="רשום את שם השדה" />
          </label>
          <h2>הוסף שדה</h2>
        </form>
            <Select options={options} onChange={this.handleChange}/>
           {this.insertEls}
      </>
    );
  }
}

export default AddGame;

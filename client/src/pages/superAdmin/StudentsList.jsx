import React from "react";
import Slide from "@material-ui/core/Slide";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.css";

const axios = require("axios").default;

class StudentsList extends React.Component {
  constructor() {
    super();
    this.state = {
      categors: ["שם התלמיד", "בית ספר", "כיתה"],
      enCategor: {
        "שם התלמיד": "name",
        "כיתה": "class",
        "בית ספר": "schoolName"
      },
      listDataStudents: [],
      searchVal: "",
      displaySearch: false,
    };
  }

  componentDidMount = async () => {
    const { data } = await axios.get("/api/student/getStudents");
    let studentsList= data.map((student) => {
      student.schoolName = student.School.name
      return student
    });
    this.setState({listDataStudents: studentsList})
  }

  //Save the user search value as searchVal in state.
  handleChang = (e) => {
    this.setState({ searchVal: e.target.value });
  };

  //When the user press the search icon it's start to show the input text for the searching.
  activateSearch = () => {
    this.setState({ displaySearch: true });
  };
  render() {
    return (
      <div className="StudentsList withMenu" dir="rtl">
        <div className="PageTitles">
          <p>תלמידים</p>
          {/* for now */}
          {/* <form className="search">
            <Slide
              direction="right"
              in={this.state.displaySearch}
              mountOnEnter
              unmountOnExit
            >
              <input
                type="text"
                name="search"
                value={this.state.searchVal}
                placeholder="חיפוש"
                onChange={this.handleChang}
              />
            </Slide>
            <p className="searchIcon" onClick={this.activateSearch}></p>
          </form> */}
        </div>
        {/*
                Create the school table with the general teble.
            */}
        <GeneralTable
          allData={this.state.listDataStudents}
          categors={this.state.categors}
          enCategor={this.state.enCategor}
        />
      </div>
    );
  }
}

export default StudentsList;

import React from "react";
import Slide from "@material-ui/core/Slide";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.css";

const axios = require("axios").default;

class TeachersList extends React.Component {
  constructor() {
    super();
    this.state = {
      // categors: ["שם המורה", "בית ספר", "כיתות"],
      categors: ["שם המורה", "בית ספר"],
      enCategor: {
        "שם המורה": "name",
        // "כיתות": "classes",
        "בית ספר": "schoolName"
      },
      listDataTeachers: [],
      searchVal: "",
      displaySearch: false,
    };
  }

  componentDidMount = async () => {
    const { data } = await axios.get("/api/teacher/getTeachers");
    let teachersList= data.map((teacher) => {
      teacher.schoolName = teacher.School.name
      return teacher
    });
    this.setState({listDataTeachers: teachersList})
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
      <div className="TeachersList withMenu" dir="rtl">
        <div className="PageTitles">
          <p>מורים</p>
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
                Create the school table with the general table.
            */}
        <GeneralTable
          allData={this.state.listDataTeachers}
          categors={this.state.categors}
          enCategor={this.state.enCategor}
        />
      </div>
    );
  }
}

export default TeachersList;

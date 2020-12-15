import React from "react";
import Slide from "@material-ui/core/Slide";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.css";

class TeachersList extends React.Component {
  constructor() {
    super();
    this.state = {
      categors: ["שם המורה", "בית ספר", "כיתות"],
      enCategor: {
        "שם המורה": "name",
        "כיתות": "classes",
        "schoolName": "בית ספר"
      },
      listDataTeachers: [
        {
          id: 1,
          "שם המורה": "נורית כהן",
          "בית ספר": "עשה חיל",
          כיתות: ["א'2", "ג'2"],
        },
        {
          id: 2,
          "שם המורה": "נורית כהן",
          "בית ספר": "עשה חיל",
          כיתות: ["א'2", "ג'2"],
        },
        {
          id: 3,
          "שם המורה": "נורית כהן",
          "בית ספר": "עשה חיל",
          כיתות: ["א'2", "ג'2"],
        },
        {
          id: 4,
          "שם המורה": "נורית כהן",
          "בית ספר": "עשה חיל",
          כיתות: ["א'2", "ג'2"],
        },
        {
          id: 5,
          "שם המורה": "נורית כהן",
          "בית ספר": "עשה חיל",
          כיתות: ["א'2", "ג'2"],
        },
        {
          id: 6,
          "שם המורה": "נורית כהן",
          "בית ספר": "עשה חיל",
          כיתות: ["א'2", "ג'2"],
        },
        {
          id: 7,
          "שם המורה": "נורית כהן",
          "בית ספר": "עשה חיל",
          כיתות: ["א'2", "ג'2"],
        },
      ],
      searchVal: "",
      displaySearch: false,
    };
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

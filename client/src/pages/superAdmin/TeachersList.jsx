import React from "react";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.scss";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import { teachersContext } from "../../stores/teachers.store.js";
import { errorMsgContext } from "../../stores/error.store.js";
import { Fade } from "@material-ui/core";

// const axios = require("axios").default;

class TeachersList extends React.Component {
  constructor() {
    super();
    this.state = {
      categors: ["שם המורה", "בית ספר", "כיתות"],
      enCategor: {
        "שם המורה": "name",
        כיתות: "classes",
        "בית ספר": "schoolName",
      },
      listDataTeachers: [],
      searchVal: "",
      displaySearch: false,
    };
  }

  componentDidMount = async () => {    
    this.getTeachers();
  };

  //Save the user search value as searchVal in state.
  handleChange = (e) => {
    this.setState({ searchVal: e.target.value });
  };

  //When the user press the search icon it's start to show the input text for the searching.
  activateSearch = () => {
    this.setState({ displaySearch: true });
  };

  //gets teachers from the DB
  getTeachers = async () => {
    await this.props.teachers.getTeachers();
    if (!this.props.teachers.successGettingTeachers) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל מורים מהשרת."
      );
    }
  };

  render() {
    return (
      <div className="TeachersList withMenu" dir="rtl">
          <div id="TableSearchbar">
        <div className="PageTitles">
          <p>מורים</p>
            <form
              className={
                this.state.displaySearch
                  ? "tablesSearchbar bordered"
                  : "tablesSearchbar"
              }
            >
              <Fade
                in={this.state.displaySearch}
                timeout={{
                  appear: 500,
                  enter: 400,
                  exit: 100,
                }}
                mountOnEnter
                unmountOnExit
              >
                <input
                  type="text"
                  name="search"
                  className="searchInp"
                  placeholder="חיפוש"
                  onChange={this.handleChange}
                />
              </Fade>
              <p className="searchIcon" onClick={this.activateSearch}></p>
            </form></div>
          </div>
        
        {/*
                Create the teacher table with the general table.
            */}

        <GeneralTable
          allData={this.props.teachers.listDataTeachers.filter((teacher) => {
            return teacher.name.includes(this.state.searchVal);
          })}
          categors={this.state.categors}
          enCategor={this.state.enCategor}
          loadMore={this.getTeachers}
          haveMoreData={this.props.teachers.haveMoreTeachers}
          startGetInfo={this.props.teachers.startGetTeachers}
          setClickedRow={this.props.teachers.getChosenTeacher}
          tableType="מורים"
        />
      </div>
    );
  }
}

const mapContextToProps = {
  teachers: teachersContext,
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(observer(TeachersList));

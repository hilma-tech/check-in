import React from "react";
import Slide from "@material-ui/core/Slide";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.css";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import { teachersContext } from "../../stores/teachers.store.js";
import LoadingTable from "../../component/superAdmin/LoadingTable.jsx";
import { errorMsgContext } from "../../stores/error.store.js";

const axios = require("axios").default;

class TeachersList extends React.Component {
  constructor() {
    super();
    this.state = {
      categors: ["שם המורה", "בית ספר", "כיתות"],
      enCategor: {
        "שם המורה": "name",
        "כיתות": "classes",
        "בית ספר": "schoolName"
      },
      listDataTeachers: [],
      searchVal: "",
      displaySearch: false,
    };
  }

  componentDidMount = async () => {
    this.getTeachers();
  }

  //Save the user search value as searchVal in state.
  handleChang = (e) => {
    this.setState({ searchVal: e.target.value });
  };

  //When the user press the search icon it's start to show the input text for the searching.
  activateSearch = () => {
    this.setState({ displaySearch: true });
  };

  getTeachers = async () => {
    await this.props.teachers.setTeachers();
    if (!this.props.teachers.successGettingTeachers) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל מורים מהשרת."
      );
    }
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
                Create the teacher table with the general table.
            */}

        {/* {!this.props.teachers.haveMoreTeachers &&
          this.props.teachers.listDataTeachers.length === 0 ? (
            <LoadingTable />) :
          <> */}
            <GeneralTable
              allData={this.props.teachers.listDataTeachers}
              categors={this.state.categors}
              enCategor={this.state.enCategor}
              loadMore={this.getTeachers}
              haveMoreData={this.props.teachers.haveMoreTeachers}
            />
          {/* </>} */}
      </div>
    );
  }
}




const mapContextToProps = {
  teachers: teachersContext,
  errorMsg: errorMsgContext
};

export default withContext(mapContextToProps)(observer(TeachersList));

import React from "react";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.scss";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import { teachersContext } from "../../stores/teachers.store.js";
import { errorMsgContext } from "../../stores/error.store.js";
import { Fade } from "@material-ui/core";
import OutsideClickHandler from "react-outside-click-handler";

let delayTime = null

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
      searched: false
    };
  }

  componentDidMount = async () => {
    this.getTeachers();
  };

  //Save the user search value as searchVal in state.
  handleChange = async (e) => {
    let value = e.target.value
    if (delayTime) clearTimeout(delayTime)
    await this.setState({ searchVal: value });
    if (value === '') {
      this.searchTeachers()
    }
    else delayTime = setTimeout(async () => {
      this.searchTeachers()
    }, 300)
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
  searchTeachers = async () => {
    this.props.teachers.searchTeachersReplace()
    this.setState({ searched: true })
    await this.props.teachers.searchTeachers(this.state.searchVal)
  }
  render() {
    return (
      <div className="TeachersList withMenu" dir="rtl">
        <div id="TableSearchbar">
          <div className="PageTitles">
            <p>מורים</p>
            <OutsideClickHandler
              onOutsideClick={() =>
               this.setState({searched:false, searchVal:'',displaySearch:false })
              }
            > 
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
            </form>
            </OutsideClickHandler>
            </div>
        </div>

        {/*
                Create the teacher table with the general table.
            */}

        <GeneralTable
          allData={this.state.searched ? this.props.teachers.searchedTeachers : this.props.teachers.listDataTeachers}
          search={this.state.displaySearch}
          categors={this.state.categors}
          enCategor={this.state.enCategor}
          loadMore={this.getTeachers}
          haveMoreData={this.state.searched ? false : this.props.teachers.haveMoreTeachers}
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

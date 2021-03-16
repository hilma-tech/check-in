import React from "react";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.scss";
import { studentsContext } from "../../stores/students.store.js";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
import { errorMsgContext } from "../../stores/error.store.js";
import { Fade } from "@material-ui/core";
import OutsideClickHandler from "react-outside-click-handler";


class StudentsList extends React.Component {
  constructor() {

    super();
    this.state = {
      categors: ["שם התלמיד", "בית ספר", "כיתות"],
      enCategor: {
        "שם התלמיד": "name",
        כיתות: "classes",
        "בית ספר": "schoolName",
      },
      searchVal: "",
      displaySearch: false,
      searched: false
    };
  }

  componentDidMount = async () => {
    this.getStudents();
  };

  //! not in use
  //Save the user search value as searchVal in state.
  handleChange =async  (e) => {
    await this.setState({ searchVal: e.target.value });
    this.searchStudents()
  };
  //! not in use
  //When the user press the search icon it's start to show the input text for the searching.
  activateSearch = () => {
    this.setState({ displaySearch: true });
  };

  getStudents = async () => {
    await this.props.students.getStudents();
    if (!this.props.students.successGettingStudents) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל תלמידים מהשרת."
      );
    }
  };
  searchStudents = async () => {
    this.props.students.searchStudentsReplace()
    this.setState({ searched: true })
    await this.props.students.searchStudents(this.state.searchVal)
  }

  render() {
    return (
      <div className="StudentsList withMenu" dir="rtl">
        <div id="TableSearchbar">
          <div className="PageTitles">
            <p>תלמידים</p>
            <OutsideClickHandler
              onOutsideClick={() =>
               this.setState({searched:false, searchVal:'',displaySearch:false })
              }
            > <form
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
                <p className="searchIcon" onClick={ this.activateSearch}></p>
              </form></OutsideClickHandler>
          </div></div>
        {/*
                Create the school table with the general teble.
            */}

          <GeneralTable
            allData={this.state.searched ? this.props.students.searchedStudents : this.props.students.listDataStudents}
            search={this.state.displaySearch}
            categors={this.state.categors}
            enCategor={this.state.enCategor}
            loadMore={this.getStudents}
            haveMoreData={this.state.searched ? false : this.props.students.haveMoreStudents}
            startGetInfo={this.props.students.startGetStudents}
            setClickedRow={this.props.students.getChosenStudent}
            tableType="תלמידים"
          />
      </div>
    );
  }
}

const mapContextToProps = {
  students: studentsContext,
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(observer(StudentsList));

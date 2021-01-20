import React from "react";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.css";
import { studentsContext } from "../../stores/students.store.js";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
import { errorMsgContext } from "../../stores/error.store.js";

class StudentsList extends React.Component {
  constructor() {
    super();
    this.state = {
      categors: ["שם התלמיד", "בית ספר", "כיתות"],
      enCategor: {
        "שם התלמיד": "name",
        "כיתות": "classes",
        "בית ספר": "schoolName"
      },
      searchVal: "",
      displaySearch: false,
    };
  }

  componentDidMount = async () => {
    this.getStudents();
  }

  //Save the user search value as searchVal in state.
  handleChang = (e) => {
    this.setState({ searchVal: e.target.value });
  };

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
        
        {/* {!this.props.students.haveMoreStudents &&
          this.props.students.listDataStudents.length === 0 ? (
            <LoadingTable />) :
          <> */}
            <GeneralTable
              allData={this.props.students.listDataStudents}
              categors={this.state.categors}
              enCategor={this.state.enCategor}
              loadMore={this.getStudents}
              haveMoreData={this.props.students.haveMoreStudents}
              startGetInfo={this.props.students.startGetStudents}
              setClickedRow={this.props.students.getChosenStudet}
            />
          {/* </>
        } */}
      </div>
    );
  }
}

const mapContextToProps = {
  students: studentsContext,
  errorMsg: errorMsgContext
};

export default withContext(mapContextToProps)(observer(StudentsList));

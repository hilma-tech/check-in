import React from "react";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.scss";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
import { errorMsgContext } from "../../stores/error.store.js";
import { schoolsContext } from "../../stores/schools.store.js";

class SchoolsList extends React.Component {
  constructor() {
    super();
    this.state = {
      categors: ["שם בית הספר", "עיר"],
      enCategor: {
        "שם בית הספר": "name",
        עיר: "city",
      },
      listDataSchools: [],
      searchVal: "",
      displaySearch: false,
    };
  }

  componentDidMount = async () => {
    this.getSchools();
  };

  //Save the user search value as searchVal in state.
  handleChange = (e) => {
    this.setState({ searchVal: e.target.value });
  };

  //When the user press the search icon it's start to show the input text for the searching.
  activateSearch = () => {
    this.setState({ displaySearch: true });
  };

  getSchools = async () => {
    await this.props.schools.getSchools();
    if (!this.props.schools.successGettingSchools) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל בתי ספר מהשרת."
      );
    }
  };

  render() {
    return (
      <div className="SchoolsList withMenu" dir="rtl">
        <div className="PageTitles">
          <p>בתי ספר</p>
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
                onChange={this.handleChange}
              />
            </Slide>
            <p className="searchIcon" onClick={this.activateSearch}></p>
          </form> */}
        </div>
        {/*
            Create the school table with the general teble.
        */}
        <GeneralTable
          allData={this.props.schools.listDataSchools}
          categors={this.state.categors}
          enCategor={this.state.enCategor}
          loadMore={this.getSchools}
          haveMoreData={this.props.schools.haveMoreSchools}
          startGetInfo={this.props.schools.startGetSchools}
          setClickedRow={this.props.schools.getChosenSchool}
        />
      </div>
    );
  }
}

const mapContextToProps = {
  schools: schoolsContext,
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(observer(SchoolsList));

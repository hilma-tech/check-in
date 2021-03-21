import React from "react";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.scss";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
import { errorMsgContext } from "../../stores/error.store.js";
import { schoolsContext } from "../../stores/schools.store.js";
import { Fade } from "@material-ui/core";

let delayTime = null;

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
      searched: false,
    };
  }

  componentDidMount = async () => {
    this.getSchools();
  };

  //Save the user search value as searchVal in state.
  handleChange = async (e) => {
    let value = e.target.value;
    if (delayTime) clearTimeout(delayTime);
    await this.setState({ searchVal: value });
    if (value === "") {
      this.searchSchools();
    } else
      delayTime = setTimeout(async () => {
        this.searchSchools();
      }, 300);
  };

  //When the user press the search icon it's start to show the input text for the searching.
  activateSearch = () => {
    this.setState({ displaySearch: true });
  };
  closeSearch = () => {
    this.setState({
      searchVal: "",
      searched: false,
      displaySearch: false,
    });
  };

  searchSchools = async () => {
    this.props.schools.searchSchoolsReplace();
    this.setState({ searched: true });
    await this.props.schools.searchSchools(this.state.searchVal);
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
        <div id="TableSearchbar">
          <div className="PageTitles">
            <p>בתי ספר</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
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
              <p
                className="searchIcon"
                onClick={
                  !this.state.displaySearch
                    ? this.activateSearch
                    : this.closeSearch
                }
              ></p>
            </form>
          </div>
        </div>
        {/*
            Create the school table with the general teble.
        */}
        <GeneralTable
          allData={
            this.state.searched
              ? this.props.schools.searchedSchools
              : this.props.schools.listDataSchools
          }
          search={this.state.displaySearch}
          categors={this.state.categors}
          enCategor={this.state.enCategor}
          loadMore={this.getSchools}
          haveMoreData={this.props.schools.haveMoreSchools}
          startGetInfo={this.props.schools.startGetSchools}
          setClickedRow={this.props.schools.getChosenSchool}
          tableType="בתי ספר"
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

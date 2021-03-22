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
          </div>
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

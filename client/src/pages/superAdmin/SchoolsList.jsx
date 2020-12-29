import React from "react";
import Slide from "@material-ui/core/Slide";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.css";
import LoadingTable from "../../component/superAdmin/LoadingTable.jsx";

const axios = require("axios").default;

class SchoolsList extends React.Component {
  constructor() {
    super();
    this.state = {
      categors: ["שם בית הספר", "עיר"],
      enCategor: {
        "שם בית הספר": "name",
        "עיר": "city"
      },
      listDataSchools: [],
      searchVal: "",
      displaySearch: false,
    };
  }
  componentDidMount = async () => {
    try{
      const { data } = await axios.get("/api/school/getSchools");
      this.setState({ listDataSchools: data })
    } catch(error){
      console.log('something wrong');
    }
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
                onChange={this.handleChang}
              />
            </Slide>
            <p className="searchIcon" onClick={this.activateSearch}></p>
          </form> */}
        </div>
        {/*
                Create the school table with the general teble.
            */}
        {this.state.listDataSchools.length === 0 ? (
          <LoadingTable />) :
          <>
            <GeneralTable
              allData={this.state.listDataSchools}
              categors={this.state.categors}
              enCategor={this.state.enCategor}
            />
          </>}
      </div>
    );
  }
}

export default SchoolsList;

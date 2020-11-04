import React from "react";
import Slide from "@material-ui/core/Slide";
import GeneralTable from "../../component/superAdmin/GeneralTable.jsx";
import "../../style/superAdmin/table_style.css";

class SchoolsList extends React.Component {
  constructor() {
    super();
    this.state = {
      categors: ["שם בית הספר", "עיר"],
      listDataSchools: [
        {
          id: 1,
          "שם בית הספר": "עשה חיל",
          עיר: "אפרת",
        },
        {
          id: 2,
          "שם בית הספר": "עשה חיל",
          עיר: "אפרת",
        },
        {
          id: 3,
          "שם בית הספר": "עשה חיל",
          עיר: "אפרת",
        },
        {
          id: 4,
          "שם בית הספר": "עשה חיל",
          עיר: "אפרת",
        },
        {
          id: 5,
          "שם בית הספר": "עשה חיל",
          עיר: "אפרת",
        },
        {
          id: 6,
          "שם בית הספר": "עשה חיל",
          עיר: "אפרת",
        },
        {
          id: 7,
          "שם בית הספר": "עשה חיל",
          עיר: "אפרת",
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
      <div className="SchoolsList" dir="rtl">
        <div className="PageTitles">
          <p>בתי ספר</p>
          <form className="search">
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
          </form>
        </div>
        {/*
                Create the school table with the general teble.
            */}
        <GeneralTable
          allData={this.state.listDataSchools}
          categors={this.state.categors}
        />
      </div>
    );
  }
}

export default SchoolsList;

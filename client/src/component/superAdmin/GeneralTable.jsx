import React from "react";
import RowData from "./RowData.jsx";
import { withRouter } from "react-router-dom";
import LoadingTable from "./LoadingTable.jsx";
import Tooltip from '@material-ui/core/Tooltip';
import { Slide } from "@material-ui/core";
import AddStudentPopUp from "./AddStudentPopUp.jsx";

class GeneralTable extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  //moves the user to page where they
  //can add a row to the table they came from
  onClickAdd = () => {
    this.props.history.push(this.props.location.pathname + "Add");
  };
  
  render() {
    return (
      <div className="generalTable">
        <div className="TableTitles">
          {
            //Return the table's categors row
            this.props.categors.map((val, index) => {
              return (
                <p key={index} className={"item" + index + " bold"}>
                  {val}
                </p>
              );
            })
          }
        </div>
        {this.props.haveMoreData && this.props.allData.length === 0 ? (
          <LoadingTable />
        ) : (
            <>
              <div className="AllData">
                {this.props.allData.length === 0 ?
                  this.props.search ? <p>אין {this.props.tableType} במערכת בשם זה</p> :
                    <p>אין {this.props.tableType} במערכת</p> :
                  //Make the rows in the table
                  this.props.allData.map((val) => {
                    return (
                      <RowData
                        key={val.id}
                        data={val}
                        categors={this.props.categors}
                        enCategor={this.props.enCategor}
                        setClickedRow={this.props.setClickedRow}
                      />
                    );
                  })
                }
              </div>
              {this.props.startGetInfo ? (
                <img
                  style={{ width: "8vw", height: "8vw", marginTop: "1vh" }}
                  src="/icons/loading.gif"
                  alt="loading..."
                ></img>
              ) : (
                  <button
                    className="showMoreGamesB"
                    onClick={this.props.loadMore}
                    style={{
                      marginTop: "1vh",
                      display: this.props.haveMoreData && !this.props.search? "inline-block" : "none",
                    }}
                  >
                    הצג עוד
                  </button>
                )}
            </>
          )}

        {this.props.location.pathname.includes("student") ?
          <div className="addingButtonForStudent">
            <div className="addingButton"></div>
            <AddStudentPopUp />
          </div>
          :
            <div className="addingButton" onClick={this.onClickAdd}></div>
        }
      </div>
    );
  }
}

export default withRouter(GeneralTable);

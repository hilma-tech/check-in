import React from "react";
import RowData from "./RowData.jsx";
import { withRouter } from "react-router-dom";

class GeneralTable extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }
  onClickAdd = () => {
    this.props.history.push(this.props.location.pathname + "Add");
  };
  render() {
    return (
      <div>
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
        <div className="AllData">
          {
            //Make the rows in the table
            this.props.allData.map((val, index) => {
              return (
                <RowData
                  key={index}
                  data={val}
                  categors={this.props.categors}
                />
              );
            })
          }
        </div>
        <div className="addingButton" onClick={this.onClickAdd}></div>
      </div>
    );
  }
}

export default withRouter(GeneralTable);

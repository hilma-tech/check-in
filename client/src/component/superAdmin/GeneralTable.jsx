import React from "react";
import RowData from "./RowData.jsx";
import { withRouter } from "react-router-dom";
import LoadingTable from "./LoadingTable.jsx";

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
      <div className='generalTable'>
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
        {this.props.haveMoreData &&
          this.props.allData.length === 0 ? (
            <LoadingTable />) :
          <>
            <div className="AllData">
              {
                //Make the rows in the table
                this.props.allData.map((val, index) => {
                  return (
                    <RowData
                      key={index}
                      data={val}
                      categors={this.props.categors}
                      enCategor={this.props.enCategor}
                      setClickedRow={this.props.setClickedRow}
                    />
                  );
                })
              }
            </div>
            {
              this.props.startGetInfo ? 
              <img
              style={{ width: "8vw", height:'8vw', marginTop: '1vh' }}
              src="/icons/loading.gif"
              alt="loading..."
            ></img> :
            <button
              className="showMoreGamesB"
              onClick={this.props.loadMore}
              style={{
                marginTop: '1vh',
                display:
                  this.props.haveMoreData
                    ? "inline-block"
                    : "none",
              }}
            >
              הצג עוד
            </button>
            }
          </>
        }
      </div>
    );
  }
}

export default withRouter(GeneralTable);

import React from "react";
import "../../style/superAdmin/row_data_style.scss";
import { withRouter } from "react-router-dom";
import { Icon } from "@iconify/react";
import iosArrowBack from "@iconify/icons-ion/ios-arrow-back";

class RowData extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  //When we press on row the user is passed on to the edit page of the item
  onClickEdit = async (id) => {
    await this.props.setClickedRow(id);
    //for now
    this.props.history.push(this.props.location.pathname + "Edit");
  };

  render() {
    return (
      <div
        onClick={() => {
          this.onClickEdit(this.props.data.id);
        }}
        className="rowData"
      >
        <div className="Details">
          {
            // Order the data (the keys are the categories).
            // If there is class array it maps the class array
            // and returns all the classes.
            this.props.categors.map((categor, index) => {
              return categor !== "כיתות" ? (
                <p className={"item" + index} key={index}>
                  {this.props.data[this.props.enCategor[categor]]}
                </p>
              ) : (
                <div key={index} className={"item" + index + " classes"}>
                  {" "}
                  {this.props.data[this.props.enCategor[categor]] ? (
                    this.props.data[this.props.enCategor[categor]].map(
                      (val, categorIndex) => {
                        return <p key={categorIndex}>{val}</p>;
                      }
                    )
                  ) : (
                    <p></p>
                  )}{" "}
                </div>
              );
            })
          }
        </div>
        <p>
          <Icon icon={iosArrowBack} />
        </p>
      </div>
    );
  }
}

export default withRouter(RowData);

import React from 'react';
import SmallMenuBar from "../../component/teacher/SmallMenuBar.jsx";
import SmallNavBar from "../../component/teacher/SmallNavBar.jsx";

class Games extends React.Component {
    constructor() {
        super();
        this.state = {  }
    }
    render() { 
        return ( 
        <div>
            <SmallMenuBar />
            <SmallNavBar />
            <img
              className="smallBackArrow"
              src="/icons/awesome-arrow-right.svg"
            />
        </div> );
    }
}
 
export default Games;

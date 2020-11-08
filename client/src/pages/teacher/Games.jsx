import React from 'react';

class Games extends React.Component {
    constructor() {
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
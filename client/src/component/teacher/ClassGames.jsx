import React from 'react';

class ClassGames extends React.Component {
    constructor() {
        super();
    }
    render() { 
        return ( 
            <div className='gameContainer'>
                <img className={this.props.chosen ? "classGameIconClose" : 'classGameIconAdd'} alt="" src={this.props.chosen ? '/icons/ionic-close-circle-outline.svg' : '/icons/ionic-ios-add-circle-outline.svg'} />
                    <img className="classGameImg" alt="" src={this.props.game.url} />
                    <h2 className="classGameTitleBackground"></h2>
                    <h1 className="classGameTitle">{this.props.game.name}</h1>
            </div>
         );
    }
}
 
export default ClassGames;
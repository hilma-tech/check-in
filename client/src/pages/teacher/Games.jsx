import React from 'react';
import SmallMenuBar from "../../component/teacher/SmallMenuBar.jsx";
import SmallNavBar from "../../component/teacher/SmallNavBar.jsx";
import ClassGames from '../../component/teacher/ClassGames.jsx'
import '../../style/teacher/class_games.scss'
import PageTitle from '../../component/teacher/PageTitle.jsx';
import ArrowBar from '../../component/teacher/ArrowBar.jsx';
import { errorMsgContext } from '../../stores/error.store.js';
import { gamesContext } from '../../stores/games.store.js';
import { chosenGameEditContext } from '../../stores/chosenGameEdit.store.js';
import { IsAuthenticatedContext } from '@hilma/auth';
import { withRouter } from 'react-router-dom';
import { withContext } from '@hilma/tools';
import { observer } from 'mobx-react';

const axios = require("axios").default;

class Games extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.games.resetShowOptions();
        if (this.props.games.gamesList.length === 0) {
          this.getGames();
        }
      }
    
      getGames = async () => {
        await this.props.games.setGames();
        if (!this.props.games.successGettingGames) {
          this.props.errorMsg.setErrorMsg(
            "הייתה שגיאה בשרת. לא ניתן לקבל משחקים מהשרת."
          );
        }
      };

    render() {
        return (
            <div>
                <SmallMenuBar />
                <PageTitle title="כיתה א'1"/>
                <SmallNavBar />
                <ArrowBar page='games'/>
                <div className="smallAlign" style={{top:'39.75vh'}}>
                    <div className='chosenGamesForClass'>
                        {
                            this.props.games.chosenGameList.map((gameData, i) => {
                                return (<ClassGames
                                    index={i}
                                    changeGameStatus={this.props.games.removeGameFromClass}
                                    chosen={true}
                                    name={gameData.game_name}
                                    // name={gameData.name.length > 15 ? gameData.name.slice(0, 15) + "..." : gameData.name}
                                    image={gameData.image}
                                />)
                            })
                        }
                    </div>
                    <p className='gameListTitle'>משחקים שיתן להוסיף:</p>
                    {/* add search option */}
                    <div className='listGamesForClass'>
                        {this.props.games.gamesList.map((image, index) => {
                                return (<ClassGames
                                    changeGameStatus={this.props.games.addGameToClass}
                                    chosen={false}
                                    name={image.game_name}
                                    // name={image.game_name.length > 15 ? image.game_name.slice(0, 15) + "..." : image.game_name}
                                    image={image.image}
                                    index={index}
                                />)
                            })
                        }
                    </div>
                </div>
            </div>);
    }
}

const mapContextToProps = {
    errorMsg: errorMsgContext,
    games: gamesContext,
    chosenGameEditContext: chosenGameEditContext,
    isAuthenticated: IsAuthenticatedContext,
  };
  
export default withContext(mapContextToProps)(withRouter(observer(Games)));
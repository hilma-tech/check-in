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
        this.state = {
            chosenGames: [{
                name: "Gorilla",
                url:
                    "https://c402277.ssl.cf1.rackcdn.com/photos/18330/images/hero_small/Mountain_Gorilla_Silverback_WW22557.jpg?1576515753",
            },
            ],
            gamesList: [{
                name: "Orangutan",
                url:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG/1200px-Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG",
            },
            {
                name: "Baboon",
                url:
                    "https://upload.wikimedia.org/wikipedia/commons/3/35/Olive_baboon_Ngorongoro.jpg",
            },
            {
                name: "Giraffe",
                url: "https://www.andrewscamera.com/img/s/v-10/p1348222310-3.jpg",
            },]
        }
    }

    componentDidMount() {
        this.props.games.resetShowOptions();
        if (this.props.games.gamesList.length === 0) {
          this.getGames();
        }
      }
    
      getGames = async () => {
        let getGames = await this.props.games.setGames();
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
                            this.state.chosenGames.map((gameData) => {
                                return (<ClassGames
                                    chosen={true}
                                    name={gameData.name.length > 15 ? gameData.name.slice(0, 15) + "..." : gameData.name}
                                    image={gameData.url}
                                />)
                            })
                        }
                    </div>
                    <p className='gameListTitle'>משחקים שיתן להוסיף:</p>
                    {/* add search option */}
                    <div className='listGamesForClass'>
                        {this.props.games.gamesList.map((image, index) => {
                                return (<ClassGames
                                    chosen={false}
                                    name={image.game_name.length > 15 ? image.game_name.slice(0, 15) + "..." : image.game_name}
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
import React from 'react';
import SmallMenuBar from "../../component/teacher/SmallMenuBar.jsx";
import SmallNavBar from "../../component/teacher/SmallNavBar.jsx";
import ClassGames from '../../component/teacher/ClassGames.jsx'
import '../../style/teacher/class_games.scss'
import PageTitle from '../../component/teacher/PageTitle.jsx';

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
    render() {
        return (
            <div>
                <SmallMenuBar />
                <PageTitle title="כיתה א'1"/>
                <SmallNavBar />
                <div className="smallAlign">
                    <div className='gamesChooseDistractions'>
                        <img
                            className="smallBackArrow"
                            src="/icons/awesome-arrow-right.svg"
                        />
                        <p className='gamesChooseDistractionsText'>
                        בחר/י משחק כדי לערוך אותו,
                        על מנת להוסיף משחק חדש לכיתה זו
                        לחץ/י על סמל הפלוס
                        </p>
                    </div>
                    <div className='chosenGamesForClass'>
                        {
                            this.state.chosenGames.map((gameData) => {
                                return (<ClassGames
                                    chosen={true}
                                    game={gameData}
                                />)
                            })
                        }
                    </div>
                    <p className='gameListTitle'>משחקים שיתן להוסיף:</p>
                    {/* add search option */}
                    <div className='listGamesForClass'>
                        {
                            this.state.gamesList.map((gameData) => {
                                return (<ClassGames
                                    chosen={false}
                                    game={gameData}
                                />)
                            })
                        }
                    </div>
                </div>
            </div>);
    }
}

export default Games;

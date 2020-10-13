import React, { Component } from 'react'
import '../style/GamesStyle.css'



class Games extends Component {
    constructor() {
        super()
    }
    
    

    render() {
        return(
            <div className="grid">
                <div className="imageContainer item1">
                    <h1>hello</h1>
                    <img src="https://c402277.ssl.cf1.rackcdn.com/photos/18330/images/hero_small/Mountain_Gorilla_Silverback_WW22557.jpg?1576515753"/>
                </div>
                <div className="imageContainer item2">
                    <h1>אורגנגוטן</h1>
                    <img src="https://s28164.pcdn.co/files/Orangutan-0224-7457-1280x720.jpg"/>
                </div>
                <div className="imageContainer item3">
                    <h1>בבון</h1>
                    <img src="https://www.indianapoliszoo.com/wp-content/uploads/2018/04/CROPPED_Baboon-Dan_Boyd-1resizedresized.jpg"/>
                </div>
                <div className="imageContainer item4">
                    <h1>בבון</h1>
                    <img src="https://www.indianapoliszoo.com/wp-content/uploads/2018/04/CROPPED_Baboon-Dan_Boyd-1resizedresized.jpg"/>
                </div>
            </div>
        )
    }
}

export default Games;
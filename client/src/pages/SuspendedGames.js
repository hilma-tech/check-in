import React, { Component } from 'react'

console.log("suspended");

class SuspendedGames extends Component {
    constructor() {
        super()
        this.state={name: ''}
    }
    render() {
        console.log("entered")
        return(
            <div>
                <h1>hewwo</h1>
            </div>
        )
    }
}

export default SuspendedGames;
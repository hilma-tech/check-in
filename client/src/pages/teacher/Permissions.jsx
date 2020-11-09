import React, { Component } from 'react'
import PageTitle from '../../component/teacher/PageTitle'
import SmallMenuBar from '../../component/teacher/SmallMenuBar'
import SmallNavBar from '../../component/teacher/SmallNavBar'

export default class Permissions extends Component {
    render() {
        return <div>
            <SmallMenuBar/>
            <PageTitle title="כיתה א'3"/>
            <SmallNavBar active="permissions"/>
        </div>
    }
}
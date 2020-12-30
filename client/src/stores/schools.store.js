import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'

const axios = require("axios").default;

class Schools {
    listDataSchools = []
    haveMoreSchools = true
    successGettingSchools = true;
    startGetSchools = false;
    constructor() {
        makeObservable(this, {
            listDataSchools: observable,
            haveMoreSchools: observable,
            successGettingSchools: observable,
            startGetSchools: observable,
            setSchools: action,
        })
    }

    setSchools = async () => {
        try{
            this.startGetGames = true;
            const { data } = await axios.get("/api/school/getSchools",{ params:{ schoolsLength: this.listDataSchools.length }});
            this.listDataSchools = this.listDataSchools.concat(data.schoolsInfo)
            this.haveMoreSchools = data.haveMoreSchools;
            this.successGettingSchools = true;
            this.startGetSchools = false;
        } catch (error){
            this.successGettingSchools = false
            this.startGetSchools = false;
        }
    }
}

const schools = new Schools(); 
export const [schoolsContext, schoolsProvider, useSchools] = createMobXContext(schools);

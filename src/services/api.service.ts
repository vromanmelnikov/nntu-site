import axios from "axios";
import { STATIC_URL } from "../config/api.confige";
import { Popover } from 'reactstrap';

const MENTORS_API = `${STATIC_URL}/teachers.json`
const GROUPS_API = `${STATIC_URL}/groups.json`

interface Data {
    mentors: string[],
    disciplines: string[]
}

export default class ApiService {
    static getMentors() {
        return axios.get(MENTORS_API)
    }
    static getMentorsInfo() {
        return new Promise(
            (resolve) => {
                let mentorsData = this.getMentors().then(
                    (res: any) => {
                        let mentors: string[] = []
                        let disciplines: string[] = []
                        res.data.map(
                            (value: any) => {
                                mentors.push(value.name)
                                if (value.disciplines) {
                                    value.disciplines.split(', ').map(
                                        (desc: string) => {
                                            disciplines.push(desc)
                                        }
                                    )
                                }
                            }
                        )
                        let data: Data = {
                            mentors,
                            disciplines
                        }
                        return data
                    }
                )
                resolve(mentorsData)
            }
        )
    }

    static getGroups() {
        return axios.get(GROUPS_API)
    }
}
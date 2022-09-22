import { AddLessonModel } from "../models/editor.models"

const SET_CHANGE = 'SET_CHANGE' 
const SET_ADDING = 'SET_ADDING'
const SET_SENDING = 'SET_SENDING'

export let setChange = (value: any) => {
    return({
        type: SET_CHANGE,
        value
    })
}

export let setAdding = (value: AddLessonModel) => {
    return({
        type: SET_ADDING,
        value
    })
}

export let setSending = (value: any) => {
    return({
        type: SET_SENDING,
        value
    })
}

let initialState = {
    value: {
        flag: false,
        dayID: -1,
        lessonID: -1,
        value: null
    },
    sending: false,
    adding: {
        flag: false,
        id: -1
    }
}

let changeReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case SET_CHANGE: {
            return({
                ...state,
                value: action.value
            })
        }
        case SET_ADDING: {
            return({
                ...state,
                adding: action.value
            })
        }
        case SET_SENDING: {
            return({
                ...state,
                sending: action.value
            })
        }
        default: {
            return({
                ...state
            })
        }
    }
}

export default changeReducer
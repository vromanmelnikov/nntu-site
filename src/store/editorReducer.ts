import { EditErrorModel } from "../models/errors.models"

export const SET_MODAL_WINDOW = 'SET_MODAL_WINDOW'
export const SET_GROUP = 'SET_GROUP'
export const SET_EDIT_ERROR = 'SET_EDIT_ERROR'

export let setModalWindow = (value: boolean) => {
    return (
        {
            type: SET_MODAL_WINDOW,
            value
        }
    )
}

export let setGroupValue = (value: string) => {
    return (
        {
            type: SET_GROUP,
            value
        }
    )
}

export let setEditError = (value: EditErrorModel) => {
    return ({
        type: SET_EDIT_ERROR,
        value
    })
}

let initialState = {
    modalWindow: false,
    group: '',
    editError: {
        flag: false,
        name: false,
        time: false,
        type: false,
        timeFormat: false
    }
}

let editorReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case SET_MODAL_WINDOW: {
            return (
                {
                    ...state,
                    modalWindow: action.value
                }
            )
        }
        case SET_GROUP: {
            return (
                {
                    ...state,
                    group: action.value
                }
            )
        }
        case SET_EDIT_ERROR: {
            return({
                ...state,
                editError: action.value
            })
        }
        default: {
            return (
                { ...state }
            )
        }
    }
}

export default editorReducer
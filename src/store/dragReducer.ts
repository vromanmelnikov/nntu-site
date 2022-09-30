const SET_CURRENT_DRAG = 'SET_CURRENT_DRAG'
const SET_DRAGGABLE = 'SET_DRAGGABLE'
const CLEAR_DRAG = 'CLEAR_DRAG'
const CLEAR_CURRENT_DRAG = 'CLEAR_CURRENT_DRAG'
const SET_DROP_DAY = 'SET_DROP_DAY'

interface Drag {
    dayID: number,
    lessonID: number
}

export let setCurrentDrag = (value: Drag) => {
    return ({
        type: SET_CURRENT_DRAG,
        value
    })
}

export let setDraggable = (value: Drag) => {
    return ({
        type: SET_DRAGGABLE,
        value
    })
}

export let setDropDay = (dayID: number) => {
    return ({
        type: SET_DROP_DAY,
        dayID
    })
}

export let clearDrag = () => {
    return ({
        type: CLEAR_DRAG
    })
}

export let clearCurrentDrag = () => {
    return ({
        type: CLEAR_CURRENT_DRAG
    })
}

let initialState = {
    current: {
        dayID: -1,
        lessonID: -1
    },
    draggable: {
        dayID: -1,
        lessonID: -1
    },
    dropDay: -1
}

let dragReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CURRENT_DRAG: {
            return ({
                ...state,
                current: {
                    dayID: action.value.dayID,
                    lessonID: action.value.lessonID
                }
            })
        }
        case SET_DRAGGABLE: {
            return ({
                ...state,
                draggable: {
                    dayID: action.value.dayID,
                    lessonID: action.value.lessonID
                }
            })
        }
        case SET_DROP_DAY: {
            return({
                ...state,
                dropDay: action.dayID
            })
        }
        case CLEAR_DRAG: {
            return ({
                ...state,
                current: {
                    dayID: -1,
                    lessonID: -1
                },
                draggable: {
                    dayID: -1,
                    lessonID: -1
                },
                dropDay: -1
            })
        }
        case CLEAR_CURRENT_DRAG: {
            return ({
                ...state,
                current: {
                    dayID: -1,
                    lessonID: -1
                }
            })
        }
        default: {
            return ({
                ...state
            })
        }
    }
}

export default dragReducer
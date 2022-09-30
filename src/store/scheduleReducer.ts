import { Lesson } from "../models/editor.models"
import GroupService from "../services/group.service"

const ADD_LESSON = 'ADD_LESSON'
const CHANGE_LESSON = 'CHANGE_LESSON'
const CHANGE_GROUP = 'CHANGE_GROUP'
const SET_SCHEDULE = 'SET_SCHEDULE'
const DELETE_LESSON = 'DELETE_LESSON'
const COPY_LESSON = 'COPY_LESSON'
const MOVE_LESSON = 'MOVE_LESSON'

export let addLesson = (dayID: number, lesson: Lesson) => {
    return (
        {
            type: ADD_LESSON,
            value: lesson,
            dayID
        }
    )
}

export let changeLesson = (dayID: number, lessonID: number, lesson: Lesson) => {
    return (
        {
            type: CHANGE_LESSON,
            dayID,
            lessonID,
            value: lesson
        }
    )
}
export let changeGroup = (value: string) => {
    return ({
        type: CHANGE_GROUP,
        value
    })
}

export let setSchedule = (value: any) => {
    return ({
        type: SET_SCHEDULE,
        value
    })
}

export let delLesson = (dayID: number, lessonID: number) => {
    return ({
        type: DELETE_LESSON,
        dayID,
        lessonID
    })
}

export let copyLesson = (dayID: number, lesson: Lesson) => {
    // console.log({ dayID, lesson })
    return (
        {
            type: COPY_LESSON,
            dayID,
            value: lesson
        }
    )
}

interface Drag {
    dayID: number,
    lessonID: number
}

export let moveLesson = (dragItem: Drag, dropItem: Drag ) => {
    return({
        type: MOVE_LESSON,
        dragItem,
        dropItem
    })
}

let initialState = {
    group: '',
    list: [
        {
            name: 'Понедельник',
            id: 0,
            list: [
                {
                    name: 'Графические информационные технологии',
                    type: 'Хз пока',
                    room: '6034',
                    mentor: {
                        fullname: 'Козлов Роман Васильевич'
                    },
                    time: {
                        start: 460,
                        finish: 545
                    },
                    week: {
                        even: true,
                        odd: true,
                        other: ''
                    }
                }
            ]
        },
        {
            name: 'Вторник',
            id: 1,
            list: [

            ]
        },
        {
            name: 'Среда',
            id: 2,
            list: [

            ]
        },
        {
            name: 'Четверг',
            id: 3,
            list: [

            ]
        },
        {
            name: 'Пятница',
            id: 4,
            list: [

            ]
        },
        {
            name: 'Суббота',
            id: 5,
            list: [

            ]
        },
        {
            name: 'Воскресение',
            id: 6,
            list: [

            ]
        }
    ],
    firstSchedule: [
        {
            start: 450,
            finish: 545
        },
        {
            start: 560,
            finish: 655
        },
        {
            start: 670,
            finish: 765
        },
        {
            start: 795,
            finish: 890
        },
        {
            start: 900,
            finish: 995
        },
        {
            start: 1005,
            finish: 1100
        },
        {
            start: 1110,
            finish: 1205
        },
    ],
    secondSchedule: [
        {
            start: 480,
            finish: 575
        },
        {
            start: 585,
            finish: 680
        },
        {
            start: 695,
            finish: 790
        },
        {
            start: 820,
            finish: 915
        },
        {
            start: 925,
            finish: 1020
        },
        {
            start: 1030,
            finish: 1125
        },
        {
            start: 1135,
            finish: 1230
        },
    ]
}

let scheduleReducer = (state: any = initialState, action: any) => {

    state = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case ADD_LESSON: {

            let dayID = action.dayID
            let newList = state.list

            newList[dayID].list.push(
                { ...action.value }
            )

            newList[dayID].list.sort(
                (a: Lesson, b: Lesson) => a.time?.start - b.time?.start
            )

            let obj = {
                ...state,
                list: newList
            }

            GroupService.setSchedule(obj.list)

            return (obj)
        }
        case CHANGE_LESSON: {

            let dayID = action.dayID
            let lessonID = action.lessonID
            let newList = state.list

            newList[dayID].list[lessonID] = { ...action.value }

            newList[dayID].list.sort(
                (a: Lesson, b: Lesson) => a.time?.start - b.time?.start
            )

            let obj = {
                ...state,
                list: newList
            }

            GroupService.setSchedule(obj.list)

            return (obj)
        }
        case CHANGE_GROUP: {
            return ({
                ...state,
                group: action.value
            })
        }
        case SET_SCHEDULE: {

            let obj = {
                ...state,
                list: action.value
            }

            return (obj)
        }
        case DELETE_LESSON: {

            let newList = [...state.list]
            newList[action.dayID].list = newList[action.dayID].list.filter(
                (value: any) => {
                    let id = value.id != undefined ? value.id : value.newID
                    if (id != action.lessonID || id != action.lessonID) {
                        return value
                    }
                }
            )

            let obj = {
                ...state,
                list: newList
            }

            GroupService.setSchedule(obj.list, action.lessonID)

            return (obj)
        }
        case COPY_LESSON: {

            let dayID = action.dayID
            let newList = state.list

            let newID = action.value.id != undefined ? action.value.id : action.value.newID

            let lesson = {
                newID,
                comment: action.value.comment,
                mentor: action.value.mentor,
                name: action.value.name,
                room: action.value.room,
                time: action.value.time,
                type: action.value.type,
                week: action.value.week
            }

            newList[dayID].list.push({ ...lesson })

            newList[dayID].list.sort(
                (a: Lesson, b: Lesson) => a.time?.start - b.time?.start
            )

            let obj = {
                ...state,
                list: newList
            }

            GroupService.setSchedule(obj.list)

            return (obj)

        }
        case MOVE_LESSON: {

            let newList = [...state.list]

            let dragItem = action.dragItem
            let dropItem = action.dropItem

            // console.log(newList)
            // debugger

            if (dragItem.dayID == dropItem.dayID && dropItem.lessonID != -2) {
                let first = newList[dragItem.dayID].list[dragItem.lessonID]
                let second = newList[dragItem.dayID].list[dropItem.lessonID]
                newList[dragItem.dayID].list[dragItem.lessonID] = {...second}
                newList[dragItem.dayID].list[dropItem.lessonID] = {...first}
            }
            else {

                let dropDay = newList[dropItem.dayID].list

                if (dropItem.lessonID == 0) {
                    dropDay = [
                        newList[dragItem.dayID].list[dragItem.lessonID],
                        ...dropDay
                    ]
                    newList[dropItem.dayID].list = [...dropDay]
                }
                else if (dropItem.lessonID == -2) {
                    if (dragItem.dayID == dropItem.dayID) {
                        if (newList[dropItem.dayID].list.length != 0) {
                            dropDay = [
                                ...dropDay,
                                newList[dragItem.dayID].list[dragItem.lessonID],
                            ]
                            newList[dropItem.dayID].list = [...dropDay]
                        }
                    }
                    else {
                        dropDay = [
                            ...dropDay,
                            newList[dragItem.dayID].list[dragItem.lessonID],
                        ]
                        newList[dropItem.dayID].list = [...dropDay]
                    }
                    newList[dropItem.dayID].list.sort(
                        (a: Lesson, b: Lesson) => a.time?.start - b.time?.start
                    )
                    
                }
                else {
                    dropDay = [
                        ...dropDay.slice(0, dropItem.lessonID),
                        newList[dragItem.dayID].list[dragItem.lessonID],
                        ...dropDay.slice(dropItem.lessonID, dropDay.length),
                    ]
                    newList[dropItem.dayID].list = [...dropDay]
                }
    
                newList[dragItem.dayID].list = [...newList[dragItem.dayID].list.filter(
                    (value: any, index: number) => {
                        if (index != dragItem.lessonID) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                )]
            }

            let obj = {
                ...state,
                list: newList
            }
            
            GroupService.setSchedule(obj.list)

            return(obj)
        }
        default: {
            return (
                { ...state }
            )
        }
    }
}

export default scheduleReducer
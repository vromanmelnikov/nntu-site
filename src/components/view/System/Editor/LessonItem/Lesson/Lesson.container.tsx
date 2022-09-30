import Lesson from "./Lesson"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { copyLesson, delLesson } from "../../../../../../store/scheduleReducer";
import GroupService from "../../../../../../services/group.service";
import { setChange } from './../../../../../../store/changeReducer';

function LessonContainer (props: any) {

    let start = props.time.start
    let finish = props.time.finish

    let sHours = Math.floor(start / 60)
    let sMinutes = Math.floor(start % 60)
    let fHours = Math.floor(finish / 60)
    let fMinutes = Math.floor(finish % 60)

    start = ''
    finish = ''

    start += sHours >= 10 ? sHours : '0' + sHours 
    start += ':'
    start += sMinutes >= 10 ? sMinutes : '0' + sMinutes
    finish += fHours >= 10 ? fHours : '0' + fHours 
    finish += ':'
    finish += fMinutes >= 10 ? fMinutes : '0' + fMinutes

    let time = start + ' - ' + finish

    const dispatch = useDispatch()

    const [tools, setTools] = useState(false)
    const [changeFlag, setChangeFlag] = useState(true)

    let toggler = () => setTools(prev => !prev)
    let changeToggler = (value: boolean) => setChangeFlag(value)

    let deleteLesson = () => {
        let id = props.id != undefined ? props.id : props.newID
        dispatch(delLesson(props.dayID, id))
    }

    const list: any[] = useSelector(
        (state: any) => state.schedule.list
    )

    let CopyLesson = () => {
        let lesson = list[props.dayID].list[props.lessonID]
        delete lesson?.id

        let newID = GroupService.getMaxId() + 1
        GroupService.setMaxId(newID)

        if (lesson != null) {
            lesson = {
                ...lesson,
                newID
            }
            dispatch(copyLesson(props.dayID, lesson))
        }
    }

    let changeLesson = () => {
        if (changeFlag == true) {
            props.changeLesson()
        }
    }

    // useEffect(
    //     () => {
    //         console.log(changeFlag)
    //     }, [changeFlag]
    // )

    let data = {
        ...props,
        start, 
        finish,
        time,
        changeLesson: changeLesson,
        lessonID: props.lessonID,
        dayID: props.dayID,
        tools,
        toggler,
        deleteLesson,
        copyLesson: CopyLesson,
        changeToggler
    }

    return(
        <Lesson {...data}/>
    )
}

export default LessonContainer
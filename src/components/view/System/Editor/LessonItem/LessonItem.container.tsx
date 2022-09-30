import { useDispatch, useSelector } from "react-redux"
import { setChange } from "../../../../../store/changeReducer"
import { setModalWindow } from "../../../../../store/editorReducer"
import LessonItem from "./LessonItem"

function LessonItemContainer(props: any) {

    const dispatch = useDispatch()

    const change = useSelector(
        (state: any) => state.change.value
    )

    function changeLesson() {
        dispatch(setChange({
            flag: true,
            dayID: props.dayID,
            lessonID: props.lessonID,
            value: props.value
        }))
        dispatch(setModalWindow(true))
    }

    let data = {
        value: props.value,
        index: props.lessonID,
        change,
        changeLesson,
        lessonID: props.lessonID,
        dayID: props.dayID
    }

    return (
        <LessonItem {...data} />
    )
}

export default LessonItemContainer
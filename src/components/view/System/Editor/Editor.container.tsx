import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { Day, Lesson, Time } from "../../../../models/editor.models"
import CookieService from "../../../../services/cookie.service"
import GroupService from "../../../../services/group.service"
import { setAdding, setSending } from "../../../../store/changeReducer"
import { setSchedule } from "../../../../store/scheduleReducer"
import Editor from "./Editor"

function EditorContainer(props: any) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const name: string = useSelector(
        (state: any) => state.schedule.name
    )

    const group: string = useSelector(
        (state: any) => state.schedule.group
    )

    const change: string = useSelector(
        (state: any) => state.change.value
    )

    const list: any[] = useSelector(
        (state: any) => state.schedule.list
    )

    const firstShedule: Time[] = useSelector(
        (state: any) => state.schedule.firstSchedule
    )

    let addLesson = (dayID: number) => {
        dispatch(setAdding({
            flag: true,
            id: dayID
        }))
    }

    let changeGroup = () => {
        CookieService.deleteCookie('group')
        navigate('/group')
    }

    let sendScheldule = () => {
        dispatch(setSending(true))
    }

    let data = {
        list,
        name,
        group,
        setAdding,
        addLesson,
        changeGroup,
        sendScheldule,
        change
    }

    return (
        <Editor {...data} />
    )
}

export default EditorContainer
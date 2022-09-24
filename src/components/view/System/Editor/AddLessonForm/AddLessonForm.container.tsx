import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Lesson, LessonForm, StringTime, Time } from "../../../../../models/editor.models"
import { EditErrorModel } from "../../../../../models/errors.models"
import GroupService from "../../../../../services/group.service"
import { setAdding, setChange } from "../../../../../store/changeReducer"
import { setEditError, setModalWindow } from "../../../../../store/editorReducer"
import { addLesson, changeGroup } from "../../../../../store/scheduleReducer"
import AddLessonForm from "./AddLessonForm"

function AddLessonFormContainer(props: any) {

    const formDraft = {
        name: '',
        room: '',
        mentor: '',
        type: '',
        week: {
            even: false,
            odd: false,
            other: ''
        },
        time_1: {
            start: 0,
            finish: 0
        },
        time_2: {
            start: '',
            finish: ''
        },
        comment: ''
    }

    const adding = useSelector(
        (state: any) => state.change.adding
    )

    const types = [
        'Лекция',
        'Практика',
        'Лаб. работа'
    ]

    const weeks = [
        'Четные',
        'Нечетные'
    ]

    const days = [
        {
            id: 0,
            name: 'ПН'
        },
        {
            id: 1,
            name: 'ВТ'
        },
        {
            id: 2,
            name: 'СР'
        },
        {
            id: 3,
            name: 'ЧТ'
        },
        {
            id: 4,
            name: 'ПТ'
        },
        {
            id: 5,
            name: 'СБ'
        },
        {
            id: 6,
            name: 'ВС'
        },
    ]

    const [choosenDays, setChoosenDays] = useState([-1])

    const dispatch = useDispatch()

    const firstSchedule = useSelector(
        (state: any) => state.schedule.firstSchedule
    )

    const secondSchedule = useSelector(
        (state: any) => state.schedule.secondSchedule
    )

    const [schedule, setSchedule] = useState([...firstSchedule])

    const [form, setForm] = useState<LessonForm>({...formDraft})

    let onNameChange = (event: any) => {
        let value = event.target.value
        setForm({
            ...form,
            name: value
        })
    }

    let onTypeChange = (flag: boolean, value: any) => {
        if (flag == true) {
            if (value == form.type) {
                setForm(
                    {
                        ...form,
                        type: ''
                    }
                )
            }
            else {
                setForm({
                    ...form,
                    type: value
                })
            }
        }
        else {
            setForm({
                ...form,
                type: value.target.value
            })
        }
    }

    let onRoomChange = (event: any) => {
        let value = event.target.value
        if (value === '6') {
            setSchedule([...secondSchedule])
        }
        if (value === '' || (value.length === 1 && value !== '6')) {
            setSchedule([...firstSchedule])
        }
        setForm({
            ...form,
            room: value
        })
    }

    let onMentorChange = (event: any) => {
        let value = event.target.value
        setForm({
            ...form,
            mentor: value
        })
    }

    let onWeekChange = (flag: boolean, value: number, event?: any) => {
        if (flag == true) {
            if (value == -2) {
                setForm(
                    {
                        ...form,
                        week: {
                            even: !form.week?.even,
                            odd: form.week?.odd,
                            other: form.week?.other
                        }
                    }
                )
            }
            else if (value == -1) {
                setForm(
                    {
                        ...form,
                        week: {
                            even: form.week?.even,
                            odd: !form.week?.odd,
                            other: form.week?.other
                        }
                    }
                )
            }
        }
        else {
            let value = event.target.value
            // console.log(value)
            setForm(
                {
                    ...form,
                    week: {
                        even: form.week?.even,
                        odd: form.week?.odd,
                        other: value
                    }
                }
            )
        }
    }

    let onStartChange = (event: any) => {
        let value = event.target.value
        let newForm = { ...form }
        if (form.time_1.start != 0) {
            newForm.time_1 = {
                start: 0,
                finish: 0
            }
        }
        newForm.time_2 = {
            start: value,
            finish: form.time_2.finish,
        }
        setForm(
            newForm
        )
    }

    let onFinishChange = (event: any) => {
        let value = event.target.value
        let newForm = { ...form }
        if (form.time_1.start != 0) {
            newForm.time_1 = {
                start: 0,
                finish: 0
            }
        }
        newForm.time_2 = {
            start: form.time_2.start,
            finish: value,
        }
        setForm(
            newForm
        )
    }

    let onTimeChange = (start: number, finish: number) => {
        let newForm = { ...form }
        if (form.time_2.start != '' || form.time_2.finish != '') {
            newForm.time_2 = {
                start: '',
                finish: ''
            }
        }
        newForm.time_1 = {
            start,
            finish
        }
        setForm(
            newForm
        )
    }

    let onCommentChange = (event: any) => {
        let value = event.target.value
        setForm({...form, comment: value})
    }

    let toggler = () => {
        dispatch(setModalWindow(false))
        dispatch(setAdding({
            flag: false,
            id: -1
        }))
    }

    let toggleError = (error: EditErrorModel) => {
        dispatch(setEditError({
            ...error,
            flag: true
        }))
    }

    useEffect(
        ()=>{
            // console.log(adding)
            if(adding.flag != false) {
                let id: number = adding.id
                setChoosenDays([id])
                setForm({...formDraft})
            }
        }, [adding]
    )

    let dayClick = (dayID: number) => {
        if (choosenDays.indexOf(dayID) == -1) {
            setChoosenDays([...choosenDays, dayID])
        }
        else {
            let days = choosenDays.filter(
                (value: any) => value != dayID
            )
            setChoosenDays([...days])
        }
    }

    let addNewLesson = () => {

        let flag: EditErrorModel = {
            flag: false,
            name: false,
            time: false,
            type: false,
            timeFormat: false
        }

        if (form.time_1.start == 0 && (form.time_2.start == '' || form.time_2.finish == '')) {
            flag.flag = true
            flag.time = true
        }
        if (form.name == '') {
            flag.flag = true
            flag.name = true
        }
        if (form.type == '') {
            flag.flag = true
            flag.type = true
        }

        let time: Time = {
            start: 0,
            finish: 0
        }

        if (form.time_1.start != 0) {
            time = { ...form.time_1 }
        }
        else {
            let start = form.time_2.start
            let finish = form.time_2.finish

            let startArray = start.split(':')
            let finishArray = finish.split(':')

            if (startArray.length != 2 || finishArray.length != 2) {
                flag.timeFormat = true
                toggleError({ ...flag })
            }
            else {

                let timeFlag =
                    (startArray[0].length < 3 && startArray[0].length > 0)
                    && (finishArray[0].length < 3 && finishArray[0].length > 0)
                    && startArray[1].length == 2
                    && finishArray[1].length == 2

                if (timeFlag == false) {
                    flag.flag = true
                    flag.timeFormat = true
                }
                else {
                    let sHours = parseInt(startArray[0])
                    let sMinutes = parseInt(startArray[1])
                    let fHours = parseInt(finishArray[0])
                    let fMinutes = parseInt(finishArray[1])

                    let sTime = sHours * 60 + sMinutes
                    let fTime = fHours * 60 + fMinutes

                    time = {
                        start: sTime,
                        finish: fTime
                    }
                }
            }
        }

        let room = form.room.replace(new RegExp(' ', 'g'), '')
        let rooms: any[] = room.split(',').filter(
            (value: any) => {
                if (/^\d+$/.test(value) == true) {
                    return parseInt(value)
                }
            }
        )
        room = rooms.join(', ')

        let week = form.week
        let weekOther = week.other.replace(new RegExp(' ', 'g'), '')
        // console.log(weekOther)
        let weeks: any[] = weekOther.split(',').filter(
            (value: any) => {
                if (/^\d+$/.test(value) == true) {
                    return parseInt(value)
                }
            }
        )
        weekOther = weeks.join(', ')
        week.other = weekOther

        if (flag.flag == true) {
            toggleError({ ...flag })
            return
        }

        let newID = GroupService.getMaxId() + 1
        GroupService.setMaxId(newID)

        let lesson: Lesson = {
            newID,
            name: form.name,
            type: form.type,
            room,
            time: time,
            week,
            mentor: {
                fullname: form.mentor
            },
            comment: form.comment
        }

        for (let item of choosenDays) {
            dispatch(addLesson(item, lesson))
        }
        // dispatch(setAdding())

        toggler()
    }

    let data = {
        flag: adding.flag,
        types,
        weeks,
        schedule,
        form,
        onNameChange,
        onRoomChange,
        onMentorChange,
        onTypeChange,
        onWeekChange,
        onStartChange,
        onFinishChange,
        onTimeChange,
        onCommentChange,
        addNewLesson,
        toggler,
        days,
        choosenDays,
        dayClick
    }

    return (
        <AddLessonForm {...data} />
    )
}

export default AddLessonFormContainer
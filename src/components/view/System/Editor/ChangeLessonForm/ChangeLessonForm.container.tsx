import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Lesson, LessonForm, StringTime, Time } from "../../../../../models/editor.models"
import { EditErrorModel } from "../../../../../models/errors.models"
import GroupService from "../../../../../services/group.service"
import { setChange } from "../../../../../store/changeReducer"
import { setEditError, setModalWindow } from "../../../../../store/editorReducer"
import { addLesson, changeLesson, copyLesson, delLesson } from "../../../../../store/scheduleReducer"
import ChangeLessonForm from "./ChangeLessonForm"

function ChangeLessonFormContainer(props: any) {

    const change = useSelector(
        (state: any) => state.change.value
    )

    const mentors = useSelector(
        (state: any) => state.mentorList
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

    const dispatch = useDispatch()

    const firstSchedule = useSelector(
        (state: any) => state.schedule.firstSchedule
    )

    const secondSchedule = useSelector(
        (state: any) => state.schedule.secondSchedule
    )

    const [schedule, setSchedule] = useState([...firstSchedule])

    const [form, setForm] = useState<LessonForm>({
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
            start: '00:00',
            finish: '00:00'
        },
        comment: ''
    })

    const [discOffers, setDiscOffers] = useState([])
    const [mentorOffers, setMentorOffers] = useState([])

    let clearOffers = () => {
        setDiscOffers([])
        setMentorOffers([])
    }

    let onNameChange = (event: any) => {
        let value = event.target.value
        if (value != '') {
            let offers = mentors.disciplines.filter(
                (variant: string) => {
                    if (variant.toLowerCase().indexOf(value.toLowerCase()) != -1) {
                        return true
                    }
                    else return false
                }
            )
            setDiscOffers(offers)
        }
        else {
            setDiscOffers([])
        }
        setForm({
            ...form,
            name: value
        })
    }

    let onNameOfferClick = (value: string) => {
        setForm({
            ...form,
            name: value
        })
        setDiscOffers([])
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
        if (value != '') {
            let offers = mentors.mentors.filter(
                (variant: string) => {
                    if (variant.toLowerCase().indexOf(value.toLowerCase()) != -1) {
                        return true
                    }
                    else return false
                }
            )
            setMentorOffers(offers)
        }
        else {
            setMentorOffers([])
        }
        setForm({
            ...form,
            mentor: value
        })
    }

    let onMentorOfferClick = (value: string) => {
        setForm({
            ...form,
            mentor: value
        })
        setMentorOffers([])
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
        setForm({ ...form, comment: value })
    }

    useEffect(
        () => {
            if (change.flag !== false) {
                let time_1: Time = {
                    start: 0,
                    finish: 0
                }
                let time_2: StringTime = {
                    start: '',
                    finish: ''
                }
                let flag = false
                let timeFlag = false
                if (change.value.room.length > 0) {
                    if (change.value.room[0] === '6') {
                        setSchedule([...secondSchedule])
                        timeFlag = true
                    }
                }
                let array = timeFlag ? secondSchedule : firstSchedule
                for (let value of array) {
                    if (value.start == change.value.time.start && value.finish == change.value.time.finish) {
                        time_1 = change.value.time
                        flag = true
                        break
                    }
                }
                if (flag == false) {
                    let start = change.value.time.start
                    let finish = change.value.time.finish

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

                    time_2 = {
                        start,
                        finish
                    }
                }
                setForm({
                    name: change.value.name,
                    room: change.value.room,
                    mentor: change.value.mentor.fullname,
                    type: change.value.type,
                    week: change.value.week,
                    time_1,
                    time_2,
                    comment: change.value.comment
                })
            }
        }, [change]
    )

    let toggler = () => {
        dispatch(setModalWindow(false))
        dispatch(setChange({
            flag: false,
            dayID: -1,
            lessonID: -1,
            value: null
        }))
    }

    let deleteLesson = () => {
        // console.log({
        //     id: change.value.id,
        //     newID: change.value.newID
        // })
        let id = change.value.id != undefined ? change.value.id : change.value.newID
        dispatch(delLesson(change.dayID, id))
        toggler()
    }

    let toggleError = (error: EditErrorModel) => {
        dispatch(setEditError({
            ...error,
            flag: true
        }))
    }

    let getFormatLesson = (): Lesson | null => {

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
        // if (form.type == '') {
        //     flag.flag = true
        //     flag.type = true
        // }

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
                return null
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

        let room = form.room
        // let room = form.room.replace(new RegExp(' ', 'g'), '')
        // let rooms: any[] = room.split(',').filter(
        //     (value: any) => {
        //         if (/^\d+$/.test(value) == true) {
        //             return parseInt(value)
        //         }
        //     }
        // )
        // room = rooms.join(', ')

        let week = form.week
        let weekOther = week.other.replace(new RegExp(' ', 'g'), '')
        let weeks: any[] = weekOther.split(',').filter(
            (value: any) => {
                if (/^\d+$/.test(value) == true) {
                    return parseInt(value)
                }
            }
        )
        weekOther = weeks.join(', ')
        week.other = weekOther

        if (week.even == false && week.odd == false) {
            week.even = true
            week.odd = true
        }

        if (flag.flag == true) {
            toggleError({ ...flag })
            return null
        }

        let lesson: Lesson = {
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

        if (change.value.id != undefined) {
            lesson.id = change.value.id
        }

        return lesson
    }

    let ChangeLesson = () => {

        let lesson = getFormatLesson()

        if (lesson != null) {
            dispatch(changeLesson(change.dayID, change.lessonID, lesson))
            toggler()
        }
    }

    let CopyLesson = () => {

        let lesson = getFormatLesson()
        delete lesson?.id

        let newID = GroupService.getMaxId() + 1
        GroupService.setMaxId(newID)

        console.log(newID)

        if (lesson != null) {
            lesson = {
                ...lesson,
                newID
            }
            dispatch(copyLesson(change.dayID, lesson))
            // toggler()
        }
    }

    let data = {
        toggler,
        flag: change.flag,
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
        ChangeLesson,
        toggleError,
        deleteLesson,
        onCommentChange,
        CopyLesson,
        discOffers,
        onNameOfferClick,
        mentorOffers,
        onMentorOfferClick
    }

    return (
        <ChangeLessonForm {...data} />
    )
}

export default ChangeLessonFormContainer
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import ApiService from "../../../services/api.service";
import CookieService from "../../../services/cookie.service";
import { setMentorList } from "../../../store/mentorListReducer";
import { changeGroup, setSchedule } from "../../../store/scheduleReducer";
import System from "./System"

function SystemContainer(props: any) {

    const modal = useSelector(
        (state: any) => state.editor.modalWindow
    )

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(
        () => {
            let value = CookieService.getCookie('group')
            // console.log(value)
            if (value != null) {
                dispatch(changeGroup(value))
                try {
                    let schedule = JSON.parse(window.localStorage.schedule)
                    let deleted = JSON.parse(window.localStorage.deleted)
                    let maxID = JSON.parse(window.localStorage.maxID)
                    dispatch(setSchedule(schedule.list))
                    let path = location.pathname
                    if (path === '/') {
                        path = '/editor'
                    }
                    navigate(path)
                    ApiService.getMentorsInfo().then(
                        (res: any) => {
                            let mentors = res.mentors
                            let disc = res.disciplines
                            dispatch(setMentorList(mentors, disc))
                        }
                    )
                }
                catch (error) {
                    console.log(error)
                    navigate('/group')
                }

            }
            else {
                navigate('/group')
            }
        }, []
    )

    useEffect(
        () => {
            if (modal === true) {
                document.body.style.overflow = 'hidden';
            }
            else {
                document.body.style.overflow = 'auto';
            }
        }, [modal]
    )

    return (
        <System />
    )
}

export default SystemContainer
import { setGroupValue } from "../../../../store/editorReducer"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import FindGroup from "./FindGroup"
import CookieService from "../../../../services/cookie.service"
import { changeGroup, setSchedule } from "../../../../store/scheduleReducer"
import GroupService from "../../../../services/group.service"
import ApiService from "../../../../services/api.service"

function FindGroupContainer(props: any) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [flag, setFlag] = useState(true)
    const [group, setGroup] = useState('')
    const [error, setError] = useState(false)
    const [exisError, setExisError] = useState(false)

    const [groupList, setGroupList] = useState([])
    const [offers, setOffers] = useState([])

    let toggle = () => setFlag(!flag)

    let onGroupChange = (event: any) => {
        event.preventDefault();
        let value = event.target.value
        if (value != '') {
            let offers = groupList.filter(
                (variant: string) => {
                    let withDash = variant.toLowerCase()
                    let withoutDash = variant.replaceAll('-', '').toLowerCase()
                    let lowerCaseValue = value.toLowerCase()
                    if (withDash.indexOf(lowerCaseValue) != -1 || withoutDash.indexOf(lowerCaseValue) != -1) {
                        return true
                    }
                    else return false
                }
            )
            setOffers(offers)
        }
        else {
            setOffers([])
        }
        setGroup(value)
    }

    let onOfferClick = (value: string) => {
        setGroup(value)
    }

    let setNewGroup = () => {
        document.cookie = `group=${group}`
        navigate('/editor')
        GroupService.getFormattedSchedule(group).then(
            (res: any) => {
                GroupService.createDeleted()
                GroupService.setSchedule(res)
                dispatch(setSchedule(res))
                dispatch(changeGroup(group))
                navigate('/editor')
            }
        )
    }

    let saveGroup = () => {
        if (group == '') {
            setError(true)
        }
        else {
            for (let variant of groupList) {
                if (group == variant) {
                    setNewGroup()
                    return
                }
            }
            setNewGroup()
            setExisError(true)
        }
    }

    let onInputFocus = () => {
        if (error == true) {
            setError(false)
        }
        if (exisError == true) {
            setExisError(false)
        }
    }

    useEffect(
        () => {
            ApiService.getGroups().then(
                res => {
                    setGroupList(res.data.groups)
                }
            )
        }, []
    )

    let data = {
        flag,
        toggle,
        group,
        onGroupChange,
        saveGroup,
        error,
        exisError,
        onInputFocus,
        offers,
        onOfferClick
    }

    return (
        <FindGroup {...data} />
    )
}

export default FindGroupContainer
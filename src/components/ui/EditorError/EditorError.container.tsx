import { useDispatch, useSelector } from "react-redux"
import { setEditError } from "../../../store/editorReducer"
import EditorError from "./EditorError"

function EditorErrorContainer(props: any) {

    const error = useSelector(
        (state: any) => state.editor.editError
    )

    const dispatch = useDispatch()

    let toggler = () => {
        dispatch(setEditError({
            flag: false,
            name: false,
            time: false,
            type: false,
            timeFormat: false
        }))
    }

    let data = {
        error,
        toggler
    }

    return (
        <EditorError {...data} />
    )
}

export default EditorErrorContainer
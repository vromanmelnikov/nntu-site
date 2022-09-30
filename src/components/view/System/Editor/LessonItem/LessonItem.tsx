import Class from './LessonItem.module.css'
import LessonContainer from "./Lesson/Lesson.container"
import ChangeLessonFormContainer from "../ChangeLessonForm/ChangeLessonForm.container"

function LessonItem(props: any) {

    return (
        <div
            className={`${Class.block}`}
        >
            {
                props.index != 0 &&
                <hr className={`${Class.line}`} />
            }
            <LessonContainer
                lessonID={props.lessonID}
                dayID={props.dayID}
                {...props.value}
                changeLesson={props.changeLesson}
            />
        </div>
    )
}

export default LessonItem
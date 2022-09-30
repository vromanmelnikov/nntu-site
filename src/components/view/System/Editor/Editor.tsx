import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Card, CardBody, CardHeader } from "reactstrap"
import AddLessonFormContainer from "./AddLessonForm/AddLessonForm.container"
import Class from './Editor.module.css'
import LessonItemContainer from "./LessonItem/LessonItem.container"
import SaveChangesContainer from "./SaveChanges/SaveChanges.container"

import editor from '../../../../assets/photos/editor.png'
import save from '../../../../assets/photos/save.png'
import ChangeLessonFormContainer from "./ChangeLessonForm/ChangeLessonForm.container"
import { clearCurrentDrag, clearDrag } from "../../../../store/dragReducer"
import { moveLesson } from './../../../../store/scheduleReducer';
import { setDropDay } from './../../../../store/dragReducer';

function Editor(props: any) {

    const dispatch = useDispatch()

    const modal = useSelector(
        (state: any) => state.editor.modalWindow
    )

    const current = useSelector(
        (state: any) => state.drag.current
    )

    const draggable = useSelector(
        (state: any) => state.drag.draggable
    )

    const dropDay = useSelector(
        (state: any) => state.drag.dropDay
    )

    let onDayDragOver = (event: any, dayID: number) => {
        event.preventDefault()
        dispatch(setDropDay(dayID))
        // dispatch(clearCurrentDrag())
    }

    let onDragOver = (event: any, dayID: number) => {
        event.preventDefault()
    }

    let onDrop = (event: any, dayID: number) => {
        event.preventDefault()
        dispatch(clearDrag())
        dispatch(moveLesson(draggable, {lessonID: -2, dayID}))
    }

    return (
        <>
            <SaveChangesContainer />
            <AddLessonFormContainer />
            <ChangeLessonFormContainer />
            <Card color={'light'} className={`p-3 ${modal == true && Class.no_scroll}`}>
                <div className={`${Class.info}`}>
                    <div className="column jc-center">
                        <h3>Редактирование расписания</h3>
                        <div className={`${Class.group}`}>
                            <h4>Группа: {props.group}</h4>
                            <Button
                                onClick={props.changeGroup}
                                className={`hover-button`}
                            >
                                <p className={`hover-button-img`}>📝</p>
                                {/* <img src={editor} className={`hover-button-img`} /> */}
                                <p className={`hover-button-text`}>
                                    Изменить
                                </p>
                            </Button>
                        </div>
                    </div>
                    <div className={``}>
                        <Button
                            onClick={props.sendScheldule}
                            className={`hover-button`}
                        >
                            <p className={`hover-button-img`}>💾</p>
                            {/* <img src={save} className={`hover-button-img`} /> */}
                            <p className={`hover-button-text`}>
                                Отправить
                            </p>
                        </Button>
                    </div>
                </div>
                <div className={`${Class.days}`}
                    id={'days'}>
                    <div
                        className={`${Class.days_blocks}`}
                    >
                        {
                            props.list.map(
                                (value: any, day_index: number) => {
                                    return (
                                        <Card
                                            key={day_index}
                                            className={`${Class.day}`}
                                            onDragOver={
                                                (event) => {
                                                    onDayDragOver(event, day_index)
                                                }
                                            }
                                        >
                                            <CardHeader 
                                                className={`${Class.day_header}`}
                                                >
                                                <p>{value.name}</p>
                                                <Button
                                                    color="primary"
                                                    onClick={
                                                        () => {
                                                            props.addLesson(value.id)
                                                        }
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </CardHeader>
                                            <CardBody className={`${Class.dayBody}`}>
                                                {
                                                    value.list.map(
                                                        (value: any, lesson_index: number) => {
                                                            return (
                                                                <LessonItemContainer
                                                                    key={lesson_index}
                                                                    value={value}
                                                                    lessonID={lesson_index}
                                                                    dayID={day_index}
                                                                />
                                                            )
                                                        }
                                                    )
                                                }
                                                <div
                                                        className={`${Class.dropZone} ${day_index == dropDay && draggable.dayID != dropDay && Class.dropZoneHover} mt-4`}
                                                        onDrop={
                                                            (event) => {
                                                                onDrop(event, day_index)
                                                            }
                                                        }
                                                        onDragOver={
                                                            (event) => {
                                                                onDragOver(event, day_index)
                                                            }
                                                        }
                                                    >
                                                        <p>+</p>
                                                    </div>
                                            </CardBody>
                                        </Card>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </Card>
        </>
    )
}

export default Editor
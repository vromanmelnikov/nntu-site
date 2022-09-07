import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Button, Card, CardBody, CardHeader } from "reactstrap"
import AddLessonFormContainer from "./AddLessonForm/AddLessonForm.container"
import Class from './Editor.module.css'
import LessonItemContainer from "./LessonItem/LessonItem.container"
import SaveChangesContainer from "./SaveChanges/SaveChanges.container"

import editor from '../../../../assets/photos/editor.png'
import save from '../../../../assets/photos/save.png'
import ChangeLessonFormContainer from "./ChangeLessonForm/ChangeLessonForm.container"

function Editor(props: any) {

    const modal = useSelector(
        (state: any) => state.editor.modalWindow
    )

    console.log(modal)

    return (
        <>
            <SaveChangesContainer />
            {
                props.adding == true &&
                <AddLessonFormContainer show={props.setAdding} ID={props.ID} />
            }
            <ChangeLessonFormContainer />
            <Card color={'light'} className={`p-3 ${modal == true && Class.no_scroll}`}>
                <div className={`${Class.info}`}>
                    <div className="column jc-center">
                        <h3>Редактирование расписания</h3>
                        <div className={`${Class.group}`}>
                            <h4>Группа: {props.group}</h4>
                            <Button
                                onClick={props.changeGroup}
                                className={`hover-button wh-3`}
                            >
                                <img src={editor} className={`hover-button-img`} />
                                <p className={`hover-button-text`}>
                                    Изменить
                                </p>
                            </Button>
                        </div>
                    </div>
                    <div className={``}>
                        <Button
                            onClick={props.sendScheldule}
                            className={`hover-button wh-5`}
                        >
                            <img src={save} className={`hover-button-img`} />
                            <p className={`hover-button-text`}>
                                Отправить
                            </p>
                        </Button>
                    </div>
                </div>
                <div className={`${Class.days}`}>
                    <div className={`${Class.days_blocks}`}>
                        {
                            props.list.map(
                                (value: any, day_index: number) => {
                                    return (
                                        <Card
                                            key={day_index}
                                            className={`${Class.day}`}
                                        >
                                            <CardHeader className={`${Class.day_header}`}>
                                                <p>{value.name}</p>
                                                <Button
                                                    color="success"
                                                    onClick={
                                                        () => {
                                                            props.addLesson(value.id)
                                                        }
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </CardHeader>
                                            <CardBody>
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
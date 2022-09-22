import { Badge, Button, ButtonGroup, Card, CardTitle, Form, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap"
import EditorErrorContainer from "../../../../ui/EditorError/EditorError.container"
import Class from './AddLessonForm.module.css'

function AddLessonForm(props: any) {

    let args = {
        centered: true
    }

    return (
        <Modal
            isOpen={props.flag}
            toggle={props.toggler}
            {...args}
        >
            <EditorErrorContainer />
            <Form className="form-block p-3">
                <div className="form-field">
                    <Input
                        type="text"
                        placeholder="Название предмета..."
                        value={props.form.name}
                        onChange={
                            (event) => {
                                props.onNameChange(event)
                            }
                        }
                    />
                </div>
                <div className={`form-field`}>
                    <Label className={`${Class.bold}`}>Тип предмета</Label>
                    <div className={`${Class.types_field}`}>
                        {
                            props.types.map(
                                (value: any, index: number) => {
                                    return (
                                        <Badge
                                            key={index}
                                            color={value == props.form.type ? 'primary' : 'secondary'}
                                            onClick={
                                                (event: any) => {
                                                    props.onTypeChange(true, value)
                                                }
                                            }
                                        >
                                            {value}
                                        </Badge>
                                    )
                                }
                            )
                        }
                        <Input
                            type="text"
                            placeholder="Тип предмета..."
                            value={props.form.type}
                            onChange={
                                (event) => {
                                    props.onTypeChange(false, event)
                                }
                            }
                        />
                    </div>
                </div>
                <div className={`${Class.time_list}`}>
                    <div
                        className={`${Class.time} card p-2`}
                    >
                        <p className="">Начало: </p>
                        <Input
                            type="text"
                            placeholder="7:30"
                            value={props.form.time_2.start}
                            onChange={
                                (event: any) => {
                                    props.onStartChange(event)
                                }
                            }
                        />
                        <p>Конец: </p>
                        <Input
                            type="text"
                            placeholder="9:05"
                            value={props.form.time_2.finish}
                            onChange={
                                (event: any) => {
                                    props.onFinishChange(event)
                                }
                            }
                        />
                    </div>
                    {
                        props.schedule.map(
                            (value: any, index: number) => {

                                let start = value.start
                                let finish = value.finish

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

                                let flag = props.form.time_1.start == value.start

                                return (
                                    <div
                                        key={index}
                                        className={`${Class.time} ${flag && Class.choosen} card pt-1 pb-1`}
                                        onClick={
                                            () => {
                                                if (flag) {
                                                    props.onTimeChange(0, 0)
                                                }
                                                else {
                                                    props.onTimeChange(value.start, value.finish)
                                                }
                                            }
                                        }
                                    >
                                        <p>{index + 1} пара</p>
                                        <p>{start}</p>
                                        <p>{finish}</p>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
                <div className="form-field">
                    <Label className={`${Class.bold}`}>Тип предмета</Label>
                    <div className={`${Class.types_field}`}>
                        <Badge
                            color={`${props.form.week.even == true ? 'primary' : 'secondary'}`}
                            onClick={
                                () => {
                                    props.onWeekChange(true, -2)
                                }
                            }
                        >
                            Четная
                        </Badge>
                        <Badge
                            color={`${props.form.week.odd == true ? 'primary' : 'secondary'}`}
                            onClick={
                                () => {
                                    props.onWeekChange(true, -1)
                                }
                            }
                        >
                            Нечетная
                        </Badge>
                        <Input
                            type="text"
                            placeholder="Дополнительные недели..."
                            value={props.form.week.other}
                            onChange={
                                (event) => {
                                    props.onWeekChange(false, 0, event)
                                }
                            }
                        />
                    </div>
                </div>
                <div>
                    <Input
                        type="text"
                        placeholder="Аудитория..."
                        value={props.form.room}
                        onChange={
                            (event) => {
                                props.onRoomChange(event)
                            }
                        }
                    />
                    <Label>Если аудиторий несколько, напишите их через запятую</Label>
                </div>
                <div>
                    <Input
                        type="text"
                        placeholder="Комментарий..."
                        value={props.form.comment}
                        onChange={
                            (event) => {
                                props.onCommentChange(event)
                            }
                        }
                    />
                </div>
                <div>
                    <Input
                        type="text"
                        placeholder="Преподаватель..."
                        value={props.form.mentor}
                        onChange={
                            (event) => {
                                props.onMentorChange(event)
                            }
                        }
                    />
                </div>
                <div className={`${Class.days}`}>
                    {
                        props.days.map(
                            (value: any, index: number) => {
                                let flag = props.choosenDays.indexOf(value.id)
                                return (
                                    <Badge key={index} color={`${flag != -1 ? 'primary' : 'secondary'}`} onClick={
                                        () => {
                                            props.dayClick(value.id)
                                        }
                                    }>
                                        {value.name}
                                    </Badge>
                                )
                            }
                        )
                    }
                </div>
                <div className={`${Class.btn_group}`}>
                    <div className={`${Class.btn_field}`}>
                        <Button
                            className={`hover-button`}
                            onClick={props.addNewLesson}
                        >
                            <p className={`hover-button-img`}>✅</p>
                            <p className={`hover-button-text`}>
                                Изменить
                            </p>
                        </Button>
                    </div>
                    <div className={`${Class.btn_field}`}>
                        <Button
                            className={`hover-button`}
                            onClick={props.toggler}
                        >
                            <p className={`hover-button-img`}>👣</p>
                            <p className={`hover-button-text`}>
                                Выйти
                            </p>
                        </Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default AddLessonForm
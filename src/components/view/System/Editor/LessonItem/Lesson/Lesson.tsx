import { Badge, Popover, PopoverBody, PopoverHeader, Tooltip } from 'reactstrap'
import Class from './Lesson.module.css'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearDrag, setCurrentDrag, setDraggable } from '../../../../../../store/dragReducer';
import { moveLesson } from './../../../../../../store/scheduleReducer';
import { clearCurrentDrag } from './../../../../../../store/dragReducer';

function Lesson(props: any) {

    let evenFlag = props.week.even
    let oddFlag = props.week.odd

    let even = props.week.even == true && Class.even
    let odd = props.week.odd == true && Class.odd
    let each = (props.week.even && props.week.odd || !props.week.even && !props.week.odd) && Class.each

    let rooms = props.room.split(', ').map(
        (value: any, index: number) => {
            return (
                <p className={`${Class.room}`} key={index}>{value}</p>
            )
        }
    )

    const dispatch = useDispatch()

    const current = useSelector(
        (state: any) => state.drag.current
    )

    const draggable = useSelector(
        (state: any) => state.drag.draggable
    )


    let value = {
        lessonID: props.lessonID,
        dayID: props.dayID
    }

    let dragFlag = draggable.lessonID == value.lessonID && draggable.dayID == value.dayID
    let dropFlag = current.lessonID == value.lessonID && current.dayID == value.dayID

    let onDragStart = (event: any, value: any) => {
        dispatch(setDraggable(value))
    }

    let onDragLeave = (event: any, value: any) => {
    }

    let onDragEnd = (event: any, value: any) => {
        dispatch(clearDrag())
    }

    let onDragOver = (event: any, value: any) => {
        dispatch(setCurrentDrag(value))
        event.preventDefault()
    }

    let onDrop = (event: any, value: any) => {
        event.preventDefault()
        dispatch(clearDrag())
        dispatch(moveLesson(draggable, current))
    }

    const id = 'id_' + value.dayID + '_' + value.lessonID

    return (
        <div
            className={`${Class.Lesson} ${even} ${odd} ${each} ${dragFlag && Class.draggable}`}
            onClick={props.changeLesson}
            draggable={true}
            onDragStart={
                (event) => {
                    onDragStart(event, value)
                }
            }
            onDragLeave={
                (event) => {
                    onDragLeave(event, value)
                }
            }
            onDragEnd={
                (event) => {
                    onDragEnd(event, value)
                }
            }
            onDragOver={
                (event) => {
                    onDragOver(event, value)
                }
            }
        >
            <Tooltip
                placement="top"
                isOpen={props.tools && draggable.lessonID == -1}
                autohide={false}
                target={id}
                toggle={props.toggler}
                onMouseOut={
                    () => {
                        props.changeToggler(true)
                    }
                }
            >
                <p
                    className={`${Class.tool}`}
                    onClick={props.deleteLesson}
                    onMouseOver={
                        () => {
                            props.changeToggler(false)
                        }
                    }
                >
                    Удалить
                </p>
                <p
                    className={`${Class.tool}`}
                    onClick={props.copyLesson}
                    onMouseOver={
                        () => {
                            props.changeToggler(false)
                        }
                    }
                >
                    Дублировать
                </p>
            </Tooltip>
            <div
                className={`${Class.dots}`}
                id={id}
            >
                <div className={`${Class.dot} ${even} ${odd} ${each}`}></div>
                <div className={`${Class.dot} ${even} ${odd} ${each}`}></div>
                <div className={`${Class.dot} ${even} ${odd} ${each}`}></div>
            </div>
            {/* {
                dropFlag && dragFlag == false
                &&
                <div
                    className={`${Class.dropZone}`}
                    onDrop={
                        (event) => {
                            onDrop(event, value)
                        }
                    }>
                    <p>+</p>
                </div>
            } */}

            <div className={`${Class.left}`}>
                <div className={`${Class.time}`}>
                    <p>{props.start}</p>
                    <p>{props.finish}</p>
                </div>
                <div className={`${Class.rooms}`}>
                    {rooms}
                </div>
            </div>
            <div className={`${Class.info}`}>
                <h5 className={`${Class.name} m-0`}>
                    {props.name}
                </h5>
                {
                    props.type != ''
                    &&
                    <p className='m-0'>
                        {props.type}
                    </p>
                }
                {
                    props.comment != ''
                    &&
                    <p className={`${Class.comment}`}>{props.comment}</p>
                }
                {/* <hr /> */}
                {
                    (props.week.even == true || props.week.odd == true || props.week.other != '')
                    &&
                    <div className={`${Class.weeks} mt-1`}>
                        {
                            props.week.even == true
                            &&
                            <Badge className={`${Class.even_week}`}>ЧН</Badge>
                        }
                        {
                            props.week.odd == true
                            &&
                            <Badge className={`${Class.odd_week}`}>НЧ</Badge>
                        }
                    </div>
                }
                {
                    (props.week.even == true || props.week.odd == true) && props.week.other != ''
                    &&
                    <>
                        +
                    </>
                }
                {
                    props.week.other != ''
                    &&
                    <>
                        <Badge>  {props.week.other}</Badge>

                    </>
                }
                {
                    props.mentor.fullname != ''
                    &&
                    <>
                        <h6 className={`${Class.mentor} m-0`}>
                            {props.mentor.fullname}
                        </h6></>
                }

            </div>
        </div>
    )
}

export default Lesson
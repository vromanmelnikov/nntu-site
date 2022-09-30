import { Modal, ModalBody, ModalHeader } from "reactstrap"

function EditorError (props: any) {

    let args = {
        centered: true
    }

    return(
        <Modal isOpen={props.error.flag} toggle={props.toggler} {...args}>
                <ModalHeader toggle={props.toggleError}>
                    Упс! Ошибочки!
                </ModalHeader>
                <ModalBody>
                    <ul>
                        {
                            props.error.name == true
                            &&
                            <li>Название предмета не должно быть пустым</li>
                        }
                        {
                            props.error.type == true
                            &&
                            <li>Необходимо ввести тип занятия</li>
                        }
                        {
                            props.error.time == true
                            &&
                            <li>Необходимо ввести или выбрать время занятия</li>
                        }
                        {
                            props.error.timeFormat == true 
                            &&
                            <li>Неправильный формат времени. Пример: 07:30 или 7:30</li>
                        }
                    </ul>
                </ModalBody>
            </Modal>
    )
}

export default EditorError
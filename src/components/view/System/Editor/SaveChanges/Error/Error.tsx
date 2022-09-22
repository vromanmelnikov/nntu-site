import { Modal, ModalBody, ModalHeader } from "reactstrap"

function Error (props: any) {

    return(
        <Modal isOpen={props.flag} toggle={props.toggler}>
            <ModalHeader>Неверный код доступа!</ModalHeader>
            <ModalBody>
                <p>Ваш код доступа оказался неверным. Убедитель в правильности введенного кода или обратитесь в группу поддержки.</p>
            </ModalBody>
        </Modal>
    )
}

export default Error
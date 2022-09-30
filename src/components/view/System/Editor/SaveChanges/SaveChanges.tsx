import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Popover, PopoverBody, PopoverHeader } from "reactstrap"
import ErrorContainer from "./Error/Error.container"

import Class from './SaveChanges.module.css'

function SaveChanges(props: any) {

    let args = {
        centered: true,
        backdrop: true
    }

    return (
        <div>
            <ErrorContainer flag={props.sendError} setFlag={props.setSendError} />
            <Modal isOpen={props.sending} toggle={props.toggler} {...args}>
                <ModalHeader>
                    Секретный код
                </ModalHeader>
                <ModalBody>
                    <Popover target='group' isOpen={props.error} placement="top" trigger='focus'>
                        <PopoverHeader>
                            Упс! Ошибочки....
                        </PopoverHeader>
                        <PopoverBody>
                            Вы забыли ввести секретный код!
                        </PopoverBody>
                    </Popover>
                    <Input
                        type="text"
                        id="group"
                        placeholder="Код"
                        value={props.code}
                        onChange={props.onCodeChange}
                        onFocus={props.onInputFocus}
                    />
                    <p className={`${Class.info}`}>
                        Получить код вы можете у <a target='_blank' href="https://t.me/NNTU_App_Bot">Телеграм-бота</a>, 
                        или обратившись в техническую поддержку в <a target='_blank' href="https://vk.com/nntuapp?_smt=groups_list%3A1">группе приложения</a>
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button id="btn" onClick={props.sendChanges}>Отправить</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default SaveChanges
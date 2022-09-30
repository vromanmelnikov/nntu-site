import { Badge, Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Popover, PopoverBody, PopoverHeader } from "reactstrap"

import Class from './FindGroup.module.css'

function FindGroup(props: any) {

    let args = {
        centered: true
    }

    return (
        <Modal isOpen={props.flag} toggle={props.toggle} {...args} backdrop="static">
            <ModalHeader>
                Название Вашей группы
            </ModalHeader>
            <ModalBody>
                <Popover target='group' isOpen={props.error} placement="top" trigger='focus'>
                    <PopoverHeader>
                        Упс! Ошибочки....
                    </PopoverHeader>
                    <PopoverBody>
                        Вы забыли ввести название группы!
                    </PopoverBody>
                </Popover>
                <Popover target='group' isOpen={props.exisError} placement="top" trigger='focus'>
                    <PopoverHeader>
                        Упс! Ошибочки....
                    </PopoverHeader>
                    <PopoverBody>
                        Такой группы не существует либо группа введена некорректно. Пример: 20-ИСТ-1 или М20-ИСТ-1.
                    </PopoverBody>
                </Popover>
                <Input
                    type="text"
                    id="group"
                    placeholder="Название группы"
                    value={props.group}
                    onChange={props.onGroupChange}
                    autoFocus
                    // onFocus={}
                    onFocus={event => {
                        // setTimeout(event.target.select.bind(event.target), 20);
                        props.onInputFocus()
                    }}
                />
                <div className={`${Class.offers} mt-2`}>
                    {
                        props.offers.map(
                            (value: string, index: number) => {
                                return <Badge key={index} onClick={
                                    () => {
                                        props.onOfferClick(value)
                                    }
                                }>{value}</Badge>
                            }
                        )
                    }
                </div>
            </ModalBody>
            <ModalFooter>
                <Button id="btn" onClick={props.saveGroup}>Готово</Button>
            </ModalFooter>
        </Modal>
    )
}

export default FindGroup
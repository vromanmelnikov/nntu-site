import { Button } from "reactstrap"

import Class from './HoverButton.module.css'

function HoverButton(props: any) {

    return (
        <Button
            onClick={props.func}
            className={`${Class.button}`}
        >
            <img 
                src={props.icon} 
                className={`${Class.img}`}
                />
            <p className={`${Class.text}`}>
                {props.text}
            </p>
        </Button>
    )
}

export default HoverButton
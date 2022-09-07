import HoverButton from "./HoverButton"

interface Props {
    width: string,
    maxWidth: string,
    position: 'left' | 'right'
    func: any,
    text: string,
    icon: any
}

function HoverButtonContainer (props: Props) {

    let data = {
        ...props
    }

    return(
        <HoverButton />
    )
}

export default HoverButtonContainer
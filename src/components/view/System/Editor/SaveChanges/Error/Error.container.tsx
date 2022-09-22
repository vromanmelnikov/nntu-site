import Error from "./Error";

interface ErrorProps {
    flag: boolean,
    setFlag: any
}

function ErrorContainer (props: ErrorProps) {

    let toggler = () => props.setFlag(!props.flag)

    let data ={
        flag: props.flag,
        toggler
    }

    return(
        <Error {...data}/>
    )
}

export default ErrorContainer
import FindInput from "./FindInput"
// import {useState} from 'react'
import { useState } from 'react';

interface Props {
    variants: string[],
    value: string,
    
}

interface Offer {
    value: string,
    offers: string[]
}

function FindInputContainer (props: Props) {

    const variants = props.variants

    // const [value, setValue] = useState('')
    // const [offer, setOffer] = useState([])
    const [info, setInfo] = useState<Offer>({
        value: '',
        offers: []
    })

    let onValueChange = (event: any) => {
        let value = event.target.value
        let newOffers = variants.filter(
            variant => {
                if (variant.toLowerCase().indexOf(value.toLowerCase()) != -1) {
                    return true
                }
                else return false
            }
        )
        console.log(newOffers)
    }

    let data = {
        info
    }

    return(
        <FindInput {...data}/>
    )
}

export default FindInputContainer
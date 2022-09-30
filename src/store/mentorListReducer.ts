const SET_MENTOR_LIST = 'SET_MENTOR_LIST'

export let setMentorList = (mentors: string[], disciplines: string[]) => {
    return ({
        type: SET_MENTOR_LIST,
        mentors,
        disciplines
    })
}

let initialState = {
    mentors: [],
    disciplines: []
}

let mentorListReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case SET_MENTOR_LIST: {
            return({
                ...state,
                mentors: action.mentors,
                disciplines: action.disciplines
            })
        }
        default: {
            return (
                { ...state }
            )
        }
    }
}

export default mentorListReducer
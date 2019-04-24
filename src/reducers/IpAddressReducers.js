

const initState = {
    ip: 'http://10.80.71.131:8080'
}


export default function ipReducers(state = initState, action) {


    console.log("ip reduces state:", state);

    switch (action.type) {
        case 'EDIT_IP':
            return {
                ip: action.payload
            }
        default:
            return state
    }
}


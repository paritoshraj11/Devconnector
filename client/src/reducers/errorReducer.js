import {ADD_ERROR} from "../actionConstant"
const errors = (store={},action) =>{
    switch(action.type){
        case ADD_ERROR :return store = action.errors
        default:return store
    }
}

export default errors;
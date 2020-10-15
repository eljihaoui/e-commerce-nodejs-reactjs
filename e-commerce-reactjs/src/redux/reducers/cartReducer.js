let productsStorage = JSON.parse(localStorage.getItem('cart')) || []; // convet en bson
let myState = {
    products: productsStorage,
    count: productsStorage.length
}
const cartReducer = (state = myState, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            return {
                ...state,
                products: action.payload, // payload is array returned from cartActions
                count: action.payload.length
            }
        }
            case "INC_QTE": {
                return {
                    ...state,
                    products:action.payload
                }
            }
            case "DEC_QTE" :{
                return {
                    ...state,
                    products: action.payload
                }
            }
        
        default: return state
    }
}

export default cartReducer;

let productsStorage = JSON.parse(localStorage.getItem('cart')) || []; // convet en bson
let myState = {
    products: productsStorage,
    count: productsStorage.reduce((total, product) => {
        return total + product.count
    }, 0)
}
const cartReducer = (state = myState, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            return {
                ...state,
                products: action.payload, // payload is array returned from cartActions
                count: action.payload.reduce((total, product) => { return total + product.count }, 0)
            }
        }
        case "INC_QTE": {
            return {
                ...state,
                products: action.payload,
                count: state.count + 1
            }
        }
        case "DEC_QTE": {
            return {
                ...state,
                products: action.payload,
                count: state.count - 1
            }
        }

        case "DELETE_PRODUCT_CART": {
            return {
                ...state,
                products: action.payload,
                count: action.payload.reduce((total, product) => { return total + product.count }, 0)
            }
        }

        default: return state
    }
}

export default cartReducer;

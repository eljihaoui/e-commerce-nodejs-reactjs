import { uniqBy } from 'lodash'
export const addToCart = (item) => {
    let items = JSON.parse(localStorage.getItem('cart')) || [];
    items = uniqBy([{ ...item, count: 1 }, ...items], '_id');
    localStorage.setItem('cart', JSON.stringify(items));
    return {
        type: "ADD_ITEM",
        payload: items
    }
}
export const incrementQte = (product) => {
    if (product.count < product.quantity) {
        let items = JSON.parse(localStorage.getItem('cart'));
        items = items.map(p => p._id === product._id ? { ...product, count: p.count + 1 } : p);
        localStorage.setItem('cart', JSON.stringify(items));
        return {
            type: "INC_QTE",
            payload: items
        }
    }else{
        return {
            type:null
        }
    }

}
export const decrementQte = (product) => {
    if (product.count > 1) {
        let items = JSON.parse(localStorage.getItem('cart'));
        items = items.map(p => p._id === product._id ? { ...product, count: p.count - 1 } : p);
        localStorage.setItem('cart', JSON.stringify(items));
        return {
            type: "DEC_QTE",
            payload: items
        }
    }
    return { type: null } // in this case default statement in reducer will be execute
}

export const deleteProductFromCart =(id)=>{
    let items = JSON.parse(localStorage.getItem('cart'));
    items = items.filter(product => product._id !== id);
    localStorage.setItem('cart', JSON.stringify(items));
    return {
        type: "DELETE_PRODUCT_CART",
        payload: items
    }
}
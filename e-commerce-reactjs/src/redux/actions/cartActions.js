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
    let items = JSON.parse(localStorage.getItem('cart'));
    items = items.map(p => p._id === product._id ? { ...product, count: p.count + 1 } : p);
    localStorage.setItem('cart', JSON.stringify(items));
    return {
        type: "INC_QTE",
        payload: items
    }
}
export const decrementQte = (product) => {
    let items = JSON.parse(localStorage.getItem('cart'));
    items = items.map(p => p._id === product._id ? { ...product, count: p.count - 1 } : p);
    localStorage.setItem('cart', JSON.stringify(items));
    return {
        type: "DEC_QTE",
        payload: items
    }
}
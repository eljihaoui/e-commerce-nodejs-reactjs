import { API_URL } from '../config'
import queryString from 'query-string'

export const getProducts = (params) => {
    // here i need package npm i query-string
    let query = queryString.stringify(params)
    return fetch(`${API_URL}/product?${query}`)
        .then(res => res.json())
        .then(res => res.products)
        .catch(err => console.log(err));
}

export const getCategories = () => {
    return fetch(`${API_URL}/category`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(res => res.categories)
        .catch(err => console.log(err));
}

export const searchProducts = (skip, limit, filters) => {
    const data = {
        skip: skip,
        limit: limit,
        filters: filters
    }
    return fetch(`${API_URL}/product/search`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => res.products)
        .catch(err => console.log(err));
}

export const showProduct = (id) => {
    return fetch(`${API_URL}/product/${id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => res.product)
        .catch(err => console.log(err))
}
export const relatedProduct = (id) => {
    return fetch(`${API_URL}/product/related/${id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => res.products)
        .catch(err => console.log(err))
}
export const getBrainTreeToken = (userId, token) => {
    return fetch(`${API_URL}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
}
export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API_URL}/braintree/purchase/${userId}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(res => res.json())
}

export const emptyCart=(callback)=>{
localStorage.removeItem('cart');
callback();
}
import { API_URL } from '../config'
export const getProducts = (sortBy, order, limit) => {
    return fetch(`${API_URL}/product?sortBy=${sortBy}&order=${order}&limit=${limit}`)
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

export const searchProducts = (skip,limit,filters) => {
    const data={
        filters:filters
    }
    return fetch(`${API_URL}/product/search`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body : JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => res.products)
        .catch(err => console.log(err));
}

import React, { useEffect, useState } from 'react'
import { getCategories, getProducts } from './ApiCore';
import Card from './Card';

const Search = () => {
    const [categories, setCetegories] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchData, setSearchData] = useState({
        search: '',
        category: ''
    })

    const handleChange = (e) => {
        setSearchData({
            ...searchData,
            [e.target.id]: e.target.value
        })
    }

    const searchSubmit = (e) => {
        e.preventDefault();
        const { search, category } = searchData

        if (search || category) {
            getProducts({ search: search || undefined, category: category })
                .then(res => setProducts(res))
        } else {
            setProducts([])
        }
    }

    const ResultSearch = () => {
        return products && products.length > 0 && (
            <h6>Products Founds : {products.length}</h6>
        )
    }
    useEffect(() => {
        getCategories()
            .then(res => setCetegories(res));
    }, [])
    return (
        <div>
            <form onSubmit={searchSubmit}>
                <div className="input-group input-group-lg">
                    <div className="input group prepend">
                        <select id="category" className="btn" onChange={handleChange}>
                            <option value="">Select Category</option>
                            {
                                categories && (
                                    categories.map((categ, i) => (
                                        <option key={i * 10} value={categ._id}>{categ.name}</option>
                                    ))
                                )
                            }
                        </select>
                    </div>
                    <input type="search" id="search" onChange={handleChange} className="form-control mx-4" />
                    <div className="input-group-prepend">
                        <button className="btn">Search</button>
                    </div>
                </div>
            </form>
            <hr />
            {ResultSearch()}
            <div className="row">
                {
                    products && (
                        products.map((product, i) => (
                            <div key={product._id} className="col-md-4">
                                <Card product={product} />
                            </div>
                        ))
                    )

                }
            </div>
        </div>
    )
}

export default Search

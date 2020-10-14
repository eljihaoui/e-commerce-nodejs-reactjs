import React, { useState, useEffect } from 'react';
import { getCategories, searchProducts } from './ApiCore';
import Card from './Card';
import FilterByCategory from './FilterByCategory';
import FilterByPrice from './FilterByPrice';
import Layout from './Layout';

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(3);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);

    const [productsFiltred, setProductsFiltred] = useState([]);

    const [myFilters, setMyFilters] = useState({
        category: [],
        price: [] // min ,max
    });

    useEffect(() => {
        getCategories()
            .then(res => setCategories(res))

        searchProducts(skip, limit, myFilters)
            .then(res => {
                setProductsFiltred(res)
                setSkip(0)
                setSize(res.length)
            })
    }, [myFilters]) // s'exécute  chaque modif myFilters

    const loadMore = () => {
        const toSkip = skip + limit;
        //console('const toSkip = skip + limit;',toSkip)
        searchProducts(toSkip, limit, myFilters)
            .then(res => {
                setProductsFiltred([...productsFiltred,...res])
                setSize(res.length)
                setSkip(toSkip);
            })
    }
    const btnToLoadMore = () => {

        return (
            size > 0 &&
            size >= limit &&
            (
                <div className="text-center">
                    <button onClick={loadMore} className="btn btn-outline-success">Load More</button>
                </div>
            )
        )
    }
    const handleFilters = (data, filterBy) => {
        setMyFilters({
            ...myFilters,
            [filterBy]: data
        });
        //console.log(myFilters);
    }

    return (
        <div>
            <Layout
                title=""
                description="Shopping Page "
                className="container">
                <div className="row">
                    <div className="col-md-3">
                        <FilterByCategory
                            categories={categories}
                            handleFilters={(data) => handleFilters(data, 'category')}
                        />
                        <hr />
                        <FilterByPrice handleFilters={(data) => handleFilters(data, 'price')} />

                    </div>
                    <div className="col-md-9">
                        {
                            productsFiltred.length > 0 && (
                                `Products Count : ${productsFiltred.length}`
                            )
                        }
                        <div className="row mt-3 mb-50">
                            {
                                productsFiltred.map((product, i) => (
                                    <div key={product._id} className="col-md-6">
                                        <Card product={product} key={i} />
                                    </div>
                                ))
                            }
                        </div>
                        <hr/>
                        {btnToLoadMore()}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Shop

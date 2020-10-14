import React, { useState, useEffect } from "react";
import { getProducts } from "./ApiCore";
import Card from "./Card";
import Layout from "./Layout";
import Search from "./Search";

const Home = () => {
    const [productsBestSellers, setProductsBestSellers] = useState([]);
    const [productsArrivals, setProductsArrivals] = useState([]);
    
    const loadBestSellers = () => {
        getProducts({ sortBy: 'sold', order: 'desc', limit: 6 })
            .then(products => setProductsBestSellers(products))
    }

    const loadArrivals = () => {
        getProducts({ sortBy: 'createdAt', order: 'desc', limit: 3 })
            .then(products => setProductsArrivals(products))
    }

    useEffect(() => {
        loadArrivals();
        loadBestSellers();
    }, []);

    return (
        <div>
            <Layout
                title="Home Page"
                description="eCommerce APP"
                className="container">

                <Search />
                <hr />
                <h5 className="titre">Arrivals Products</h5>
                <div className="row">
                    {
                        productsArrivals.map((product, i) => (
                            <div key={i * 2} className="col-md-4">
                                <Card product={product} key={i}></Card>
                            </div>
                        ))
                    }
                </div>

                <h5 className="titre">best Sellers Products</h5>
                <div className="row">
                    {
                        productsBestSellers.map((product, i) => (
                            <div key={i} className="col-md-4">
                                <Card product={product} key={i}></Card>
                            </div>
                        ))
                    }
                </div>
            </Layout>
        </div>
    )
};
export default Home;

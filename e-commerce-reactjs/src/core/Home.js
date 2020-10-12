import React, { useState, useEffect } from "react";
import { getProducts } from "./ApiCore";
import Card from "./Card";
import Layout from "./Layout";



const Home = () => {
    const [productsBestSellers, setProductsBestSellers] = useState([]);
    const [productsArrivals, setProductsArrivals] = useState([]);
    const loadBestSellers = () => {
        getProducts('sold', 'desc', 6)
            .then(products => setProductsBestSellers(products))
    }
    const loadArrivals = () => {
        getProducts('createdAt', 'desc', 3)
            .then(products => setProductsArrivals(products))
    }
    useEffect(() => {
        loadArrivals();
        loadBestSellers();
    }, [])
    return (
        <div>
            <Layout
                title="Home Page"
                description="eCommerce APP"
                className="container">
                <h5 className="titre">Arrivals Products</h5>
                    <div className="row">
                        {
                            productsArrivals.map((product, i) => (
                                <div className="col-md-4">
                                    <Card product={product} key={i}></Card>
                                </div>
                            ))
                        }
                    </div>

                <h5 className="titre">best Sellers Products</h5>
                <div className="row">
                        {
                            productsBestSellers.map((product, i) => (
                                <div className="col-md-4">
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

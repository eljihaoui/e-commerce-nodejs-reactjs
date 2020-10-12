import React, { Fragment } from 'react'
import Layout from '../../../core/Layout';


const Product = () => {
    return (
        <Fragment>
            <Layout
                title='Products'
                description="List of products"
                className="container"
            >         
               <h3>la liste des produits </h3>
            </Layout>
        </Fragment>
    )
}

export default Product;

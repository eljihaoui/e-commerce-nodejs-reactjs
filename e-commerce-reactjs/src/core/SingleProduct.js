import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { relatedProduct, showProduct } from './ApiCore';
import Card from './Card';
import Layout from './Layout';

const SingleProduct = (props) => {

    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => { // load of conponnent
        let productId = props.match.params.productId;
        showProduct(productId)
            .then(res => {
                setProduct(res)
                return relatedProduct(productId)
            }).then(relateds => setRelatedProducts(relateds))
            .catch(err => console.log(err))
    }, [props]) // car le changement de URL affecte props directement 

    return (
        <div>
            {
                product && product.description && (  // car l'affichage sera avant le cargement de product
                    <Layout
                        title="Home Page"
                        description={`Détails Product : ${product.name}`}
                        className="container"
                    >
                        <div className="row">
                            <div className="col-md-7">
                                <Card product={product} showViewBtn={false} trancatDescription={false} />
                            </div>
                            <div className="col-md-5">
                                <div style={{ fontWeight: 'bold', color: 'indigo', textAlign: 'left' }}>
                                    <span className="material-icons" style={{ position: 'relative', top: 7 }}>keyboard_arrow_right</span>
                                Related Products
                             </div>
                                {/* {JSON.stringify(relatedProducts)} */}
                                {
                                    relatedProducts && relatedProducts.length > 0 && (
                                        <ul className="list-group">
                                            {
                                                relatedProducts.map((p, i) => (
                                                    <Link key={i * 3} to={`/product/${p._id}`}>
                                                        <li key={i * 2} className="list-group-item">{p.name}</li>
                                                    </Link>
                                                ))
                                            }

                                        </ul>
                                    )
                                }
                            </div>
                        </div>
                    </Layout>
                )
            }
        </div>
    )
}

export default SingleProduct

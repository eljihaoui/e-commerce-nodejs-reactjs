import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQte, incrementQte } from '../redux/actions/cartActions';
import Layout from './Layout';
import ShowPhoto from './ShowPhoto';

const Cart = () => {
    let products = useSelector(state => state.cart.products);
    let dispatch =useDispatch();
    return (
        <Layout
            title="Home Page"
            description="Manage Product in My Cart"
            className="container">
            <div className="col-md-9">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products.length > 0 && (
                                products.map((product, i) => (
                                    <tr key={product._id}>
                                        <td>
                                            <ShowPhoto item={product} url="product/photo" className="img-thumbnail"></ShowPhoto>
                                        </td>
                                        <td>
                                            <p className="textBold mb-0">   {product.name}  </p>
                                            <p> {product.description}</p>
                                        </td>
                                        <td>${product.price}</td>
                                        <td>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <h5><span className="span span-success">{product.count}</span></h5>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <button onClick={()=>dispatch(incrementQte(product))} className="btn btn-sm btn-info">
                                                                <i className="material-icons">add</i>
                                                            </button>
                                                            <button onClick={()=>dispatch(decrementQte(product))} className="btn btn-sm btn-secondary">
                                                                <i className="material-icons">remove</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="col-md-3">
            </div>
        </Layout>
    )
}
export default Cart

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQte, deleteProductFromCart, incrementQte } from '../redux/actions/cartActions';
import CheckOut from './CheckOut';
import Layout from './Layout';
import ShowPhoto from './ShowPhoto';

const Cart = () => {
    let products = useSelector(state => state.cart.products);
    let dispatch = useDispatch();
    return (
        <Layout
            title="Home Page"
            description="Manage Product in My Cart"
            className="container-fluid">
                <div className="row">
            <div className="col-md-9">
                <table className="table table-striped">
                    <thead className="table-info">
                        <tr className="text-center">
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Q.Stock</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
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
                                        <td>${product.quantity}</td>

                                        <td>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <h5><span className="span span-success">{product.count}</span></h5>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            {
                                                                product.count < product.quantity && (
                                                                    <button onClick={() => dispatch(incrementQte(product))} className="btn ml-2 btn-raised btn-sm btn-info">
                                                                        <i className="material-icons">add</i>
                                                                    </button>
                                                                )
                                                            }
                                                            {
                                                                product.count > 1 && (
                                                                    <button onClick={() => dispatch(decrementQte(product))} className="btn ml-2 btn-raised btn-sm btn-secondary">
                                                                        <i className="material-icons">remove</i>
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center textBold" width="8%">${product.count * product.price}</td>
                                        <td > 
                                         <button onClick={() => dispatch(deleteProductFromCart(product._id))} className="btn ml-2 btn-raised btn-sm btn-danger">
                                            <i className="material-icons">delete</i>
                                        </button></td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="col-md-3">
                <CheckOut products={products}/>
            </div>
            </div>
        </Layout>
    )
}
export default Cart

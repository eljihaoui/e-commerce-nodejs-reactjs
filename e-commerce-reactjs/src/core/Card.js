import React from 'react'
import { Link } from 'react-router-dom'
import ShowPhoto from './ShowPhoto'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/actions/cartActions'
const Card = ({ product, showViewBtn = true, trancatDescription = true }) => {
    // why use dispatcher because the methode wo need to call it not in the same componenent ,it was in the store
    let dispatch = useDispatch()
    const showStock = (qte) => {
        return qte > 0 ? <span className="badge badge-info">Qunatity stock : {qte}</span> : <span className="badge badge-danger">Out of stock</span>
    }
    return (
        <div>
            <div className="card  m-2" style={{ backgroundColor: '#fff7e6' }}>
                <div className="card-body">

                    <div style={{ fontWeight: 'bold', color: 'indigo', textAlign: 'left' }}>
                        <span className="material-icons" style={{ position: 'relative', top: 7 }}>keyboard_arrow_right</span>
                        {product.name}
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <ShowPhoto item={product} url="product/photo" className="img-thumbnail"></ShowPhoto>
                            <span className="badge badge-primary">Price : ${product.price}</span> <br />
                            {showStock(product.quantity)} <br />
                            <span className="badge badge-secondary">Added : {moment(product.createdAt).fromNow()}</span>

                        </div>
                        <div className="col-md-6">
                            <div className="badge badge-secondary my-2 mx-auto" style={{ width: "100%" }}>- {product.category.name}</div>
                            <p className="card-text">
                                {
                                    product.description.substring(0, (trancatDescription ? 150 : product.description.lenght))
                                }
                            </p>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: 4 }}>
                        {
                            showViewBtn && (
                                <Link to={`/product/${product._id}`}>
                                    <button className="btn btn-warning  badge-warning mr-2">View Product</button>
                                </Link>
                            )
                        }
                        {
                            product.quantity > 0 && (
                                <button onClick={() => dispatch(addToCart(product))} className="btn btn-success">Add to Cart</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card

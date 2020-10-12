import React from 'react'
import { Link } from 'react-router-dom'
import ShowPhoto from './ShowPhoto'

const Card = ({ product }) => {
    return (
        <div>
            <div class="card m-2">

                <div class="card-body">
                    <p>
                        <span className="material-icons" style={{ position: 'relative', top: 7 }}>keyboard_arrow_right</span>
                        <span style={{ fontWeight: 'bold', color: 'indigo' }}>{product.name}</span>
                    </p>
                    <div className="row">
                        <div className="col-md-6">
                            <ShowPhoto item={product} url="product/photo" className="img-thumbnail"></ShowPhoto>
                            <span class="card-text text-left" style={{ color: "red", fontWeight: "bold",fontSize:'14px' }}>Price : ${product.price}</span> <br/>
                            <span class="card-text text-left" style={{ color: "indigo", fontWeight: "bold",fontSize:'12px' }}>Qunatity stock : ${product.quantity}</span>

                        </div>
                        <div className="col-md-6">
                            <p class="card-text">{product.description.substring(0, 150) + ' ...'}</p>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: 4 }}>
                        <Link to="">
                            <button className="btn btn-warning mr-2">View Product</button>
                        </Link>
                        <Link to="">
                            <button className="btn btn-success">Add to Cart</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Card

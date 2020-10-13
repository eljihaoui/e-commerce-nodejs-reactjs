import React from 'react'
import { Link } from 'react-router-dom'
import ShowPhoto from './ShowPhoto'

const Card = ({ product }) => {
    return (
        <div>
            <div className="card  m-2" style={{backgroundColor:'#fff7e6'}}>
                <div className="card-body">
                  
                        <div style={{ fontWeight: 'bold', color: 'indigo', textAlign: 'left' }}>
                            <span className="material-icons" style={{ position: 'relative', top: 7 }}>keyboard_arrow_right</span>
                            {product.name}
                        </div>
                    
                    <div className="row">
                        <div className="col-md-6">
                            <ShowPhoto item={product} url="product/photo" className="img-thumbnail"></ShowPhoto>
                            <span className="badge badge-primary">Price : ${product.price}</span> <br />
                            <span className="badge badge-info">Qunatity stock : ${product.quantity}</span>

                        </div>
                        <div className="col-md-6">
                            <div className="badge badge-secondary my-2 mx-auto" style={{ width: "100%" }}>- {product.category.name}</div>
                            <p className="card-text">{product.description.substring(0, 150) + ' ...'}</p>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: 4 }}>
                        <Link to="">
                            <button className="btn btn-warning  badge-warning mr-2">View Product</button>
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

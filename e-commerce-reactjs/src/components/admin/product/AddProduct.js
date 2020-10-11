import React, { useState } from 'react'
import { API_URL, toastrOptions } from '../../../config'
import { isAuthenticated } from '../../../helpers/auth'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Layout from '../../../core/Layout';

function AddProduct(props) {
    const [product, setProduct] = useState({
        photo: '',
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        category: 0,
        shipping: false
    })

    const [formData,setformData] = useState(new FormData()) // FormData : classe par defaut dans javascript ,car on va envoyer un fichier
    // pas de setformaData car la classe possède déja ses méthodes
    const handleChange = (e) => {
        const value = (e.target.type === 'file') ? e.target.files[0] :
            (e.target.type === 'checkbox') ? e.target.checked : e.target.value;

        formData.set(e.target.id, value)
        setProduct({
            ...product,
            [e.target.id]: value
        })
    }

    const submitProduct = (e) => {
        e.preventDefault();
        const { user, token } = isAuthenticated();

        fetch(`${API_URL}/product/create/${user._id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData) // pas obkigatoire utiliseé JSON.stringfy car l'objet est déja structuré comme json
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    toastr.warning(res.error, 'Please check form !', toastrOptions)
                } else if (res.name === 'MongoError') {
                    toastr.error('Category not saved in database ', 'save category', toastrOptions)
                } else {
                    toastr.success(`category ${product.name} created successFully`, 'New Category', toastrOptions)
                    setProduct({
                        photo: '',
                        name: '',
                        description: '',
                        price: 0,
                        quantity: 0,
                        category: 0,
                        shipping: false
                    })
                    setformData(new formData())
                    // props.history.push('/signin')
                }
            }).catch(err => {
                toastr.error(err, 'Server erreur ', toastrOptions)
            })
    }
    const form = () => (
        <form onSubmit={submitProduct}>

            <div className="form-group">
                <label htmlFor="photo">photo product</label>
                <input onChange={handleChange} type="file" id="photo" name="photo" className="form-control-file" />
            </div>

            <div className="form-group">
                <label htmlFor="name">Name   </label>
                <input value={product.name} required autoFocus onChange={handleChange} type="text" name="name" id="name" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="description">description  </label>
                <textarea value={product.description} required onChange={handleChange} rows="5" type="text" name="description" id="description" className="form-control" ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="price">price  </label>
                <input value={product.price} required onChange={handleChange} type="number" name="price" id="price" className="form-control" />
            </div>

            <div className="form-group">
                <label htmlFor="quantity">quantity  </label>
                <input value={product.quantity} required onChange={handleChange} type="number" name="quantity" id="quantity" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="category">category  </label>
                <select required onChange={handleChange} value={product.category} name="category" id="category" className="form-control" >
                    <option value="0">---</option>
                    <option value="5f7cfa340f3401239067915f">DEV WEB</option>
                </select>
            </div>
            <div className="form-check">
                <input checked={product.shipping} onChange={handleChange} type="checkbox" id="shipping" name="shipping" className="form-check-input" />
                <label className="form-check-label" htmlFor="shipping">Shipping</label>
            </div>
            <hr />
            <button type="submit" className="my-2 btn btn-raised btn-info">New Product</button>
            {JSON.stringify(product)}
        </form>
    )
    return (
        <div>
            <Layout
                title=""
                description="New New Product"
                className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        {form()}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AddProduct;

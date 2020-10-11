import React, { useState } from 'react'
import { API_URL, toastrOptions } from '../../../config'
import { isAuthenticated } from '../../../helpers/auth'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Layout from '../../../core/Layout';

function AddCategory(props) {
    const [category, setCategory] = useState({
        name: ''
    })
    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.id]: e.target.value
        })
    }
    const submitCategory = (e) => {
        e.preventDefault();
        const { user, token } = isAuthenticated();

        fetch(`${API_URL}/category/create/${user._id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    toastr.warning(res.error, 'Please check form !', toastrOptions)
                } else if (res.name === 'MongoError') {
                    toastr.error('Category not saved in database ', 'save category', toastrOptions)
                } else {
                    toastr.success(`category ${category.name} created successFully`, 'New Category', toastrOptions)
                    setCategory({name:''})
                    // props.history.push('/signin')
                }
            }).catch(err => {
                toastr.error(err, 'Server erreur ', toastrOptions)
            })
    }
    const form = () => (
        <form onSubmit={submitCategory}>
            <div className="form-group">
                <label htmlFor="name">Name Category : </label>
                <input value={category.name} required autoFocus onChange={handleChange} type="text" name="name" id="name" className="form-control" placeholder=" name category ..." />
            </div>
            <button type="submit" className="btn btn-raised btn-info">Save</button>
        </form>
    )
    return (
        <div>
            <Layout
                title=""
                description="Add New Category"
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

export default AddCategory

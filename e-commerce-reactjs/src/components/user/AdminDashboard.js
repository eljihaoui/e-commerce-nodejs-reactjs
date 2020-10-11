import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../../core/Layout'
import { isAuthenticated } from '../../helpers/auth'

const AdminDashboard = () => {
    const adminLinks = () => {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title alert alert-secondary p-2">
                        <div className="material-icons" style={{ position: 'relative', top: 5 }}>people_alt</div>   User Links
                </div>
                    <ul className='list-group list-group-flush'>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/category/create">Create Category</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to='/product/create'>New Product</Link>
                        </li>

                    </ul>
                </div>
            </div>
        )

    }
    const AdminInfo = () => {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title alert alert-secondary p-2">
                        <div className="material-icons" style={{ position: 'relative', top: 5 }}>people_alt</div>   User Information
                </div>
                    <ul className='list-group list-group-flush'>
                        <li className="list-group-item">name : {name}</li>
                        <li className="list-group-item">email : {email}</li>
                        <li className="list-group-item">role: {role ? 'Admin' : 'User'}</li>
                    </ul>
                </div>
            </div>
        )
    }
  
    const { user: { name, email, role } } = isAuthenticated();
    return (
        <Fragment>
            <Layout
                title={`Dashboard User : ${name}`}
                description={`Welcome : ${name}`}
                className="container"
            >

                <div className="row">
                    <div className="col-md-4">
                        {adminLinks()}
                    </div>

                    <div className="col-md-8">
                        {AdminInfo()}
                        <hr/>
                    </div>

                </div>

            </Layout>
        </Fragment>
    )
}

export default AdminDashboard

import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../../core/Layout'
import { isAuthenticated } from '../../helpers/auth'

const Dashboard = () => {
    const userLinks = () => {
        return (
            <div class="card">
                <div class="card-body">
                    <div class="card-title alert alert-info p-2">
                        <div class="material-icons" style={{ position: 'relative', top: 5 }}>people_alt</div>   User Links
                </div>
                    <ul className='list-group list-group-flush'>
                        <li className="list-group-item">
                            <Link className="nav-link" to='/cart'>My Cart</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to='/profile'>My Profile</Link>
                        </li>

                    </ul>
                </div>
            </div>
        )

    }
    const userInfo = () => {
        return (
            <div class="card">
                <div class="card-body">
                    <div class="card-title alert alert-info p-2">
                        <div class="material-icons" style={{ position: 'relative', top: 5 }}>people_alt</div>   User Information
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
    const userPurshaseHistory = () => {
        return (
            <div class="card">
                <div class="card-body">
                    <div class="card-title alert alert-info p-2">
                        <div class="material-icons" style={{ position: 'relative', top: 5 }}>people_alt </div>
                        User history
                    </div>
                    <ul className='list-group list-group-flush'>
                        <li className="list-group-item">history</li>

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
                    <div className="col-md-3">
                        {userLinks()}
                    </div>

                    <div className="col-md-9">
                        {userInfo()}
                        <hr />
                        {userPurshaseHistory()}
                    </div>

                </div>

            </Layout>
        </Fragment>
    )
}

export default Dashboard

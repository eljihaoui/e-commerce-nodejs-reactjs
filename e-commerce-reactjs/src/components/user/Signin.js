import React, { useState } from "react";
import { API_URL, toastrOptions } from "../../config";
import Layout from "../../core/Layout";
import toastr from 'toastr';
import 'toastr/build/toastr.css';
const Signin = (props) => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })
  }
  const submitSignin = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(res => {
        console.log("res :", res);
        if (res.error) {
          toastr.warning(res.error, 'Connexion ....', toastrOptions)
        } else {
          
          toastr.info('user is authenticated  successfully','Connexion ...', toastrOptions)
          localStorage.setItem('jwt_info',JSON.stringify(res));
          props.history.push('/')
        }
      })
      .catch(err => {
        toastr.error(err, 'Server erreur ', {
          "positionClass": "toast-bottom-center",
        })
      })
  }
  const form = () => (
    <form onSubmit={submitSignin}>
      <div className="form-group">
        <label htmlFor="email">Email: </label>
        <input onChange={handleChange} type="email" name="email" id="email" className="form-control" placeholder="" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password: </label>
        <input onChange={handleChange} type="password" name="password" id="password" className="form-control" placeholder="" />
      </div>
      <button type="submit" className="btn btn-raised btn-info">Connexion</button>
    </form>
  )
  return (
    <div>
      {/*children : entre les tags Layout , il s'appele children */}
      <Layout
        title="Signin page"
        description="Sign in to  eCommerce App"
        className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            {form()}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Signin;

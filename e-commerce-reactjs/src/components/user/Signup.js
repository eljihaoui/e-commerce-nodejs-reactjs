import React, { useState } from "react";
import { API_URL } from "../../config";
import Layout from "../../core/Layout";

const Signup = () => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })
  }
  const submitSignup = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => console.log(res))
      .catch(err => console.error(err))
  }
  const form = () => (
    <form onSubmit={submitSignup}>
      <div className="form-group">
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} type="text" name="name" id="name" className="form-control" placeholder="" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email: </label>
        <input onChange={handleChange} type="email" name="email" id="email" className="form-control" placeholder="" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password: </label>
        <input onChange={handleChange} type="password" name="password" id="password" className="form-control" placeholder="" />
      </div>
      <button type="submit" className="btn btn-raised btn-primary">Register</button>
    </form>
  )
  return (
    <div>
      {/*children : entre les tags Layout , il s'appele children */}
      <Layout
        title="Signup page"
        description="Create Account for free "
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

export default Signup;

import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../helpers/auth'
import { emptyCart, getBrainTreeToken, processPayment } from './ApiCore'
import BrainTreeDropIn from 'braintree-web-drop-in-react'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { toastrOptions } from '../config'
const CheckOut = ({ products }) => {
    const [data, setData] = useState({
        braintreeToken: null,
        error: null,
        instance: {}
    })
    const userId = isAuthenticated() && isAuthenticated().user._id; // si  isAuthenticated() not null return  id
    const token = isAuthenticated() && isAuthenticated().token;

    useEffect(() => {
        console.log('userID, token', userId, token)
        getBrainTreeToken(userId, token)
            .then(res => setData({ ...data, braintreeToken: res.token }))
            .catch(err => setData({ ...data, error: err }))
    }, [])

    const getTotal = (products) => {
        return products.reduce((total, product) => total + (product.price * product.count), 0)
    }
    const buy = () => {
        console.log("data.instance :", data.instance)
        data.instance.requestPaymentMethod()
            .then(data => {
                let paymentData = {
                    amount: getTotal(products),
                    paymentMethodNonce: data.nonce
                }
                processPayment(userId, token, paymentData)
                    .then(res => {
                        console.log(res)
                        emptyCart(() => {
                            toastr.success('Valid ', 'Payment was successfully', toastrOptions)
                        })
                    })
                    .catch(err => toastr.error(err.message, 'Payment', toastrOptions)
                    )
            })
            .catch(err => {
                toastr.error(err.message, 'Payment', toastrOptions)
            });
    }
    const showBtnCheckOut = () => {
        if (isAuthenticated()) {
            return (
                <Fragment>
                    {dropInFormBrainTree()}
                    <button onClick={buy} className="btn btn-raised btn-success">Pay</button>
                </Fragment>
            )
        }
        return (
            <Link to='/signin'>
                <button className="btn btn-raised btn-warning btn-block">Checkout</button>
            </Link>
        )
    }
    const dropInFormBrainTree = () => {
        console.log('Token Brain tree', data.braintreeToken)
        return (<div>
            {
                data.braintreeToken !== null && products.length > 0 && (
                    <BrainTreeDropIn options={{
                        authorization: data.braintreeToken,
                        paypal: {
                            flow: "vault"
                        }
                    }}
                        onInstance={(instance) => (data.instance = instance)}
                    />
                )
            }
        </div>
        )
    }
    return (
        <div>
            <h5 className="text-center">Total : <span className="badge badge-success">${getTotal(products)}</span> </h5>
            <hr />
            {showBtnCheckOut()}
        </div>
    )
}
export default CheckOut

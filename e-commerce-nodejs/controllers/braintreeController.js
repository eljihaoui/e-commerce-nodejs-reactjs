const braintree = require("braintree");
const { result } = require("lodash");
require('dotenv').config();
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,//    environment: braintree.Environment.Production,
    merchantId: process.env.BrainTree_MerchantID,
    publicKey: process.env.BrainTree_PublicKey,
    privateKey: process.env.BrainTree_PrivateKey
});
/****************************  ************************/
exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        res.json({
            token: response.clientToken
        });
    });
}
/****************************  ************************/
exports.processPayment = (req, res) => {

    let { amount, paymentMethodNonce } = req.body;
    console.log("req.body===>", req.body)
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: paymentMethodNonce,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.send(result)
    })
}
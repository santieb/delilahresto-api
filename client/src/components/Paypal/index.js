import React, {} from 'react'
import { Link } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = ({ totalPrice }) => {
  return (
    <PayPalScriptProvider options={{
      "client-id":
        "client-id" }}>
          <PayPalButtons 
          style={{ layout: "horizontal" }} 
          createOrder={(data, actions) => { 
            return actions.order.create({
              purchase_units: [{
                  amount: {
                      value: totalPrice,
                      currency_code: "USD"
                  },
                  shipping: {
                      options: [
                          {
                              id: "SHIP_123",
                              label: "Delilah deliveries",
                              type: "SHIPPING",
                              selected: true,
                              amount: {
                                  value: "0.00",
                                  currency_code: "USD"
                              }
                          },
                      ]
                  }
              }]
          })
        }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert('Transaction completed by ' + details.payer.name.given_name);
              <Link to='/my-account'>My account</Link>
              window.location.href = "/my-account"
            })
          }} 
        />
    </PayPalScriptProvider>
  );
}

export default Paypal
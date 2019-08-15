import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_fQwLyWLoQ5P1MF8jx1UEZGUN0005QgoWvt';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => alert('Payment Success'))
          .catch(error => {
              console.log('Payment error: ', JSON.parse(error));
              alert('There is the issue with your payment. Please make sure you use the provided Credit Card');
          })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='James Store'
            billingAddress
            shippingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`Your total is $ ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
         />
    )
}

export default StripeCheckoutButton;
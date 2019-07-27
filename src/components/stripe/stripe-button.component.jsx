import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_fQwLyWLoQ5P1MF8jx1UEZGUN0005QgoWvt';

    const onToken = token => {
        console.log(token);
        alert('Payment Success')
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
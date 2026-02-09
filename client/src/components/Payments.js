import react from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

const Payments = (props) => {
    return (
        <StripeCheckout
            name="bookab" // the pop-in header title
            description="$5 for 5 game credits"
            amount={500} // amount in U.S. cents
            token={token => props.handleToken(token)} // callback function that gets called when the token from Stripe is created after a successful payment
            stripeKey={process.env.REACT_APP_STRIPE_KEY} // publishable key from Stripe dashboard
        >
            <button className="btn">
                Add Credits
            </button>
        </StripeCheckout>
    );
};

export default connect(null, actions)(Payments);
import keys from '../config/keys.js';
import Stripe from 'stripe';
import requireLogin from '../middlewares/requireLogin.js';
import pgPool from "../services/pgPool.js";



 

export default function billingRoutes(app) {
  const stripe = new Stripe(keys.stripeSecretKey);

  app.post('/api/stripe', requireLogin, async (req, res) => {
    

    try {
      const {token} = req.body;
      const amount = 500;
      await stripe.charges.create({
        amount: amount,
        currency: 'usd',
        description: 'Bookab Credits',
        source: token.id, // obtained with Stripe.js on the client side
      });

      const creditsAdded = req.user.credits += amount / 100; // assuming 1 credit = $1


      const result = await pgPool.query(
        'UPDATE users SET credits = $1 WHERE id = $2 RETURNING *',
        [creditsAdded, req.user.id]
      )

      res.send(result.rows[0]);
    } catch (error) {
      res.status(500).send({ success: false, error: error.message });
    }
  });
}


import { query as q } from 'faunadb'
import { fauna } from '../../../service/fauna'
import { stripe } from '../../../service/stripe'

export async function saveSubscription(
    subscriptionId: string,
    customerId: string
) {
    try {
        const userRef = await fauna.query(
            q.Select(
                'ref',
                q.Get(
                    q.Match(
                        q.Index('user_by_stripe_customer_id'),
                        customerId
                    )
                )
            )
        )
    
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    
        const subscriptionData = {
            id: subscription.id,
            userId: userRef,
            status: subscription.status,
            price_id: subscription.items.data[0].price.id,
        }
    
        await fauna.query(
            q.Create(
                q.Collection('subscriptions'),
                { data: subscriptionData }
            )
        )    
    } catch (error) {
        console.log("Database error ", error)   
    }
}
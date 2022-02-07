import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { getStripeJS } from '@/services/stripe-js'
import { api } from '@/services/api'
import styles from './styles.module.scss'

type Props = {
  priceId: string
}

export function SubscribeButton({ priceId }: Props) {
  const { data: session } = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    if (session.activeSubscription) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data

      const stripe = await getStripeJS()
      stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
      Subscribe now
    </button>
  )
}

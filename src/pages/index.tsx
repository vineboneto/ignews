import Head from 'next/head'
import { GetStaticProps } from 'next'

import { SubscribeButton } from '@/components'
import { stripe } from '@/services/stripe'
import styles from './home.module.scss'

type HomeProps = {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome</span>
          <h1>
            News about <br />
            the <span>React</span> world.
          </h1>
          <p>
            Get access all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KPS0VHnV4GSwrmDa1jjFul8')

  const product = {
    priceId: price.id,
    amount: (price.unit_amount / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }),
  }

  const oneDayInSeconds = 60 * 60 * 24

  return {
    props: {
      product,
    },
    //tempo para que a página seja regerada
    revalidate: oneDayInSeconds,
  }
}

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

// Client-side: Dados que são gerados após a pagina ter sido renderizada, Menos Processamento
// Server-side: Dados carregando antes da tela ser renderizada, Mais processamento
// Static Site Generation: Pagina em cache, Cache
// Com a necessidade de realizar uma chamada por motivo de indexação para motores de busca, é melhor utilizar getStaticProps
// em casos que é necessário dados em tempo real, porém
// se for uma chamada custosa, ou que os dados persistem por muito tempo, a melhor forma é através do getStaticProps,
// pois é mais performático,
// de outra forma a melhor forma é realizar uma chamada api pelo lado do cliente.
// SSG Gera uma pagina estática html realizando cache e retornando para o novos usuários de forma mais rápida: getStaticProps
// SSR Realiza a chamada api no servidor next: getServerSideProps
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

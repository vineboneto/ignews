import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '@/services/prismic'
import styles from './styles.module.scss'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

type Props = {
  posts: Post[]
}

export default function Posts({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.getAllByType('post', {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  })

  const posts = response.map((post) => {
    const contents = post.data.content as any[]
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: contents.find((content) => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  const oneHour = 60 * 60

  return {
    props: {
      posts,
    },
    revalidate: oneHour,
  }
}

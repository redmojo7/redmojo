import Link from 'next/link'
import Image from 'next/image'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { getPosts, getPostBySlug } from '@/lib/posts'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { notFound } from 'next/navigation'
import NewsletterForm from '@/components/newsletter-form'

export async function generateStaticParams() {
  const posts = await getPosts()
  const slugs = posts.map(post => ({ slug: post.slug }))

  return slugs
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post
  const { title, image, author, publishedAt } = metadata

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Link
          href='/posts'
          className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to posts</span>
        </Link>

        {image && (
          <div className='relative mb-6 w-full overflow-hidden'>
            {/* Single container with themed border that changes based on theme */}
            <div className='relative rounded-lg border-2 border-black dark:border-white'>
              {/* Image container with no additional border */}
              <div className='relative h-96 w-full overflow-hidden'>
                <Image
                  src={image}
                  alt={title || ''}
                  className='rounded-md object-cover'
                  fill
                />
              </div>
            </div>
          </div>
        )}

        <header>
          <h1 className='title'>{title}</h1>
          <p className='mt-3 text-xs text-muted-foreground'>
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        <main className='prose mt-16 dark:prose-invert'>
          <MDXContent source={content} />
        </main>

        <footer className='mt-16'>
          <NewsletterForm />
        </footer>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import Posts from '@/components/posts'

export default async function RecentPosts() {
  const posts = await getPosts(4)

  return (
    <section className='pb-24'>
      <div>
        <div className='mb-12 flex items-center gap-4'>
          <div className='font-mono text-sm text-green-500/70'>$</div>
          <h2 className='title mb-0'>Recent posts</h2>
          <div className='font-mono text-xs text-muted-foreground'>
            {'[ '}
            <span className='text-green-500'>{posts.length}</span>
            {' entries ]'}
          </div>
        </div>
        <Posts posts={posts} />

        <Link
          href='/posts'
          className='mt-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground underline decoration-green-500/30 decoration-1 underline-offset-2 transition-colors hover:text-green-500 hover:decoration-green-500'
        >
          <span className='text-green-500/70'>→</span>
          <span>cat /posts/*.mdx</span>
        </Link>
      </div>
    </section>
  )
}

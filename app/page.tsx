import Intro from '@/components/intro'
import NewsletterForm from '@/components/newsletter-form'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'

export default function Home() {
  return (
    <section className='relative pb-24 pt-40'>
      {/* Background grid pattern */}
      <div className='pointer-events-none fixed inset-0 -z-10 opacity-5'>
        <div
          className='h-full w-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className='container max-w-3xl'>
        <Intro />

        <div className='relative'>
          {/* Section divider with tech aesthetic */}
          <div className='my-12 flex items-center gap-4'>
            <div className='h-px flex-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent'></div>
            <div className='font-mono text-xs text-muted-foreground'>
              {'<'} /dev/redmojo {'>'}
            </div>
            <div className='h-px flex-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent'></div>
          </div>
        </div>

        <RecentPosts />
        <RecentProjects />

        <NewsletterForm />
      </div>
    </section>
  )
}

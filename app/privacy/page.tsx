import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How RedMojo collects, uses, and protects information when you use this site.'
}

export default function PrivacyPage() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Privacy Policy</h1>

        <div className='prose prose-neutral max-w-none dark:prose-invert prose-headings:font-serif'>
          <p className='text-muted-foreground'>
            Last updated: April 4, 2026
          </p>

          <p>
            This policy describes how RedMojo (&quot;we&quot;, &quot;us&quot;)
            handles information when you visit this website or use its features.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Contact form.</strong> If you use the contact form, we
              collect the name, email address, and message content you submit.
            </li>
            <li>
              <strong>Newsletter.</strong> If you subscribe, we collect the
              email address you provide.
            </li>
            <li>
              <strong>Technical data.</strong> Like most sites, our hosting and
              infrastructure may log standard data such as IP address, browser
              type, and request timestamps for security and reliability.
            </li>
          </ul>

          <h2>How we use information</h2>
          <p>We use the information above to:</p>
          <ul>
            <li>Respond to contact inquiries and operate the newsletter.</li>
            <li>Operate, secure, and improve the website.</li>
            <li>Comply with legal obligations when required.</li>
          </ul>

          <h2>Sharing and processors</h2>
          <p>
            We do not sell your personal information. We may share data with
            service providers that help us run the site or deliver email (for
            example, email delivery services), subject to appropriate safeguards
            and only as needed for those services.
          </p>

          <h2>Cookies and local storage</h2>
          <p>
            We may use cookies or similar technologies for essential site
            functionality, preferences (such as theme settings), and analytics.
            You can control cookies through your browser settings.
          </p>

          <h2>Retention</h2>
          <p>
            We keep contact and newsletter information only as long as needed
            to fulfill the purposes above or as required by law.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct,
            delete, or restrict processing of your personal information, or to
            object to certain processing. To exercise these rights, contact us
            using the details below.
          </p>

          <h2>Children</h2>
          <p>
            This site is not directed at children under 13, and we do not
            knowingly collect their personal information.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this policy from time to time. The &quot;Last
            updated&quot; date at the top will reflect the latest version.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy: use our{' '}
            <Link href='/contact' className='font-medium text-foreground'>
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

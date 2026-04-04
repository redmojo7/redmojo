'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema, NewsletterFormSchema } from '@/lib/schemas'
import ContactFormEmail from '@/emails/contact-form-email'

type ContactFormInputs = z.infer<typeof ContactFormSchema>
type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>
const resend = new Resend(process.env.RESEND_API_KEY)

function actionError(error: unknown): { error: string } {
  return {
    error: error instanceof Error ? error.message : 'Something went wrong'
  }
}

function resendContactErrorMessage(error: {
  message: string
  name?: string
}): string {
  const msg = error.message.toLowerCase()
  if (msg.includes('already') || msg.includes('duplicate')) {
    return "You're already subscribed."
  }
  return error.message
}

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }

  try {
    if (!process.env.RESEND_API_KEY?.trim()) {
      console.error('Missing RESEND_API_KEY for contact sendEmail')
      return { error: 'Email is not configured.' }
    }

    if (!process.env.RESEND_FROM_EMAIL?.trim()) {
      console.error('Missing RESEND_FROM_EMAIL for contact sendEmail')
      return { error: 'Email is not configured.' }
    }

    const { name, email, message } = result.data
    const from = process.env.RESEND_FROM_EMAIL?.trim()

    const { data, error } = await resend.emails.send({
      from,
      to: [email],
      subject: 'Contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, message })
    })

    if (error) {
      console.error('Resend emails.send:', error)
      return { error: error.message }
    }

    if (!data) {
      return { error: 'Could not send message. Please try again.' }
    }

    return { success: true }
  } catch (error) {
    console.error(error)
    return actionError(error)
  }
}

export async function subscribe(data: NewsletterFormInputs) {
  const result = NewsletterFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }

  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID?.trim()
    if (!process.env.RESEND_API_KEY?.trim() || !audienceId) {
      console.error(
        'Missing RESEND_API_KEY or RESEND_AUDIENCE_ID for newsletter subscribe'
      )
      return { error: 'Newsletter signup is not configured.' }
    }

    const { email } = result.data
    const { data, error } = await resend.contacts.create({
      email,
      audienceId
    })

    if (error) {
      console.error('Resend contacts.create:', error)
      return { error: resendContactErrorMessage(error) }
    }

    if (!data) {
      return { error: 'Could not complete subscription. Please try again.' }
    }

    // TODO: Send a welcome email

    return { success: true }
  } catch (error) {
    console.error(error)
    return actionError(error)
  }
}

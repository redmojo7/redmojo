'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Header() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const currentTheme = mounted ? resolvedTheme : 'light'
  const filledColor = currentTheme === 'dark' ? '#FFFFFF' : '#000000'

  // Wait until component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm'>
      <nav className='container flex max-w-3xl items-center justify-between'>
        <div>
          <Link href='/' className='font-serif text-2xl font-bold'>
            {/* Redmojo */}
            <svg
              className='inline-block'
              width='100'
              height='50'
              viewBox='10 20 140 80'
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs>
                <linearGradient
                  id='redGradient'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='0%'
                >
                  <stop
                    offset='0%'
                    style={{ stopColor: '#FF3D00', stopOpacity: 1 }}
                  />
                  <stop
                    offset='100%'
                    style={{ stopColor: '#D50000', stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>

              <text
                x='30'
                y='75'
                font-family="'Brush Script MT', cursive"
                font-size='50'
                fill='url(#redGradient)'
              >
                M
              </text>

              <g transform='translate(80, 55) scale(1)'>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M1.5 12c0-2.25 3.75-7.5 10.5-7.5S22.5 9.75 22.5 12s-3.75 7.5-10.5 7.5S1.5 14.25 1.5 12zM12 16.75a4.75 4.75 0 1 0 0-9.5 4.75 4.75 0 0 0 0 9.5zM14.7 12a2.7 2.7 0 1 1-5.4 0 2.7 2.7 0 0 1 5.4 0z'
                  fill={filledColor}
                />
              </g>

              <text
                x='105'
                y='75'
                font-family='Arial, sans-serif'
                font-size='30'
                font-weight='bold'
                fill={filledColor}
                letter-spacing='2'
              >
                j
              </text>

              <g transform='translate(113, 55) '>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M1.5 12c0-2.25 3.75-7.5 10.5-7.5S22.5 9.75 22.5 12s-3.75 7.5-10.5 7.5S1.5 14.25 1.5 12zM12 16.75a4.75 4.75 0 1 0 0-9.5 4.75 4.75 0 0 0 0 9.5zM14.7 12a2.7 2.7 0 1 1-5.4 0 2.7 2.7 0 0 1 5.4 0z'
                  fill={filledColor}
                />
              </g>
            </svg>
          </Link>
        </div>

        <ul className='flex items-center gap-6 text-sm font-light text-muted-foreground sm:gap-10'>
          <li className='transition-colors hover:text-foreground'>
            <Link href='/posts'>Posts</Link>
          </li>
          <li className='transition-colors hover:text-foreground'>
            <Link href='/projects'>Projects</Link>
          </li>
          <li className='transition-colors hover:text-foreground'>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>

        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

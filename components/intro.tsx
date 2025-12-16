'use client'

import Image from 'next/image'
import authorImage from '@/public/images/authors/redmojo.jpg'
import { useEffect, useState, useRef } from 'react'

export default function Intro() {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const charIndexRef = useRef(0)
  const lineIndexRef = useRef(0)
  const mountedRef = useRef(true)
  const displayedTextRef = useRef('')
  const progressPercentRef = useRef({ projects: 0, posts: 0 })

  useEffect(() => {
    mountedRef.current = true
    charIndexRef.current = 0
    lineIndexRef.current = 0
    displayedTextRef.current = ''
    progressPercentRef.current = { projects: 0, posts: 0 }
    setDisplayedText('')

    // Helper function to generate progress bar
    const getProgressBar = (percent: number) => {
      const filled = Math.floor(percent / 10)
      const empty = 10 - filled
      return '[' + '█'.repeat(filled) + '░'.repeat(empty) + '] ' + percent + '%'
    }

    const terminalLines = [
      { prefix: 'root@redmojo:~$', text: ' whoami', delay: 500 },
      {
        prefix: '',
        text: 'Redmojo - Full-Stack Developer & Cybersecurity Engineer',
        delay: 100
      },
      { prefix: 'root@redmojo:~$', text: ' cat about.txt', delay: 800 },
      { prefix: '', text: 'Location: Perth, Australia', delay: 100 },
      {
        prefix: '',
        text: 'Passion: Building secure systems & sharing technical knowledge',
        delay: 100
      },
      {
        prefix: '',
        text: 'Status: [ACTIVE] - Always learning, always hacking',
        delay: 100
      },
      { prefix: 'root@redmojo:~$', text: ' ./run_portfolio', delay: 800 },
      {
        prefix: '',
        text: 'Loading projects... ',
        delay: 200,
        isProgress: true,
        progressType: 'projects'
      },
      {
        prefix: '',
        text: 'Loading Posts... ',
        delay: 200,
        isProgress: true,
        progressType: 'posts'
      },
      {
        prefix: '',
        text: 'Welcome to my digital lair. Explore my work and connect!',
        delay: 100
      },
      { prefix: 'root@redmojo:~$', text: ' ', delay: 0 }
    ]

    const typeText = () => {
      if (!mountedRef.current) return

      if (lineIndexRef.current >= terminalLines.length) {
        setShowCursor(false) // Stop cursor blinking after animation completes
        return
      }

      const line = terminalLines[
        lineIndexRef.current
      ] as (typeof terminalLines)[0] & {
        isProgress?: boolean
        progressType?: 'projects' | 'posts'
      }

      // Handle progress lines
      if (line.isProgress) {
        const progressType = line.progressType!
        const currentPercent = progressPercentRef.current[progressType]

        if (currentPercent <= 100) {
          const progressBar = getProgressBar(currentPercent)
          const fullText = line.prefix + line.text + progressBar

          // Update progress: replace the last line if it's a progress update
          setDisplayedText(prev => {
            const lines = prev.split('\n')
            // Remove any trailing empty lines
            while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
              lines.pop()
            }

            // Check if the last line is a progress line for this type
            const lastLine = lines.length > 0 ? lines[lines.length - 1] : ''
            const isProgressLine =
              lastLine &&
              ((progressType === 'projects' &&
                lastLine.includes('Loading projects')) ||
                (progressType === 'posts' &&
                  lastLine.includes('Loading Posts')))

            if (isProgressLine) {
              // Replace the last line
              lines[lines.length - 1] = fullText
            } else {
              // Add new line for first progress update (no empty line before)
              lines.push(fullText)
            }

            displayedTextRef.current = lines.join('\n')
            return displayedTextRef.current
          })

          // Increment progress
          progressPercentRef.current[progressType] += 10
          charIndexRef.current = 0

          if (progressPercentRef.current[progressType] <= 100) {
            // Slower progress updates (150ms instead of 50ms)
            timeoutRef.current = setTimeout(typeText, 150)
          } else {
            // Progress complete, add newline and move to next line
            setDisplayedText(prev => {
              displayedTextRef.current = prev + '\n'
              return displayedTextRef.current
            })
            progressPercentRef.current[progressType] = 0
            lineIndexRef.current++
            if (lineIndexRef.current < terminalLines.length) {
              timeoutRef.current = setTimeout(typeText, line.delay)
            } else {
              setShowCursor(false) // Stop cursor after animation completes
            }
          }
          return
        }
      }

      // Regular line typing
      const fullText = line.prefix + line.text
      const isLastLine = lineIndexRef.current === terminalLines.length - 1

      if (charIndexRef.current < fullText.length) {
        const char = fullText[charIndexRef.current]
        setDisplayedText(prev => {
          displayedTextRef.current = prev + char
          return displayedTextRef.current
        })
        charIndexRef.current++
        timeoutRef.current = setTimeout(typeText, 30)
      } else {
        // Don't add newline if this is the last line
        if (!isLastLine) {
          setDisplayedText(prev => {
            displayedTextRef.current = prev + '\n'
            return displayedTextRef.current
          })
        }
        const currentDelay = line.delay
        charIndexRef.current = 0
        lineIndexRef.current++
        if (lineIndexRef.current < terminalLines.length) {
          timeoutRef.current = setTimeout(typeText, currentDelay)
        } else {
          setShowCursor(false) // Stop cursor after animation completes
        }
      }
    }

    timeoutRef.current = setTimeout(typeText, 500)

    return () => {
      mountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Only blink cursor during animation
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  // Function to render text with Kali-style colored prompts
  const renderColoredText = (text: string) => {
    if (!text) return null

    const lines = text.split('\n')
    return lines.map((line, lineIdx) => {
      // Check if line contains the prompt
      const promptRegex = /(root)(@)(redmojo)(:)(~)(\$)/g
      const match = promptRegex.exec(line)

      if (match) {
        const parts = []
        let lastIndex = 0

        // Find all prompt occurrences in the line
        promptRegex.lastIndex = 0
        let currentMatch
        while ((currentMatch = promptRegex.exec(line)) !== null) {
          // Add text before prompt
          if (currentMatch.index > lastIndex) {
            parts.push(
              <span
                key={`before-${currentMatch.index}`}
                className='text-gray-200'
              >
                {line.substring(lastIndex, currentMatch.index)}
              </span>
            )
          }

          // Add colored prompt parts - Kali Linux style: red for user@host, blue for path
          parts.push(
            <span key={`prompt-${currentMatch.index}`}>
              <span className='text-[#ff5555]'>{currentMatch[1]}</span>
              <span className='text-[#ff5555]'>{currentMatch[2]}</span>
              <span className='text-[#ff5555]'>{currentMatch[3]}</span>
              <span className='text-gray-200'>{currentMatch[4]}</span>
              <span className='text-[#51afef]'>{currentMatch[5]}</span>
              <span className='text-gray-200'>{currentMatch[6]}</span>
            </span>
          )

          lastIndex = promptRegex.lastIndex
        }

        // Add remaining text after last prompt
        if (lastIndex < line.length) {
          parts.push(
            <span key={`after-${lastIndex}`} className='text-gray-200'>
              {line.substring(lastIndex)}
            </span>
          )
        }

        return (
          <span key={lineIdx}>
            {parts}
            {lineIdx < lines.length - 1 && '\n'}
          </span>
        )
      }

      // Regular line (output) - white/gray text like Kali terminal
      return (
        <span key={lineIdx}>
          <span className='text-gray-200'>{line}</span>
          {lineIdx < lines.length - 1 && '\n'}
        </span>
      )
    })
  }

  return (
    <section className='pb-24'>
      {/* Profile Image with Glitch Effect - At the top */}
      <div className='relative mb-8 w-full'>
        <div className='group relative mx-auto w-full max-w-[175px]'>
          <div className='relative overflow-hidden rounded-lg border-2 border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent p-1 shadow-lg shadow-red-500/20 transition-all duration-300 group-hover:border-green-500/50 group-hover:bg-gradient-to-br group-hover:from-green-500/10 group-hover:to-transparent group-hover:shadow-green-500/20'>
            <Image
              className='relative z-10 block w-full rounded-lg grayscale transition-all duration-300 group-hover:grayscale-[0.2]'
              src={authorImage}
              alt='Redmojo'
              width={175}
              height={175}
              priority
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                aspectRatio: '1/1',
                objectFit: 'cover'
              }}
            />
            {/* Glitch overlay */}
            <div className='pointer-events-none absolute inset-0 z-20 animate-glitch opacity-0 mix-blend-screen'></div>
          </div>
          {/* Corner decorations */}
          <div className='absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-red-500 transition-colors duration-300 group-hover:border-green-500'></div>
          <div className='absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-red-500 transition-colors duration-300 group-hover:border-green-500'></div>
          <div className='absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-red-500 transition-colors duration-300 group-hover:border-green-500'></div>
          <div className='absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-red-500 transition-colors duration-300 group-hover:border-green-500'></div>
        </div>
      </div>

      {/* Terminal Window - Kali Linux Style */}
      <div className='relative w-full overflow-hidden rounded-lg border border-gray-700 bg-[#1e1e1e] p-6 shadow-2xl shadow-black/50'>
        {/* Terminal Header */}
        <div className='mb-4 flex items-center gap-2 border-b border-gray-700 pb-2'>
          <div className='flex gap-1.5'>
            <div className='h-3 w-3 rounded-full bg-red-500'></div>
            <div className='h-3 w-3 rounded-full bg-yellow-500'></div>
            <div className='h-3 w-3 rounded-full bg-green-500'></div>
          </div>
          <span className='ml-2 font-mono text-xs text-gray-400'>
            redmojo@kali
          </span>
        </div>

        {/* Terminal Content */}
        <div className='overflow-x-auto font-mono text-sm'>
          <pre className='whitespace-pre text-gray-200'>
            {renderColoredText(displayedText)}
            <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
          </pre>
        </div>

        {/* Subtle scanline effect */}
        <div className='pointer-events-none absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-gray-500/5 to-transparent'></div>
      </div>

      {/* Status Indicators */}
      <div className='mt-6 flex flex-wrap gap-4'>
        <div className='flex items-center gap-2'>
          <div className='h-2 w-2 animate-pulse rounded-full bg-green-500'></div>
          <span className='font-mono text-xs text-muted-foreground'>
            SYSTEM ONLINE
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-2 w-2 animate-pulse rounded-full bg-red-500'></div>
          <span className='font-mono text-xs text-muted-foreground'>
            SECURITY ACTIVE
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-2 w-2 animate-pulse rounded-full bg-blue-500'></div>
          <span className='font-mono text-xs text-muted-foreground'>
            CODE RUNNING
          </span>
        </div>
      </div>
    </section>
  )
}

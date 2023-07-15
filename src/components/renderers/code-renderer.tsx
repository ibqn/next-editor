'use client'

import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.min.css'
import { useEffect, useMemo } from 'react'

type Props = {
  data: {
    code: string
  }
}

export const CodeRenderer = ({ data: { code } }: Props) => {
  const { language, codeSnippet } = useMemo(() => {
    const [lang, ...body] = code.split('\n')

    const language = lang.slice(1)
    const codeSnippet = body.join('\n')

    return { language, codeSnippet }
  }, [code])

  useEffect(() => {
    async function highlight() {
      if (typeof window !== 'undefined' && language) {
        try {
          await import(`prismjs/components/prism-${language}`)
        } catch (error) {
          console.log('can not find module for lang', language)
        }

        Prism.highlightAll()
      }
    }

    highlight()
  }, [language, code])

  return (
    <pre>
      <code className={`!text-sm language-${language}`}>{codeSnippet}</code>
    </pre>
  )
}

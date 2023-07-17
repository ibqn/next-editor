'use client'

import { OutputData } from '@editorjs/editorjs'
import { CodeRenderer } from '@/components/renderers'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

type Props = {
  data: OutputData
}

export const EditorOutput = ({ data }: Props) => {
  const Output = useMemo(
    () => dynamic(async () => (await import('editorjs-react-renderer')).default, { ssr: false }),
    []
  )

  const renderers = useMemo(
    () => ({
      code: CodeRenderer,
    }),
    []
  )

  const style = useMemo(
    () => ({
      paragraph: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      },
    }),
    []
  )

  return (
    <div className="prose prose-stone dark:prose-invert">
      <Output style={style} renderers={renderers} data={data} />
    </div>
  )
}

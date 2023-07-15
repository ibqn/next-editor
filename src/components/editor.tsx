'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import EditorJS, { type OutputData } from '@editorjs/editorjs'
import { editorTools } from './editor-config'

type Props = {
  data?: OutputData
  onChange?: (data: OutputData) => void
}

export const Editor = (props: Props) => {
  const { data, onChange } = props
  const editorJs = useRef<EditorJS | null>(null)

  const holder = useMemo(() => 'editor', [])

  useEffect(() => {
    if (typeof window !== 'undefined' && !editorJs.current) {
      const editor = new EditorJS({
        holder,
        tools: editorTools,
        data,
        placeholder: "Let's write an awesome story!",
        async onChange(api, event) {
          const data = await api.saver.save()
          onChange?.(data)
        },
        hideToolbar: false,
      })
      editorJs.current = editor
    }

    return () => {
      editorJs?.current?.destroy()
      editorJs.current = null
    }
  }, [])

  return (
    <div className="prose prose-stone dark:prose-invert">
      <div id="editor" className="min-h-[500px]"></div>
    </div>
  )
}

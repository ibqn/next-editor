'use client'

import { EditorOutput } from '@/components/editor-output'
import { OutputData } from '@editorjs/editorjs'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

export default function Home() {
  const [data, setData] = useState<OutputData>({ blocks: [] })

  const Editor = useMemo(
    () =>
      dynamic(
        async () => {
          const { Editor } = await import('@/components/editor')
          return Editor
        },
        {
          ssr: false,
          loading: () => <p>loading...</p>,
        }
      ),
    []
  )

  return (
    <div className="container mx-auto grid grid-cols-2 gap-2">
      <div className="col-span-1 flex flex-1 flex-col gap-2">
        <h1 className="text-3xl font-semibold">Editor</h1>
        <div className="flex flex-col gap-6 rounded-md border p-2">
          <Editor data={data} onChange={setData} />
          <p className="text-sm text-gray-500 xl:ml-4">
            Use <kbd className="bg-muted rounded-md border px-1 text-xs uppercase">Tab</kbd> to open the command menu.
          </p>
        </div>
      </div>

      <div className="col-span-1 flex flex-1 flex-col gap-2">
        <h1 className="text-3xl font-semibold">Preview</h1>
        <div className="flex-1 rounded-md border p-2">
          <EditorOutput data={data} />
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Download, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatBytes, videoSrc, type VideoItem } from '@/lib/videos'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export function VideoCard({
  video,
  onDeleted,
}: {
  video: VideoItem
  onDeleted: (pathname: string) => void
}) {
  const [deleting, setDeleting] = useState(false)
  const src = videoSrc(video.pathname)

  async function handleDelete() {
    if (!window.confirm(`Excluir "${video.name}"? Esta ação não pode ser desfeita.`)) return
    setDeleting(true)
    try {
      const res = await fetch('/api/videos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pathname: video.pathname }),
      })
      if (!res.ok) throw new Error()
      onDeleted(video.pathname)
    } catch {
      window.alert('Não foi possível excluir o vídeo.')
      setDeleting(false)
    }
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <video
        src={src}
        controls
        preload="metadata"
        playsInline
        className="aspect-video w-full bg-[#0f1a3d] object-contain"
      >
        <track kind="captions" />
      </video>
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="truncate font-medium" title={video.name}>
            {video.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatBytes(video.size)} &middot; {dateFormatter.format(new Date(video.uploadedAt))}
          </p>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button
            variant="ghost"
            size="icon"
            render={<a href={src} download={video.name} />}
            nativeButton={false}
          >
            <Download aria-hidden="true" />
            <span className="sr-only">Baixar {video.name}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete} disabled={deleting}>
            {deleting ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 aria-hidden="true" />
            )}
            <span className="sr-only">Excluir {video.name}</span>
          </Button>
        </div>
      </div>
    </article>
  )
}

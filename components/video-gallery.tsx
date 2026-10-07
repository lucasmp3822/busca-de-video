'use client'

import { Film } from 'lucide-react'
import { VideoCard } from '@/components/video-card'
import type { VideoItem } from '@/lib/videos'

type Props = {
  videos: VideoItem[]
  isLoading: boolean
  hasError: boolean
  onDeleted: (pathname: string) => void
}

export function VideoGallery({ videos, isLoading, hasError, onDeleted }: Props) {
  return (
    <section aria-labelledby="galeria-titulo" className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="galeria-titulo" className="text-2xl font-bold tracking-tight">
            Galeria
          </h2>
          <p className="text-muted-foreground">Todos os vídeos enviados do produto.</p>
        </div>
        {videos.length > 0 && (
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            {videos.length} {videos.length === 1 ? 'vídeo' : 'vídeos'}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-video animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : hasError ? (
        <p className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-destructive">
          Não foi possível carregar os vídeos. Recarregue a página para tentar novamente.
        </p>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <Film className="size-8 text-muted-foreground" aria-hidden="true" />
          <p className="font-medium">Nenhum vídeo ainda</p>
          <p className="text-sm text-muted-foreground">
            Envie o primeiro vídeo do LG K62 para começar a galeria.
          </p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <li key={video.pathname}>
              <VideoCard video={video} onDeleted={onDeleted} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

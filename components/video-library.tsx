'use client'

import useSWR from 'swr'
import { VideoUploader } from '@/components/video-uploader'
import { VideoGallery } from '@/components/video-gallery'
import type { VideoItem } from '@/lib/videos'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Falha ao carregar vídeos')
  return (await res.json()) as { videos: VideoItem[] }
}

export function VideoLibrary() {
  const { data, error, isLoading, mutate } = useSWR('/api/videos', fetcher)

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12">
      <VideoUploader onUploaded={() => mutate()} />
      <VideoGallery
        videos={data?.videos ?? []}
        isLoading={isLoading}
        hasError={!!error}
        onDeleted={(pathname) =>
          mutate(
            (current) =>
              current && { videos: current.videos.filter((v) => v.pathname !== pathname) },
            { revalidate: true },
          )
        }
      />
    </div>
  )
}

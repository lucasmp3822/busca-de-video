'use client'

import { useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'
import { UploadCloud, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ALLOWED_VIDEO_TYPES, MAX_VIDEO_BYTES, VIDEO_PREFIX, formatBytes } from '@/lib/videos'
import { cn } from '@/lib/utils'

type Status =
  | { kind: 'idle' }
  | { kind: 'uploading'; name: string; percent: number }
  | { kind: 'done'; name: string }
  | { kind: 'error'; message: string }

export function VideoUploader({ onUploaded }: { onUploaded: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [dragging, setDragging] = useState(false)
  const uploading = status.kind === 'uploading'

  async function handleFile(file: File) {
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      setStatus({ kind: 'error', message: 'Formato não suportado. Use MP4, WebM, MOV ou OGG.' })
      return
    }
    if (file.size > MAX_VIDEO_BYTES) {
      setStatus({
        kind: 'error',
        message: `Arquivo muito grande. O limite é ${formatBytes(MAX_VIDEO_BYTES)}.`,
      })
      return
    }

    setStatus({ kind: 'uploading', name: file.name, percent: 0 })
    try {
      const safeName = file.name.replace(/[^\w.\-]+/g, '-')
      await upload(`${VIDEO_PREFIX}${safeName}`, file, {
        access: 'private',
        handleUploadUrl: '/api/videos/upload',
        multipart: file.size > 50 * 1024 * 1024,
        onUploadProgress: ({ percentage }) =>
          setStatus({ kind: 'uploading', name: file.name, percent: Math.round(percentage) }),
      })
      setStatus({ kind: 'done', name: file.name })
      onUploaded()
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Falha no upload. Tente novamente.',
      })
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <section id="enviar" aria-labelledby="enviar-titulo" className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 id="enviar-titulo" className="text-2xl font-bold tracking-tight">
          Enviar vídeo
        </h2>
        <p className="text-muted-foreground">
          MP4, WebM, MOV ou OGG, até {formatBytes(MAX_VIDEO_BYTES)}.
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          if (!uploading) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          const file = e.dataTransfer.files?.[0]
          if (file && !uploading) handleFile(file)
        }}
        className={cn(
          'flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed bg-card px-6 py-12 text-center transition-colors',
          dragging ? 'border-primary bg-secondary/40' : 'border-border',
        )}
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
          {uploading ? (
            <Loader2 className="size-6 animate-spin text-primary" aria-hidden="true" />
          ) : (
            <UploadCloud className="size-6 text-primary" aria-hidden="true" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-medium">Arraste um vídeo aqui</p>
          <p className="text-sm text-muted-foreground">ou escolha um arquivo do seu dispositivo</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_VIDEO_TYPES.join(',')}
          className="sr-only"
          id="video-file"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
        <Button size="lg" disabled={uploading} onClick={() => inputRef.current?.click()}>
          {uploading ? 'Enviando...' : 'Escolher vídeo'}
        </Button>

        <div aria-live="polite" className="w-full max-w-md">
          {status.kind === 'uploading' && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="truncate">{status.name}</span>
                <span className="font-mono">{status.percent}%</span>
              </div>
              <div
                className="h-2 w-full overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuenow={status.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progresso do upload"
              >
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${status.percent}%` }}
                />
              </div>
            </div>
          )}
          {status.kind === 'done' && (
            <p className="flex items-center justify-center gap-2 text-sm text-primary">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              {status.name} enviado com sucesso
            </p>
          )}
          {status.kind === 'error' && (
            <p className="flex items-center justify-center gap-2 text-sm text-destructive">
              <AlertCircle className="size-4" aria-hidden="true" />
              {status.message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

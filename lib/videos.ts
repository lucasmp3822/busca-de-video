export const VIDEO_PREFIX = 'videos/'
export const MAX_VIDEO_BYTES = 500 * 1024 * 1024
export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-m4v',
  'video/ogg',
]

export type VideoItem = {
  pathname: string
  name: string
  size: number
  uploadedAt: string
}

export function isVideoPathname(pathname: string | null): pathname is string {
  return (
    !!pathname &&
    pathname.startsWith(VIDEO_PREFIX) &&
    !pathname.includes('..') &&
    pathname.length < 512
  )
}

export function videoSrc(pathname: string) {
  return `/api/videos/file?pathname=${encodeURIComponent(pathname)}`
}

export function displayName(pathname: string) {
  const file = pathname.slice(VIDEO_PREFIX.length)
  return file.replace(/-[A-Za-z0-9]{20,}(?=\.[^.]+$)/, '')
}

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

import { del, list } from '@vercel/blob'
import { NextResponse, type NextRequest } from 'next/server'
import { VIDEO_PREFIX, displayName, isVideoPathname, type VideoItem } from '@/lib/videos'

export async function GET() {
  try {
    const { blobs } = await list({ prefix: VIDEO_PREFIX, limit: 1000 })
    const videos: VideoItem[] = blobs
      .filter((blob) => blob.size > 0)
      .map((blob) => ({
        pathname: blob.pathname,
        name: displayName(blob.pathname),
        size: blob.size,
        uploadedAt: new Date(blob.uploadedAt).toISOString(),
      }))
      .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
    return NextResponse.json({ videos })
  } catch (error) {
    console.error('Erro ao listar vídeos:', error)
    return NextResponse.json({ error: 'Falha ao listar vídeos' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { pathname } = (await request.json()) as { pathname?: string }
    if (!isVideoPathname(pathname ?? null)) {
      return NextResponse.json({ error: 'Vídeo inválido' }, { status: 400 })
    }
    await del(pathname as string)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir vídeo:', error)
    return NextResponse.json({ error: 'Falha ao excluir vídeo' }, { status: 500 })
  }
}

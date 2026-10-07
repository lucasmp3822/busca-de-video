import { get } from '@vercel/blob'
import { NextResponse, type NextRequest } from 'next/server'
import { isVideoPathname } from '@/lib/videos'

const FORWARDED_HEADERS = [
  'content-type',
  'content-length',
  'content-range',
  'accept-ranges',
  'etag',
  'last-modified',
]

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('pathname')
  if (!isVideoPathname(pathname)) {
    return NextResponse.json({ error: 'Vídeo inválido' }, { status: 400 })
  }

  try {
    const range = request.headers.get('range')
    const result = await get(pathname, {
      access: 'private',
      headers: range ? { Range: range } : undefined,
    })

    if (!result || !result.stream) {
      return new NextResponse('Não encontrado', { status: 404 })
    }

    // Blob reads honor Range but the SDK reports 200, so derive 206 from Content-Range.
    const headers = new Headers({ 'Cache-Control': 'private, max-age=0, must-revalidate' })
    for (const name of FORWARDED_HEADERS) {
      const value = result.headers.get(name)
      if (value) headers.set(name, value)
    }
    if (!headers.has('accept-ranges')) headers.set('accept-ranges', 'bytes')

    const status = headers.has('content-range') ? 206 : 200
    return new NextResponse(result.stream, { status, headers })
  } catch (error) {
    console.error('Erro ao servir vídeo:', error)
    return NextResponse.json({ error: 'Falha ao carregar vídeo' }, { status: 500 })
  }
}

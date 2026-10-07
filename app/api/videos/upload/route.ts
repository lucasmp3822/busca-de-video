import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { ALLOWED_VIDEO_TYPES, MAX_VIDEO_BYTES, isVideoPathname } from '@/lib/videos'

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!isVideoPathname(pathname)) {
          throw new Error('Caminho de arquivo inválido')
        }
        return {
          allowedContentTypes: ALLOWED_VIDEO_TYPES,
          maximumSizeInBytes: MAX_VIDEO_BYTES,
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async () => {},
    })
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Falha no upload'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

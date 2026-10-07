import { ShoppingCart } from 'lucide-react'
import { PRODUCT_URL } from '@/lib/product'

export function PromoVideo() {
  return (
    <section aria-labelledby="promo-title" className="bg-[#0f1a3d] text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-14 md:flex-row md:gap-16">
        <div className="w-full max-w-[280px] shrink-0 overflow-hidden rounded-3xl border-4 border-[#FFE600] bg-black shadow-2xl">
          <video
            src="/videos/lg-k62-promo.mp4"
            poster="/videos/lg-k62-promo-poster.jpg"
            className="pointer-events-none aspect-[9/16] w-full select-none object-cover"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback"
            draggable={false}
            preload="metadata"
            aria-label="Vídeo promocional do LG K62"
          />
        </div>
        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full bg-[#FFE600] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0f1a3d]">
            Vídeo oficial
          </span>
          <h2 id="promo-title" className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
            Veja o LG K62 de perto
          </h2>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-white/75">
            Tela ampla, câmera quádrupla e desempenho Octa-Core para o seu dia a dia. Aproveite a
            oferta de Natal enquanto durar o estoque.
          </p>
          <a
            href={PRODUCT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-2 rounded-lg bg-[#FFE600] px-6 py-3 text-base font-semibold text-[#0f1a3d] transition-colors hover:bg-[#ffd900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE600]"
          >
            <ShoppingCart className="size-5" aria-hidden="true" />
            Comprar no Mercado Livre
          </a>
        </div>
      </div>
    </section>
  )
}

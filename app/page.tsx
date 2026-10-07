import { ProductHero } from '@/components/product-hero'
import { PromoVideo } from '@/components/promo-video'
import { ProductPhotos } from '@/components/product-photos'
import { PRODUCT_URL } from '@/lib/product'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <ProductHero />
      <PromoVideo />
      <ProductPhotos />
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4">
          <p className="text-sm text-muted-foreground">
            LG K62 &middot; Octa-Core 2.3 GHz &middot; 4GB/64GB
          </p>
          <a
            href={PRODUCT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#1e3aa8] underline-offset-4 hover:underline"
          >
            Ver oferta no Mercado Livre
          </a>
        </div>
      </footer>
    </main>
  )
}

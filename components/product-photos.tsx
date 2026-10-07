import Image from 'next/image'
import { PRODUCT_URL } from '@/lib/product'

const photos = [
  { src: '/images/produto-frente.png', alt: 'LG K62 azul visto de frente e de costas', caption: 'Design azul elegante' },
  { src: '/images/produto-camera.png', alt: 'Detalhe da câmera quádrupla do LG K62', caption: 'Câmera quádrupla' },
  { src: '/images/produto-mao.png', alt: 'Pessoa segurando o LG K62', caption: 'Confortável na mão' },
  { src: '/images/produto-natal.png', alt: 'LG K62 em cenário natalino', caption: 'Presente de Natal perfeito' },
]

export function ProductPhotos() {
  return (
    <section aria-labelledby="fotos-title" className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 flex flex-col gap-2">
        <h2 id="fotos-title" className="text-3xl font-bold tracking-tight text-foreground">
          Fotos do produto
        </h2>
        <p className="text-muted-foreground">Clique em uma foto para ver a oferta no Mercado Livre.</p>
      </div>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {photos.map((photo) => (
          <li key={photo.src}>
            <a
              href={PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e3aa8]"
            >
              <div className="overflow-hidden rounded-xl bg-muted">
                <Image
                  src={photo.src || '/placeholder.svg'}
                  alt={photo.alt}
                  width={768}
                  height={768}
                  className="aspect-square h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-sm font-medium text-foreground">{photo.caption}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

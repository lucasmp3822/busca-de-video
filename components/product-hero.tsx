import Image from 'next/image'
import { Cpu, HardDrive, Camera } from 'lucide-react'

const specs = [
  { icon: Cpu, label: 'Octa-Core 2.3 GHz' },
  { icon: HardDrive, label: '4GB RAM / 64GB' },
  { icon: Camera, label: 'Câmera quádrupla' },
]

export function ProductHero() {
  return (
    <section className="bg-[#FFE600] text-[#0f1a3d]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-12 md:flex-row md:gap-12 md:py-16">
        <div className="flex flex-1 flex-col gap-5">
          <span className="w-fit rounded-full bg-[#0f1a3d] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FFE600]">
            Edição de Natal
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            LG K62 em vídeo
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-[#0f1a3d]/80">
            Envie demonstrações, unboxings e campanhas do produto e mantenha todos os vídeos
            organizados em uma galeria pronta para compartilhar.
          </p>
          <ul className="flex flex-wrap gap-2">
            {specs.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-sm font-medium"
              >
                <Icon className="size-4 text-[#1e3aa8]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          <a
            href="#enviar"
            className="w-fit rounded-lg bg-[#1e3aa8] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#162d85] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f1a3d]"
          >
            Enviar vídeo
          </a>
        </div>
        <div className="flex w-full max-w-xs flex-1 justify-center md:max-w-sm">
          <Image
            src="/images/lg-k62.png"
            alt="Smartphone LG K62 azul com gorro de Papai Noel sobre fundo amarelo"
            width={1024}
            height={1536}
            priority
            className="h-auto w-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  )
}

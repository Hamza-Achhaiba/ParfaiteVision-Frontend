import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Lunettes de vue",
    image: "/images/lunettes-vue.jpg",
    href: "/collection/vue",
  },
  {
    name: "Solaires",
    image: "/images/solaires.jpg",
    href: "/collection/solaires",
  },
  {
    name: "Lentilles",
    image: "/images/lentilles.jpg",
    href: "/collection/lentilles",
  },
  {
    name: "Enfant",
    image: "/images/enfant.jpg",
    href: "/collection/enfant",
  },
]

export function Collection() {
  return (
    <section id="collection" className="bg-background py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 text-center">
          Notre Collection
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group cursor-pointer block"
            >
              <div className="relative aspect-square bg-muted border border-transparent group-hover:border-border transition-colors overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-[1.05]"
                />
                {/* Warm copper gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#B56E3A]/15 to-transparent opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100 z-10" />
                
                {/* Animating bottom border */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#B56E3A] transition-all duration-400 ease-out group-hover:w-full z-20" />
              </div>
              <p className="mt-4 text-center text-foreground text-sm transition-all duration-300 ease-out group-hover:-translate-y-[5px] group-hover:text-[#B56E3A] relative flex items-center justify-center w-full">
                <span className="relative">
                  {category.name}
                  <span className="absolute left-full ml-1.5 transition-all duration-300 ease-out delay-100 opacity-0 -translate-x-[10px] group-hover:opacity-100 group-hover:translate-x-0">
                    →
                  </span>
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// 1. List all image files first
const VUE_IMAGES = [
  "cartier-ct0232o-platinum.jpg",
  "cartier-ct0354o-silver.jpg",
  "cartier-ct0370o-gold.jpg",
  "dior-blacksuitOR8U.jpg",
  "dior-diorblacksuito-havana.jpg",
  "dior-dioressentialo-tortoise.jpg",
  "dior-diorspirito-crystal.jpg",
  "dior-icono.jpg",
  "lacoste-l2273-tortoise.jpg",
  "lacoste-l2920-black.jpg",
  "lacoste-l2924-green.jpg",
  "moscot-billik-brown.jpg",
  "moscot-gelt-blue-light-color-crystal.jpg",
  "moscot-zev-gold.jpg",
  "prada-vpr01yv-brown.jpg",
  "prada-vpr08yv-black.jpg",
  "prada-vpr09yv-tortoise.jpg",
  "prada-vpr14zv-havana.jpg",
  "prada-vpr17wv-noir.jpg",
  "ray-ban-rx3447v-round-gold.jpg",
  "ray-ban-rx5154-clubmaster-black.jpg",
  "ray-ban-rx5228-tortoise.jpg",
  "ray-ban-rx5398-hawkeye-grey.jpg",
  "ray-ban-rx7159-havana.jpg",
  "tom-ford-tf5178-tortoise.jpg",
  "tom-ford-tf5294-black.jpg",
  "tom-ford-tf5401-havana.jpg",
  "tom-ford-tf5634-black.jpg",
  "tom-ford-tf5865-brown.jpg"
]

const SOLAIRES_IMAGES = [
  "celine-cat-eye-dark-havana.jpg",
  "celine-oval-milky-white.jpg",
  "celine-triomphe-01-black.jpg",
  "celine-triomphe-02-blonde-havana.jpg",
  "dior-dioribbon-black.jpg",
  "dior-diormidnight-blue.jpg",
  "dior-diorsignature-havana.jpg",
  "gucci-gg0061s-gold.jpg",
  "gucci-gg0062s-black.jpg",
  "gucci-gg0396s-tortoise.jpg",
  "gucci-gg1169s-black.jpg",
  "gucci-gg1189s-havana.jpg",
  "moscot-gelt-crystal.jpg",
  "oakley-holbrook-matte-black.jpg",
  "persol-po0649-havana.jpg",
  "persol-po0714-tortoise.jpg",
  "persol-po3108s-black.jpg",
  "persol-po3271s-grey.jpg",
  "ray-ban-aviator-gold.jpg",
  "ray-ban-clubmaster-tortoise.jpg",
  "ray-ban-erika-brown.jpg",
  "ray-ban-hexagonal-gold.jpg",
  "ray-ban-justin-black.jpg",
  "ray-ban-round-gold.jpg",
  "ray-ban-wayfarer-black.jpg",
  "tom-ford-anouk-havana.jpg",
  "tom-ford-beatrix-black.jpg",
  "tom-ford-raquel-dark-brown.jpg",
  "tom-ford-sabrina-tortoise.jpg",
  "tom-ford-whitney-shiny-black.jpg"
]

const LENTILLES_IMAGES = [
  "acuvue-moist.jpg",
  "acuvue-oasys-1-day.jpg",
  "acuvue-vita.jpg",
  "alcon-air-optix-colors.jpg",
  "alcon-dailies-total1.jpg",
  "coopervision-biofinity.jpg",
  "coopervision-myday.jpg",
  "johnson-johnson-acuvue-oasys-transition.jpg"
]

const ENFANT_IMAGES = [
  "nano-vista-arcade.jpg",
  "nano-vista-boing.jpg",
  "nano-vista-crew.jpg",
  "nano-vista-fangame.jpg",
  "nano-vista-glitch.jpg",
  "ray-ban-junior-rj9052s.jpg",
  "ray-ban-junior-rj9060s.jpg",
  "ray-ban-junior-rj9064s.jpg",
  "ray-ban-junior-rj9506s.jpg",
  "ray-ban-junior-rj9547s.jpg"
]

interface Product {
  id: string
  brand: string
  name: string
  price: string
  image: string
  category: "vue" | "solaires" | "lentilles" | "enfant"
}

// 2. Parser to map image files to standard Product objects
function parseProduct(filename: string, category: "vue" | "solaires" | "lentilles" | "enfant"): Product {
  const base = filename.replace(/\.(jpg|jpeg|png)$/i, "")
  
  let brand = ""
  let name = ""
  
  if (base.startsWith("ray-ban-junior-")) {
    brand = "Ray-Ban Junior"
    name = base.replace("ray-ban-junior-", "")
  } else if (base.startsWith("ray-ban-")) {
    brand = "Ray-Ban"
    name = base.replace("ray-ban-", "")
  } else if (base.startsWith("tom-ford-")) {
    brand = "Tom Ford"
    name = base.replace("tom-ford-", "")
  } else if (base.startsWith("nano-vista-")) {
    brand = "Nano Vista"
    name = base.replace("nano-vista-", "")
  } else if (base.startsWith("johnson-johnson-")) {
    brand = "Johnson & Johnson"
    name = base.replace("johnson-johnson-", "")
  } else if (base.startsWith("cartier-")) {
    brand = "Cartier"
    name = base.replace("cartier-", "")
  } else if (base.startsWith("dior-")) {
    brand = "Dior"
    name = base.replace("dior-", "")
  } else if (base.startsWith("lacoste-")) {
    brand = "Lacoste"
    name = base.replace("lacoste-", "")
  } else if (base.startsWith("prada-")) {
    brand = "Prada"
    name = base.replace("prada-", "")
  } else if (base.startsWith("celine-")) {
    brand = "Celine"
    name = base.replace("celine-", "")
  } else if (base.startsWith("gucci-")) {
    brand = "Gucci"
    name = base.replace("gucci-", "")
  } else if (base.startsWith("oakley-")) {
    brand = "Oakley"
    name = base.replace("oakley-", "")
  } else if (base.startsWith("persol-")) {
    brand = "Persol"
    name = base.replace("persol-", "")
  } else if (base.startsWith("acuvue-")) {
    brand = "Acuvue"
    name = base.replace("acuvue-", "")
  } else if (base.startsWith("alcon-")) {
    brand = "Alcon"
    name = base.replace("alcon-", "")
  } else if (base.startsWith("coopervision-")) {
    brand = "CooperVision"
    name = base.replace("coopervision-", "")
  } else {
    const dashIndex = base.indexOf("-")
    if (dashIndex !== -1) {
      brand = base.substring(0, dashIndex)
      name = base.substring(dashIndex + 1)
    } else {
      brand = "Parfaite"
      name = base
    }
  }
  
  brand = brand
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    
  name = name
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  // Staggered premium pricing
  let priceVal = 1890
  if (brand.toLowerCase().includes("cartier")) priceVal = 4890
  else if (brand.toLowerCase().includes("prada")) priceVal = 2690
  else if (brand.toLowerCase().includes("dior")) priceVal = 3290
  else if (brand.toLowerCase().includes("celine")) priceVal = 3490
  else if (brand.toLowerCase().includes("gucci")) priceVal = 3190
  else if (brand.toLowerCase().includes("persol")) priceVal = 2290
  else if (brand.toLowerCase().includes("tom ford")) priceVal = 2890
  else if (brand.toLowerCase().includes("oakley")) priceVal = 1790
  else if (brand.toLowerCase().includes("lacoste")) priceVal = 1590
  else if (category === "lentilles") priceVal = 390
  else if (category === "enfant") priceVal = 990

  const price = priceVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " MAD"

  return {
    id: `${category}-${base}`,
    brand: brand.toUpperCase(),
    name,
    price,
    image: `/images/products/${category}/${filename}`,
    category
  }
}

// 3. Map all categories to full list of cards
const ALL_PRODUCTS: Product[] = [
  ...VUE_IMAGES.map(img => parseProduct(img, "vue")),
  ...SOLAIRES_IMAGES.map(img => parseProduct(img, "solaires")),
  ...LENTILLES_IMAGES.map(img => parseProduct(img, "lentilles")),
  ...ENFANT_IMAGES.map(img => parseProduct(img, "enfant")),
]

type FilterOption = "Tout" | "Lunettes de vue" | "Solaires" | "Lentilles" | "Enfant"

const FILTER_MAPPING: Record<FilterOption, Product["category"] | "all"> = {
  "Tout": "all",
  "Lunettes de vue": "vue",
  "Solaires": "solaires",
  "Lentilles": "lentilles",
  "Enfant": "enfant",
}

const ITEMS_PER_PAGE = 12

function AnimatedHeaderSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (currentRef) {
      observer.observe(currentRef)
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`space-y-4 mb-12 md:mb-16 transition-all duration-[600ms] ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
      }`}
    >
      <h1 className="font-serif text-4xl md:text-5xl text-foreground font-normal tracking-wide">
        Notre Collection
      </h1>
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground max-w-xl mx-auto leading-relaxed">
        Découvrez nos collections optiques et solaires d&apos;exception, sélectionnées avec soin pour sublimer votre regard.
      </p>
    </div>
  )
}

function CatalogueContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const categoryParam = searchParams.get("category")
  const pageParam = searchParams.get("page")
  const currentPage = pageParam ? parseInt(pageParam, 10) || 1 : 1

  // Determine active filter directly from URL param (single source of truth)
  let activeFilter: FilterOption = "Tout"
  if (categoryParam) {
    const match = Object.entries(FILTER_MAPPING).find(
      ([_, val]) => val === categoryParam
    )
    if (match) {
      activeFilter = match[0] as FilterOption
    }
  }

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const targetCategory = FILTER_MAPPING[activeFilter]
    return targetCategory === "all" ? true : product.category === targetCategory
  })

  // Pagination calculations
  const totalItems = filteredProducts.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const handleFilterClick = (filter: FilterOption) => {
    const params = new URLSearchParams(searchParams.toString())
    const targetCategory = FILTER_MAPPING[filter]

    if (targetCategory === "all") {
      params.delete("category")
    } else {
      params.set("category", targetCategory)
    }

    // Always reset to page 1 on filter changes
    params.delete("page")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Generate page numbers
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <section className="flex-grow max-w-6xl mx-auto px-6 py-12 md:py-20 w-full text-center">
      {/* Title Section with Entry Animation */}
      <AnimatedHeaderSection />

      {/* Filter Bar */}
      <div className="mb-12 flex justify-center">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 max-w-full scrollbar-none snap-x snap-mandatory">
          {(Object.keys(FILTER_MAPPING) as FilterOption[]).map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 rounded-none cursor-pointer whitespace-nowrap snap-center ${
                  isActive
                    ? "bg-primary text-white border border-primary"
                    : "border border-border text-foreground hover:border-primary bg-transparent"
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>
      </div>

      {/* Product Grid */}
      {paginatedProducts.length > 0 ? (
        <div
          key={`${activeFilter}-${currentPage}`} // Resetting key forces remounting so animations run on filter/page changes
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
        >
          {paginatedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="text-lg font-serif text-muted-foreground italic">
            Aucune lunette trouvée
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalItems > 0 && (
        <div className="flex flex-col items-center gap-4 mt-16">
          <p className="text-sm text-muted-foreground">
            Affichage {startIndex + 1}–{Math.min(endIndex, totalItems)} sur {totalItems} articles
          </p>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {/* Previous button */}
              <button
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 h-10 border border-border flex items-center justify-center cursor-pointer transition-colors duration-300 font-medium text-xs uppercase tracking-widest rounded-none ${
                  currentPage === 1
                    ? "text-muted-foreground/50 border-border/50 cursor-not-allowed"
                    : "text-foreground hover:border-primary hover:text-primary bg-transparent"
                }`}
              >
                « Précédent
              </button>

              {/* Page numbers */}
              {pageNumbers.map((page) => {
                const isCurrent = currentPage === page
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center font-medium text-sm transition-colors duration-300 cursor-pointer rounded-none ${
                      isCurrent
                        ? "bg-primary text-white border border-primary"
                        : "border border-border text-foreground hover:border-primary hover:text-primary bg-transparent"
                    }`}
                  >
                    {page}
                  </button>
                )
              })}

              {/* Next button */}
              <button
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 h-10 border border-border flex items-center justify-center cursor-pointer transition-colors duration-300 font-medium text-xs uppercase tracking-widest rounded-none ${
                  currentPage === totalPages
                    ? "text-muted-foreground/50 border-border/50 cursor-not-allowed"
                    : "text-foreground hover:border-primary hover:text-primary bg-transparent"
                }`}
              >
                Suivant »
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default function LunettesPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <Suspense fallback={
        <div className="flex-grow flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }>
        <CatalogueContent />
      </Suspense>
      <Footer />
    </main>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.02,
        rootMargin: "0px 0px -40px 0px", // Trigger when card enters the viewport
      }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <Link
      ref={ref}
      href={`/lunettes/${product.id}`}
      className={`group block transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${(index % 4) * 80}ms`, // Stagger delay based on horizontal column index
      }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] w-full bg-muted overflow-hidden border border-transparent group-hover:border-primary transition-colors duration-300 rounded-none shadow-none">
        <Image
          src={product.image}
          alt={`${product.brand} - ${product.name}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          className="object-cover object-center w-full h-full transition-transform duration-600 ease-out group-hover:scale-[1.03]"
        />
      </div>

      {/* Product Details */}
      <div className="mt-4 space-y-1 text-left">
        <span className="block text-xs uppercase font-semibold tracking-widest text-primary">
          {product.brand}
        </span>
        <h3 className="font-serif text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-foreground/80">
          {product.price}
        </p>
      </div>
    </Link>
  )
}

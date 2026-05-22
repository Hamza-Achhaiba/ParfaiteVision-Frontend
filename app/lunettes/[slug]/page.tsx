"use client"

import { useEffect, useRef, useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// 1. List all image files first (identical dataset to catalogue)
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
  material: string
  color: string
  gender: string
  description: string
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

  // Material parsing
  let material = "Acétate de cellulose italien"
  if (brand.toLowerCase().includes("cartier")) {
    material = "Métal plaqué Or 24ct / Titane"
  } else if (brand.toLowerCase().includes("ray-ban junior") || brand.toLowerCase().includes("nano-vista")) {
    material = "Silicone souple hypoallergénique / TR90"
  } else if (brand.toLowerCase().includes("oakley")) {
    material = "O Matter™ ultra-léger"
  } else if (category === "lentilles") {
    material = "Hydrogel de silicone (haute perméabilité à l'oxygène)"
  }

  // Color parsing
  let color = "Noir classique"
  const nameLower = name.toLowerCase()
  if (nameLower.includes("tortoise") || nameLower.includes("havana")) {
    color = "Écaille de tortue"
  } else if (nameLower.includes("gold")) {
    color = "Doré brillant"
  } else if (nameLower.includes("silver") || nameLower.includes("platinum")) {
    color = "Argenté / Platine"
  } else if (nameLower.includes("crystal") || nameLower.includes("white")) {
    color = "Transparent / Cristal"
  } else if (nameLower.includes("blue")) {
    color = "Bleu nuit"
  } else if (nameLower.includes("green")) {
    color = "Vert forêt"
  } else if (nameLower.includes("brown") || nameLower.includes("grey")) {
    color = "Brun terre / Gris fumé"
  }

  // Gender parsing
  let gender = "Mixte"
  if (category === "enfant") {
    gender = "Enfant (Garçon & Fille)"
  } else if (brand.toLowerCase().includes("celine") || nameLower.includes("anouk") || nameLower.includes("raquel") || nameLower.includes("sabrina")) {
    gender = "Femme"
  }

  const description = category === "lentilles"
    ? "Lentilles de contact de dernière génération offrant un confort exceptionnel tout au long de la journée. Grâce à leur technologie d'hydratation avancée, elles permettent une excellente oxygénation de l'œil pour un regard frais et sain du matin au soir."
    : `Découvrez cette monture ${brand} raffinée, conçue pour allier confort optimal et élégance intemporelle. Chaque détail témoigne du savoir-faire artisanal emblématique de la maison, offrant une durabilité et une précision de vision exceptionnelles au quotidien.`

  return {
    id: `${category}-${base}`,
    brand: brand.toUpperCase(),
    name,
    price,
    image: `/images/products/${category}/${filename}`,
    category,
    material,
    color,
    gender,
    description
  }
}

// 3. Map all categories to full list of cards
const ALL_PRODUCTS: Product[] = [
  ...VUE_IMAGES.map(img => parseProduct(img, "vue")),
  ...SOLAIRES_IMAGES.map(img => parseProduct(img, "solaires")),
  ...LENTILLES_IMAGES.map(img => parseProduct(img, "lentilles")),
  ...ENFANT_IMAGES.map(img => parseProduct(img, "enfant")),
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const product = ALL_PRODUCTS.find((p) => p.id === slug)

  const [isVisible, setIsVisible] = useState(false)
  const mainSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset animation on product change
    setIsVisible(false)
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timeout)
  }, [slug])

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center py-24 px-6 text-center">
          <h1 className="font-serif text-3xl mb-4 text-foreground">Produit non trouvé</h1>
          <p className="text-muted-foreground mb-8">Ce produit n&apos;existe pas ou a été déplacé.</p>
          <Link
            href="/lunettes"
            className="bg-primary text-white px-8 py-3.5 font-semibold uppercase tracking-widest text-xs hover:bg-[#965628] transition-colors rounded-none cursor-pointer"
          >
            Retour au catalogue
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  // Category Recommendations (4 products excluding current)
  const recommendations = ALL_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main product detail grid */}
      <section
        ref={mainSectionRef}
        className="flex-grow max-w-6xl mx-auto px-6 py-16 md:py-24 w-full"
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Image with slide-in animation */}
          <div
            className={`relative aspect-[4/5] w-full bg-muted overflow-hidden border border-border/40 transition-all duration-[800ms] ease-out transform ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
          >
            <Image
              src={product.image}
              alt={`${product.brand} - ${product.name}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center w-full h-full"
            />
          </div>

          {/* Right Column: Details with staggered reveal animations */}
          <div className="space-y-8">
            {/* Category & Brand */}
            <div
              className={`transition-all duration-600 ease-out transform delay-75 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
                {product.brand}
              </span>
            </div>

            {/* Title & Price */}
            <div
              className={`space-y-3 transition-all duration-600 ease-out transform delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-normal leading-tight">
                {product.name}
              </h1>
              <p className="font-serif text-2xl text-foreground mt-4 font-light">
                {product.price}
              </p>
            </div>

            {/* Description & Stock */}
            <div
              className={`space-y-4 transition-all duration-600 ease-out transform delay-[225ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-secondary"></span>
                <span className="text-xs font-semibold text-secondary uppercase tracking-widest">
                  En stock
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            {/* Attributes List */}
            <div
              className={`border-t border-b border-border/60 py-6 space-y-4 transition-all duration-600 ease-out transform delay-[300ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Matériau</span>
                <span className="text-foreground font-medium">{product.material}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Couleur</span>
                <span className="text-foreground font-medium">{product.color}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Genre</span>
                <span className="text-foreground font-medium">{product.gender}</span>
              </div>
            </div>

            {/* Add to Basket Button */}
            <div
              className={`transition-all duration-600 ease-out transform delay-[375ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <button className="w-full bg-primary text-white py-4.5 font-semibold uppercase tracking-widest text-xs hover:bg-[#965628] transition-colors rounded-none cursor-pointer">
                Ajouter au panier
              </button>
            </div>

            <div className="h-px bg-border/60" />

            {/* Trust Badges */}
            <div
              className={`grid grid-cols-3 gap-2 py-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground transition-all duration-600 ease-out transform delay-[450ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Livraison</p>
                <p className="text-[9px] lowercase">offerte dès 500 MAD</p>
              </div>
              <div className="space-y-1 border-l border-r border-border/60">
                <p className="font-semibold text-foreground">Retours</p>
                <p className="text-[9px] lowercase">sous 30 jours</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Garantie</p>
                <p className="text-[9px] lowercase">durant 2 ans</p>
              </div>
            </div>

          </div>
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-24 md:mt-32 pt-16 border-t border-border/60 text-left">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground font-normal mb-8">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendations.map((recProduct, index) => (
                <ProductCard key={recProduct.id} product={recProduct} index={index} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

function ProductCard({ product, index }: { product: Omit<Product, "material" | "color" | "gender" | "description">; index: number }) {
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
        rootMargin: "0px 0px -40px 0px",
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
      className={`group block transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      style={{
        transitionDelay: `${(index % 4) * 80}ms`,
      }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] w-full bg-muted overflow-hidden border border-transparent group-hover:border-primary transition-colors duration-300 rounded-none shadow-none">
        <Image
          src={product.image}
          alt={`${product.brand} - ${product.name}`}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
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

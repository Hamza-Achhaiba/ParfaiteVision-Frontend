"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Minus, Plus } from "lucide-react"

interface CartItem {
  id: string
  brand: string
  name: string
  price: number
  image: string
  quantity: number
}

// Initial premium sample cart items
const INITIAL_ITEMS: CartItem[] = [
  {
    id: "vue-cartier-ct0232o-platinum",
    brand: "CARTIER",
    name: "Ct0232o Platinum",
    price: 890,
    image: "/images/products/vue/cartier-ct0232o-platinum.jpg",
    quantity: 1
  },
  {
    id: "solaires-ray-ban-aviator-gold",
    brand: "RAY-BAN",
    name: "Aviator Gold",
    price: 890,
    image: "/images/products/solaires/ray-ban-aviator-gold.jpg",
    quantity: 1
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_ITEMS)
  const [isVisible, setIsVisible] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta
          return { ...item, quantity: Math.max(1, newQty) }
        }
        return item
      })
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const formatPrice = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " MAD"
  }

  const handleCheckout = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      window.location.href = "/checkout/success"
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="flex-grow max-w-6xl mx-auto px-6 py-16 md:py-24 w-full">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div
            className={`max-w-md mx-auto text-center py-20 px-6 transition-all duration-[600ms] transform ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
          >
            <h1 className="font-serif text-3xl text-center text-foreground mb-2">
              Votre panier est vide
            </h1>
            <p className="text-muted-foreground mb-8">
              Découvrez nos collections
            </p>
            <Link
              href="/lunettes"
              className="text-primary underline hover:text-[#965628] transition-colors"
            >
              Voir les lunettes →
            </Link>
          </div>
        ) : (
          /* Cart with Items layout */
          <div
            className={`space-y-10 transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            {/* Title */}
            <div>
              <h1 className="font-serif text-4xl text-foreground font-normal text-left">
                Mon Panier
              </h1>
              <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1.5 text-left">
                {cartItems.length} {cartItems.length > 1 ? "articles sélectionnés" : "article sélectionné"}
              </p>
            </div>

            {/* Grid Container */}
            <div className="grid md:grid-cols-12 gap-12 items-start">

              {/* Left Column: Items List (col-span-8) */}
              <div className="md:col-span-8">
                <div className="border-t border-border">
                  {cartItems.map((item) => (
                    <div key={item.id} className="text-left">
                      <div className="flex gap-6 items-center py-6">

                        {/* Image: w-24 aspect-square object-cover bg-muted */}
                        <div className="relative w-24 aspect-square bg-muted flex-shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={`${item.brand} - ${item.name}`}
                            fill
                            sizes="96px"
                            className="object-cover w-full h-full"
                          />
                        </div>

                        {/* Details and Actions */}
                        <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="space-y-1">
                            {/* Brand: text-xs uppercase tracking-wider text-muted-foreground */}
                            <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                              {item.brand}
                            </span>
                            {/* Name: font-serif text-xl text-foreground */}
                            <h3 className="font-serif text-xl text-foreground">
                              <Link href={`/lunettes/${item.id}`} className="hover:text-primary transition-colors">
                                {item.name}
                              </Link>
                            </h3>
                            {/* Remove: "Supprimer" text-xs text-muted-foreground hover:text-red-500 */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-xs text-muted-foreground hover:text-red-500 transition-colors pt-1 cursor-pointer bg-transparent border-none p-0"
                            >
                              Supprimer
                            </button>
                          </div>

                          {/* Quantity & Price */}
                          <div className="flex items-center justify-between sm:justify-end gap-8">

                            {/* Quantity: [ - ] number [ + ] (w-8 h-8 border buttons) */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary text-muted-foreground hover:text-foreground transition-colors bg-transparent cursor-pointer"
                                aria-label="Diminuer la quantité"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary text-muted-foreground hover:text-foreground transition-colors bg-transparent cursor-pointer"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Price: "890 MAD" */}
                            <span className="font-serif text-lg text-foreground font-light min-w-[90px] text-right">
                              {formatPrice(item.price * item.quantity)}
                            </span>

                          </div>
                        </div>

                      </div>

                      {/* Divider: h-px bg-border my-6 */}
                      <div className="h-px bg-border my-6" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Summary (sticky) (col-span-4) */}
              <div className="md:col-span-4 md:sticky md:top-32">
                <div className="bg-muted p-8 text-left space-y-6">
                  {/* "Résumé" font-serif text-2xl */}
                  <h2 className="font-serif text-2xl text-foreground font-normal pb-3 border-b border-border">
                    Résumé
                  </h2>

                  {/* Sous-total line */}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="text-foreground font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  {/* Livraison: "Calculée à l'étape suivante" text-sm text-muted-foreground */}
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="text-sm text-muted-foreground text-right">
                      Calculée à l&apos;étape suivante
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border" />

                  {/* Total: font-serif text-xl */}
                  <div className="flex justify-between items-baseline py-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-foreground">
                      Total
                    </span>
                    <span className="font-serif text-xl text-foreground">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {/* Button: w-full bg-primary text-white py-4 "Procéder au paiement" */}
                  <div className="space-y-4 pt-2">
                    <button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="w-full bg-primary text-white py-4 font-semibold uppercase tracking-widest text-xs hover:bg-[#965628] transition-colors rounded-none border-none cursor-pointer flex items-center justify-center gap-2 disabled:bg-primary/60 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Traitement...
                        </>
                      ) : (
                        "Procéder au paiement"
                      )}
                    </button>

                    {/* "Paiement sécurisé par Stripe" text-xs text-muted-foreground text-center mt-3 */}
                    <div className="text-xs text-muted-foreground text-center mt-3">
                      Paiement sécurisé par Stripe
                    </div>

                    {/* "← Continuer mes achats" text-primary text-sm mt-4 */}
                    <div className="text-center pt-4">
                      <Link
                        href="/lunettes"
                        className="text-primary text-sm hover:underline inline-block mt-4"
                      >
                        ← Continuer mes achats
                      </Link>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

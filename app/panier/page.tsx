"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Trash2, Minus, Plus, ShoppingBag, ShieldCheck } from "lucide-react"

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
    price: 4890,
    image: "/images/products/vue/cartier-ct0232o-platinum.jpg",
    quantity: 1
  },
  {
    id: "solaires-ray-ban-aviator-gold",
    brand: "RAY-BAN",
    name: "Aviator Gold",
    price: 1890,
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
      alert("Redirection vers Stripe sécurisé...")
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="flex-grow max-w-6xl mx-auto px-6 py-16 md:py-24 w-full">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div
            className={`max-w-md mx-auto text-center py-20 px-6 transition-all duration-[600ms] transform ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="w-16 h-16 bg-muted border border-border/80 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-6 h-6 text-muted-foreground/60" />
            </div>
            <h1 className="font-serif text-3xl text-foreground font-normal mb-3">
              Votre panier est vide
            </h1>
            <p className="text-muted-foreground text-sm font-light mb-8">
              Vous n&apos;avez pas encore ajouté de lunettes à votre sélection.
            </p>
            <Link
              href="/lunettes"
              className="text-primary hover:text-[#965628] text-sm font-semibold tracking-wider uppercase underline underline-offset-4 hover:no-underline transition-colors"
            >
              Voir les lunettes →
            </Link>
          </div>
        ) : (
          /* Cart with Items layout */
          <div className="space-y-10">
            {/* Title */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h1 className="font-serif text-4xl text-foreground font-normal text-left">
                Mon Panier
              </h1>
              <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1.5 text-left">
                {cartItems.length} {cartItems.length > 1 ? "articles sélectionnés" : "article sélectionné"}
              </p>
            </div>

            {/* Grid Container */}
            <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Items List (col-span-8) */}
              <div
                className={`md:col-span-8 transition-all duration-700 ease-out transform delay-75 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="border-t border-border/40">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-6 border-b border-border/40 text-left">
                      <div className="flex gap-6 items-center">
                        
                        {/* Item Image */}
                        <div className="relative w-24 h-30 bg-muted flex-shrink-0 border border-border/40 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={`${item.brand} - ${item.name}`}
                            fill
                            sizes="96px"
                            className="object-cover object-center w-full h-full"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="space-y-1">
                            <span className="block text-[10px] uppercase font-bold tracking-widest text-primary">
                              {item.brand}
                            </span>
                            <h3 className="font-serif text-lg text-foreground hover:text-primary transition-colors duration-200">
                              <Link href={`/lunettes/${item.id}`}>{item.name}</Link>
                            </h3>
                            {/* Remove Trigger */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[11px] text-muted-foreground hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-1.5 pt-2"
                              aria-label="Supprimer l'article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Supprimer
                            </button>
                          </div>

                          {/* Quantity & Price */}
                          <div className="flex items-center justify-between sm:justify-end gap-8">
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-border bg-background">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[#F5F3EE]/30 active:bg-[#F5F3EE]/60 transition-colors rounded-none border-none cursor-pointer"
                                aria-label="Diminuer la quantité"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-xs font-semibold font-mono text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[#F5F3EE]/30 active:bg-[#F5F3EE]/60 transition-colors rounded-none border-none cursor-pointer"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="font-serif text-lg text-foreground font-light min-w-[100px] text-right">
                              {formatPrice(item.price * item.quantity)}
                            </span>

                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Checkout Summary (col-span-4) */}
              <div
                className={`md:col-span-4 md:sticky md:top-32 transition-all duration-700 ease-out transform delay-150 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="bg-muted p-8 text-left space-y-6">
                  <h2 className="font-serif text-2xl text-foreground font-normal pb-3 border-b border-border/40">
                    Résumé
                  </h2>

                  {/* Summary details */}
                  <div className="space-y-4 text-sm font-light text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span className="text-foreground font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border/20 pt-3">
                      <span>Livraison</span>
                      <span className="text-foreground/80 font-normal">Offerte</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground/80 font-light italic leading-normal border-b border-border/40 pb-4">
                      Taxes locales incluses. Les frais douaniers ou d&apos;expédition ne s&apos;appliquent pas.
                    </p>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-baseline py-2">
                    <span className="font-sans font-bold text-xs uppercase tracking-wider text-foreground">
                      Total
                    </span>
                    <span className="font-serif text-2xl text-foreground font-normal">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {/* Checkout Actions */}
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

                    {/* Trust Stripe badge */}
                    <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground/80 font-semibold pt-1">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span>Paiement sécurisé par Stripe</span>
                    </div>

                    <div className="border-t border-border/20 pt-4 text-center">
                      <Link
                        href="/lunettes"
                        className="text-xs uppercase tracking-widest text-primary hover:text-[#965628] hover:underline font-semibold transition-colors"
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

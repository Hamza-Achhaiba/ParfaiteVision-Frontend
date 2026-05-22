"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/useCart"

// Hardcoded recommendations for "VOUS AIMEREZ AUSSI"
const RECOMMENDATIONS = [
  {
    id: "clipzen",
    brand: "PARFAITE VISION",
    name: "CLIPZEN",
    price: 1150,
    image: "/images/products/vue/moscot-zev-gold.jpg",
    variant: "Accessoire / Unique"
  },
  {
    id: "miltzen-sun",
    brand: "MOSCOT",
    name: "MILTZEN SUN",
    price: 3700,
    image: "/images/products/solaires/ray-ban-round-gold.jpg",
    variant: "Couleur: Noir / Taille: Unique"
  },
  {
    id: "etui-de-voyage",
    brand: "PARFAITE VISION",
    name: "ÉTUI DE VOYAGE",
    price: 350,
    image: "/images/products/vue/moscot-billik-brown.jpg",
    variant: "Accessoire / Unique"
  },
  {
    id: "cordon-a-lunettes",
    brand: "PARFAITE VISION",
    name: "CORDON À LUNETTES",
    price: 90,
    image: "/images/products/vue/moscot-zev-gold.jpg",
    variant: "Accessoire / Unique"
  },
  {
    id: "snapback",
    brand: "PARFAITE VISION",
    name: "SNAPBACK",
    price: 400,
    image: "/images/products/solaires/ray-ban-round-gold.jpg",
    variant: "Accessoire / Unique"
  }
]

export function CartDrawer() {
  const { items, isDrawerOpen, setDrawerOpen, updateQuantity, removeItem, addItem } = useCart()
  const [isRendered, setIsRendered] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const router = useRouter()

  // Sync animation state with isDrawerOpen
  useEffect(() => {
    if (isDrawerOpen) {
      setIsRendered(true)
      setIsAnimatingOut(false)
      document.body.style.overflow = "hidden"
    } else {
      setIsAnimatingOut(true)
      const timer = setTimeout(() => {
        setIsRendered(false)
        setIsAnimatingOut(false)
      }, 400) // matches slide-out/fade-out duration
      document.body.style.overflow = ""
      return () => clearTimeout(timer)
    }
  }, [isDrawerOpen])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  if (!isDrawerOpen && !isRendered) return null

  // Total items count
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0)

  // Total price calculations
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // Format price
  const formatPrice = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " MAD"
  }

  // Handle commander button click with transition
  const handleCommander = (e: React.MouseEvent) => {
    e.preventDefault()
    setDrawerOpen(false)
    setTimeout(() => {
      router.push("/checkout")
    }, 300)
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const dummyUrl = window.location.origin + "/panier"
      navigator.clipboard.writeText(dummyUrl)
      alert("Lien du panier copié !")
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex justify-end font-sans">
      {/* Custom keyframes for stagger effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pvStaggerFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stagger-item-animate {
          opacity: 0;
          animation: pvStaggerFadeIn 450ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards;
        }
      `}} />

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-out cursor-pointer ${
          isDrawerOpen && !isAnimatingOut ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer Container */}
      <div
        className={`relative z-10 w-screen md:max-w-[650px] bg-[#FAFAF7] shadow-2xl h-full flex flex-col transition-transform ${
          isDrawerOpen && !isAnimatingOut
            ? "translate-x-0 duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]"
            : "translate-x-full duration-300 ease-in"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#FAFAF7]">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold tracking-widest text-[#1A1A1A] uppercase font-sans">
              Votre panier
            </h2>
            <span className="bg-[#1A1A1A] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full font-sans">
              {itemsCount}
            </span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 -mr-2 text-[#1A1A1A] hover:opacity-75 transition-opacity cursor-pointer border-none bg-transparent"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content (Responsive Column Grid) */}
        <div className="flex-grow overflow-hidden flex flex-col md:grid md:grid-cols-12">
          {/* Left Column: Cart Items (Scrollable) */}
          <div className="flex-grow md:col-span-7 overflow-y-auto p-6 space-y-6 border-b md:border-b-0 md:border-r border-[#1A1A1A]/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <p className="text-[#1A1A1A]/60 text-sm font-sans mb-4">Votre panier est vide</p>
                <Link
                  href="/lunettes"
                  onClick={() => setDrawerOpen(false)}
                  className="inline-block border border-[#1A1A1A] text-[#1A1A1A] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200 rounded-none"
                >
                  Continuer mes achats
                </Link>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item.id}-${item.variant}`}
                  className="flex gap-4 items-start text-left stagger-item-animate"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image container */}
                  <div className="relative w-20 h-20 bg-white border border-[#1A1A1A]/10 rounded-none overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow min-w-0 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-sm uppercase tracking-wider text-[#1A1A1A] truncate font-sans">
                        {item.name}
                      </h3>
                      <span className="font-bold text-sm text-[#1A1A1A] whitespace-nowrap ml-auto font-sans">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                    {/* Brand details removed, keeping layout clean as requested */}
                    {item.variant.split('/').map((variantPart, pIdx) => {
                      const cleanPart = variantPart.trim()
                      return (
                        <p key={pIdx} className="text-xs text-[#1A1A1A]/60 font-sans">
                          {cleanPart}
                        </p>
                      )
                    })}

                    {/* Actions Row */}
                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#1A1A1A]/20 rounded-none">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors border-none bg-transparent cursor-pointer font-sans"
                        >
                          –
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-[#1A1A1A] select-none font-sans">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors border-none bg-transparent cursor-pointer font-sans"
                        >
                          +
                        </button>
                      </div>

                      {/* Delete Icon */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors p-1 border-none bg-transparent cursor-pointer"
                        aria-label="Supprimer l'article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Recommendations (Scrollable) */}
          <div className="h-64 md:h-full md:col-span-5 overflow-y-auto p-6 bg-[#F0EDE8]/30 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#1A1A1A]/60 uppercase border-b border-[#1A1A1A]/10 pb-2 text-left font-sans">
              Vous aimerez aussi
            </h4>
            <div className="space-y-4">
              {RECOMMENDATIONS.map((rec) => {
                const isAdded = items.some((item) => item.id === rec.id)
                return (
                  <div key={rec.id} className="flex gap-3 items-center text-left">
                    {/* Tiny thumbnail */}
                    <div className="relative w-[60px] h-[60px] bg-white border border-[#1A1A1A]/10 rounded-none overflow-hidden flex-shrink-0">
                      <Image
                        src={rec.image}
                        alt={rec.name}
                        fill
                        sizes="60px"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Text */}
                    <div className="flex-grow min-w-0">
                      <h5 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A] truncate font-sans">
                        {rec.name}
                      </h5>
                      <span className="text-sm font-medium text-[#1A1A1A]/70 font-sans">
                        {formatPrice(rec.price)}
                      </span>
                    </div>
                    {/* Round Add Button (ONE exception to rounded-none) */}
                    <button
                      type="button"
                      disabled={isAdded}
                      onClick={() =>
                        addItem({
                          id: rec.id,
                          brand: rec.brand,
                          name: rec.name,
                          price: rec.price,
                          image: rec.image,
                          variant: rec.variant
                        })
                      }
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-200 border-none cursor-pointer flex-shrink-0 ${
                        isAdded
                          ? "bg-[#1A1A1A]/10 text-[#1A1A1A]/30 cursor-not-allowed"
                          : "bg-[#B56E3A] hover:bg-[#9A5A2E]"
                      }`}
                      aria-label="Ajouter au panier"
                    >
                      +
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#1A1A1A]/10 bg-[#FAFAF7] space-y-4">
          {/* Quick links */}
          <div className="flex justify-start text-xs font-bold tracking-wider font-sans">
            <button
              onClick={handleShare}
              className="underline uppercase text-[#1A1A1A]/80 hover:text-[#1A1A1A] border-none bg-transparent cursor-pointer font-sans"
            >
              Partager panier
            </button>
          </div>

          <div className="h-px bg-[#1A1A1A]/10" />

          {/* Totals */}
          <div className="flex justify-between items-baseline font-sans">
            <span className="text-lg font-bold text-[#1A1A1A] uppercase tracking-wider">
              Total
            </span>
            <span className="text-lg font-bold text-[#1A1A1A]">
              {formatPrice(total)}
            </span>
          </div>
          <p className="text-xs text-[#1A1A1A]/40 text-left font-sans">
            Taxes et livraison calculés à la caisse
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/panier"
              onClick={() => setDrawerOpen(false)}
              className="flex-1 text-center border-2 border-[#1A1A1A] text-[#1A1A1A] bg-transparent hover:bg-[#1A1A1A] hover:text-white py-3 uppercase tracking-widest text-sm font-bold rounded-none transition-all duration-200 font-sans"
            >
              Voir panier
            </Link>
            <button
              onClick={handleCommander}
              className="flex-1 text-center bg-[#B56E3A] text-white hover:bg-[#9A5A2E] py-3 uppercase tracking-widest text-sm font-bold rounded-none transition-all duration-200 border-none cursor-pointer font-sans"
            >
              Commander
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

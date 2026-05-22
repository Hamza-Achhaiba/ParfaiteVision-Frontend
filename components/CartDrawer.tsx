"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Trash2 } from "lucide-react"
import { useCart, CartItem } from "@/hooks/useCart"

// Hardcoded recommendations for "VOUS AIMEREZ AUSSI"
const RECOMMENDATIONS = [
  {
    id: "clipzen",
    brand: "PARFAITE VISION",
    name: "CLIPZEN",
    price: 1150,
    image: "/images/products/vue/moscot-zev-gold.jpg", // placeholder
    variant: "Accessoire / Unique"
  },
  {
    id: "miltzen-sun",
    brand: "MOSCOT",
    name: "MILTZEN SUN",
    price: 3700,
    image: "/images/products/solaires/ray-ban-round-gold.jpg", // placeholder
    variant: "Couleur: Noir / Taille: Unique"
  },
  {
    id: "etui-de-voyage",
    brand: "PARFAITE VISION",
    name: "ÉTUI DE VOYAGE",
    price: 350,
    image: "/images/products/vue/moscot-billik-brown.jpg", // placeholder
    variant: "Accessoire / Unique"
  },
  {
    id: "cordon-a-lunettes",
    brand: "PARFAITE VISION",
    name: "CORDON À LUNETTES",
    price: 90,
    image: "/images/products/vue/moscot-zev-gold.jpg", // placeholder
    variant: "Accessoire / Unique"
  },
  {
    id: "miltzen-blue-light",
    brand: "MOSCOT",
    name: "MILTZEN BLUE LIGHT",
    price: 4400,
    image: "/images/products/vue/moscot-billik-brown.jpg", // placeholder
    variant: "Couleur: Crystal / Taille: 46"
  },
  {
    id: "snapback",
    brand: "PARFAITE VISION",
    name: "SNAPBACK",
    price: 400,
    image: "/images/products/solaires/ray-ban-round-gold.jpg", // placeholder
    variant: "Accessoire / Unique"
  }
]

export function CartDrawer() {
  const { items, isDrawerOpen, setDrawerOpen, updateQuantity, removeItem, addItem } = useCart()
  const [isRendered, setIsRendered] = useState(false)

  // Sync animation state with isDrawerOpen
  useEffect(() => {
    if (isDrawerOpen) {
      setIsRendered(true)
      document.body.style.overflow = "hidden"
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false)
      }, 300) // matches transition duration
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
  const isFreeShipping = total > 1000

  // Format price
  const formatPrice = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " MAD"
  }

  return (
    <div className="fixed inset-0 z-[200] flex justify-end font-sans">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer Container */}
      <div
        className={`relative z-10 w-screen md:max-w-[650px] bg-[#FAFAF7] shadow-2xl h-full flex flex-col transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0 ease-out" : "translate-x-full ease-in"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#FAFAF7]">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold tracking-widest text-[#1A1A1A] uppercase font-sans">
              Votre panier
            </h2>
            <span className="bg-[#1A1A1A] text-white text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full font-sans">
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

        {/* Free Shipping Banner */}
        {isFreeShipping ? (
          <div className="bg-[#1A1A1A] text-white text-sm font-semibold p-3 text-center uppercase tracking-wider font-sans transition-all duration-300">
            ✓ Livraison express offerte dans le monde entier !
            <div className="w-full bg-[#B56E3A] h-1.5 mt-2" />
          </div>
        ) : (
          <div className="bg-[#FAFAF7] border-b border-[#1A1A1A]/5 p-3 text-center text-xs text-[#1A1A1A]/70 uppercase tracking-wider font-sans">
            Plus que {formatPrice(1000 - total)} pour la livraison offerte !
            <div className="w-full bg-[#1A1A1A]/10 h-1.5 mt-2 overflow-hidden">
              <div 
                className="bg-[#B56E3A] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (total / 1000) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Content (Responsive Column Grid) */}
        <div className="flex-grow overflow-hidden flex flex-col md:grid md:grid-cols-12">
          {/* Left Column: Cart Items (Scrollable) */}
          <div className="flex-grow md:col-span-7 overflow-y-auto p-6 space-y-6 border-b md:border-b-0 md:border-r border-[#1A1A1A]/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <p className="text-[#1A1A1A]/60 text-sm font-sans mb-4">Votre panier est vide.</p>
                <Link
                  href="/lunettes"
                  onClick={() => setDrawerOpen(false)}
                  className="inline-block border border-[#1A1A1A] text-[#1A1A1A] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200 rounded-none"
                >
                  Découvrir nos collections
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="flex gap-4 items-start text-left">
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
                      <h3 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A] truncate">
                        {item.name}
                      </h3>
                      <span className="font-bold text-xs text-[#1A1A1A] whitespace-nowrap ml-auto">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#1A1A1A]/50 font-semibold uppercase tracking-widest mt-0.5">
                      {item.brand}
                    </p>
                    <p className="text-[11px] text-[#1A1A1A]/60 font-sans">
                      {item.variant}
                    </p>

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
                        <span className="w-7 text-center text-xs font-semibold text-[#1A1A1A] select-none">
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
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#1A1A1A]/60 uppercase border-b border-[#1A1A1A]/10 pb-2 text-left font-sans">
              Vous aimerez aussi
            </h4>
            <div className="space-y-4">
              {RECOMMENDATIONS.map((rec) => {
                const isAdded = items.some((item) => item.id === rec.id)
                return (
                  <div key={rec.id} className="flex gap-3 items-center text-left">
                    {/* Tiny thumbnail */}
                    <div className="relative w-12 h-12 bg-white border border-[#1A1A1A]/10 rounded-none overflow-hidden flex-shrink-0">
                      <Image
                        src={rec.image}
                        alt={rec.name}
                        fill
                        sizes="48px"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Text */}
                    <div className="flex-grow min-w-0">
                      <h5 className="font-bold text-[10px] uppercase tracking-wider text-[#1A1A1A] truncate">
                        {rec.name}
                      </h5>
                      <span className="text-[11px] font-medium text-[#1A1A1A]/70">
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
          <div className="flex justify-between text-[11px] font-bold tracking-wider font-sans">
            <button
              onClick={() => {
                const dummyUrl = window.location.origin + "/panier"
                navigator.clipboard.writeText(dummyUrl)
                alert("Lien du panier copié !")
              }}
              className="underline uppercase text-[#1A1A1A]/80 hover:text-[#1A1A1A] border-none bg-transparent cursor-pointer font-sans"
            >
              🔗 Partager panier
            </button>
            <span className="underline uppercase text-[#1A1A1A]/80 hover:text-[#1A1A1A] cursor-pointer font-sans">
              🏷️ Réduction (0)
            </span>
          </div>

          <div className="h-px bg-[#1A1A1A]/10" />

          {/* Totals */}
          <div className="flex justify-between items-baseline font-sans">
            <span className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
              Total
            </span>
            <span className="text-xl font-bold text-[#1A1A1A]">
              {formatPrice(total)}
            </span>
          </div>
          <p className="text-[10px] text-[#1A1A1A]/40 text-left font-sans">
            Taxes et livraison calculés à la caisse
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/panier"
              onClick={() => setDrawerOpen(false)}
              className="flex-1 text-center border-2 border-[#1A1A1A] text-[#1A1A1A] bg-transparent hover:bg-[#1A1A1A] hover:text-white py-3 uppercase tracking-widest text-xs font-bold rounded-none transition-all duration-200"
            >
              Voir panier
            </Link>
            <Link
              href="/checkout"
              onClick={() => setDrawerOpen(false)}
              className="flex-1 text-center bg-[#B56E3A] text-white hover:bg-[#9A5A2E] py-3 uppercase tracking-widest text-xs font-bold rounded-none transition-all duration-200"
            >
              Commander
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

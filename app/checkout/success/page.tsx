"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/hooks/useCart"

export default function CheckoutSuccessPage() {
  const [isVisible, setIsVisible] = useState(false)
  const { clearCart } = useCart()

  useEffect(() => {
    setIsVisible(true)
    clearCart()
  }, [clearCart])

  return (
    <main className="min-h-screen bg-[#FAFAF7] flex flex-col justify-between">
      <Header />

      <section className="flex-grow flex items-center justify-center px-6">
        <div
          className={`max-w-lg mx-auto text-center py-20 transition-all duration-1000 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Custom Green SVG checkmark (no icon library) */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#6B8F71]/10 rounded-none flex items-center justify-center text-[#6B8F71]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          </div>

          {/* Title: "Commande confirmée !" in Playfair Display text-3xl text-[#6B8F71] */}
          <h1 className="font-serif text-3xl text-[#6B8F71] mt-6 font-normal">
            Commande confirmée !
          </h1>

          {/* Description: "Merci pour votre achat." in Inter */}
          <p className="text-[#1A1A1A]/70 mt-4 text-base font-sans font-normal max-w-md mx-auto">
            Merci pour votre achat.
          </p>

          {/* Divider */}
          <div className="h-px bg-[#1A1A1A]/10 w-24 mx-auto my-8" />

          {/* Button "Retour à la boutique" → /lunettes */}
          <div className="flex justify-center">
            <Link
              href="/lunettes"
              className="bg-[#B56E3A] hover:bg-[#9A5A2E] text-white py-3 px-8 text-sm font-semibold uppercase tracking-widest transition-colors duration-200 rounded-none cursor-pointer border-none shadow-none font-sans"
            >
              Retour à la boutique
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

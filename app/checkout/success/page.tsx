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
          className={`max-w-lg mx-auto text-center py-24 transition-all duration-1000 ease-out transform ${
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
          <h1 className="font-serif text-3xl md:text-4xl text-[#6B8F71] mt-6 font-normal">
            Commande confirmée !
          </h1>

          {/* Subtitle: "Merci pour votre achat. Un email de confirmation a été envoyé." in Inter */}
          <p className="text-[#1A1A1A]/70 mt-4 text-base font-light font-sans max-w-md mx-auto">
            Merci pour votre achat. Un email de confirmation a été envoyé.
          </p>

          {/* Placeholder order number: "#PV-2024-XXXX" */}
          <div className="mt-6 bg-[#F0EDE8] p-4 border border-[#1A1A1A]/10 rounded-none inline-block font-mono text-sm text-[#1A1A1A]/80">
            Numéro de commande : <span className="font-bold">#PV-2024-XXXX</span>
          </div>

          {/* Divider: h-px bg-[#1A1A1A]/10 w-24 mx-auto my-8 */}
          <div className="h-px bg-[#1A1A1A]/10 w-24 mx-auto my-8" />

          {/* Button "Retour à la boutique" → /lunettes (bg-[#B56E3A] text-white py-3 px-8 rounded-none transition-colors duration-200) */}
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/lunettes"
              className="bg-[#B56E3A] hover:bg-[#9A5A2E] text-white py-3 px-8 text-sm font-semibold uppercase tracking-widest transition-colors duration-200 rounded-none cursor-pointer border-none shadow-none"
            >
              Retour à la boutique
            </Link>

            <Link
              href="/"
              className="text-[#1A1A1A]/60 hover:text-[#B56E3A] transition-colors text-sm font-sans underline"
            >
              Retourner à l&apos;accueil →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

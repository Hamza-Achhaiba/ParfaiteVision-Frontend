"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CheckoutSuccessPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="flex-grow flex items-center justify-center px-6">
        <div
          className={`max-w-lg mx-auto text-center py-24 transition-all duration-1000 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Checkmark: "✓" font-serif text-6xl text-secondary */}
          <div className="font-serif text-6xl text-secondary select-none">
            ✓
          </div>

          {/* Title: "Merci pour votre commande" font-serif text-3xl mt-6 */}
          <h1 className="font-serif text-3xl text-foreground mt-6 font-normal">
            Merci pour votre commande
          </h1>

          {/* Subtitle: "Vous recevrez un email de confirmation." text-muted-foreground mt-4 */}
          <p className="text-muted-foreground mt-4 text-sm font-light">
            Vous recevrez un email de confirmation.
          </p>

          {/* Divider: h-px bg-border w-24 mx-auto my-8 */}
          <div className="h-px bg-border w-24 mx-auto my-8" />

          {/* Links */}
          <div className="flex flex-col items-center">
            {/* Link 1: "Retourner à l'accueil →" text-primary underline */}
            <Link
              href="/"
              className="text-primary underline text-sm hover:text-[#965628] transition-colors"
            >
              Retourner à l&apos;accueil →
            </Link>

            {/* Link 2: "Voir nos collections →" text-primary underline mt-2 */}
            <Link
              href="/lunettes"
              className="text-primary underline text-sm hover:text-[#965628] transition-colors mt-2"
            >
              Voir nos collections →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

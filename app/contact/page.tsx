"use client"

import { useEffect, useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail, Clock, Check, Send } from "lucide-react"

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-x-0")
            entry.target.classList.remove("opacity-0", "-translate-x-8", "translate-x-8")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    if (leftColumnRef.current) observer.observe(leftColumnRef.current)
    if (rightColumnRef.current) observer.observe(rightColumnRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending message
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setName("")
      setEmail("")
      setMessage("")
      
      // Reset success banner after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="flex-grow max-w-6xl mx-auto px-6 py-16 md:py-24 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Form with slide from left animation */}
          <div
            ref={leftColumnRef}
            className="space-y-8 opacity-0 -translate-x-8 transition-all duration-700 ease-out text-left"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold block">
                Nous contacter
              </span>
              <h1 className="font-serif text-4xl text-foreground font-normal leading-tight">
                Contactez-nous
              </h1>
              <p className="text-muted-foreground text-sm font-light">
                Une question sur nos collections, besoin d&apos;un devis ou d&apos;informations ? Remplissez ce formulaire et notre équipe vous répondra sous 24h.
              </p>
            </div>

            {/* Success Message Banner */}
            {isSuccess && (
              <div className="p-4 bg-secondary/10 border-l-2 border-secondary text-secondary text-xs uppercase tracking-wider font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                Message envoyé avec succès. Merci !
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom complet"
                  disabled={isLoading}
                  className="w-full bg-transparent py-3 border-b border-border focus:border-primary outline-none placeholder:text-muted-foreground/60 text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Adresse e-mail *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  disabled={isLoading}
                  className="w-full bg-transparent py-3 border-b border-border focus:border-primary outline-none placeholder:text-muted-foreground/60 text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez votre message ici..."
                  disabled={isLoading}
                  className="w-full bg-transparent py-3 border-b border-border focus:border-primary outline-none placeholder:text-muted-foreground/60 text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-4 font-semibold uppercase tracking-widest text-xs hover:bg-[#965628] transition-colors rounded-none border-none cursor-pointer flex items-center justify-center gap-2 disabled:bg-primary/60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
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
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Information with slide from right animation */}
          <div
            ref={rightColumnRef}
            className="space-y-10 opacity-0 translate-x-8 transition-all duration-700 ease-out text-left"
          >
            
            {/* Map Placeholder */}
            <div className="relative aspect-[4/3] bg-muted border border-border/80 flex flex-col items-center justify-center p-6 text-center group overflow-hidden">
              {/* Subtle background overlay design */}
              <div className="absolute inset-0 bg-[#F5F3EE]/40 group-hover:bg-[#F5F3EE]/20 transition-colors duration-300" />
              <MapPin className="w-10 h-10 text-primary mb-3 relative z-10 animate-bounce" />
              <h3 className="font-serif text-lg text-foreground font-normal relative z-10">
                Parfaite Vision Essaouira
              </h3>
              <p className="text-xs text-muted-foreground mt-1 relative z-10 max-w-[280px] leading-relaxed">
                55 Rue Moulay Rachid, Essaouira, Maroc
              </p>
              <span className="text-[9px] uppercase tracking-widest text-primary font-bold mt-4 border border-primary/20 px-3 py-1 bg-background relative z-10">
                Carte Interactive
              </span>
            </div>

            {/* Direct details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              
              {/* Section: Contacts */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-foreground border-b border-border/40 pb-2 font-normal">
                  Contact
                </h3>
                <div className="space-y-3.5 text-sm text-muted-foreground font-light">
                  <a
                    href="tel:+212524475555"
                    className="flex items-center gap-3 hover:text-primary transition-colors py-0.5 group"
                  >
                    <Phone className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                    <span>+212 5 24 47 55 55</span>
                  </a>
                  <a
                    href="mailto:contact@parfaitevision.ma"
                    className="flex items-center gap-3 hover:text-primary transition-colors py-0.5 group"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                    <span className="lowercase">contact@parfaitevision.ma</span>
                  </a>
                  <div className="flex items-start gap-3 py-0.5">
                    <MapPin className="w-4 h-4 text-muted-foreground/60 mt-0.5 flex-shrink-0" />
                    <span>55 Rue Moulay Rachid, Essaouira</span>
                  </div>
                </div>
              </div>

              {/* Section: Horaires */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-foreground border-b border-border/40 pb-2 font-normal">
                  Horaires d&apos;ouverture
                </h3>
                <div className="space-y-2.5 text-sm text-muted-foreground font-light">
                  <div className="flex justify-between">
                    <span>Lun - Ven</span>
                    <span className="text-foreground font-medium">9h00 - 19h00</span>
                  </div>
                  <div className="flex justify-between border-t border-border/20 pt-2">
                    <span>Samedi</span>
                    <span className="text-foreground font-medium">9h00 - 17h00</span>
                  </div>
                  <div className="flex justify-between border-t border-border/20 pt-2 text-[#DC2626]">
                    <span>Dimanche</span>
                    <span className="font-medium">Fermé</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}

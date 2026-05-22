"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, MapPin, Phone, Mail, Info, Check, AlertCircle } from "lucide-react"

// Types of appointment
const RDV_TYPES = [
  {
    id: "examen",
    num: "01",
    title: "Examen de vue",
    desc: "Test complet de réfraction et contrôle de santé oculaire."
  },
  {
    id: "conseil",
    num: "02",
    title: "Conseil personnalisé",
    desc: "Choix de montures et verres avec un opticien styliste."
  },
  {
    id: "ajustement",
    num: "03",
    title: "Ajustement",
    desc: "Réglage de vos lunettes pour un confort parfait."
  }
]

const MORNING_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]
const AFTERNOON_SLOTS = [
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00"
]

export default function AppointmentPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedType, setSelectedType] = useState("examen")
  const [date, setDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  
  // Submission & loading states
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Scroll animations observer
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    setIsVisible(true)
    
    // Setup IntersectionObserver for scroll entrance animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-8")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) {
      alert("Veuillez sélectionner un créneau horaire.")
      return
    }

    setIsLoading(true)

    // Simulate API booking confirmation
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      
      // Scroll smoothly to success message
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 1500)
  }

  // Get current date string for min date attribute (prevents picking past dates)
  const getMinDate = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const dd = String(today.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main Grid Section */}
      <section className="flex-grow max-w-6xl mx-auto px-6 py-16 md:py-24 w-full">
        {isSuccess ? (
          /* Success Screen */
          <div
            className={`max-w-xl mx-auto text-center py-16 px-8 border border-border/80 bg-background transition-all duration-[600ms] transform ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="w-16 h-16 bg-[#6B8F71]/10 rounded-none flex items-center justify-center mx-auto mb-8 border border-[#6B8F71]/30">
              <Check className="w-8 h-8 text-[#6B8F71]" />
            </div>
            <h1 className="font-serif text-xl text-[#6B8F71] font-normal mb-4">
              Votre rendez-vous a été enregistré avec succès !
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Merci M./Mme <strong className="text-foreground">{name}</strong>. Votre rendez-vous pour un{" "}
              <strong className="text-foreground">
                {RDV_TYPES.find((t) => t.id === selectedType)?.title}
              </strong>{" "}
              le <strong className="text-foreground">{date.split("-").reverse().join("/")}</strong> à{" "}
              <strong className="text-foreground">{selectedSlot}</strong> a été enregistré avec succès. Un SMS et un e-mail de confirmation vous ont été envoyés.
            </p>
            <div className="border-t border-b border-border/60 py-6 my-8 space-y-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <div className="flex justify-between">
                <span>Type</span>
                <span className="text-foreground font-semibold">
                  {RDV_TYPES.find((t) => t.id === selectedType)?.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date & Heure</span>
                <span className="text-foreground font-semibold">
                  {date.split("-").reverse().join("/")} — {selectedSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Téléphone</span>
                <span className="text-foreground font-semibold">{phone}</span>
              </div>
              {email && (
                <div className="flex justify-between">
                  <span>E-mail</span>
                  <span className="text-foreground font-semibold">{email}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link
                href="/mes-rendez-vous"
                className="bg-[#B56E3A] text-white px-6 py-3 font-semibold uppercase tracking-widest text-xs hover:bg-[#9A5A2E] transition-colors duration-200 rounded-none text-center"
              >
                Voir mes rendez-vous
              </Link>
              <button
                onClick={() => {
                  setIsSuccess(false)
                  setName("")
                  setPhone("")
                  setEmail("")
                  setDate("")
                  setSelectedSlot("")
                  setNotes("")
                }}
                className="border border-[#B56E3A] text-[#B56E3A] hover:bg-[#B56E3A] hover:text-white px-6 py-3 font-semibold uppercase tracking-widest text-xs transition-colors duration-200 rounded-none cursor-pointer text-center"
              >
                Prendre un autre rendez-vous
              </button>
            </div>
          </div>
        ) : (
          /* Booking Layout */
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Booking Form (col-span-7) */}
            <div className="md:col-span-7 space-y-12">
              
              {/* Header Title Section */}
              <div
                ref={(el) => { if (el) sectionRefs.current[0] = el }}
                className="space-y-4 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              >
                <h1 className="font-serif text-4xl md:text-5xl text-foreground font-normal leading-tight">
                  Prenez soin de votre vue
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base font-light">
                  Nos opticiens vous accueillent sur rendez-vous pour un accompagnement sur-mesure.
                </p>
                <div>
                  <Link
                    href="/mes-rendez-vous"
                    className="font-sans text-sm text-[#B56E3A] underline hover:text-[#9A5A2E] transition-colors duration-200"
                  >
                    Déjà un rendez-vous ? Consultez vos rendez-vous
                  </Link>
                </div>
              </div>

              {/* Booking Form Card */}
              <form
                onSubmit={handleSubmit}
                ref={(el) => { if (el) sectionRefs.current[1] = el }}
                className="space-y-10 opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100"
              >
                {/* Section 1: Contact Details */}
                <div className="space-y-6">
                  <h2 className="font-serif text-xl text-foreground border-b border-border/40 pb-2">
                    1. Vos coordonnées
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Nom Complet */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom et prénom"
                        className="w-full bg-transparent py-3 border-b border-border focus:border-primary outline-none placeholder:text-muted-foreground/60 text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0"
                      />
                    </div>

                    {/* Téléphone */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+212 6XX XX XX XX"
                        className="w-full bg-transparent py-3 border-b border-border focus:border-primary outline-none placeholder:text-muted-foreground/60 text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                      Adresse e-mail (Optionnel)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full bg-transparent py-3 border-b border-border focus:border-primary outline-none placeholder:text-muted-foreground/60 text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0"
                    />
                  </div>
                </div>

                {/* Section 2: Type de RDV */}
                <div className="space-y-6">
                  <h2 className="font-serif text-xl text-foreground border-b border-border/40 pb-2">
                    2. Type de rendez-vous
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {RDV_TYPES.map((type) => {
                      const isSelected = selectedType === type.id
                      return (
                        <div
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`border p-5 cursor-pointer bg-background hover:bg-[#F5F3EE]/30 transition-all duration-300 rounded-none flex flex-col justify-between min-h-[145px] text-left ${
                            isSelected ? "border-primary bg-primary/5" : "border-border"
                          }`}
                        >
                          <span className="font-serif text-xl text-primary font-normal">
                            {type.num}
                          </span>
                          <div>
                            <h3 className="font-sans font-bold text-xs text-foreground uppercase tracking-wider mt-3">
                              {type.title}
                            </h3>
                            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                              {type.desc}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Section 3: Date & Heure */}
                <div className="space-y-8">
                  <h2 className="font-serif text-xl text-foreground border-b border-border/40 pb-2">
                    3. Date & Créneau
                  </h2>
                  
                  {/* Date Input */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                      Sélectionnez une date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={date}
                        min={getMinDate()}
                        onChange={(e) => {
                          setDate(e.target.value)
                          setSelectedSlot("") // Reset slot on date change
                        }}
                        className="w-full bg-transparent py-3 border-b border-border focus:border-primary outline-none text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Time Slots (Only show if date is chosen) */}
                  {date && (
                    <div className="space-y-6 pt-2 transition-opacity duration-300">
                      {/* Morning slots */}
                      <div className="space-y-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                          <Clock className="w-3.5 h-3.5 text-primary" /> Matinée
                        </span>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {MORNING_SLOTS.map((slot) => {
                            const isSelected = selectedSlot === slot
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={`border py-2 px-3 text-center text-xs font-semibold cursor-pointer rounded-none transition-all duration-200 ${
                                  isSelected
                                    ? "bg-primary text-white border-primary"
                                    : "border-border hover:border-primary hover:bg-[#F5F3EE]/30 text-foreground/80"
                                }`}
                              >
                                {slot}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Afternoon slots */}
                      <div className="space-y-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                          <Clock className="w-3.5 h-3.5 text-primary" /> Après-midi
                        </span>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {AFTERNOON_SLOTS.map((slot) => {
                            const isSelected = selectedSlot === slot
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={`border py-2 px-3 text-center text-xs font-semibold cursor-pointer rounded-none transition-all duration-200 ${
                                  isSelected
                                    ? "bg-primary text-white border-primary"
                                    : "border-border hover:border-primary hover:bg-[#F5F3EE]/30 text-foreground/80"
                                }`}
                              >
                                {slot}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 4: Notes */}
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline border-b border-border/40 pb-2">
                    <h2 className="font-serif text-xl text-foreground">
                      4. Note ou demande spéciale
                    </h2>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {notes.length}/500
                    </span>
                  </div>
                  <div className="space-y-1 text-left">
                    <textarea
                      maxLength={500}
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Indiquez-nous ici toute information complémentaire (ex: renouvellement d'ordonnance, besoin spécifique...)"
                      className="w-full bg-transparent py-3 border-b border-border focus:border-primary outline-none placeholder:text-muted-foreground/60 text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0 resize-none"
                    />
                  </div>
                </div>

                {/* Form Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-4.5 font-semibold uppercase tracking-widest text-xs hover:bg-[#965628] transition-colors rounded-none cursor-pointer border-none flex items-center justify-center gap-2 disabled:bg-primary/60 disabled:cursor-not-allowed"
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
                        Confirmation en cours...
                      </>
                    ) : (
                      "Confirmer le rendez-vous"
                    )}
                  </button>
                </div>
              </form>

            </div>

            {/* Right Column: Sticky Sidebar Info Cards (col-span-5) */}
            <div className="md:col-span-5 md:sticky md:top-32 space-y-6">
              
              {/* Horaires Card */}
              <div
                ref={(el) => { if (el) sectionRefs.current[2] = el }}
                className="border border-border/80 bg-background p-6 space-y-4 text-left opacity-0 translate-y-8 transition-all duration-700 ease-out delay-150"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-primary/20 bg-primary/5 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground font-normal">
                    Horaires d&apos;ouverture
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground font-light">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
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

              {/* Contact Card */}
              <div
                ref={(el) => { if (el) sectionRefs.current[3] = el }}
                className="border border-border/80 bg-background p-6 space-y-4 text-left opacity-0 translate-y-8 transition-all duration-700 ease-out delay-[225ms]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-primary/20 bg-primary/5 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground font-normal">
                    Contactez la boutique
                  </h3>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground font-light">
                  <a
                    href="tel:+212524475555"
                    className="flex items-center gap-3 hover:text-primary transition-colors py-1 group"
                  >
                    <Phone className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                    <span>+212 5 24 47 55 55</span>
                  </a>
                  <a
                    href="mailto:contact@parfaitevision.ma"
                    className="flex items-center gap-3 hover:text-primary transition-colors py-1 border-t border-border/20 pt-3 group"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                    <span className="lowercase">contact@parfaitevision.ma</span>
                  </a>
                  <div className="flex items-start gap-3 border-t border-border/20 pt-3">
                    <MapPin className="w-4 h-4 text-muted-foreground/60 mt-0.5" />
                    <span>55 Rue Moulay Rachid, Essaouira</span>
                  </div>
                </div>
              </div>

              {/* Infos Pratiques Card */}
              <div
                ref={(el) => { if (el) sectionRefs.current[4] = el }}
                className="border border-border/80 bg-background p-6 space-y-4 text-left opacity-0 translate-y-8 transition-all duration-700 ease-out delay-[300ms]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-primary/20 bg-primary/5 flex items-center justify-center">
                    <Info className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground font-normal">
                    Infos pratiques
                  </h3>
                </div>
                <ul className="space-y-3.5 text-sm text-muted-foreground font-light">
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0" />
                    <span>Durée moyenne de l&apos;entretien : <strong>30 minutes</strong>.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0" />
                    <span><strong>Premier examen de vue offert</strong> (sans engagement).</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0" />
                    <span>Pensez à apporter vos <strong>anciennes lunettes</strong> et ordonnances.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AlertTriangle, X } from "lucide-react"

interface Appointment {
  id: string
  day: string
  dateStr: string
  time: string
  type: string
  status: "confirm" | "pending" | "past"
  location: string
}

const INITIAL_APPOINTMENTS: Appointment[] = [
  /*
  {
    id: "1",
    day: "Lun.",
    dateStr: "14 Avril 2026",
    time: "10:30",
    type: "Examen de vue",
    status: "confirm",
    location: "55 Rue Moulay Rachid, Essaouira"
  },
  {
    id: "2",
    day: "Mer.",
    dateStr: "23 Avril 2026",
    time: "14:00",
    type: "Conseil personnalisé",
    status: "pending",
    location: "55 Rue Moulay Rachid, Essaouira"
  },
  {
    id: "3",
    day: "Ven.",
    dateStr: "7 Mars 2026",
    time: "09:00",
    type: "Réparation",
    status: "past",
    location: "55 Rue Moulay Rachid, Essaouira"
  }
  */
]

export default function MesRendezVousPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS)
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    // Trigger header animation
    setHeaderVisible(true)
  }, [])

  const handleCancelClick = (id: string) => {
    setCancellingId(id)
  }

  const confirmCancel = () => {
    if (cancellingId) {
      setAppointments((prev) => prev.filter((app) => app.id !== cancellingId))
      setCancellingId(null)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="flex-grow max-w-4xl mx-auto px-6 py-16 md:py-24 w-full">
        {/* Header Section */}
        <div
          className={`space-y-4 mb-16 transition-all duration-[600ms] ease-out transform text-left ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-serif text-3xl md:text-4xl text-foreground font-normal tracking-wide">
            Mes Rendez-vous
          </h1>
          <p className="text-sm font-sans text-foreground/60 leading-relaxed max-w-xl">
            Consultez et gérez vos rendez-vous
          </p>
        </div>

        {/* Appointments List / Empty State */}
        {appointments.length > 0 ? (
          <div className="space-y-6">
            {appointments.map((appointment, index) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                index={index}
                onCancel={handleCancelClick}
              />
            ))}

            {/* Bottom CTA when appointments exist */}
            <div className="pt-8 flex justify-start">
              <Link
                href="/rendez-vous"
                className="inline-block border-2 border-[#B56E3A] text-[#B56E3A] hover:bg-[#B56E3A] hover:text-white py-3 px-8 text-xs font-semibold uppercase tracking-widest transition-all duration-200 rounded-none text-center"
              >
                Prendre un nouveau rendez-vous
              </Link>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="border border-[#1A1A1A]/10 bg-white p-12 text-center space-y-8">
            <div className="flex justify-center">
              {/* Custom Calendar SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-16 h-16 text-[#B56E3A]/40"
              >
                <rect x="3" y="4" width="18" height="18" rx="0" ry="0" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-sans text-foreground/60">
                Vous n&apos;avez aucun rendez-vous pour le moment.
              </p>
            </div>
            <div className="flex justify-center pt-2">
              <Link
                href="/rendez-vous"
                className="inline-block bg-[#B56E3A] text-white py-3 px-8 text-xs font-semibold uppercase tracking-widest hover:bg-[#9A5A2E] transition-colors duration-200 rounded-none text-center border-none cursor-pointer"
              >
                Prendre un rendez-vous
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Cancellation Confirmation Modal */}
      {cancellingId && (
        <div className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-[#FAFAF7] border border-[#1A1A1A]/10 p-8 max-w-md w-full rounded-none shadow-2xl relative">
            <button
              onClick={() => setCancellingId(null)}
              className="absolute top-4 right-4 text-[#1A1A1A]/40 hover:text-foreground transition-colors duration-200 border-none bg-transparent cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-6 text-center">
              <div className="w-12 h-12 bg-[#DC2626]/10 border border-[#DC2626]/20 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl text-foreground font-normal">
                  Annuler le rendez-vous
                </h3>
                <p className="text-sm text-foreground/60 font-sans leading-relaxed">
                  Êtes-vous sûr de vouloir annuler ce rendez-vous ? Cette action est irréversible.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={confirmCancel}
                  className="w-full bg-[#DC2626] text-white py-3 text-xs font-semibold uppercase tracking-widest hover:bg-[#B91C1C] transition-colors duration-200 rounded-none cursor-pointer border-none"
                >
                  Oui, annuler
                </button>
                <button
                  onClick={() => setCancellingId(null)}
                  className="w-full border border-[#1A1A1A]/20 text-[#1A1A1A] py-3 text-xs font-semibold uppercase tracking-widest hover:bg-[#1A1A1A]/5 transition-colors duration-200 rounded-none cursor-pointer bg-transparent"
                >
                  Conserver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

function AppointmentCard({
  appointment,
  index,
  onCancel,
}: {
  appointment: Appointment
  index: number
  onCancel: (id: string) => void
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
        threshold: 0.2,
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

  const getStatusBadge = (status: Appointment["status"]) => {
    switch (status) {
      case "confirm":
        return (
          <span className="bg-[#6B8F71]/10 text-[#6B8F71] px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-none">
            Confirmé
          </span>
        )
      case "pending":
        return (
          <span className="bg-[#B56E3A]/10 text-[#B56E3A] px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-none">
            En attente
          </span>
        )
      case "past":
        return (
          <span className="bg-[#1A1A1A]/10 text-[#1A1A1A]/60 px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-none">
            Passé
          </span>
        )
    }
  }

  return (
    <div
      ref={ref}
      className={`bg-white border border-[#1A1A1A]/10 p-6 rounded-none hover:border-[#B56E3A]/30 transition-all duration-300 transform flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Date & Time */}
      <div className="text-left min-w-[180px]">
        <p className="font-serif text-lg text-foreground font-normal">
          {appointment.day} {appointment.dateStr}
        </p>
        <p className="font-sans text-2xl font-bold text-foreground mt-1">
          {appointment.time}
        </p>
      </div>

      {/* Service & Status & Location */}
      <div className="flex-grow text-left space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-sans font-medium text-base text-foreground">
            {appointment.type}
          </h3>
          {getStatusBadge(appointment.status)}
        </div>
        <p className="font-sans text-xs text-[#1A1A1A]/40 flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-[#1A1A1A]/30"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {appointment.location}
        </p>
      </div>

      {/* Action */}
      <div className="w-full sm:w-auto text-right flex sm:block justify-end">
        {appointment.status !== "past" ? (
          <button
            onClick={() => onCancel(appointment.id)}
            className="text-[#1A1A1A]/40 hover:text-[#DC2626] text-sm transition-colors duration-200 font-medium py-1 px-2 border-none bg-transparent cursor-pointer"
          >
            Annuler
          </button>
        ) : (
          <span className="text-xs text-[#1A1A1A]/20 select-none px-2">
            Passé
          </span>
        )}
      </div>
    </div>
  )
}

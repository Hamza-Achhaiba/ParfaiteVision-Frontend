"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingBag, Calendar, User, Trash2 } from "lucide-react"

// Types
type TabType = "commandes" | "rendez-vous" | "profil"

interface Order {
  id: string
  date: string
  total: string
  status: string
}

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  status: string
}

// Initial Sample Data
const INITIAL_ORDERS: Order[] = [
  {
    id: "CMD-2026-9812",
    date: "14 Mai 2026",
    total: "890 MAD",
    status: "Livré"
  },
  {
    id: "CMD-2026-9743",
    date: "02 Avril 2026",
    total: "1 780 MAD",
    status: "Livré"
  }
]

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "RDV-7718",
    date: "28 Mai 2026",
    time: "10:30",
    type: "Examen de vue",
    status: "Confirmé"
  },
  {
    id: "RDV-6691",
    date: "12 Décembre 2025",
    time: "15:00",
    type: "Conseil personnalisé",
    status: "Passé"
  }
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("commandes")
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS)
  
  const [profile, setProfile] = useState({
    name: "Hamza",
    phone: "+212 661 234567",
    address: "55 Rue Moulay Rachid",
    city: "Essaouira"
  })

  const [isVisible, setIsVisible] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleLogout = () => {
    if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
      window.location.href = "/login"
    }
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  const clearOrders = () => {
    setOrders([])
  }

  const clearAppointments = () => {
    setAppointments([])
  }

  const resetData = () => {
    setOrders(INITIAL_ORDERS)
    setAppointments(INITIAL_APPOINTMENTS)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="flex-grow max-w-4xl mx-auto px-6 py-16 w-full text-left">
        <div
          className={`space-y-12 transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-8">
            <div>
              {/* Title: "Mon compte" font-serif text-3xl */}
              <h1 className="font-serif text-3xl text-foreground font-normal">
                Mon compte
              </h1>
              {/* Subtitle: "Bienvenue, Hamza" text-muted-foreground */}
              <p className="text-muted-foreground mt-1 text-sm font-light">
                Bienvenue, {profile.name}
              </p>
            </div>

            {/* Button: "Se déconnecter" text-sm text-muted-foreground hover:text-primary */}
            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-primary transition-colors bg-transparent border-none p-0 cursor-pointer text-left self-start sm:self-auto uppercase tracking-wider font-semibold"
            >
              Se déconnecter
            </button>
          </div>

          {/* Tabs Bar */}
          {/* 3 tabs: Commandes | Rendez-vous | Profil */}
          {/* Tab bar: flex gap-8 border-b border-border */}
          <div className="flex gap-8 border-b border-border text-sm overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveTab("commandes")}
              className={`pb-2 transition-colors cursor-pointer border-none bg-transparent uppercase tracking-wider font-semibold text-xs ${
                activeTab === "commandes"
                  ? "text-primary border-b-2 border-primary pb-[6px]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Commandes
            </button>
            <button
              onClick={() => setActiveTab("rendez-vous")}
              className={`pb-2 transition-colors cursor-pointer border-none bg-transparent uppercase tracking-wider font-semibold text-xs ${
                activeTab === "rendez-vous"
                  ? "text-primary border-b-2 border-primary pb-[6px]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Rendez-vous
            </button>
            <button
              onClick={() => setActiveTab("profil")}
              className={`pb-2 transition-colors cursor-pointer border-none bg-transparent uppercase tracking-wider font-semibold text-xs ${
                activeTab === "profil"
                  ? "text-primary border-b-2 border-primary pb-[6px]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Profil
            </button>
          </div>

          {/* Tabs Content */}
          <div className="min-h-[300px]">
            {/* Tab 1 — Commandes */}
            {activeTab === "commandes" && (
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-12 h-12 bg-muted border border-border flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-5 h-5 text-muted-foreground/60" />
                    </div>
                    {/* Empty: "Aucune commande" text-muted-foreground */}
                    <p className="text-muted-foreground text-sm font-light">Aucune commande</p>
                    <button
                      onClick={resetData}
                      className="text-xs uppercase tracking-widest text-primary hover:underline font-semibold bg-transparent border-none cursor-pointer"
                    >
                      Réinitialiser les données de démonstration
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="font-serif text-xl text-foreground font-normal">
                        Historique des commandes
                      </h2>
                      <button
                        onClick={clearOrders}
                        className="text-xs text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Simuler panier vide
                      </button>
                    </div>

                    {/* Table: Date | Total | Statut | Action */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                          <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                            <th className="py-4 font-semibold">Date</th>
                            <th className="py-4 font-semibold">Total</th>
                            <th className="py-4 font-semibold">Statut</th>
                            <th className="py-4 font-semibold text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60 text-sm">
                          {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                              <td className="py-4 text-muted-foreground">{order.date}</td>
                              <td className="py-4 text-foreground font-serif">{order.total}</td>
                              <td className="py-4">
                                <span className="inline-block text-[11px] uppercase tracking-wider font-semibold text-secondary">
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <button
                                  onClick={() => alert(`Détails de la commande ${order.id} (simulation)`)}
                                  className="text-primary hover:underline font-semibold text-xs uppercase tracking-wider bg-transparent border-none p-0 cursor-pointer"
                                >
                                  Détails
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2 — Rendez-vous */}
            {activeTab === "rendez-vous" && (
              <div className="space-y-6">
                {appointments.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-12 h-12 bg-muted border border-border flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-5 h-5 text-muted-foreground/60" />
                    </div>
                    {/* Empty: "Aucun rendez-vous" */}
                    <p className="text-muted-foreground text-sm font-light">Aucun rendez-vous</p>
                    <button
                      onClick={resetData}
                      className="text-xs uppercase tracking-widest text-primary hover:underline font-semibold bg-transparent border-none cursor-pointer"
                    >
                      Réinitialiser les données de démonstration
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="font-serif text-xl text-foreground font-normal">
                        Vos rendez-vous
                      </h2>
                      <button
                        onClick={clearAppointments}
                        className="text-xs text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Simuler aucun rendez-vous
                      </button>
                    </div>

                    {/* Table: Date | Heure | Type | Statut */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                          <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                            <th className="py-4 font-semibold">Date</th>
                            <th className="py-4 font-semibold">Heure</th>
                            <th className="py-4 font-semibold">Type</th>
                            <th className="py-4 font-semibold text-right">Statut</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60 text-sm">
                          {appointments.map((rdv) => (
                            <tr key={rdv.id} className="hover:bg-muted/20 transition-colors">
                              <td className="py-4 text-muted-foreground">{rdv.date}</td>
                              <td className="py-4 text-foreground font-medium">{rdv.time}</td>
                              <td className="py-4 text-foreground">{rdv.type}</td>
                              <td className="py-4 text-right">
                                <span className={`inline-block text-[11px] uppercase tracking-wider font-semibold ${
                                  rdv.status === "Confirmé" ? "text-secondary" : "text-muted-foreground"
                                }`}>
                                  {rdv.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3 — Profil */}
            {activeTab === "profil" && (
              <div className="space-y-6 max-w-xl">
                <h2 className="font-serif text-xl text-foreground font-normal">
                  Informations personnelles
                </h2>

                {saveSuccess && (
                  <div className="bg-secondary/10 border border-secondary text-secondary p-4 text-sm font-light">
                    Votre profil a été sauvegardé avec succès.
                  </div>
                )}

                {/* Form: Nom, Téléphone, Adresse, Ville */}
                {/* Underline inputs */}
                {/* Button: "Sauvegarder" bg-primary text-white */}
                <form onSubmit={handleProfileSave} className="space-y-6">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">
                      Nom complet
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="border-b border-border bg-transparent py-3 focus:border-primary border-t-0 border-x-0 focus:ring-0 rounded-none w-full outline-none text-foreground font-light"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xs uppercase tracking-widest text-muted-foreground">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="border-b border-border bg-transparent py-3 focus:border-primary border-t-0 border-x-0 focus:ring-0 rounded-none w-full outline-none text-foreground font-light"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="address" className="text-xs uppercase tracking-widest text-muted-foreground">
                      Adresse
                    </label>
                    <input
                      id="address"
                      type="text"
                      required
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="border-b border-border bg-transparent py-3 focus:border-primary border-t-0 border-x-0 focus:ring-0 rounded-none w-full outline-none text-foreground font-light"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="city" className="text-xs uppercase tracking-widest text-muted-foreground">
                      Ville
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      className="border-b border-border bg-transparent py-3 focus:border-primary border-t-0 border-x-0 focus:ring-0 rounded-none w-full outline-none text-foreground font-light"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-primary text-white py-4 px-12 font-semibold uppercase tracking-widest text-xs hover:bg-[#965628] transition-colors rounded-none border-none cursor-pointer"
                  >
                    Sauvegarder
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

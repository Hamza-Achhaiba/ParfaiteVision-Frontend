"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/useCart"

// Recommended accessories for the "VOUS AIMEREZ AUSSI" section in checkout
const CHECKOUT_RECOMMENDATIONS = [
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
    id: "kit-nettoyage",
    brand: "PARFAITE VISION",
    name: "KIT NETTOYAGE",
    price: 60,
    image: "/images/products/solaires/ray-ban-round-gold.jpg", // placeholder
    variant: "Accessoire / Unique"
  },
  {
    id: "etui-rigide",
    brand: "PARFAITE VISION",
    name: "ÉTUI RIGIDE",
    price: 150,
    image: "/images/products/vue/moscot-billik-brown.jpg", // placeholder
    variant: "Accessoire / Unique"
  }
]

export default function CheckoutPage() {
  const { items, addItem, clearCart } = useCart()
  const router = useRouter()

  // Form states
  const [email, setEmail] = useState("")
  const [subscribe, setSubscribe] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<"shipping" | "pickup">("shipping")
  const [smsOptIn, setSmsOptIn] = useState(false)
  
  // Shipping form fields
  const [addressForm, setAddressForm] = useState({
    country: "Maroc",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    suite: "",
    city: "",
    region: "",
    postalCode: "",
    phone: ""
  })

  // Payment method options: "card" | "gpay" | "cod"
  const [paymentMethod, setPaymentMethod] = useState<"card" | "gpay" | "cod">("card")
  
  // Card details
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  })
  
  const [billingSame, setBillingSame] = useState(true)

  // Form errors & submission states
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const total = subtotal

  // Price formatter
  const formatPrice = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " MAD"
  }

  // Validation
  const validateForm = () => {
    const tempErrors: Record<string, string> = {}
    
    if (!email) {
      tempErrors.email = "L'e-mail est requis."
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "L'e-mail est invalide."
    }

    if (deliveryMethod === "shipping") {
      if (!addressForm.firstName) tempErrors.firstName = "Requis."
      if (!addressForm.lastName) tempErrors.lastName = "Requis."
      if (!addressForm.address) tempErrors.address = "L'adresse est requise."
      if (!addressForm.city) tempErrors.city = "La ville est requise."
      if (!addressForm.region) tempErrors.region = "La région est requise."
      if (!addressForm.postalCode) tempErrors.postalCode = "Le code postal est requis."
      if (!addressForm.phone) tempErrors.phone = "Le téléphone est requis."
    }

    if (paymentMethod === "card") {
      if (!cardDetails.number) tempErrors.cardNumber = "Requis."
      if (!cardDetails.expiry) tempErrors.cardExpiry = "Requis."
      if (!cardDetails.cvc) tempErrors.cardCvc = "Requis."
      if (!cardDetails.name) tempErrors.cardName = "Requis."
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate payment submission and page redirect
    setTimeout(() => {
      setIsSubmitting(false)
      clearCart()
      router.push("/checkout/success")
    }, 1500)
  }

  // Submit button text based on payment method
  const getSubmitButtonText = () => {
    if (isSubmitting) return "Traitement en cours..."
    switch (paymentMethod) {
      case "gpay":
        return "Payer avec Google Pay"
      case "cod":
        return "Confirmer la commande"
      case "card":
      default:
        return "Payer maintenant"
    }
  }

  return (
    <div className="animate-slide-in-right overflow-x-hidden min-h-screen bg-[#FAFAF7] font-sans">
      {/* Slide-in Page Animation styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pvPageSlideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: pvPageSlideIn 400ms ease-out forwards;
        }
      ` }} />

      <div className="grid md:grid-cols-12 min-h-screen">
        {/* LEFT COLUMN — Checkout Form */}
        <section className="col-span-12 md:col-span-7 p-8 md:p-12 space-y-8 border-r border-[#1A1A1A]/10 text-left">
          
          {/* A) Header */}
          <div>
            <Link href="/" className="font-serif text-3xl text-[#1A1A1A] hover:text-[#B56E3A] transition-colors tracking-wide font-bold">
              Parfaite Vision
            </Link>
          </div>

          {/* B) Express Checkout */}
          <div className="space-y-4">
            {/* Google Pay Button Only */}
            <button
              type="button"
              className="w-full bg-[#1A1A1A] text-white py-3.5 font-bold text-center text-sm rounded-none hover:opacity-90 transition-opacity cursor-pointer border-none font-sans flex items-center justify-center gap-2"
            >
              <span className="tracking-wide">Payer avec</span>
              <span className="font-extrabold bg-white text-black px-1.5 py-0.5 text-xs rounded-none">G Pay</span>
            </button>
            
            {/* Separator */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#1A1A1A]/10"></div>
              <span className="flex-shrink mx-4 text-[#1A1A1A]/40 text-xs font-bold uppercase tracking-widest font-sans">—— OU ——</span>
              <div className="flex-grow border-t border-[#1A1A1A]/10"></div>
            </div>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* C) Contact Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h2 className="font-serif text-2xl text-[#1A1A1A] font-normal">Contact</h2>
                <Link href="/login" className="text-xs text-[#B56E3A] underline hover:text-[#9A5A2E] font-sans font-semibold">
                  Se connecter
                </Link>
              </div>
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full py-3 px-4 border ${
                    errors.email ? "border-red-600" : "border-[#1A1A1A]/20"
                  } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                />
                {errors.email && <p className="text-red-600 text-xs font-sans font-medium">{errors.email}</p>}
              </div>
              <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-[#1A1A1A]/80 font-sans">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                  className="rounded-none border-[#1A1A1A]/20 text-[#B56E3A] focus:ring-[#B56E3A] w-4 h-4 cursor-pointer"
                />
                Recevoir nos offres et actualités
              </label>
            </div>

            {/* D) Livraison Section */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#1A1A1A] font-normal">Livraison</h2>

              {/* Toggle buttons (NO emojis) */}
              <div className="grid grid-cols-2 gap-0 border border-[#1A1A1A]/10">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("shipping")}
                  className={`py-3.5 text-center text-sm font-bold uppercase tracking-widest transition-colors cursor-pointer rounded-none font-sans ${
                    deliveryMethod === "shipping"
                      ? "bg-[#1A1A1A] text-white border-none"
                      : "bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A]/5 border-none"
                  }`}
                >
                  Expédition
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`py-3.5 text-center text-sm font-bold uppercase tracking-widest transition-colors cursor-pointer rounded-none font-sans ${
                    deliveryMethod === "pickup"
                      ? "bg-[#1A1A1A] text-white border-none"
                      : "bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A]/5 border-none"
                  }`}
                >
                  Retrait en boutique
                </button>
              </div>

              <p className="text-xs text-[#1A1A1A]/40 font-sans">
                Tous les champs sont obligatoires sauf mention contraire
              </p>

              {/* Shipping form inputs */}
              {deliveryMethod === "shipping" ? (
                <div className="space-y-4">
                  {/* Pays */}
                  <div className="space-y-1">
                    <select
                      value={addressForm.country}
                      onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                      className="w-full py-3 px-4 border border-[#1A1A1A]/20 focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] font-sans appearance-none"
                      style={{
                        backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%231A1A1A\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")',
                        backgroundPosition: "right 16px center",
                        backgroundSize: "16px",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <option value="Maroc">Maroc</option>
                      <option value="France">France</option>
                      <option value="Espagne">Espagne</option>
                    </select>
                  </div>

                  {/* Prénom + Nom */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="Prénom"
                        value={addressForm.firstName}
                        onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                        className={`w-full py-3 px-4 border ${
                          errors.firstName ? "border-red-600" : "border-[#1A1A1A]/20"
                        } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                      />
                      {errors.firstName && <p className="text-red-600 text-[10px] font-sans font-semibold">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="Nom"
                        value={addressForm.lastName}
                        onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                        className={`w-full py-3 px-4 border ${
                          errors.lastName ? "border-red-600" : "border-[#1A1A1A]/20"
                        } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                      />
                      {errors.lastName && <p className="text-red-600 text-[10px] font-sans font-semibold">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Entreprise */}
                  <div>
                    <input
                      type="text"
                      placeholder="Entreprise (optionnel)"
                      value={addressForm.company}
                      onChange={(e) => setAddressForm({ ...addressForm, company: e.target.value })}
                      className="w-full py-3 px-4 border border-[#1A1A1A]/20 focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] font-sans"
                    />
                  </div>

                  {/* Adresse */}
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Adresse"
                      value={addressForm.address}
                      onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                      className={`w-full py-3 px-4 border ${
                        errors.address ? "border-red-600" : "border-[#1A1A1A]/20"
                      } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                    />
                    {errors.address && <p className="text-red-600 text-xs font-sans font-medium">{errors.address}</p>}
                  </div>

                  {/* Suite */}
                  <div>
                    <input
                      type="text"
                      placeholder="Appartement, suite, etc. (optionnel)"
                      value={addressForm.suite}
                      onChange={(e) => setAddressForm({ ...addressForm, suite: e.target.value })}
                      className="w-full py-3 px-4 border border-[#1A1A1A]/20 focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] font-sans"
                    />
                  </div>

                  {/* Ville + Région + Code postal (3 columns) */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="Ville"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className={`w-full py-3 px-4 border ${
                          errors.city ? "border-red-600" : "border-[#1A1A1A]/20"
                        } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                      />
                      {errors.city && <p className="text-red-600 text-[10px] font-sans font-semibold">{errors.city}</p>}
                    </div>
                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="Région"
                        value={addressForm.region}
                        onChange={(e) => setAddressForm({ ...addressForm, region: e.target.value })}
                        className={`w-full py-3 px-4 border ${
                          errors.region ? "border-red-600" : "border-[#1A1A1A]/20"
                        } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                      />
                      {errors.region && <p className="text-red-600 text-[10px] font-sans font-semibold">{errors.region}</p>}
                    </div>
                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="Code postal"
                        value={addressForm.postalCode}
                        onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                        className={`w-full py-3 px-4 border ${
                          errors.postalCode ? "border-red-600" : "border-[#1A1A1A]/20"
                        } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                      />
                      {errors.postalCode && <p className="text-red-600 text-[10px] font-sans font-semibold">{errors.postalCode}</p>}
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="space-y-1">
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className={`w-full py-3 px-4 border ${
                        errors.phone ? "border-red-600" : "border-[#1A1A1A]/20"
                      } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                    />
                    {errors.phone && <p className="text-red-600 text-xs font-sans font-medium">{errors.phone}</p>}
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-[#1A1A1A]/80 font-sans pt-2">
                    <input
                      type="checkbox"
                      checked={smsOptIn}
                      onChange={(e) => setSmsOptIn(e.target.checked)}
                      className="rounded-none border-[#1A1A1A]/20 text-[#B56E3A] focus:ring-[#B56E3A] w-4 h-4 cursor-pointer"
                    />
                    M&apos;envoyer les offres par SMS
                  </label>
                </div>
              ) : (
                /* Retrait en boutique details */
                <div className="border border-[#1A1A1A]/10 bg-[#F0EDE8]/50 p-6 space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 font-bold mb-1 font-sans">Adresse Boutique</p>
                    <p className="font-serif text-lg text-[#1A1A1A] font-semibold">55 Rue Moulay Rachid, Essaouira</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm font-sans">
                    <div>
                      <p className="text-[#1A1A1A]/50 text-[10px] uppercase tracking-wider font-bold">Horaires</p>
                      <p className="text-[#1A1A1A] font-medium mt-0.5">Lun-Sam: 9h-19h</p>
                    </div>
                    <div>
                      <p className="text-[#1A1A1A]/50 text-[10px] uppercase tracking-wider font-bold">Téléphone</p>
                      <p className="text-[#1A1A1A] font-medium mt-0.5">+212 5 24 47 55 55</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* E) Paiement Section */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#1A1A1A] font-normal">Paiement</h2>
                <p className="text-sm text-[#1A1A1A]/60 font-sans mt-1">
                  Toutes les transactions sont sécurisées et cryptées.
                </p>
              </div>

              <div className="border border-[#1A1A1A]/15 bg-white">
                {/* 1. Carte bancaire */}
                <div className={`p-4 border-b border-[#1A1A1A]/15 ${paymentMethod === "card" ? "bg-[#F0EDE8]/10" : ""}`}>
                  <label className="flex items-center justify-between font-semibold text-sm font-sans text-[#1A1A1A] cursor-pointer w-full">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="text-[#B56E3A] focus:ring-[#B56E3A] w-4 h-4 cursor-pointer"
                      />
                      Carte bancaire
                    </div>
                    <div className="flex gap-1 opacity-60">
                      <span className="border border-[#1A1A1A]/20 px-1 py-0.5 text-[9px] font-bold rounded-none uppercase select-none font-sans text-[#1A1A1A]">Visa</span>
                      <span className="border border-[#1A1A1A]/20 px-1 py-0.5 text-[9px] font-bold rounded-none uppercase select-none font-sans text-[#1A1A1A]">MC</span>
                      <span className="border border-[#1A1A1A]/20 px-1 py-0.5 text-[9px] font-bold rounded-none uppercase select-none font-sans text-[#1A1A1A]">Amex</span>
                    </div>
                  </label>
                  
                  {paymentMethod === "card" && (
                    <div className="pt-4 pb-2 space-y-4">
                      {/* Card Number */}
                      <div className="space-y-1">
                        <input
                          type="text"
                          placeholder="Numéro de carte"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className={`w-full py-3 px-4 border ${
                            errors.cardNumber ? "border-red-600" : "border-[#1A1A1A]/20"
                          } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                        />
                        {errors.cardNumber && <p className="text-red-600 text-[10px] font-sans font-semibold">{errors.cardNumber}</p>}
                      </div>

                      {/* Expiration + Security code */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <input
                            type="text"
                            placeholder="Date d'expiration (MM/AA)"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className={`w-full py-3 px-4 border ${
                              errors.cardExpiry ? "border-red-600" : "border-[#1A1A1A]/20"
                            } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                          />
                          {errors.cardExpiry && <p className="text-red-600 text-[10px] font-sans font-semibold">{errors.cardExpiry}</p>}
                        </div>
                        <div className="space-y-1">
                          <input
                            type="text"
                            placeholder="Code de sécurité (CVV)"
                            value={cardDetails.cvc}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                            className={`w-full py-3 px-4 border ${
                              errors.cardCvc ? "border-red-600" : "border-[#1A1A1A]/20"
                            } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                          />
                          {errors.cardCvc && <p className="text-red-600 text-[10px] font-sans font-semibold">{errors.cardCvc}</p>}
                        </div>
                      </div>

                      {/* Name on Card */}
                      <div className="space-y-1">
                        <input
                          type="text"
                          placeholder="Nom du titulaire de la carte"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                          className={`w-full py-3 px-4 border ${
                            errors.cardName ? "border-red-600" : "border-[#1A1A1A]/20"
                          } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors font-sans`}
                        />
                        {errors.cardName && <p className="text-red-600 text-[10px] font-sans font-semibold">{errors.cardName}</p>}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Google Pay */}
                <div className={`p-4 border-b border-[#1A1A1A]/15 ${paymentMethod === "gpay" ? "bg-[#F0EDE8]/10" : ""}`}>
                  <label className="flex items-center justify-between font-semibold text-sm font-sans text-[#1A1A1A] cursor-pointer w-full">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "gpay"}
                        onChange={() => setPaymentMethod("gpay")}
                        className="text-[#B56E3A] focus:ring-[#B56E3A] w-4 h-4 cursor-pointer"
                      />
                      Google Pay
                    </div>
                    <span className="border border-[#1A1A1A]/20 px-1.5 py-0.5 text-[9px] font-bold rounded-none uppercase select-none font-sans bg-[#1A1A1A] text-white">G Pay</span>
                  </label>
                  
                  {paymentMethod === "gpay" && (
                    <div className="pt-4 pb-2 text-xs font-sans text-[#1A1A1A]/60">
                      Vous serez redirigé vers Google Pay pour finaliser votre paiement.
                    </div>
                  )}
                </div>

                {/* 3. Paiement à la livraison */}
                <div className={`p-4 ${paymentMethod === "cod" ? "bg-[#F0EDE8]/10" : ""}`}>
                  <label className="flex items-center justify-between font-semibold text-sm font-sans text-[#1A1A1A] cursor-pointer w-full">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="text-[#B56E3A] focus:ring-[#B56E3A] w-4 h-4 cursor-pointer"
                      />
                      Paiement à la livraison
                    </div>
                    {/* SVG cash icon */}
                    <svg className="w-5 h-5 text-[#1A1A1A] opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </label>
                  
                  {paymentMethod === "cod" && (
                    <div className="pt-4 pb-2 text-xs font-sans text-[#1A1A1A]/60">
                      Le paiement sera effectué en espèces lors de la livraison.
                    </div>
                  )}
                </div>
              </div>

              {/* Billing address checkbox */}
              <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-[#1A1A1A]/80 font-sans pt-2">
                <input
                  type="checkbox"
                  checked={billingSame}
                  onChange={(e) => setBillingSame(e.target.checked)}
                  className="rounded-none border-[#1A1A1A]/20 text-[#B56E3A] focus:ring-[#B56E3A] w-4 h-4 cursor-pointer"
                />
                Utiliser l&apos;adresse de livraison comme adresse de facturation
              </label>
            </div>

            {/* F) Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#B56E3A] text-white py-4.5 text-lg font-bold uppercase tracking-widest rounded-none border-none hover:bg-[#9A5A2E] transition-colors duration-200 cursor-pointer disabled:bg-[#B56E3A]/60 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans"
            >
              {getSubmitButtonText()}
            </button>

            {/* G) Footer links */}
            <div className="pt-8 border-t border-[#1A1A1A]/10 flex flex-wrap gap-4 text-xs font-semibold text-[#1A1A1A]/40 font-sans justify-start">
              <Link href="#" className="hover:text-[#1A1A1A] transition-colors underline">Politique de remboursement</Link>
              <span className="text-[#1A1A1A]/10 select-none">|</span>
              <Link href="#" className="hover:text-[#1A1A1A] transition-colors underline">Livraison</Link>
              <span className="text-[#1A1A1A]/10 select-none">|</span>
              <Link href="#" className="hover:text-[#1A1A1A] transition-colors underline">Conditions générales</Link>
            </div>

          </form>

        </section>

        {/* RIGHT COLUMN — Order Summary */}
        <section className="col-span-12 md:col-span-5 bg-[#F0EDE8] p-8 md:p-12 space-y-8 text-left md:sticky md:top-0 md:h-screen md:overflow-y-auto border-l border-[#1A1A1A]/10">
          
          {/* A) Free Shipping Banner */}
          <div className="border-b border-[#1A1A1A]/10 pb-4">
            <span className="text-[#6B8F71] font-medium text-sm tracking-wider font-sans">
              Livraison offerte !
            </span>
          </div>

          {/* B) Cart Items */}
          <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="flex gap-4 items-center justify-between text-left">
                {/* Image with quantity badge */}
                <div className="relative w-16 h-16 bg-white border border-[#1A1A1A]/10 rounded-none overflow-visible flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover w-full h-full"
                  />
                  <span className="absolute -top-2 -right-2 bg-[#1A1A1A] text-white text-[10px] w-5 h-5 flex items-center justify-center font-sans font-bold rounded-full">
                    {item.quantity}
                  </span>
                </div>

                {/* Title & info */}
                <div className="flex-grow min-w-0 px-2 space-y-0.5">
                  <h3 className="font-serif text-sm font-bold text-[#1A1A1A] truncate">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-[#1A1A1A]/60 font-sans">
                    {item.variant}
                  </p>
                </div>

                {/* Price */}
                <div className="font-sans text-sm font-bold text-[#1A1A1A] whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* C) "VOUS AIMEREZ AUSSI" */}
          <div className="space-y-4 pt-2">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#1A1A1A] uppercase border-b border-[#1A1A1A]/10 pb-1.5">
              Vous aimerez aussi
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {CHECKOUT_RECOMMENDATIONS.map((rec) => {
                const isAdded = items.some((item) => item.id === rec.id)
                return (
                  <div key={rec.id} className="flex gap-3 items-center bg-white/30 p-2 border border-[#1A1A1A]/5 rounded-none">
                    {/* Tiny thumbnail */}
                    <div className="relative w-10 h-10 bg-white border border-[#1A1A1A]/10 rounded-none overflow-hidden flex-shrink-0">
                      <Image
                        src={rec.image}
                        alt={rec.name}
                        fill
                        sizes="40px"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Text */}
                    <div className="flex-grow min-w-0 text-left">
                      <h5 className="font-bold text-[10px] uppercase tracking-wider text-[#1A1A1A] truncate font-sans">
                        {rec.name}
                      </h5>
                      <span className="text-[11px] text-[#1A1A1A]/70 font-semibold font-sans">
                        {formatPrice(rec.price)}
                      </span>
                    </div>
                    {/* Ajouter Button (no border-radius exception) */}
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
                      className={`text-[10px] font-bold px-3 py-1 uppercase tracking-wider transition-colors border cursor-pointer flex-shrink-0 rounded-none bg-transparent ${
                        isAdded
                          ? "border-[#1A1A1A]/10 text-[#1A1A1A]/30 cursor-not-allowed"
                          : "border-[#B56E3A] text-[#B56E3A] hover:bg-[#B56E3A] hover:text-white"
                      }`}
                    >
                      {isAdded ? "Ajouté" : "Ajouter"}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* D) Price Totals */}
          <div className="border-t border-[#1A1A1A]/10 pt-6 space-y-3 font-sans text-sm text-[#1A1A1A]">
            <div className="flex justify-between">
              <span className="text-[#1A1A1A]/60">Sous-total</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#1A1A1A]/60">Livraison</span>
              <span className="text-[#6B8F71] font-medium tracking-wider text-[11px] font-sans">
                Gratuit
              </span>
            </div>

            {/* Separator */}
            <div className="border-t border-[#1A1A1A]/10 my-4" />

            <div className="flex justify-between items-baseline">
              <span className="text-base font-serif font-bold text-[#1A1A1A]">Total</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  {subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </span>
                <span className="text-sm font-serif font-bold text-[#1A1A1A]">MAD</span>
              </div>
            </div>
          </div>

        </section>
      </div>
    </div>
  )
}

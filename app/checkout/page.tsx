"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/hooks/useCart"

// Recommended products for the "VOUS AIMEREZ AUSSI" section in checkout
const CHECKOUT_RECOMMENDATIONS = [
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
  }
]

export default function CheckoutPage() {
  const { items, addItem, updateQuantity, removeItem, clearCart } = useCart()

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

  // Payment mock states
  const [paymentMethod, setPaymentMethod] = useState<"card">("card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  })
  const [billingSame, setBillingSame] = useState(true)

  // Checkout special upsell check state
  const [clipOnAdded, setClipOnAdded] = useState(false)
  const [clipOnColor, setClipOnColor] = useState("Doré")
  const [clipOnSize, setClipOnSize] = useState("46")

  // Discount code states
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null)
  const [discountError, setDiscountError] = useState("")

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle addition of standard Clip On
  const handleClipOnCheckbox = (checked: boolean) => {
    setClipOnAdded(checked)
    if (checked) {
      addItem({
        id: "clip-on-instant-shade",
        brand: "PARFAITE VISION",
        name: "CLIP ON INSTANT SHADE",
        price: 1150,
        image: "/images/products/vue/moscot-zev-gold.jpg",
        variant: `Couleur: ${clipOnColor} / Taille: ${clipOnSize}`
      })
    } else {
      removeItem("clip-on-instant-shade")
    }
  }

  // Update clip-on variant on selection change
  const handleClipOnVariantChange = (color: string, size: string) => {
    setClipOnColor(color)
    setClipOnSize(size)
    if (clipOnAdded) {
      // Re-add with updated variant description
      removeItem("clip-on-instant-shade")
      addItem({
        id: "clip-on-instant-shade",
        brand: "PARFAITE VISION",
        name: "CLIP ON INSTANT SHADE",
        price: 1150,
        image: "/images/products/vue/moscot-zev-gold.jpg",
        variant: `Couleur: ${color} / Taille: ${size}`
      })
    }
  }

  // Apply discount logic
  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault()
    setDiscountError("")
    const code = discountCode.trim().toUpperCase()
    if (!code) return

    if (code === "PARFAITE10") {
      setAppliedDiscount({ code, percent: 10 })
    } else if (code === "MAROC20") {
      setAppliedDiscount({ code, percent: 20 })
    } else {
      setDiscountError("Code invalide.")
    }
  }

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const discountAmount = appliedDiscount ? Math.round((subtotal * appliedDiscount.percent) / 100) : 0
  const total = subtotal - discountAmount

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
    
    // Simulate server side payment intent and page redirect
    setTimeout(() => {
      setIsSubmitting(false)
      clearCart()
      window.location.href = "/checkout/success"
    }, 1500)
  }

  return (
    <div className="grid md:grid-cols-12 min-h-screen bg-[#FAFAF7]">
      
      {/* LEFT COLUMN — Checkout Form */}
      <section className="col-span-12 md:col-span-7 p-8 md:p-12 space-y-8 border-r border-[#1A1A1A]/10">
        
        {/* A) Header */}
        <div className="text-left">
          <Link href="/" className="font-serif text-3xl text-[#1A1A1A] hover:text-[#B56E3A] transition-colors tracking-wide font-bold">
            Parfaite Vision
          </Link>
        </div>

        {/* B) Express Checkout */}
        <div className="space-y-4 text-left">
          <div className="grid grid-cols-3 gap-3">
            {/* Shop Pay */}
            <button type="button" className="bg-[#5a31f4] text-white py-3 font-bold text-center text-sm rounded-none hover:opacity-90 transition-opacity cursor-pointer border-none font-sans">
              Shop Pay
            </button>
            {/* PayPal */}
            <button type="button" className="bg-[#ffc439] text-[#003087] py-3 font-bold text-center text-sm rounded-none hover:opacity-90 transition-opacity cursor-pointer border-none font-sans">
              PayPal
            </button>
            {/* Google Pay */}
            <button type="button" className="bg-black text-white py-3 font-bold text-center text-sm rounded-none hover:opacity-90 transition-opacity cursor-pointer border-none font-sans">
              G Pay
            </button>
          </div>
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#1A1A1A]/10"></div>
            <span className="flex-shrink mx-4 text-[#1A1A1A]/40 text-xs font-bold uppercase tracking-widest font-sans">── OU ──</span>
            <div className="flex-grow border-t border-[#1A1A1A]/10"></div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* C) Contact Section */}
          <div className="space-y-4 text-left">
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
          <div className="space-y-6 text-left">
            <h2 className="font-serif text-2xl text-[#1A1A1A] font-normal">Livraison</h2>

            {/* Toggle buttons */}
            <div className="grid grid-cols-2 gap-0 border border-[#1A1A1A]/10">
              <button
                type="button"
                onClick={() => setDeliveryMethod("shipping")}
                className={`py-3.5 text-center text-sm font-bold uppercase tracking-widest transition-colors cursor-pointer border-none rounded-none font-sans ${
                  deliveryMethod === "shipping"
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
                }`}
              >
                📦 Expédition
              </button>
              <button
                type="button"
                onClick={() => setDeliveryMethod("pickup")}
                className={`py-3.5 text-center text-sm font-bold uppercase tracking-widest transition-colors cursor-pointer border-none rounded-none font-sans ${
                  deliveryMethod === "pickup"
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
                }`}
              >
                🏪 Retrait en boutique
              </button>
            </div>

            <p className="text-[11px] text-[#1A1A1A]/50 italic font-sans">
              Tous les champs sont obligatoires sauf mention contraire.
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
              /* Retrait en boutique */
              <div className="border border-[#1A1A1A]/10 bg-[#F0EDE8]/50 p-6 space-y-4 text-left">
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

          {/* E) Méthode de livraison */}
          <div className="space-y-3 text-left">
            <h3 className="font-serif text-lg text-[#1A1A1A] font-normal">Méthode de livraison</h3>
            <div className="bg-[#F0EDE8]/30 border border-[#1A1A1A]/10 p-5">
              {deliveryMethod === "shipping" && !addressForm.address ? (
                <p className="text-sm text-[#1A1A1A]/50 font-sans">
                  Entrez votre adresse de livraison pour voir les méthodes disponibles.
                </p>
              ) : deliveryMethod === "pickup" ? (
                <div className="flex justify-between items-center text-sm font-sans text-[#1A1A1A]">
                  <span className="font-semibold">Retrait gratuit en boutique</span>
                  <span className="font-bold text-[#6B8F71]">Gratuit</span>
                </div>
              ) : (
                <div className="flex justify-between items-center text-sm font-sans text-[#1A1A1A]">
                  <div className="space-y-0.5">
                    <span className="font-semibold block">Livraison standard à domicile</span>
                    <span className="text-[11px] text-[#1A1A1A]/60">Délai estimé : 2 à 4 jours ouvrés</span>
                  </div>
                  <span className="font-bold text-[#6B8F71]">Offerte (Gratuit)</span>
                </div>
              )}
            </div>
          </div>

          {/* F) Paiement Section */}
          <div className="space-y-6 text-left">
            <div>
              <h2 className="font-serif text-2xl text-[#1A1A1A] font-normal">Paiement</h2>
              <p className="text-xs text-[#1A1A1A]/50 font-sans mt-1">
                Toutes les transactions sont sécurisées et cryptées.
              </p>
            </div>

            <div className="border border-[#1A1A1A]/15 bg-white">
              {/* Radio card options header */}
              <div className="p-4 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#F0EDE8]/10">
                <label className="flex items-center gap-3 font-semibold text-sm font-sans text-[#1A1A1A] cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="text-[#B56E3A] focus:ring-[#B56E3A] w-4 h-4 cursor-pointer"
                  />
                  Carte bancaire
                </label>
                {/* Brand Icons visual inline */}
                <div className="flex gap-1.5 opacity-60">
                  <span className="border border-[#1A1A1A]/20 px-1 py-0.5 text-[9px] font-bold rounded-none uppercase select-none font-sans text-[#1A1A1A]">Visa</span>
                  <span className="border border-[#1A1A1A]/20 px-1 py-0.5 text-[9px] font-bold rounded-none uppercase select-none font-sans text-[#1A1A1A]">MC</span>
                  <span className="border border-[#1A1A1A]/20 px-1 py-0.5 text-[9px] font-bold rounded-none uppercase select-none font-sans text-[#1A1A1A]">Amex</span>
                </div>
              </div>

              {/* Form elements for mock card input */}
              <div className="p-5 space-y-4">
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

          {/* G) Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#B56E3A] text-white py-4.5 text-lg font-bold uppercase tracking-widest rounded-none border-none hover:bg-[#9A5A2E] transition-colors duration-200 cursor-pointer disabled:bg-[#B56E3A]/60 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement en cours...
              </>
            ) : (
              `Payer maintenant · ${formatPrice(total)}`
            )}
          </button>

          {/* H) Footer links */}
          <div className="pt-8 border-t border-[#1A1A1A]/10 flex flex-wrap gap-4 text-[11px] font-semibold text-[#1A1A1A]/40 font-sans justify-start">
            <Link href="#" className="hover:text-[#1A1A1A] transition-colors underline">Politique de remboursement</Link>
            <span className="text-[#1A1A1A]/10">|</span>
            <Link href="#" className="hover:text-[#1A1A1A] transition-colors underline">Livraison</Link>
            <span className="text-[#1A1A1A]/10">|</span>
            <Link href="#" className="hover:text-[#1A1A1A] transition-colors underline">Conditions générales</Link>
          </div>

        </form>

      </section>

      {/* RIGHT COLUMN — Order Summary */}
      <section className="col-span-12 md:col-span-5 bg-[#F0EDE8] p-8 md:p-12 space-y-8 text-left md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        
        {/* A) Free Shipping Banner */}
        <div className="border-b border-[#1A1A1A]/10 pb-4">
          <span className="text-[#6B8F71] font-bold text-sm uppercase tracking-wider font-sans">
            ✓ Livraison offerte !
          </span>
        </div>

        {/* B) Cart Items */}
        <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-2">
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
                <span className="absolute -top-2 -right-2 bg-[#1A1A1A] text-white text-[10px] w-5 h-5 flex items-center justify-center font-sans font-bold rounded-none">
                  {item.quantity}
                </span>
              </div>

              {/* Title & info */}
              <div className="flex-grow min-w-0 px-2 space-y-0.5">
                <h3 className="font-serif text-sm font-bold text-[#1A1A1A] truncate">
                  {item.name}
                </h3>
                <p className="text-[9px] text-[#1A1A1A]/50 font-bold uppercase tracking-wider">
                  {item.brand}
                </p>
                <p className="text-[10px] text-[#1A1A1A]/60 font-sans">
                  {item.variant}
                </p>
              </div>

              {/* Price */}
              <div className="font-serif text-sm font-semibold text-[#1A1A1A] whitespace-nowrap">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* C) Upsell Box (bordered) */}
        <div className="border border-[#1A1A1A]/15 bg-white/40 p-4 space-y-3">
          <div className="flex gap-4 items-start">
            {/* Image */}
            <div className="relative w-14 h-14 bg-white border border-[#1A1A1A]/10 rounded-none overflow-hidden flex-shrink-0">
              <Image
                src="/images/products/vue/moscot-zev-gold.jpg"
                alt="CLIP ON INSTANT SHADE"
                fill
                sizes="56px"
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Context details */}
            <div className="flex-grow min-w-0 space-y-1">
              <div className="flex justify-between items-start gap-1">
                <h4 className="font-serif text-xs font-bold text-[#1A1A1A]">
                  CLIP ON INSTANT SHADE!
                </h4>
                <span className="text-xs font-bold text-[#1A1A1A] whitespace-nowrap">
                  1 150 MAD
                </span>
              </div>
              
              {/* Dropdowns */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <select
                  value={clipOnColor}
                  onChange={(e) => handleClipOnVariantChange(e.target.value, clipOnSize)}
                  className="py-1 px-2 border border-[#1A1A1A]/15 focus:border-[#B56E3A] focus:outline-none rounded-none text-[10px] bg-white text-[#1A1A1A] font-sans"
                >
                  <option value="Doré">Doré</option>
                  <option value="Argenté">Argenté</option>
                  <option value="Noir">Noir</option>
                </select>
                <select
                  value={clipOnSize}
                  onChange={(e) => handleClipOnVariantChange(clipOnColor, e.target.value)}
                  className="py-1 px-2 border border-[#1A1A1A]/15 focus:border-[#B56E3A] focus:outline-none rounded-none text-[10px] bg-white text-[#1A1A1A] font-sans"
                >
                  <option value="46">Taille: 46</option>
                  <option value="47">Taille: 47</option>
                  <option value="48">Taille: 48</option>
                </select>
              </div>
            </div>

            {/* Checkbox to add */}
            <div className="flex items-center pt-1 flex-shrink-0">
              <input
                type="checkbox"
                checked={clipOnAdded}
                onChange={(e) => handleClipOnCheckbox(e.target.checked)}
                className="rounded-none border-[#1A1A1A]/20 text-[#B56E3A] focus:ring-[#B56E3A] w-5 h-5 cursor-pointer"
                aria-label="Ajouter le clip-on au panier"
              />
            </div>
          </div>
        </div>

        {/* D) "VOUS AIMEREZ AUSSI" */}
        <div className="space-y-3 pt-2">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-[#1A1A1A] uppercase border-b border-[#1A1A1A]/10 pb-1.5">
            Vous aimerez aussi
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHECKOUT_RECOMMENDATIONS.map((rec) => {
              const isAdded = items.some((item) => item.id === rec.id)
              return (
                <div key={rec.id} className="flex gap-2 items-center bg-white/30 p-2 border border-[#1A1A1A]/5 rounded-none">
                  <div className="relative w-10 h-10 bg-white border border-[#1A1A1A]/10 rounded-none overflow-hidden flex-shrink-0">
                    <Image
                      src={rec.image}
                      alt={rec.name}
                      fill
                      sizes="40px"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-grow min-w-0 text-left">
                    <h5 className="font-bold text-[9px] uppercase tracking-wider text-[#1A1A1A] truncate">
                      {rec.name}
                    </h5>
                    <span className="text-[10px] text-[#1A1A1A]/70 font-semibold font-sans">
                      {formatPrice(rec.price)}
                    </span>
                  </div>
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
                    className={`text-[9px] font-bold px-2 py-1 uppercase tracking-wider transition-colors border-none cursor-pointer flex-shrink-0 rounded-none ${
                      isAdded
                        ? "bg-[#1A1A1A]/5 text-[#1A1A1A]/30 cursor-not-allowed"
                        : "bg-[#B56E3A] text-white hover:bg-[#9A5A2E]"
                    }`}
                  >
                    {isAdded ? "Ajouté" : "Ajouter"}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* E) Discount Code */}
        <form onSubmit={handleApplyDiscount} className="flex gap-2 pt-2">
          <input
            type="text"
            placeholder="Code de réduction"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="flex-grow py-3 px-4 border border-[#1A1A1A]/20 focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] font-sans"
          />
          <button
            type="submit"
            className="bg-[#1A1A1A] hover:bg-[#333] text-white px-5 font-bold uppercase tracking-widest text-[11px] rounded-none border-none cursor-pointer transition-colors font-sans"
          >
            Appliquer
          </button>
        </form>
        {discountError && (
          <p className="text-red-600 text-xs font-sans font-medium">{discountError}</p>
        )}
        {appliedDiscount && (
          <p className="text-[#6B8F71] text-xs font-sans font-semibold">
            ✓ Code {appliedDiscount.code} appliqué (-{appliedDiscount.percent}%)
          </p>
        )}

        {/* F) Totals */}
        <div className="border-t border-[#1A1A1A]/10 pt-6 space-y-3 font-sans text-sm text-[#1A1A1A]">
          <div className="flex justify-between">
            <span className="text-[#1A1A1A]/60">Sous-total</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>

          {appliedDiscount && (
            <div className="flex justify-between text-[#6B8F71]">
              <span>Remise ({appliedDiscount.percent}%)</span>
              <span className="font-semibold">-{formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-[#1A1A1A]/60">Livraison</span>
            <span className="text-[#6B8F71] font-bold uppercase tracking-wider text-[11px] font-sans">
              Gratuit
            </span>
          </div>

          {/* Separator */}
          <div className="border-t border-[#1A1A1A]/10 my-4" />

          <div className="flex justify-between items-baseline">
            <span className="text-base font-serif font-bold text-[#1A1A1A]">Total</span>
            <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
              {formatPrice(total)}
            </span>
          </div>
        </div>

      </section>

    </div>
  )
}

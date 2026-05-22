"use client"

import { useState } from "react"
import Link from "next/link"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

// Import from Zustand cart store as if it exists (for the backend merge later)
// import { useCart } from "@/hooks/useCart"

// Load Stripe publishable key placeholder (no hardcoded keys)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

// Hardcoded placeholder cart items for complete frontend UI display
const PLACEHOLDER_ITEMS = [
  {
    id: "ray-ban-aviator-classic",
    brand: "RAY-BAN",
    name: "Ray-Ban Aviator Classic",
    price: 2390,
    quantity: 1,
    variant: "Doré / 58",
  },
  {
    id: "moscot-lemtosh",
    brand: "MOSCOT",
    name: "Moscot Lemtosh",
    price: 3190,
    quantity: 1,
    variant: "Écaille / 46",
  },
]

// Hardcoded upsell accessory items
const UPSELL_ACCESSORIES = [
  {
    id: "etui-de-voyage",
    name: "Étui de voyage",
    price: 190,
  },
  {
    id: "cordon-a-lunettes",
    name: "Cordon à lunettes",
    price: 90,
  },
]

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1A1A1A",
      fontFamily: "Inter, sans-serif",
      "::placeholder": {
        color: "rgba(26, 26, 26, 0.4)",
      },
    },
    invalid: {
      color: "#df1b41",
    },
  },
}

interface StripePaymentFormProps {
  email: string
  deliveryMethod: "shipping" | "pickup"
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    suite: string
    postalCode: string
    city: string
    country: string
    phone: string
  }
  totalPrice: number
  isFormValid: () => boolean
  onSuccess: () => void
}

// Inner Stripe Card Form
function CheckoutFormInner({
  email,
  deliveryMethod,
  shippingAddress,
  totalPrice,
  isFormValid,
  onSuccess,
}: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      return
    }

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    // Simulating frontend processing flow
    setTimeout(() => {
      setIsProcessing(false)
      onSuccess()
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#1A1A1A] font-sans">
          Informations de carte bancaire
        </label>
        <div className="border border-[#1A1A1A]/20 py-3.5 px-4 bg-white rounded-none focus-within:border-[#B56E3A] transition-colors">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {paymentError && (
        <p className="text-red-600 text-sm font-medium font-sans">{paymentError}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-[#B56E3A] hover:bg-[#9A5A2E] text-white py-4 text-lg font-medium rounded-none transition-all duration-200 cursor-pointer border-none flex items-center justify-center gap-3 disabled:bg-[#B56E3A]/60 disabled:cursor-not-allowed uppercase tracking-wider"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Traitement en cours...
          </>
        ) : (
          `Payer maintenant · ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} MAD`
        )}
      </button>
    </form>
  )
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState(PLACEHOLDER_ITEMS)

  // Form Field States
  const [email, setEmail] = useState("")
  const [subscribe, setSubscribe] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<"shipping" | "pickup">("shipping")
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    suite: "",
    postalCode: "",
    city: "",
    country: "Maroc",
    phone: "",
  })
  const [billingSame, setBillingSame] = useState(true)

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Discount Codes
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null)
  const [discountError, setDiscountError] = useState("")

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const discountAmount = appliedDiscount ? Math.round((subtotal * appliedDiscount.percent) / 100) : 0
  const totalPrice = subtotal - discountAmount

  const formatPrice = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " MAD"
  }

  // Local validation checks
  const isFormValid = () => {
    const newErrors: Record<string, string> = {}

    if (!email) {
      newErrors.email = "L'adresse e-mail est obligatoire."
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format d'adresse e-mail incorrect."
    }

    if (deliveryMethod === "shipping") {
      if (!shippingAddress.firstName) newErrors.firstName = "Le prénom est obligatoire."
      if (!shippingAddress.lastName) newErrors.lastName = "Le nom est obligatoire."
      if (!shippingAddress.address) newErrors.address = "L'adresse est obligatoire."
      if (!shippingAddress.postalCode) newErrors.postalCode = "Le code postal est obligatoire."
      if (!shippingAddress.city) newErrors.city = "La ville est obligatoire."
      if (!shippingAddress.phone) newErrors.phone = "Le numéro de téléphone est obligatoire."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleApplyDiscount = () => {
    setDiscountError("")
    const code = discountCode.trim().toUpperCase()
    if (code === "PARFAITE10") {
      setAppliedDiscount({ code, percent: 10 })
    } else if (code === "MAROC20") {
      setAppliedDiscount({ code, percent: 20 })
    } else {
      setDiscountError("Code de réduction invalide.")
    }
  }

  const handleAddUpsell = (id: string, name: string, price: number) => {
    // Prevent duplicate adds for simple placeholder logic
    if (cartItems.some((item) => item.id === id)) return

    setCartItems([
      ...cartItems,
      {
        id,
        brand: "PARFAITE VISION",
        name,
        price,
        quantity: 1,
        variant: "Accessoire / Unique",
      },
    ])
  }

  const handleSuccessRedirect = () => {
    window.location.href = "/checkout/success?payment_intent=pi_placeholder_checkout_success"
  }

  return (
    <div className="grid md:grid-cols-12 min-h-screen">
      {/* LEFT COLUMN — Checkout Form */}
      <section className="col-span-12 md:col-span-7 lg:col-span-7 bg-[#FAFAF7] p-8 md:p-12 space-y-10">
        {/* A) Header */}
        <div>
          <Link
            href="/"
            className="font-serif text-3xl text-[#1A1A1A] hover:text-[#B56E3A] transition-colors tracking-wide block text-left"
          >
            Parfaite Vision
          </Link>
        </div>

        {/* B) Contact Section */}
        <div className="space-y-4 text-left font-sans">
          <h2 className="font-serif text-2xl text-[#1A1A1A]">Contact</h2>
          <div className="space-y-1">
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full py-3 px-4 border ${
                errors.email ? "border-red-600" : "border-[#1A1A1A]/20"
              } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors`}
            />
            {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
          </div>
          <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-[#1A1A1A]/80">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
              className="rounded-none border-[#1A1A1A]/20 text-[#B56E3A] focus:ring-[#B56E3A] w-4 h-4"
            />
            Recevoir nos offres et actualités
          </label>
        </div>

        {/* C) Livraison Section */}
        <div className="space-y-6 text-left font-sans">
          <h2 className="font-serif text-2xl text-[#1A1A1A]">Livraison</h2>

          {/* Toggle buttons */}
          <div className="grid grid-cols-2 gap-0 border border-[#1A1A1A]/10">
            <button
              type="button"
              onClick={() => setDeliveryMethod("shipping")}
              className={`py-3.5 text-center text-sm font-medium transition-colors cursor-pointer border-none rounded-none ${
                deliveryMethod === "shipping"
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
              }`}
            >
              Expédition
            </button>
            <button
              type="button"
              onClick={() => setDeliveryMethod("pickup")}
              className={`py-3.5 text-center text-sm font-medium transition-colors cursor-pointer border-none rounded-none ${
                deliveryMethod === "pickup"
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
              }`}
            >
              Retrait en boutique
            </button>
          </div>

          {/* Shipping vs Pickup inputs */}
          {deliveryMethod === "shipping" ? (
            <div className="grid grid-cols-2 gap-4">
              {/* Row 1: Prénom + Nom */}
              <div className="col-span-1 space-y-1">
                <input
                  type="text"
                  placeholder="Prénom"
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                  }
                  className={`w-full py-3 px-4 border ${
                    errors.firstName ? "border-red-600" : "border-[#1A1A1A]/20"
                  } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors`}
                />
                {errors.firstName && <p className="text-red-600 text-xs">{errors.firstName}</p>}
              </div>
              <div className="col-span-1 space-y-1">
                <input
                  type="text"
                  placeholder="Nom"
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                  }
                  className={`w-full py-3 px-4 border ${
                    errors.lastName ? "border-red-600" : "border-[#1A1A1A]/20"
                  } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors`}
                />
                {errors.lastName && <p className="text-red-600 text-xs">{errors.lastName}</p>}
              </div>

              {/* Row 2: Adresse */}
              <div className="col-span-2 space-y-1">
                <input
                  type="text"
                  placeholder="Adresse"
                  value={shippingAddress.address}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, address: e.target.value })
                  }
                  className={`w-full py-3 px-4 border ${
                    errors.address ? "border-red-600" : "border-[#1A1A1A]/20"
                  } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors`}
                />
                {errors.address && <p className="text-red-600 text-xs">{errors.address}</p>}
              </div>

              {/* Row 3: Appartement, suite (optional) */}
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Appartement, suite, etc. (facultatif)"
                  value={shippingAddress.suite}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, suite: e.target.value })
                  }
                  className="w-full py-3 px-4 border border-[#1A1A1A]/20 focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors"
                />
              </div>

              {/* Row 4: CP + Ville */}
              <div className="col-span-1 space-y-1">
                <input
                  type="text"
                  placeholder="Code postal"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                  }
                  className={`w-full py-3 px-4 border ${
                    errors.postalCode ? "border-red-600" : "border-[#1A1A1A]/20"
                  } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors`}
                />
                {errors.postalCode && <p className="text-red-600 text-xs">{errors.postalCode}</p>}
              </div>
              <div className="col-span-1 space-y-1">
                <input
                  type="text"
                  placeholder="Ville"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, city: e.target.value })
                  }
                  className={`w-full py-3 px-4 border ${
                    errors.city ? "border-red-600" : "border-[#1A1A1A]/20"
                  } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors`}
                />
                {errors.city && <p className="text-red-600 text-xs">{errors.city}</p>}
              </div>

              {/* Row 5: Pays Dropdown (defaulted to Maroc) */}
              <div className="col-span-2">
                <select
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, country: e.target.value })
                  }
                  className="w-full py-3 px-4 border border-[#1A1A1A]/20 focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] appearance-none"
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

              {/* Row 6: Téléphone */}
              <div className="col-span-2 space-y-1">
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={shippingAddress.phone}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, phone: e.target.value })
                  }
                  className={`w-full py-3 px-4 border ${
                    errors.phone ? "border-red-600" : "border-[#1A1A1A]/20"
                  } focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] transition-colors`}
                />
                {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
              </div>
            </div>
          ) : (
            <div className="border border-[#1A1A1A]/10 bg-[#F0EDE8]/50 p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#1A1A1A]/60 font-semibold mb-1">Adresse Boutique</p>
                <p className="font-serif text-lg text-[#1A1A1A] font-medium">55 Rue Moulay Rachid, Essaouira</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm font-sans">
                <div>
                  <p className="text-[#1A1A1A]/60 text-xs uppercase tracking-wide">Horaires</p>
                  <p className="text-[#1A1A1A] font-medium mt-0.5">Lun-Sam: 9h-19h</p>
                </div>
                <div>
                  <p className="text-[#1A1A1A]/60 text-xs uppercase tracking-wide">Téléphone</p>
                  <p className="text-[#1A1A1A] font-medium mt-0.5">+212 5 24 47 55 55</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* D) Paiement Section */}
        <div className="space-y-6 text-left font-sans">
          <div>
            <h2 className="font-serif text-2xl text-[#1A1A1A]">Paiement</h2>
            <p className="text-sm text-[#1A1A1A]/60 font-sans mt-1">
              Toutes les transactions sont sécurisées et cryptées.
            </p>
          </div>

          <div className="border border-[#1A1A1A]/10 p-6 bg-white space-y-6">
            <Elements stripe={stripePromise}>
              <CheckoutFormInner
                email={email}
                deliveryMethod={deliveryMethod}
                shippingAddress={shippingAddress}
                totalPrice={totalPrice}
                isFormValid={isFormValid}
                onSuccess={handleSuccessRedirect}
              />
            </Elements>
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-[#1A1A1A]/80 font-sans mt-4">
            <input
              type="checkbox"
              checked={billingSame}
              onChange={(e) => setBillingSame(e.target.checked)}
              className="rounded-none border-[#1A1A1A]/20 text-[#B56E3A] focus:ring-[#B56E3A] w-4 h-4"
            />
            L&apos;adresse de facturation est la même que l&apos;adresse de livraison
          </label>
        </div>

        {/* F) Footer Links */}
        <div className="pt-8 border-t border-[#1A1A1A]/10 flex flex-wrap gap-4 text-xs text-[#1A1A1A]/40 font-sans justify-start">
          <Link href="#" className="hover:text-[#1A1A1A] transition-colors">Politique de remboursement</Link>
          <span className="text-[#1A1A1A]/10">|</span>
          <Link href="#" className="hover:text-[#1A1A1A] transition-colors">Politique de livraison</Link>
          <span className="text-[#1A1A1A]/10">|</span>
          <Link href="#" className="hover:text-[#1A1A1A] transition-colors">Conditions générales</Link>
        </div>
      </section>

      {/* RIGHT COLUMN — Order Summary (Sticky) */}
      <section className="col-span-12 md:col-span-5 lg:col-span-5 bg-[#F0EDE8] p-8 md:p-12 border-l border-[#1A1A1A]/10 md:sticky md:top-0 md:h-screen md:overflow-y-auto space-y-8 flex flex-col justify-between">
        <div className="space-y-8">
          {/* A) Free Shipping Banner */}
          <div className="text-left py-3 border-b border-[#1A1A1A]/10">
            <span className="text-[#6B8F71] font-medium text-sm font-sans">
              ✓ Vous bénéficiez de la livraison offerte !
            </span>
          </div>

          {/* B) Cart Items */}
          <div className="space-y-4 pr-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center justify-between text-left">
                {/* Thumbnail Container */}
                <div className="relative w-16 h-16 bg-white flex-shrink-0 border border-[#1A1A1A]/10 rounded-none overflow-visible">
                  {/* Placeholder Gray Div Thumbnail */}
                  <div className="w-full h-full bg-[#1A1A1A]/10 rounded-none flex items-center justify-center font-serif text-xs text-[#1A1A1A]/40 font-bold select-none">
                    PV
                  </div>
                  {/* Quantity badge */}
                  <span className="absolute -top-2 -right-2 bg-[#1A1A1A] text-white text-xs w-5 h-5 flex items-center justify-center font-sans font-medium rounded-none">
                    {item.quantity}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0 px-2 space-y-0.5">
                  <h3 className="font-serif text-base text-[#1A1A1A] truncate leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/50 font-semibold uppercase tracking-wider">
                    {item.brand}
                  </p>
                  <p className="text-xs text-[#1A1A1A]/60 font-sans">
                    {item.variant}
                  </p>
                </div>

                {/* Price */}
                <div className="text-right font-serif text-sm font-medium text-[#1A1A1A] whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* C) Discount Code */}
          <div className="space-y-2 text-left">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Code de réduction"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-grow py-3 px-4 border border-[#1A1A1A]/20 focus:border-[#B56E3A] focus:outline-none rounded-none text-sm bg-white text-[#1A1A1A] font-sans"
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                className="bg-[#1A1A1A] hover:bg-[#333] text-white px-6 font-semibold uppercase tracking-widest text-xs rounded-none border-none cursor-pointer transition-colors"
              >
                Appliquer
              </button>
            </div>
            {discountError && (
              <p className="text-red-600 text-xs font-sans font-medium">{discountError}</p>
            )}
            {appliedDiscount && (
              <p className="text-[#6B8F71] text-xs font-sans font-medium">
                ✓ Code {appliedDiscount.code} appliqué (-{appliedDiscount.percent}%)
              </p>
            )}
          </div>

          {/* D) Totals */}
          <div className="border-t border-[#1A1A1A]/10 pt-6 space-y-3.5 text-left font-sans text-sm text-[#1A1A1A]">
            <div className="flex justify-between">
              <span className="text-[#1A1A1A]/60">Sous-total</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>

            {appliedDiscount && (
              <div className="flex justify-between text-[#6B8F71]">
                <span>Remise ({appliedDiscount.percent}%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-[#1A1A1A]/60">Livraison</span>
              <span className="text-[#6B8F71] font-medium font-sans">Gratuit</span>
            </div>

            {/* Separator */}
            <div className="border-t border-[#1A1A1A]/10 my-4" />

            <div className="flex justify-between items-baseline">
              <span className="text-base font-serif font-bold">Total</span>
              <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* E) Upsell Section — "Vous aimerez aussi" */}
        <div className="border-t border-[#1A1A1A]/10 pt-8 space-y-4 text-left">
          <h4 className="font-serif text-lg text-[#1A1A1A] font-normal">Vous aimerez aussi</h4>

          <div className="space-y-4">
            {UPSELL_ACCESSORIES.map((accessory) => {
              const isAdded = cartItems.some((item) => item.id === accessory.id)
              return (
                <div
                  key={accessory.id}
                  className="flex items-center justify-between gap-4 bg-white/40 p-3 border border-[#1A1A1A]/5 rounded-none"
                >
                  <div className="relative w-12 h-12 bg-white flex-shrink-0 border border-[#1A1A1A]/10 rounded-none overflow-hidden">
                    {/* Placeholder gray thumbnail */}
                    <div className="w-full h-full bg-[#1A1A1A]/10 rounded-none flex items-center justify-center font-serif text-[10px] text-[#1A1A1A]/40 font-bold select-none">
                      ACC
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-serif text-sm text-[#1A1A1A] leading-tight">{accessory.name}</p>
                    <p className="text-xs text-[#1A1A1A]/60 font-sans mt-0.5">{formatPrice(accessory.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddUpsell(accessory.id, accessory.name, accessory.price)}
                    disabled={isAdded}
                    className={`border text-xs px-3.5 py-1.5 rounded-none font-medium transition-all duration-200 bg-transparent cursor-pointer ${
                      isAdded
                        ? "border-[#1A1A1A]/20 text-[#1A1A1A]/40 cursor-not-allowed"
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
      </section>
    </div>
  )
}

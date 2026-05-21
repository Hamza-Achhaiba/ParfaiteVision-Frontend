"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Trigger entrance transition on load
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 50)
    return () => clearTimeout(timeout)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }

    setIsLoading(true)
    
    // Simulate API registration call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to login on success
      router.push("/login")
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background grid grid-cols-1 md:grid-cols-[60%_40%] w-full overflow-hidden">
      {/* Left Column: Premium Boutique Image (60% width on Desktop, hidden on mobile) */}
      <section className="relative hidden md:block w-full h-full bg-muted">
        <Image
          src="/images/boutique.jpg"
          alt="Boutique Parfaite Vision"
          fill
          priority
          sizes="60vw"
          className="object-cover object-center w-full h-full"
        />
        {/* Elegant dark overlay gradient to blend with the aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
      </section>

      {/* Right Column: Inscription Form (40% width on Desktop, 100% on mobile) */}
      <section className="w-full flex flex-col justify-between min-h-screen p-8 sm:p-12 md:p-16 relative bg-background">
        
        {/* Top bar with back to home navigation */}
        <div className={`transition-all duration-700 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-semibold group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Centered Form content */}
        <div className="my-auto py-8 flex justify-center items-center w-full">
          <div
            className={`w-full max-w-sm transition-all duration-[600ms] ease-out transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Header / Brand identity */}
            <div className="text-left mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold block mb-3">
                Parfaite Vision
              </span>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground font-normal tracking-wide">
                Créer mon compte
              </h1>
              <p className="text-muted-foreground text-sm mt-2 font-light">
                Bienvenue chez Parfaite Vision
              </p>
            </div>

            {/* Error Message Alert */}
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 text-destructive text-xs uppercase tracking-wider font-semibold border-l-2 border-destructive">
                {error}
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Input Field */}
              <div className="relative group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nom complet"
                  required
                  disabled={isLoading}
                  className="w-full bg-transparent py-3 border-b border-border focus:border-primary outline-none placeholder:text-muted-foreground/60 text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0"
                />
              </div>

              {/* Email Input Field */}
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresse e-mail"
                  required
                  disabled={isLoading}
                  className="w-full bg-transparent py-3 border-b border-border focus:border-primary outline-none placeholder:text-muted-foreground/60 text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0"
                />
              </div>

              {/* Password Input Field */}
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  required
                  disabled={isLoading}
                  className="w-full bg-transparent py-3 pr-10 border-b border-border focus:border-primary outline-none placeholder:text-muted-foreground/60 text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/80 hover:text-foreground transition-colors p-1"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Confirm Password Input Field */}
              <div className="relative group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmer le mot de passe"
                  required
                  disabled={isLoading}
                  className="w-full bg-transparent py-3 pr-10 border-b border-border focus:border-primary outline-none placeholder:text-muted-foreground/60 text-foreground text-sm transition-colors duration-300 rounded-none border-t-0 border-x-0 focus:ring-0 px-0"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/80 hover:text-foreground transition-colors p-1"
                  aria-label={showConfirmPassword ? "Masquer la confirmation du mot de passe" : "Afficher la confirmation du mot de passe"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Form Action Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-4 hover:bg-[#965628] transition-all duration-300 font-semibold uppercase tracking-widest text-xs cursor-pointer rounded-none border-none disabled:bg-primary/60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                      Création en cours...
                    </>
                  ) : (
                    "Créer mon compte"
                  )}
                </button>
              </div>
            </form>

            {/* Navigation to Login */}
            <div className="text-center mt-8">
              <Link
                href="/login"
                className="text-sm text-primary hover:text-[#965628] hover:underline font-medium transition-colors"
              >
                Déjà un compte ? Se connecter
              </Link>
            </div>
          </div>
        </div>

        {/* Footer / Copyright bar */}
        <div className={`text-[10px] text-muted-foreground/60 font-light text-center transition-all duration-700 ease-out transform delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          © {new Date().getFullYear()} Parfaite Vision Essaouira. Tous droits réservés.
        </div>
      </section>
    </main>
  )
}

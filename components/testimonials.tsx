"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote: "Un accueil chaleureux et des conseils précieux. J'ai trouvé mes lunettes idéales grâce à leur expertise.",
    name: "Fatima B.",
    location: "Essaouira"
  },
  {
    quote: "La qualité du service est exceptionnelle. On sent vraiment qu'ils prennent soin de chaque client.",
    name: "Jean-Pierre M.",
    location: "Marrakech"
  },
  {
    quote: "Professionnalisme et gentillesse. Mes nouvelles lunettes sont parfaites, je reviendrai sans hésiter.",
    name: "Sarah L.",
    location: "Casablanca"
  }
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [transitionState, setTransitionState] = useState<'idle' | 'leaving' | 'entering'>('idle')
  const [inView, setInView] = useState(false)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current)
          }
        }
      },
      {
        threshold: 0.2, // 20% visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Mark initial entrance animation completed after 1500ms
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setHasAnimatedIn(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [inView])

  // Handle transition state back to idle after entering snaps
  useEffect(() => {
    if (transitionState === 'entering') {
      const timer = setTimeout(() => {
        setTransitionState('idle')
      }, 30)
      return () => clearTimeout(timer)
    }
  }, [transitionState])

  // Autoplay effect
  useEffect(() => {
    if (!inView || transitionState !== 'idle') return

    const timer = setInterval(() => {
      const nextIndex = (current + 1) % testimonials.length
      handleSwitch(nextIndex)
    }, 6000)

    return () => clearInterval(timer)
  }, [current, inView, resetKey, transitionState])

  const handleSwitch = (targetIndex: number) => {
    if (targetIndex === current || transitionState !== 'idle') return

    setResetKey(prev => prev + 1)
    setTransitionState('leaving')

    // Wait for leaving animation (300ms)
    setTimeout(() => {
      setDisplayIndex(targetIndex)
      setCurrent(targetIndex)
      setTransitionState('entering')
    }, 300)
  }

  const prev = () => {
    const prevIndex = (current - 1 + testimonials.length) % testimonials.length
    handleSwitch(prevIndex)
  }

  const next = () => {
    const nextIndex = (current + 1) % testimonials.length
    handleSwitch(nextIndex)
  }

  const words = testimonials[displayIndex].quote.split(" ")

  const getQuoteClass = () => {
    if (transitionState === "leaving") {
      return "opacity-0 -translate-x-[30px] transition-all duration-300 ease-in transform"
    }
    if (transitionState === "entering") {
      return "opacity-0 translate-x-[30px] transition-none transform"
    }
    return "opacity-100 translate-x-0 transition-all duration-400 ease-out transform"
  }

  const getAuthorClass = () => {
    if (transitionState === "leaving") {
      return "mt-8 text-sm text-muted-foreground opacity-0 -translate-x-[30px] transition-all duration-300 ease-in transform"
    }
    if (transitionState === "entering") {
      return "mt-8 text-sm text-muted-foreground opacity-0 translate-x-[30px] transition-none transform"
    }
    return "mt-8 text-sm text-muted-foreground opacity-100 translate-x-0 transition-all duration-400 ease-out delay-100 transform"
  }

  return (
    <section ref={sectionRef} className="bg-muted py-20 md:py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p
          className={`text-xs uppercase tracking-[0.2em] text-muted-foreground mb-12 transition-all duration-400 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[15px]"
          }`}
        >
          Témoignages
        </p>

        <div className="relative min-h-[200px] flex items-center justify-center">
          {hasAnimatedIn ? (
            <div className={getQuoteClass()}>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed font-serif italic">
                &ldquo;{testimonials[displayIndex].quote}&rdquo;
              </blockquote>
              <footer className={getAuthorClass()}>
                <span className="font-semibold text-foreground">
                  {testimonials[displayIndex].name}
                </span>
                <span> — {testimonials[displayIndex].location}</span>
              </footer>
            </div>
          ) : (
            <div>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed font-serif italic">
                <span
                  className={`inline-block transition-all duration-300 ease-out ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]"
                  }`}
                >
                  &ldquo;
                </span>
                {words.map((word, i) => (
                  <span
                    key={i}
                    className={`inline-block transition-all duration-300 ease-out ${
                      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]"
                    }`}
                    style={{
                      transitionDelay: inView ? `${(i + 1) * 20}ms` : "0ms",
                    }}
                  >
                    {word}
                    {i < words.length - 1 ? " " : ""}
                  </span>
                ))}
                <span
                  className={`inline-block transition-all duration-300 ease-out ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]"
                  }`}
                  style={{
                    transitionDelay: inView ? `${(words.length + 1) * 20}ms` : "0ms",
                  }}
                >
                  &rdquo;
                </span>
              </blockquote>
              <footer
                className={`mt-8 text-sm text-muted-foreground transition-all duration-400 ease-out ${
                  inView ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: inView ? "800ms" : "0ms" }}
              >
                <span className="font-semibold text-foreground">
                  {testimonials[displayIndex].name}
                </span>
                <span> — {testimonials[displayIndex].location}</span>
              </footer>
            </div>
          )}
        </div>

        <div
          className={`flex items-center justify-center gap-6 mt-12 transition-all duration-300 ease-out ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: inView ? "1000ms" : "0ms" }}
        >
          <button
            onClick={prev}
            className="p-2 text-muted-foreground transition-all duration-200 hover:scale-120 hover:text-primary"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSwitch(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-foreground scale-100"
                    : "bg-border scale-[0.6] hover:bg-muted-foreground"
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 text-muted-foreground transition-all duration-200 hover:scale-120 hover:text-primary"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}


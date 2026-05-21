'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export function About() {
  const [inView, setInView] = useState(false)
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

  return (
    <section ref={sectionRef} className="bg-background py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Image */}
          <div
            className={`relative aspect-[4/3] bg-muted transition-all duration-700 ease-out ${
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-[30px]"
            }`}
          >
            <Image
              src="/images/boutique.jpg"
              alt="Notre boutique à Essaouira"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Column: Teaser Text & Link */}
          <div className="space-y-6">
            <span
              className={`block text-xs uppercase tracking-[0.2em] text-primary font-semibold transition-all duration-600 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
              }`}
            >
              Notre Histoire
            </span>
            
            <h2
              className={`font-serif text-3xl md:text-4xl text-foreground transition-all duration-600 ease-out delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
              }`}
            >
              Depuis 2010 à Essaouira
            </h2>
            
            <p
              className={`text-muted-foreground leading-relaxed transition-all duration-600 ease-out delay-400 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
              }`}
            >
              Parfaite Vision accompagne les habitants d&apos;Essaouira et ses visiteurs
              dans le choix de leurs lunettes depuis plus de 15 ans. Une histoire de passion,
              de savoir-faire et de confiance.
            </p>

            <div
              className={`transition-all duration-600 ease-out delay-600 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
              }`}
            >
              <Link
                href="/a-propos"
                className="inline-block text-primary hover:text-[#965628] font-medium underline underline-offset-4 transition-colors"
              >
                Découvrir notre histoire →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

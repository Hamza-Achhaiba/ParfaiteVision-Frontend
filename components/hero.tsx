"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const heroImages = [
  {
    src: "/images/hero-1.jpg",
    alt: "Lunettes vintage Retrosuperfuture et Lemtosh sur bois"
  },
  {
    src: "/images/hero-2.jpg",
    alt: "Homme portant des lunettes de vue classiques"
  },
  {
    src: "/images/hero-glasses.jpg",
    alt: "Lunettes de vue élégantes"
  }
]

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Initial fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Intersection observer for scroll-based fade
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const changeImage = (newIndex: number) => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setIsFading(false)
    }, 300)
  }

  const prevImage = () => {
    const newIndex = currentIndex === 0 ? heroImages.length - 1 : currentIndex - 1
    changeImage(newIndex)
  }

  const nextImage = () => {
    const newIndex = currentIndex === heroImages.length - 1 ? 0 : currentIndex + 1
    changeImage(newIndex)
  }

  return (
    <section ref={sectionRef} className="relative w-full h-screen">
      {/* Full screen background image */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          isVisible && !isFading 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-105"
        }`}
      >
        <Image
          src={heroImages[currentIndex].src}
          alt={heroImages[currentIndex].alt}
          fill
          className="object-cover"
          priority
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-12">
        <div 
          className={`max-w-2xl transition-all duration-700 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight text-balance mb-8 drop-shadow-lg">
            L&apos;art de la vision
          </h1>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#collection"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors"
            >
              Lunettes de vue
            </Link>
            <Link
              href="#solaires"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-foreground font-medium uppercase tracking-wider text-sm hover:bg-white/90 transition-colors"
            >
              Solaires
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center transition-all duration-300"
        aria-label="Image précédente"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center transition-all duration-300"
        aria-label="Image suivante"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => changeImage(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-white w-3 h-3" 
                : "bg-white/50 w-2 h-2 hover:bg-white/70"
            }`}
            aria-label={`Voir image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

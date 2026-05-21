"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AProposPage() {
  return (
    <main className="bg-background min-h-screen flex flex-col justify-between">
      <Header />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Timeline Section */}
        <section className="py-16 md:py-24 max-w-6xl mx-auto px-6">
          <TimelineRow 
            year="2010"
            title="La fondation"
            text="Parfaite Vision ouvre ses portes dans la médina d'Essaouira, avec la passion de bien voir. Notre boutique a été pensée pour allier le charme de l'architecture traditionnelle à un accompagnement optique moderne et chaleureux."
            image="/images/fondation-2010.png"
            isLeftImage={true}
          />
          <TimelineRow 
            year="2014"
            title="Les grandes marques"
            text="L'arrivée des collections Ray-Ban, Moscot, Dior et Tom Ford dans notre boutique. Nous élargissons notre gamme pour proposer des montures iconiques et des designs exclusifs adaptés à chaque personnalité."
            image="/images/marques-2014.png"
            isLeftImage={false}
          />
          <TimelineRow 
            year="2018"
            title="L'ère digitale"
            text="Parfaite Vision se modernise avec de nouveaux outils et un service connecté. Grâce à des équipements de diagnostic de dernière génération, nous offrons des examens de vue d'une précision chirurgicale."
            image="/images/digital-2018.png"
            isLeftImage={true}
          />
          <TimelineRow 
            year="2022"
            title="L'atelier sur-mesure"
            text="Notre opticienne propose désormais l'ajustement et la réparation en boutique. Notre atelier sur-mesure permet de façonner, d'ajuster et de réparer vos montures de manière artisanale directement sur place."
            image="/images/atelier-2022.png"
            isLeftImage={false}
          />
        </section>

        {/* Team Section */}
        <TeamSection />

        {/* Bottom CTA */}
        <BottomCTA />
      </div>

      <Footer />
    </main>
  )
}

function Hero() {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    setInView(true)
  }, [])

  return (
    <div className="relative h-[50vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden">
      <Image
        src="/images/boutique.jpg"
        alt="Notre boutique à Essaouira"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 text-center px-6">
        <span className={`block text-xs uppercase tracking-[0.3em] text-[#C8956B] font-bold mb-3 transition-all duration-700 ease-out translate-y-[15px] ${inView ? "opacity-100 translate-y-0" : "opacity-0"}`}>
          Qui Sommes-Nous
        </span>
        <h1 className={`font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-wide uppercase transition-all duration-700 ease-out delay-200 translate-y-[20px] ${inView ? "opacity-100 translate-y-0" : "opacity-0"}`}>
          Notre Histoire
        </h1>
      </div>
    </div>
  )
}

function TimelineRow({ 
  year, 
  title, 
  text, 
  image, 
  isLeftImage 
}: { 
  year: string; 
  title: string; 
  text: string; 
  image: string; 
  isLeftImage: boolean; 
}) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const imageAnimClass = isLeftImage
    ? inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[30px]"
    : inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[30px]"

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center overflow-hidden py-12 md:py-16">
      {isLeftImage ? (
        <>
          {/* Image Left */}
          <div className={`relative aspect-[4/3] bg-muted transition-all duration-700 ease-out ${imageAnimClass}`}>
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
          {/* Text Right */}
          <div className="space-y-4">
            <span className={`block font-serif text-3xl font-bold text-primary transition-all duration-500 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
              {year}
            </span>
            <h3 className={`font-serif text-2xl text-foreground font-bold transition-all duration-500 ease-out delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
              {title}
            </h3>
            <p className={`text-muted-foreground leading-relaxed transition-all duration-500 ease-out delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
              {text}
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Text Left */}
          <div className="space-y-4 order-2 md:order-1">
            <span className={`block font-serif text-3xl font-bold text-primary transition-all duration-500 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
              {year}
            </span>
            <h3 className={`font-serif text-2xl text-foreground font-bold transition-all duration-500 ease-out delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
              {title}
            </h3>
            <p className={`text-muted-foreground leading-relaxed transition-all duration-500 ease-out delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
              {text}
            </p>
          </div>
          {/* Image Right */}
          <div className={`relative aspect-[4/3] bg-muted order-1 md:order-2 transition-all duration-700 ease-out ${imageAnimClass}`}>
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        </>
      )}
    </div>
  )
}

function TeamSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const team = [
    {
      name: "Laila Benjelloun",
      role: "Opticienne Fondatrice",
      image: "/images/team-founder.png"
    },
    {
      name: "Youssef El Amrani",
      role: "Visagiste Conseil",
      image: "/images/team-stylist.png"
    },
    {
      name: "Khadija Mansouri",
      role: "Responsable Atelier",
      image: "/images/team-technician.png"
    }
  ]

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className={`font-serif text-3xl md:text-4xl text-center text-foreground font-bold mb-16 transition-all duration-600 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
          Notre Équipe
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div 
              key={member.name}
              className="space-y-4 transition-all duration-600 ease-out"
              style={{
                transitionDelay: `${index * 150}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)"
              }}
            >
              <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-foreground">{member.name}</h4>
                <p className="text-sm text-primary tracking-wider uppercase font-semibold">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BottomCTA() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 bg-muted border-t border-border text-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        <h2 className={`font-serif text-3xl md:text-4xl text-foreground font-bold transition-all duration-600 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
          Venez nous rendre visite
        </h2>
        <p className={`text-muted-foreground max-w-lg mx-auto leading-relaxed transition-all duration-600 ease-out delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
          Notre équipe vous accueille avec plaisir au cœur de la médina d&apos;Essaouira pour des conseils personnalisés et un accompagnement sur-mesure.
        </p>
        <div className={`space-y-2 pt-4 transition-all duration-600 ease-out delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
          <p className="font-serif text-lg text-foreground font-semibold">55 Rue Moulay Rachid, Essaouira, Maroc</p>
          <p className="text-sm text-muted-foreground">Téléphone : +212 5 24 47 55 55</p>
          <p className="text-xs text-muted-foreground/80">Lundi - Samedi : 9h00 - 19h00</p>
        </div>
      </div>
    </section>
  )
}

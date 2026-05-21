'use client'

import { useEffect, useRef, useState } from "react"
import { Eye, Users, Wrench } from "lucide-react"

const services = [
  {
    icon: Eye,
    number: "01",
    title: "Examen de vue",
    description: "Bilan complet de votre vision par notre opticienne diplômée.",
  },
  {
    icon: Users,
    number: "02",
    title: "Conseil personnalisé",
    description: "Accompagnement dans le choix de vos montures et verres.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Réparation",
    description: "Ajustements et réparations de vos lunettes en boutique.",
  },
]

export function Services() {
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
    <section ref={sectionRef} id="services" className="bg-background py-16 md:py-24 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className={`font-serif text-3xl md:text-4xl text-foreground mb-12 text-center transition-all duration-500 ease-out ${
            inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[20px]"
          }`}
        >
          Nos Services
        </h2>

        <div className="space-y-8">
          {services.map((service, index) => {
            const staggerDelay = 200 + index * 200

            return (
              <div key={service.number} className="group relative">
                <div
                  className={`flex items-start gap-6 pb-8 ${
                    index === services.length - 1 ? "pb-0" : ""
                  }`}
                >
                  {/* Number container */}
                  <div
                    className={`transition-all duration-400 ease-out ${
                      inView
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-[20px]"
                    }`}
                    style={{ transitionDelay: `${staggerDelay}ms` }}
                  >
                    <span className="block text-primary font-serif text-xl transition-colors duration-300 group-hover:text-[#965628]">
                      {service.number}
                    </span>
                  </div>

                  {/* Text content container */}
                  <div className="space-y-2 flex-1">
                    {/* Title */}
                    <div
                      className={`transition-all duration-400 ease-out ${
                        inView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-[15px]"
                      }`}
                      style={{ transitionDelay: `${staggerDelay + 100}ms` }}
                    >
                      <h3 className="text-foreground font-medium transition-transform duration-300 group-hover:translate-x-[5px]">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div
                      className={`transition-all duration-400 ease-out ${
                        inView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-[15px]"
                      }`}
                      style={{ transitionDelay: `${staggerDelay + 200}ms` }}
                    >
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                {index < services.length - 1 && (
                  <div
                    className="absolute bottom-0 left-0 h-[1px] bg-border group-hover:bg-primary"
                    style={{
                      transition: inView
                        ? `width 600ms ease-out ${index === 0 ? 800 : 1000}ms, background-color 300ms ease-out`
                        : "width 600ms ease-out",
                      width: inView ? "100%" : "0%",
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


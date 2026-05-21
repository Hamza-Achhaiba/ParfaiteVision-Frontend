import Link from "next/link"

export function CTA() {
  return (
    <section id="rdv" className="bg-[#F5EDE6] py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
          Prenez rendez-vous
        </h2>
        <p className="text-muted-foreground mb-6">
          Nous vous accueillons du lundi au samedi pour un conseil personnalisé.
        </p>
        <p className="text-2xl text-foreground font-medium mb-8">
          +212 5 24 47 55 55
        </p>
        <Link
          href="tel:+212524475555"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm hover:opacity-90 transition-opacity"
        >
          Appeler maintenant
        </Link>
      </div>
    </section>
  )
}

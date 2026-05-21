import Link from "next/link"

export function Footer() {
  return (
    <footer id="contact" className="bg-muted border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Link href="/" className="font-serif text-xl text-foreground">
              Parfaite Vision
            </Link>
            <p className="text-muted-foreground text-sm">
              Votre opticienne de confiance à Essaouira depuis 2010.
            </p>
          </div>

          <div className="space-y-4 md:text-right">
            <div className="text-sm text-muted-foreground space-y-1">
              <p>55 Rue Moulay Rachid, Essaouira, Maroc</p>
              <p>+212 5 24 47 55 55</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Lundi - Samedi : 9h00 - 19h00</p>
              <p>Dimanche : Fermé</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Parfaite Vision. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

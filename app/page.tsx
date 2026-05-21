import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Collection } from "@/components/collection"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { CTA } from "@/components/cta"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Collection />
      <About />
      <Services />
      <CTA />
      <Testimonials />
      <Footer />
    </main>
  )
}
